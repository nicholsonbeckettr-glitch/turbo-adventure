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
const LANG_KEY='health-match-lang';
const LANGS=['zh-CN','zh-TW','en'];
const I18N={
  'zh-CN':{
    langLabel:'简体中文',
    htmlLang:'zh-CN',
    home:{
      eyebrow:'补剂筛选 · 冲突提示 · 小步验证',
      lead:'根据健康目标、饮食、现有补剂和身体情况，筛出少量值得验证的成分，并提示重复、冲突和不适用情况。',
      startQuiz:'开始健康问卷',
      viewSupplements:'查看收录成分',
      proofLabel:'产品能力',
      suppProof:value=>`种常见明星成分，按目标和身体情况筛选`,
      quizProof:value=>`道问题覆盖目标、风险与现有身体信号`,
      threeStepsNum:'3步',
      threeStepsLabel:'筛选、排冲突、复盘，控制最小试错成本',
      panelAria:'补剂筛选路径',
      panelTitle:'补剂筛选路径',
      step1Title:'先识别真实目标',
      step1Text:'从睡眠、压力、代谢、运动和免疫等维度定位主要需求。',
      step2Title:'再排查重复和冲突',
      step2Text:'结合现有补剂、用药和身体情况，提示不适合自行尝试的场景。',
      step3Title:'只验证少量成分',
      step3Text:'优先从少数值得验证的成分开始，降低无效购买和盲目叠加。',
      suppTitle:'收录的明星成分',
      suppSubtitle:'涵盖睡眠、压力、运动、代谢、免疫与认知支持',
      disclaimerTitle:'医学免责声明',
      disclaimerText:'本网站仅供教育和信息参考，不提供医疗建议。所有推荐的保健成分均不应替代医生的诊断和治疗。在开始服用任何补充剂前，请咨询合格的医疗专业人员。本网站不声称任何补充剂可以诊断、治疗、治愈或预防任何疾病。网站会匿名统计访问、问卷完成和匹配偏好，用于改进内容，不收集姓名、电话或身份证件信息。',
    },
  },
  'zh-TW':{
    langLabel:'繁體中文',
    htmlLang:'zh-TW',
    home:{
      eyebrow:'補劑篩選 · 衝突提示 · 小步驗證',
      lead:'根據健康目標、飲食、既有補劑和身體情況，篩出少量值得驗證的成分，並提示重複、衝突和不適用情況。',
      startQuiz:'開始健康問卷',
      viewSupplements:'查看收錄成分',
      proofLabel:'產品能力',
      suppProof:value=>`種常見明星成分，按目標和身體情況篩選`,
      quizProof:value=>`道問題覆蓋目標、風險與既有身體訊號`,
      threeStepsNum:'3步',
      threeStepsLabel:'篩選、排衝突、複盤，控制最小試錯成本',
      panelAria:'補劑篩選路徑',
      panelTitle:'補劑篩選路徑',
      step1Title:'先識別真實目標',
      step1Text:'從睡眠、壓力、代謝、運動和免疫等維度定位主要需求。',
      step2Title:'再排查重複和衝突',
      step2Text:'結合既有補劑、用藥和身體情況，提示不適合自行嘗試的場景。',
      step3Title:'只驗證少量成分',
      step3Text:'優先從少數值得驗證的成分開始，降低無效購買和盲目疊加。',
      suppTitle:'收錄的明星成分',
      suppSubtitle:'涵蓋睡眠、壓力、運動、代謝、免疫與認知支持',
      disclaimerTitle:'醫學免責聲明',
      disclaimerText:'本網站僅供教育和資訊參考，不提供醫療建議。所有推薦的保健成分均不應替代醫師的診斷和治療。在開始服用任何補充劑前，請諮詢合格的醫療專業人員。本網站不聲稱任何補充劑可以診斷、治療、治癒或預防任何疾病。網站會匿名統計訪問、問卷完成和匹配偏好，用於改進內容，不收集姓名、電話或身分證件資訊。',
    },
  },
  en:{
    langLabel:'English',
    htmlLang:'en',
    home:{
      eyebrow:'Supplement screening · Conflict checks · Small trials',
      lead:'Based on your health goals, diet, current supplements, and body signals, this tool narrows the list to a few ingredients worth testing and flags duplication, conflicts, and unsuitable situations.',
      startQuiz:'Start health quiz',
      viewSupplements:'View ingredients',
      proofLabel:'Product capabilities',
      suppProof:value=>`common ingredients screened by goals and body signals`,
      quizProof:value=>`questions covering goals, risks, and current body signals`,
      threeStepsNum:'3 steps',
      threeStepsLabel:'Screen, check conflicts, review results, and keep trial cost low',
      panelAria:'Supplement screening path',
      panelTitle:'Supplement screening path',
      step1Title:'Identify the real goal',
      step1Text:'Locate the main need across sleep, stress, metabolism, exercise, immunity, and cognition.',
      step2Title:'Check duplicates and conflicts',
      step2Text:'Use current supplements, medication, and body context to flag situations that are not suitable for self-trial.',
      step3Title:'Test only a few ingredients',
      step3Text:'Start with a small number of ingredients worth validating to reduce wasted purchases and blind stacking.',
      suppTitle:'Included ingredients',
      suppSubtitle:'Covers sleep, stress, exercise, metabolism, immunity, and cognition support',
      disclaimerTitle:'Medical disclaimer',
      disclaimerText:'This website is for education and information only and does not provide medical advice. Recommended ingredients are not substitutes for diagnosis or treatment by a clinician. Consult a qualified healthcare professional before starting any supplement. This website does not claim that any supplement can diagnose, treat, cure, or prevent disease. Anonymous visits, quiz completion, and match preferences may be used to improve the product; names, phone numbers, and identity documents are not collected.',
    },
  },
};
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

