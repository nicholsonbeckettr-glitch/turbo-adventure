const SITE_CONFIG = {
  publicUrl:'https://turbo-adventure-7ii.pages.dev',
  contactUrl:'',
  affiliateUrl:'',
  analyticsEndpoint:'/api/track',
  knowledgeUrl:'knowledge/supplements.json',
  knowledgeManifestUrl:'knowledge/manifest.json',
};

const { SUPPLEMENTS, DETAIL_FALLBACKS, QUIZ } = window.HealthMatchData;

// ==================== APP ENGINE ====================
const ROUTES={home:'sec-home',quiz:'sec-quiz',result:'sec-result'};
const ANSWERS_KEY='health-match-answers';
const USER_KEY='health-match-user';
const $=id=>document.getElementById(id);
const asList=value=>Array.isArray(value)?value.filter(Boolean):(value?[value]:[]);
const supplementById=id=>SUPPLEMENTS.find(s=>s.id===id);
const supplementIconHtml=(supplement,className='')=>
  `<img class="supp-icon ${className}" src="assets/supplement-icons/${supplement.id}.png" alt="">`;

function parseFrontMatter(markdown, path=''){
  const match=/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(markdown);
  if(!match)return null;
  const meta={path};
  match[1].split('\n').forEach(line=>{
    const m=/^([A-Za-z][\w-]*):\s*(.*)$/.exec(line.trim());
    if(!m)return;
    const [,key,raw]=m;
    meta[key]=parseMetaValue(raw);
  });
  meta.body=match[2].trim();
  return meta;
}

function parseMetaValue(raw){
  const value=raw.trim();
  if(value.startsWith('[')&&value.endsWith(']')){
    return value.slice(1,-1).split(',').map(item=>cleanMetaString(item)).filter(Boolean);
  }
  return cleanMetaString(value);
}

function cleanMetaString(value){
  return String(value).trim().replace(/^['"]|['"]$/g,'');
}

function escHtml(value){
  return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function markdownToHtml(markdown=''){
  const lines=String(markdown).split('\n');
  const html=[];
  let listOpen=false;
  const closeList=()=>{if(listOpen){html.push('</ul>');listOpen=false;}};
  lines.forEach(line=>{
    const text=line.trim();
    if(!text){closeList();return;}
    const heading=/^(#{2,4})\s+(.+)$/.exec(text);
    if(heading){
      closeList();
      const level=Math.min(heading[1].length+1,4);
      html.push(`<h${level}>${escHtml(heading[2])}</h${level}>`);
      return;
    }
    if(text.startsWith('- ')){
      if(!listOpen){html.push('<ul>');listOpen=true;}
      html.push(`<li>${escHtml(text.slice(2))}</li>`);
      return;
    }
    closeList();
    html.push(`<p>${escHtml(text)}</p>`);
  });
  closeList();
  return html.join('');
}

function splitMarkdownSections(markdown=''){
  const sections=[];
  let current=null;
  String(markdown).split('\n').forEach(line=>{
    const heading=/^##\s+(.+)$/.exec(line.trim());
    if(heading){
      current={title:heading[1],lines:[]};
      sections.push(current);
      return;
    }
    if(current)current.lines.push(line);
  });
  return sections.map(section=>({
    title:section.title,
    body:section.lines.join('\n').trim(),
  })).filter(section=>section.body);
}

function previewMarkdown(markdown='',limit=4){
  const items=[];
  String(markdown).split('\n').some(line=>{
    const text=line.trim();
    if(!text||text.startsWith('#'))return false;
    items.push(text.startsWith('- ')?text.slice(2):text);
    return items.length>=limit;
  });
  return items.length
    ? `<ul>${items.map(item=>`<li>${escHtml(item)}</li>`).join('')}</ul>`
    : '<p class="detail-muted">知识库暂未配置该部分摘要。</p>';
}

function focusSectionsFromNote(note){
  const sections=splitMarkdownSections(note?.body);
  const picks=[
    ['重点结论',/一句话结论/],
    ['适合人群',/谁更可能|最适合|适用场景|谁更需要/],
    ['不适合人群',/谁不适合|不优先|不应|谁不应/],
    ['剂量与复盘',/剂量|周期|如何判断是否有效/],
    ['证据更可靠',/证据更可靠/],
    ['风险边界',/风险边界/],
  ];
  const used=new Set();
  const focused=picks.map(([label,pattern])=>{
    const index=sections.findIndex((section,i)=>!used.has(i)&&pattern.test(section.title));
    if(index<0)return null;
    used.add(index);
    return {label,title:sections[index].title,body:sections[index].body};
  }).filter(Boolean);
  sections.forEach((section,index)=>{
    if(focused.length>=6||used.has(index))return;
    used.add(index);
    focused.push({label:'补充要点',title:section.title,body:section.body});
  });
  return focused.slice(0,6);
}

function detailFallback(supplement){
  return DETAIL_FALLBACKS[supplement.id]||{
    cycle:'4-8 周观察目标指标、主观体感和胃肠耐受；无明确收益时优先停止，避免长期叠加。',
    usagePlans:['先确认目标和禁忌，再决定是否试用', '只新增这一个成分，避免同时叠加多个补剂', '记录开始前、使用中和复盘日的目标评分'],
    mechanism:[`${supplement.name} 经口服进入胃肠道`, '被吸收后进入血液或淋巴运输', '分布到相关组织或细胞内', '参与代谢、结构组成或信号通路', '经储存、转化或排泄维持体内平衡'],
  };
}

function mechanismSteps(info,supplement){
  const custom=asList(info.mechanism);
  if(custom.length)return custom.slice(0,5);
  return detailFallback(supplement).mechanism;
}

function knowledgeFromNotes(notes){
  const supplements={};
  notes.forEach(note=>{
    const supplement=note.supplement||note.supplementId;
    if(!supplement||!note.title||!note.summary)return;
    const current=supplements[supplement]||(supplements[supplement]={});
    if(note.cycle&&!current.cycle)current.cycle=note.cycle;
    if(note.note&&!current.note)current.note=note.note;
    if(note.mechanism&&!current.mechanism)current.mechanism=asList(note.mechanism);
    current.supportedTargets=[...new Set([...(current.supportedTargets||[]),...asList(note.targets)])];
    current.usagePlans=[...new Set([...(current.usagePlans||[]),...asList(note.usagePlan||note.usage)])];
    current.notes=[...(current.notes||[]),{
      id:note.id||'',
      title:note.title,
      summary:note.summary,
      mechanism:asList(note.mechanism),
      body:note.body||'',
      path:note.path||'',
    }];
    current.literature=[...(current.literature||[]),{
      title:note.title,
      journal:note.journal||'',
      year:note.year||'',
      url:note.url||'',
      summary:note.summary,
      sourcePath:note.path||'',
    }];
  });
  return {supplements};
}

function uniqueLiterature(items){
  const seen=new Set();
  return items.filter(item=>{
    const key=`${item.title||item.t}|${item.year||item.y}`;
    if(seen.has(key))return false;
    seen.add(key);
    return true;
  });
}

function mergeKnowledge(base, extra){
  const supplements={...(base.supplements||{})};
  Object.entries(extra.supplements||{}).forEach(([id,info])=>{
    const existing=supplements[id]||{};
    supplements[id]={
      ...existing,
      ...info,
      supportedTargets:[...new Set([...(existing.supportedTargets||[]),...(info.supportedTargets||[])])],
      usagePlans:[...new Set([...(existing.usagePlans||[]),...(info.usagePlans||[])])],
      mechanism:info.mechanism?.length?info.mechanism:existing.mechanism,
      literature:uniqueLiterature([...(info.literature||[]),...(existing.literature||[])]),
      notes:[...(info.notes||[]),...(existing.notes||[])],
      note:[existing.note,info.note].filter(Boolean).join('；'),
    };
  });
  return {...base,supplements};
}

const App = {
  qIdx:0, answers:[], knowledge:null, result:null,
  go(section, updateHash=true){
    section=ROUTES[section]?section:'home';
    document.querySelectorAll('.section').forEach(s=>s.classList.remove('on'));
    $(ROUTES[section]).classList.add('on');
    if(updateHash&&location.hash!==`#${section}`)location.hash=section;
    if(section==='quiz'){
      this.qIdx=0;this.answers=[];this.result=null;
      localStorage.removeItem(ANSWERS_KEY);
      $('result-list').innerHTML='';
      $('next-steps').innerHTML='';
      this.renderQ();
      if(updateHash)this.track('quiz_start');
    }
    window.scrollTo(0,0);
  },
  
  renderQ(){
    if(this.qIdx>=QUIZ.length){this.showResult();return;}
    const q=QUIZ[this.qIdx];
    $('quiz-q').textContent=q.q;
    $('quiz-num').textContent=`${this.qIdx+1}/${QUIZ.length}`;
    $('quiz-progress').style.width=`${(this.qIdx/QUIZ.length)*100}%`;
    
    const l=['A','B','C','D'];
    $('quiz-opts').innerHTML=q.opts.map((o,i)=>
      `<button class="btn btn-outline anim-fade quiz-option" style="--delay:${i*.06}s" data-answer="${i}">
        <span class="quiz-option-letter">${l[i]}</span>${o}
      </button>`
    ).join('');
  },
  
  answer(idx){
    this.answers.push(idx);
    localStorage.setItem(ANSWERS_KEY,JSON.stringify(this.answers));
    this.qIdx++;
    if(this.qIdx>=QUIZ.length){
      $('quiz-progress').style.width='100%';
      setTimeout(()=>this.showResult(),200);
    }else{this.renderQ();}
  },
  
  showResult({updateHash=true,trackResult=true}={}){
    document.querySelectorAll('.section').forEach(s=>s.classList.remove('on'));
    $('sec-result').classList.add('on');
    if(updateHash&&location.hash!=='#result')location.hash='result';
    
    this.result=this.scoreResults();
    const {top,userTargets}=this.result;
    const evidenceLabel={strong:'强证据',moderate:'中等证据',emerging:'新兴研究'};
    const evidenceClass={strong:'badge-strong',moderate:'badge-moderate',emerging:'badge-emerging'};
    const fillColors=['var(--green)','var(--teal)','var(--gold)','#5a7d6a','#8d6e63'];
    
    const maxScore=Math.max(...top.map(s=>s.score),1);
    
    $('result-list').innerHTML=top.map((s,i)=>{
      const pct=Math.round((s.score/maxScore)*100);
      return `<div class="card anim-fade result-card" style="--delay:${i*.06}s;--match-pct:${pct}%;--match-color:${fillColors[i%fillColors.length]}">
        <div class="result-card-inner">
          ${supplementIconHtml(s,'result-supp-icon')}
          <div class="result-body">
            <div class="result-title-row">
              <h3 class="result-name">${s.name}</h3>
              <span class="badge ${evidenceClass[s.evidence]}">${evidenceLabel[s.evidence]}</span>
              ${s.hasWarnings?'<span class="risk-flag">⚠ 需要评估</span>':''}
            </div>
            <p class="result-desc">${s.desc}</p>
            <div class="match-bar result-bar"><div class="match-fill"></div></div>
            <div class="result-meta">
              <span>匹配度: ${pct}%</span>
              <span>💊 ${s.dosage}</span>
            </div>
            ${s.refs.length?`<p class="result-ref">📚 ${s.refs[0].t} (${s.refs[0].j}, ${s.refs[0].y})</p>`:''}
          </div>
        </div>
      </div>`;
    }).join('');
    
    if(top.length===0){
      $('result-list').innerHTML='<div class="card empty-result"><p>基于您的回答，暂未发现需要特别关注的健康领域。保持当前生活方式！</p></div>';
    }

    this.renderNextSteps(top);
    if(trackResult){
      this.track('result', {
        supplements:top.slice(0,5).map(s=>s.id),
        targets:[...userTargets],
      });
    }
    
    window.scrollTo(0,0);
  },

  scoreResults(){
    const userTargets=new Set();
    const boostedIds=new Set();
    const riskNotes=[];
    let onBpMeds=false;
    this.answers.forEach((a,i)=>{
      const q=QUIZ[i];
      (q.targets?.[a]||[]).forEach(t=>userTargets.add(t));
      (q.boosts?.[a]||[]).forEach(id=>boostedIds.add(id));
      if(q.risks?.[a])riskNotes.push(q.risks[a]);
      if(q.id==='bp'&&a>=2)onBpMeds=true;
    });

    const scored=SUPPLEMENTS.map(s=>{
      let score=0;
      s.targets.forEach(t=>{if(userTargets.has(t))score++;});
      if(boostedIds.has(s.id))score++;
      const riskText=s.warnings.join(' ');
      const hasWarnings=(onBpMeds&&riskText.includes('降压'))||
        (riskNotes.length>0&&/(孕期|哺乳|药物|肾功能|肝|手术|抗凝|降糖|镇静)/.test(riskText));
      return{...s,score,hasWarnings};
    }).sort((a,b)=>b.score-a.score);

    return {userTargets,riskNotes,top:scored.filter(s=>s.score>0).slice(0,12)};
  },

  renderNextSteps(top){
    const names=top.slice(0,3).map(s=>s.name).join('、')||'当前生活方式';
    const buyButton=SITE_CONFIG.affiliateUrl
      ? `<a class="btn btn-primary btn-sm" href="${SITE_CONFIG.affiliateUrl}" target="_blank" rel="sponsored noopener">查看筛选清单</a>`
      : '';
    const contactButton=SITE_CONFIG.contactUrl
      ? `<a class="btn btn-outline btn-sm" href="${SITE_CONFIG.contactUrl}" target="_blank" rel="noopener">品牌合作</a>`
      : '';
    $('next-steps').innerHTML=`<div class="sponsor">
      <strong>下一步建议</strong><br>
      优先核对 ${names} 的禁忌、药物相互作用、第三方检测和实际剂量。建议只选择 1-2 个高匹配项做 7 天试用，并记录睡眠、精力、压力或训练表现评分。本站未来可能通过广告、赞助或联盟链接获得收入；商业合作不影响匹配排序。
      <div class="next-step-actions">
        <button class="btn btn-outline btn-sm" data-action="copy-report">复制报告</button>
        <button class="btn btn-primary btn-sm" data-action="download-report">下载 PDF 报告</button>
        ${buyButton}${contactButton}
      </div>
    </div>`;
  },

  async showSupplement(id, updateHash=true){
    const supplement=supplementById(id);
    if(!supplement){this.go('home',false);return;}
    if(updateHash&&location.hash!==`#supplement/${id}`){
      location.hash=`supplement/${id}`;
      return;
    }
    document.querySelectorAll('.section').forEach(s=>s.classList.remove('on'));
    $('sec-supplement').classList.add('on');
    $('supplement-detail').innerHTML='<div class="card detail-card"><p class="detail-muted">正在读取知识库...</p></div>';
    const kb=await this.loadKnowledge();
    const info=kb.supplements?.[id]||{};
    this.renderSupplementDetail(supplement,info);
    this.track('view_supplement',{supplement:id});
    window.scrollTo(0,0);
  },

  renderSupplementDetail(supplement,info){
    const note=info.notes?.[0];
    const refs=info.literature?.length?info.literature:supplement.refs.map(ref=>({
      title:ref.t,journal:ref.j,year:ref.y,url:'',summary:supplement.desc,
    }));
    const targets=info.supportedTargets?.length?info.supportedTargets:supplement.targets;
    const fallback=detailFallback(supplement);
    const cycle=info.cycle||fallback.cycle;
    const usagePlans=info.usagePlans?.length?info.usagePlans:fallback.usagePlans;
    const evidenceLabel={strong:'强证据',moderate:'中等证据',emerging:'新兴研究'};
    const focusSections=focusSectionsFromNote(note);
    const mechanism=mechanismSteps(info,supplement);
    $('supplement-detail').innerHTML=`<article class="detail-card card">
      <header class="detail-hero">
        ${supplementIconHtml(supplement,'detail-icon')}
        <div>
          <p class="detail-kicker">${escHtml(supplement.cat)} · ${escHtml(evidenceLabel[supplement.evidence]||supplement.evidence)}</p>
          <h1>${escHtml(supplement.name)}</h1>
          <p>${escHtml(note?.summary||refs[0]?.summary||supplement.desc)}</p>
        </div>
      </header>

      <div class="detail-grid">
        <section>
          <h2>匹配目标</h2>
          <div class="detail-tags">${targets.map(t=>`<span class="tag">${escHtml(t)}</span>`).join('')}</div>
        </section>
        <section>
          <h2>使用与复盘</h2>
          <p><strong>建议剂量：</strong>${escHtml(supplement.dosage)}</p>
          <p><strong>观察周期：</strong>${escHtml(cycle)}</p>
          <ul>${usagePlans.map(plan=>`<li>${escHtml(plan)}</li>`).join('')}</ul>
        </section>
        <section>
          <h2>风险边界</h2>
          <ul>${supplement.warnings.map(warning=>`<li>${escHtml(warning)}</li>`).join('')}</ul>
          ${info.note?`<p class="detail-note">${escHtml(info.note)}</p>`:''}
        </section>
      </div>

      <section class="detail-mechanism">
        <h2>机理流程</h2>
        <div class="mechanism-flow">
          ${mechanism.map((step,index)=>`<div class="mechanism-step">
            <span>${String(index+1).padStart(2,'0')}</span>
            <p>${escHtml(step)}</p>
          </div>`).join('')}
        </div>
      </section>

      ${focusSections.length?`<section class="detail-focus">
        <h2>知识库重点</h2>
        <div class="focus-grid">
          ${focusSections.map(section=>`<section class="focus-card">
            <p class="focus-label">${escHtml(section.label)}</p>
            <h3>${escHtml(section.title)}</h3>
            ${previewMarkdown(section.body)}
          </section>`).join('')}
        </div>
      </section>`:''}

      <section class="detail-literature">
        <h2>文献依据</h2>
        ${refs.map(ref=>`<div class="detail-ref">
          <h3>${ref.url?`<a href="${escHtml(ref.url)}" target="_blank" rel="noopener">${escHtml(ref.title)}</a>`:escHtml(ref.title)}</h3>
          <p>${escHtml([ref.journal,ref.year].filter(Boolean).join(' · '))}</p>
          <p>${escHtml(ref.summary||'该文献作为当前成分建议的基础参考，具体适用性仍需结合个人情况判断。')}</p>
        </div>`).join('')}
      </section>

      ${note?.body?`<details class="detail-source">
        <summary>查看完整知识库原文</summary>
        <div class="detail-note-body">${markdownToHtml(note.body)}</div>
      </details>`:''}
    </article>`;
  },

  copyReport(){
    const text=$('result-list').innerText+'\\n\\n'+SITE_CONFIG.publicUrl+'#result';
    navigator.clipboard?.writeText(text);
    this.track('copy_report');
  },

  async loadKnowledge(){
    if(this.knowledge)return this.knowledge;
    let base={supplements:{}};
    try{
      const res=await fetch(SITE_CONFIG.knowledgeUrl);
      base=res.ok?await res.json():base;
    }catch(e){
      base={supplements:{}};
    }
    this.knowledge=mergeKnowledge(base, await this.loadKnowledgeNotes());
    return this.knowledge;
  },

  async loadKnowledgeNotes(){
    try{
      const manifestUrl=new URL(SITE_CONFIG.knowledgeManifestUrl, location.href);
      const manifestRes=await fetch(manifestUrl);
      if(!manifestRes.ok)return {supplements:{}};
      const manifest=await manifestRes.json();
      const notes=await Promise.all((manifest.notes||[]).map(async item=>{
        const notePath=typeof item==='string'?item:item.path;
        if(!notePath)return null;
        const noteUrl=new URL(notePath, manifestUrl);
        const res=await fetch(noteUrl);
        if(!res.ok)return null;
        return parseFrontMatter(await res.text(), notePath);
      }));
      return knowledgeFromNotes(notes.filter(Boolean));
    }catch(e){
      return {supplements:{}};
    }
  },

  async downloadReport(){
    const result=this.result||this.scoreResults();
    const kb=await this.loadKnowledge();
    const report=this.buildReport(result,kb);
    await this.savePdf(report);
    this.track('download_report',{supplements:result.top.slice(0,5).map(s=>s.id)});
  },

  buildReport({top,userTargets,riskNotes=[]},kb){
    const generatedAt=new Date().toLocaleString('zh-CN');
    const items=top.slice(0,5).map((s,i)=>{
      const info=kb.supplements?.[s.id]||{};
      const fallback=detailFallback(s);
      const matched=(info.supportedTargets||s.targets).filter(t=>userTargets.has(t));
      const refs=info.literature?.length?info.literature:s.refs;
      return {
        rank:i+1,
        name:s.name,
        reason:matched.join('、')||'由问卷加权命中',
        dosage:s.dosage,
        cycle:info.cycle||fallback.cycle,
        usagePlans:info.usagePlans?.length?info.usagePlans:fallback.usagePlans,
        warnings:s.warnings,
        evidence:s.evidence,
        literature:refs.map(ref=>({
          title:ref.title||ref.t,
          journal:ref.journal||ref.j,
          year:ref.year||ref.y,
          url:ref.url||'',
          summary:ref.summary||'该文献作为当前成分建议的基础参考，具体适用性仍需结合个人情况判断。',
        })),
        note:info.note||'',
      };
    });
    const report={generatedAt,targets:[...userTargets],riskNotes,priority:top.slice(0,5).map(s=>s.name),items};
    const lines=[
      '# 保健成分综合报告',
      '',
      `生成时间：${report.generatedAt}`,
      '',
      '## 匹配摘要',
      `你的主要健康目标：${report.targets.join('、')||'未识别到明显目标'}`,
      `风险筛查：${report.riskNotes.join('；')||'未识别到特殊高风险项'}`,
      `推荐优先级：${report.priority.join('、')||'暂无'}`,
      '',
      '## 交叉验证',
    ];

    report.items.forEach(item=>{
      lines.push(
        '',
        `### ${item.rank}. ${item.name}`,
        `- 匹配原因：${item.reason}`,
        `- 建议剂量：${item.dosage}`,
        `- 建议周期：${item.cycle}`,
        `- 其他人使用方案：${item.usagePlans.join('；')}`,
        `- 风险提示：${item.warnings.join('；')}`,
        `- 证据等级：${item.evidence}`,
      );
      item.literature.forEach(ref=>{
        const source=[ref.journal,ref.year].filter(Boolean).join('，');
        lines.push(`- 文献：${ref.title}${source?`（${source}）`:''}`);
        lines.push(`  - 一句话总结：${ref.summary}`);
      });
      if(item.note)lines.push(`- 知识库备注：${item.note}`);
    });

    lines.push(
      '',
      '## 使用前检查清单',
      '- 是否正在使用处方药，尤其是抗凝、降压、降糖、镇静类药物？',
      '- 是否怀孕、哺乳、准备手术，或存在肝肾疾病？',
      '- 产品是否有第三方检测、清晰剂量、有效成分含量和批次信息？',
      '- 是否设置了复盘周期，避免长期无目的叠加补剂？',
      '',
      '## 7 天复盘表',
      '- 第 0 天：记录目标评分、已用药物、已吃补剂和准备尝试的 1-2 个成分。',
      '- 第 3 天：记录不良反应、睡眠/精力/压力/训练表现变化。',
      '- 第 7 天：比较评分变化，决定继续观察、降低剂量、停止或咨询医生。',
      '- 第 14 天：如仍无明确收益，优先停止无效项，避免长期叠加。',
      '',
      '免责声明：本报告仅供教育参考，不构成医疗建议，不能替代医生诊断、治疗或用药建议。'
    );
    report.markdown=lines.join('\n');
    return report;
  },

  reportHtml(report){
    const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    return `<div class="pdf-report">
      <h1>保健成分综合报告</h1>
      <p>生成时间：${esc(report.generatedAt)}</p>
      <div class="box">
        <h2>匹配摘要</h2>
        <p><strong>主要健康目标：</strong>${esc(report.targets.join('、')||'未识别到明显目标')}</p>
        <p><strong>风险筛查：</strong>${esc(report.riskNotes.join('；')||'未识别到特殊高风险项')}</p>
        <p><strong>推荐优先级：</strong>${esc(report.priority.join('、')||'暂无')}</p>
      </div>
      <h2>交叉验证</h2>
      ${report.items.map(item=>`
        <div class="box">
          <h3>${item.rank}. ${esc(item.name)}</h3>
          <ul>
            <li><strong>匹配原因：</strong>${esc(item.reason)}</li>
            <li><strong>建议剂量：</strong>${esc(item.dosage)}</li>
            <li><strong>建议周期：</strong>${esc(item.cycle)}</li>
            <li><strong>其他人使用方案：</strong>${esc(item.usagePlans.join('；'))}</li>
            <li><strong>风险提示：</strong>${esc(item.warnings.join('；'))}</li>
            <li><strong>证据等级：</strong>${esc(item.evidence)}</li>
          </ul>
          <p><strong>文献：</strong></p>
          <ul>${item.literature.map(ref=>`<li>${esc(ref.title)}${ref.journal||ref.year?`（${esc([ref.journal,ref.year].filter(Boolean).join('，'))}）`:''}<br>一句话总结：${esc(ref.summary)}</li>`).join('')}</ul>
          ${item.note?`<p><strong>知识库备注：</strong>${esc(item.note)}</p>`:''}
        </div>
      `).join('')}
      <h2>使用前检查清单</h2>
      <ul>
        <li>是否正在使用处方药，尤其是抗凝、降压、降糖、镇静类药物？</li>
        <li>是否怀孕、哺乳、准备手术，或存在肝肾疾病？</li>
        <li>产品是否有第三方检测、清晰剂量、有效成分含量和批次信息？</li>
        <li>是否设置了复盘周期，避免长期无目的叠加补剂？</li>
      </ul>
      <h2>7 天复盘表</h2>
      <ul>
        <li>第 0 天：记录目标评分、已用药物、已吃补剂和准备尝试的 1-2 个成分。</li>
        <li>第 3 天：记录不良反应、睡眠/精力/压力/训练表现变化。</li>
        <li>第 7 天：比较评分变化，决定继续观察、降低剂量、停止或咨询医生。</li>
        <li>第 14 天：如仍无明确收益，优先停止无效项，避免长期叠加。</li>
      </ul>
      <p>免责声明：本报告仅供教育参考，不构成医疗建议，不能替代医生诊断、治疗或用药建议。</p>
    </div>`;
  },

  async savePdf(report){
    if(!window.html2canvas||!window.jspdf?.jsPDF){
      const win=window.open('', '_blank');
      if(!win){alert('PDF 组件暂未加载完成，请刷新页面后重试。');return;}
      win.document.write(`<!doctype html><html><head><title>保健成分综合报告</title><style>body{font-family:sans-serif;padding:24px;line-height:1.7}</style></head><body><pre style="white-space:pre-wrap">${report.markdown.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))}</pre></body></html>`);
      win.document.close();
      win.print();
      return;
    }
    const wrap=document.createElement('div');
    try{
      wrap.innerHTML=this.reportHtml(report);
      document.body.appendChild(wrap);
      const node=wrap.firstElementChild;
      const canvas=await html2canvas(node,{scale:2,backgroundColor:'#ffffff'});
      const pdf=new jspdf.jsPDF('p','pt','a4');
      const pageW=pdf.internal.pageSize.getWidth();
      const pageH=pdf.internal.pageSize.getHeight();
      const imgW=pageW;
      const imgH=canvas.height*imgW/canvas.width;
      let y=0;
      pdf.addImage(canvas.toDataURL('image/png'),'PNG',0,y,imgW,imgH);
      while(imgH+y>pageH){
        y-=pageH;
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/png'),'PNG',0,y,imgW,imgH);
      }
      pdf.save(`保健成分综合报告-${new Date().toISOString().slice(0,10)}.pdf`);
    }finally{
      wrap.remove();
    }
  },

  bindEvents(){
    document.addEventListener('click',event=>{
      const answerButton=event.target.closest('[data-answer]');
      if(answerButton){
        this.answer(Number(answerButton.dataset.answer));
        return;
      }

      const actionButton=event.target.closest('[data-action]');
      const supplementButton=event.target.closest('[data-supplement-id]');
      if(supplementButton){
        this.showSupplement(supplementButton.dataset.supplementId);
        return;
      }
      if(!actionButton)return;

      const actions={
        'go-home':()=>this.go('home'),
        'go-quiz':()=>this.go('quiz'),
        'scroll-supplements':()=>$('supp-preview').scrollIntoView({behavior:'smooth',block:'center'}),
        'copy-report':()=>this.copyReport(),
        'download-report':()=>this.downloadReport(),
      };
      actions[actionButton.dataset.action]?.();
    });
  },

  getUserId(){
    let id=localStorage.getItem(USER_KEY);
    if(!id){
      id=crypto.randomUUID();
      localStorage.setItem(USER_KEY,id);
    }
    return id;
  },

  track(event, data={}){
    if(location.protocol==='file:')return;
    if(['localhost','127.0.0.1','::1'].includes(location.hostname))return;
    fetch(SITE_CONFIG.analyticsEndpoint,{
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({event,userId:this.getUserId(),path:location.pathname+location.hash,...data}),
      keepalive:true,
    }).catch(()=>{});
  }
};

window.App=App;

// ==================== INIT ====================
(function(){
  App.bindEvents();

  // Supplement preview pills
  $('supp-count-proof').textContent=SUPPLEMENTS.length;
  $('quiz-count-proof').textContent=QUIZ.length;
  $('supp-preview').innerHTML=SUPPLEMENTS.map(s=>
    `<button class="tag supp-tag" type="button" data-supplement-id="${s.id}">
      ${supplementIconHtml(s)}
      <span class="supp-name">${escHtml(s.name)}</span>
    </button>`
  ).join('');

  window.addEventListener('hashchange',()=>{
    const section=location.hash.slice(1);
    if(section.startsWith('supplement/')){
      App.showSupplement(section.slice('supplement/'.length),false);
    }else if(section==='result'){
      try{App.answers=JSON.parse(localStorage.getItem(ANSWERS_KEY)||'[]');}catch(e){App.answers=[];}
      App.showResult({updateHash:false,trackResult:false});
    }else{
      App.go(section||'home',false);
    }
  });
  window.dispatchEvent(new HashChangeEvent('hashchange'));
  App.track('page_view');
  
  console.log('%c🧬 紧急维C %c已就绪','color:#1a5632;font-size:16px','');
  console.log(`%c  ${SUPPLEMENTS.length}种成分 · ${QUIZ.length}道问卷题 · 循证推荐`,'color:#5a7d6a');
})();