function getPathValue(root,path){
  return path.split('.').reduce((obj,key)=>obj?.[key],root);
}

function setText(id,value){
  const node=$(id);
  if(node)node.textContent=value;
}

function currentLang(){
  const saved=localStorage.getItem(LANG_KEY);
  return LANGS.includes(saved)?saved:'zh-CN';
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
  qIdx:0, answers:[], knowledge:null, result:null, lang:currentLang(),
  setLanguage(lang){
    this.lang=LANGS.includes(lang)?lang:'zh-CN';
    localStorage.setItem(LANG_KEY,this.lang);
    this.applyLanguage();
  },

  cycleLanguage(){
    const next=LANGS[(LANGS.indexOf(this.lang)+1)%LANGS.length];
    this.setLanguage(next);
  },

  applyLanguage(){
    const dict=I18N[this.lang]||I18N['zh-CN'];
    document.documentElement.lang=dict.htmlLang;
    document.querySelectorAll('[data-i18n]').forEach(node=>{
      const value=getPathValue(dict,node.dataset.i18n);
      if(typeof value==='string')node.textContent=value;
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(node=>{
      node.dataset.i18nAttr.split(';').forEach(pair=>{
        const [attr,path]=pair.split(':');
        const value=getPathValue(dict,path);
        if(attr&&typeof value==='string')node.setAttribute(attr,value);
      });
    });
    const suppCount=SUPPLEMENTS.length;
    const quizCount=QUIZ.length;
    setText('supp-count-proof',suppCount);
    setText('quiz-count-proof',quizCount);
    setText('supp-proof-label',dict.home.suppProof(suppCount));
    setText('quiz-proof-label',dict.home.quizProof(quizCount));
    const langButton=document.querySelector('.lang-switch');
    if(langButton)langButton.textContent=dict.langLabel;
  },

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
  
  showResult({updateHash=true,trackResult=true,mode='summary'}={}){
    document.querySelectorAll('.section').forEach(s=>s.classList.remove('on'));
    $('sec-result').classList.add('on');
    const resultHash=mode==='all'?'result/all':'result';
    if(updateHash&&location.hash!==`#${resultHash}`)location.hash=resultHash;
    
    this.result=this.scoreResults();
    this.resultMode=mode;
    const {top,userTargets}=this.result;
    const visibleResults=mode==='all'?top:this.featuredResults(top);
    const evidenceLabel={strong:'强证据',moderate:'中等证据',emerging:'新兴研究'};
    const evidenceClass={strong:'badge-strong',moderate:'badge-moderate',emerging:'badge-emerging'};
    const fillColors=['var(--green)','var(--teal)','var(--gold)','#5a7d6a','#8d6e63'];
    
    $('result-subtitle').textContent=mode==='all'
      ? '完整推荐清单，按匹配度排列'
      : '先给你 3 个强证据 + 3 个中等/其他证据';
    
    const maxScore=Math.max(...visibleResults.map(s=>s.score),1);
    
    $('result-list').innerHTML=visibleResults.map((s,i)=>{
      const pct=Math.round((s.score/maxScore)*100);
      return `<button class="card anim-fade result-card result-card-link" type="button" data-supplement-id="${s.id}" style="--delay:${i*.06}s;--match-pct:${pct}%;--match-color:${fillColors[i%fillColors.length]}">
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
      </button>`;
    }).join('');
    
    if(top.length===0){
      $('result-list').innerHTML='<div class="card empty-result"><p>基于您的回答，暂未发现需要特别关注的健康领域。保持当前生活方式！</p></div>';
    }else if(mode!=='all'&&top.length>visibleResults.length){
      $('result-list').insertAdjacentHTML('beforeend', `<a class="btn btn-primary btn-more-results" href="#result/all">更多证据以及参考</a>`);
    }

    this.renderNextSteps(visibleResults);
    if(trackResult){
      this.track('result', {
        mode,
        supplements:visibleResults.slice(0,6).map(s=>s.id),
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

  featuredResults(results){
    const picked=[];
    const add=item=>{if(item&&!picked.some(s=>s.id===item.id))picked.push(item);};
    results.filter(s=>s.evidence==='strong').slice(0,3).forEach(add);
    results.filter(s=>s.evidence!=='strong').slice(0,3).forEach(add);
    results.forEach(item=>{if(picked.length<6)add(item);});
    return picked.slice(0,6);
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
        'cycle-language':()=>this.cycleLanguage(),
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
  $('supp-preview').innerHTML=SUPPLEMENTS.map(s=>
    `<button class="tag supp-tag" type="button" data-supplement-id="${s.id}">
      ${supplementIconHtml(s)}
      <span class="supp-name">${escHtml(s.name)}</span>
    </button>`
  ).join('');
  App.applyLanguage();

  window.addEventListener('hashchange',()=>{
    const section=location.hash.slice(1);
    if(section.startsWith('supplement/')){
      App.showSupplement(section.slice('supplement/'.length),false);
    }else if(section==='result'||section==='result/all'){
      try{App.answers=JSON.parse(localStorage.getItem(ANSWERS_KEY)||'[]');}catch(e){App.answers=[];}
      App.showResult({updateHash:false,trackResult:false,mode:section==='result/all'?'all':'summary'});
    }else{
      App.go(section||'home',false);
    }
  });
  window.dispatchEvent(new HashChangeEvent('hashchange'));
  App.track('page_view');
  
  console.log('%c🧬 紧急维C %c已就绪','color:#1a5632;font-size:16px','');
  console.log(`%c  ${SUPPLEMENTS.length}种成分 · ${QUIZ.length}道问卷题 · 循证推荐`,'color:#5a7d6a');
})();
