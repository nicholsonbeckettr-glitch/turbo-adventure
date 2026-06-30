const SITE_CONFIG = {
  publicUrl:'https://turbo-adventure-7ii.pages.dev',
  contactUrl:'',
  affiliateUrl:'',
  analyticsEndpoint:'/api/track',
  knowledgeUrl:'knowledge/supplements.json',
  knowledgeManifestUrl:'knowledge/manifest.json',
};

const { SUPPLEMENTS, DETAIL_FALLBACKS, QUIZ, QUIZ_SETS, PROFILE_QUESTIONS } = window.HealthMatchData;

// ==================== APP ENGINE ====================
const ROUTES={home:'sec-home',quiz:'sec-quiz',result:'sec-result',reports:'sec-reports'};
const ANSWERS_KEY='health-match-answers';
const USER_KEY='health-match-user';
const LANG_KEY='health-match-lang';
const QUIZ_SET_KEY='health-match-quiz-set';
const REPORT_ID_KEY='health-match-report-id';
const PAID_REPORTS_KEY='health-match-paid-reports';
const REPORTS_KEY='health-match-reports';
const DEFAULT_QUIZ_SET_ID='general';
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
      myReports:'我的报告',
      proofLabel:'产品能力',
      suppProof:value=>`种常见明星成分，按目标和身体情况筛选`,
      quizProof:value=>`份问卷覆盖通用、睡眠压力、女性营养和健身新手`,
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
      myReports:'我的報告',
      proofLabel:'產品能力',
      suppProof:value=>`種常見明星成分，按目標和身體情況篩選`,
      quizProof:value=>`份問卷覆蓋通用、睡眠壓力、女性營養和健身新手`,
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
      myReports:'My reports',
      proofLabel:'Product capabilities',
      suppProof:value=>`common ingredients screened by goals and body signals`,
      quizProof:value=>`quiz paths for general, sleep/stress, women's nutrition, and fitness beginners`,
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
const UI_COPY={
  'zh-CN':{
    langAria:'切换语言', loadingKnowledge:'正在读取知识库...', resultTitle:'你的保健成分匹配报告',
    resultSummary:'先给你 3 个强证据 + 3 个中等/其他证据', resultAll:'完整推荐清单，按匹配度排列',
    warningStrong:'请在使用前咨询医生。', warningText:'以下推荐基于研究文献，不构成医疗建议。',
    recheck:'重新评估', backHome:'返回首页', moreResults:'更多证据以及参考', match:'匹配度',
    evidence:{strong:'强证据',moderate:'中等证据',emerging:'新兴研究'},
    audit:{title:'决策依据', prior:'先验', support:'支持证据', discount:'折扣', action:'行动建议',
      noSupport:'由问卷加权命中', highPrior:'强证据成分，作为较高先验', midPrior:'中等证据成分，作为中等先验', lowPrior:'新兴研究，先验较弱',
      boosted:'问卷场景额外支持', duplicate:'已用或重复方向，先核对是否叠加', caution:'存在冲突或特殊情况，先做风险评估', warning:'存在用药/孕哺/肝肾/手术等风险提示',
      dependent:'部分回答可能来自同一问题链，避免重复加分过度解读', test:'可作为优先小步试用', review:'先核对风险后再考虑', reserve:'仅作为备选观察'},
    riskFlag:'⚠ 需要评估', empty:'基于您的回答，暂未发现需要特别关注的健康领域。保持当前生活方式！',
    safetyTitle:'暂不建议自行补充', safetyBody:'已移除相关高风险成分，避免展示剂量和文献造成误用。请先咨询医生或营养师。',
    safetyEmpty:'基于你的基础画像，暂不建议自行补充。请先咨询医生或营养师，再决定是否需要补剂。',
    trialTitle:'试用建议', trialMetrics:{general:'目标评分、睡眠、精力和不适症状',sleep:'入睡时间、夜醒次数、次日疲劳和压力评分',women:'疲劳评分、经期不适、皮肤/头发和肠胃变化',fitness:'训练表现、肌肉酸痛、睡眠和胃肠耐受'},
    trialBody:(first,second,metrics)=>`先只试用 ${first} 1-2 周，记录${metrics}；如无改善或出现不适，停止并复评，再考虑 ${second}。不要同时新增多个补剂。`,
    trialHold:'当前不建议自行试用补剂；先咨询医生或营养师，并在获得明确建议后再复评。',
    nextTitle:'下一步建议', nextBody:names=>`优先核对 ${names} 的禁忌、药物相互作用、第三方检测和实际剂量。建议只选择 1-2 个高匹配项做 7 天试用，并记录睡眠、精力、压力或训练表现评分。本站未来可能通过广告、赞助或联盟链接获得收入；商业合作不影响匹配排序。`,
    currentLifestyle:'当前生活方式', copyReport:'复制报告', downloadReport:'下载 PDF 报告', unlockReport:'解锁完整 PDF 报告', shareCover:'系统分享', sharingCover:'正在生成分享封面...', shareFallback:'当前浏览器不支持系统分享，已为你下载分享封面。', unlocking:'正在打开收银台...', paymentError:'暂时无法打开收银台，请稍后重试。', paymentPending:'支付完成后回到本页，会自动解锁完整报告。', buyList:'查看筛选清单', brandCoop:'品牌合作',
    share:{title:'我的补剂避坑清单', subtitle:'已完成补剂风险审查', text:'我生成了一份补剂风险审查报告。', removed:'已移除', removedUnit:'项不适合自行尝试', priority:'优先尝试', review:'需要核对', reportCode:'报告码', visit:'访问网站生成你的补剂风险审查报告', atlas:'20 种常见成分图鉴', riskLabels:['用药','孕哺','肝肾','手术','重复补剂']},
    reports:{title:'我的报告', intro:'这里保存当前浏览器生成过的报告，可继续支付、下载 PDF 或复制报告码。', empty:'当前浏览器还没有保存报告。', unlocked:'已解锁', locked:'未解锁', view:'查看报告', continuePay:'继续支付', download:'下载 PDF', copyCode:'复制报告码', codeCopied:'报告码已复制', code:'报告码', top:'推荐优先级', localOnly:'解锁状态以当前浏览器记录为准。'},
    quizPicker:{title:'选择你的补剂报告', intro:'先选一个场景，再回答对应问卷。专题问卷会优先筛对应人群常见成分，并提示重复、冲突和不适用情况。'},
    generating:{title:'正在生成你的补剂风险审查报告', subtitle:'我们会先排除不适合自行尝试的方向，再整理可执行的 7 天试用计划。', keep:'不要关闭页面，结果会保存在本地浏览器中。', removed:n=>`已移除不适合自行尝试的成分：${n} 项`, tags:{risk:n=>`风险提示 ${n} 条`, duplicate:n=>`重复方向 ${n} 项`, caution:n=>`冲突核对 ${n} 项`, evidence:n=>`强/中证据候选 ${n} 项`, targets:n=>`健康目标 ${n} 项`}, steps:['正在读取你的健康目标','正在排查可能不健康的风险','正在检查已有补剂的重复方向','正在匹配证据等级和适用人群','正在生成相应建议以及方案','正在整理完整 PDF 报告']},
    manualPay:{title:'支付宝扫码支付', amount:'支付金额', order:'订单号', intro:'请使用支付宝扫码支付，支付完成后点击下方按钮提交确认。', done:'我已完成支付', refresh:'付款后刷新', close:'稍后支付', pending:'稍等确认订单中，确认完成后将自动解锁完整报告。', notifyError:'暂时无法提交确认，请稍后重试。'},
    detail:{targets:'匹配目标', use:'使用与复盘', dose:'建议剂量：', cycle:'观察周期：', risk:'风险边界', mechanism:'机理流程', focus:'知识库重点', literature:'文献依据', source:'查看完整知识库原文', noSummary:'知识库暂未配置该部分摘要。', defaultRef:'该文献作为当前成分建议的基础参考，具体适用性仍需结合个人情况判断。'},
    focus:{key:'重点结论', fit:'适合人群', notFit:'不适合人群', dose:'剂量与复盘', evidence:'证据更可靠', risk:'风险边界', extra:'补充要点'},
    report:{title:'保健成分综合报告', generated:'生成时间', summary:'匹配摘要', targets:'你的主要健康目标', risks:'风险筛查', safety:'安全阻断', priority:'推荐优先级', cross:'交叉验证', reason:'匹配原因', dose:'建议剂量', cycle:'建议周期', usage:'其他人使用方案', warning:'风险提示', evidence:'证据等级', literature:'文献', oneLine:'一句话总结', note:'知识库备注', checklist:'使用前检查清单', trial:'试用建议', review:'7 天复盘表', noTargets:'未识别到明显目标', noRisks:'未识别到特殊高风险项', none:'暂无', weighted:'由问卷加权命中', disclaimer:'免责声明：本报告仅供教育参考，不构成医疗建议，不能替代医生诊断、治疗或用药建议。', pdfLoading:'PDF 组件暂未加载完成，请刷新页面后重试。',
      checks:['是否正在使用处方药，尤其是抗凝、降压、降糖、镇静类药物？','是否怀孕、哺乳、准备手术，或存在肝肾疾病？','产品是否有第三方检测、清晰剂量、有效成分含量和批次信息？','是否设置了复盘周期，避免长期无目的叠加补剂？'],
      reviewRows:['第 0 天：记录目标评分、已用药物、已吃补剂和准备尝试的 1-2 个成分。','第 3 天：记录不良反应、睡眠/精力/压力/训练表现变化。','第 7 天：比较评分变化，决定继续观察、降低剂量、停止或咨询医生。','第 14 天：如仍无明确收益，优先停止无效项，避免长期叠加。']},
    consoleReady:'已就绪', consoleStats:(s,q)=>`${s}种成分 · ${q}道问卷题 · 循证推荐`,
  },
  'zh-TW':{
    langAria:'切換語言', loadingKnowledge:'正在讀取知識庫...', resultTitle:'你的保健成分匹配報告',
    resultSummary:'先給你 3 個強證據 + 3 個中等/其他證據', resultAll:'完整推薦清單，按匹配度排列',
    warningStrong:'請在使用前諮詢醫師。', warningText:'以下推薦基於研究文獻，不構成醫療建議。',
    recheck:'重新評估', backHome:'返回首頁', moreResults:'更多證據以及參考', match:'匹配度',
    evidence:{strong:'強證據',moderate:'中等證據',emerging:'新興研究'},
    audit:{title:'決策依據', prior:'先驗', support:'支持證據', discount:'折扣', action:'行動建議',
      noSupport:'由問卷加權命中', highPrior:'強證據成分，作為較高先驗', midPrior:'中等證據成分，作為中等先驗', lowPrior:'新興研究，先驗較弱',
      boosted:'問卷場景額外支持', duplicate:'已用或重複方向，先核對是否疊加', caution:'存在衝突或特殊情況，先做風險評估', warning:'存在用藥/孕哺/肝腎/手術等風險提示',
      dependent:'部分回答可能來自同一問題鏈，避免重複加分過度解讀', test:'可作為優先小步試用', review:'先核對風險後再考慮', reserve:'僅作為備選觀察'},
    riskFlag:'⚠ 需要評估', empty:'基於您的回答，暫未發現需要特別關注的健康領域。保持目前生活方式！',
    safetyTitle:'暫不建議自行補充', safetyBody:'已移除相關高風險成分，避免展示劑量和文獻造成誤用。請先諮詢醫師或營養師。',
    safetyEmpty:'基於你的基礎畫像，暫不建議自行補充。請先諮詢醫師或營養師，再決定是否需要補劑。',
    trialTitle:'試用建議', trialMetrics:{general:'目標評分、睡眠、精力和不適症狀',sleep:'入睡時間、夜醒次數、次日疲勞和壓力評分',women:'疲勞評分、經期不適、皮膚/頭髮和腸胃變化',fitness:'訓練表現、肌肉痠痛、睡眠和腸胃耐受'},
    trialBody:(first,second,metrics)=>`先只試用 ${first} 1-2 週，記錄${metrics}；如無改善或出現不適，停止並複評，再考慮 ${second}。不要同時新增多個補劑。`,
    trialHold:'目前不建議自行試用補劑；先諮詢醫師或營養師，並在獲得明確建議後再複評。',
    nextTitle:'下一步建議', nextBody:names=>`優先核對 ${names} 的禁忌、藥物交互作用、第三方檢測和實際劑量。建議只選擇 1-2 個高匹配項做 7 天試用，並記錄睡眠、精力、壓力或訓練表現評分。本站未來可能透過廣告、贊助或聯盟連結獲得收入；商業合作不影響匹配排序。`,
    currentLifestyle:'目前生活方式', copyReport:'複製報告', downloadReport:'下載 PDF 報告', unlockReport:'解鎖完整 PDF 報告', shareCover:'系統分享', sharingCover:'正在生成分享封面...', shareFallback:'目前瀏覽器不支援系統分享，已為你下載分享封面。', unlocking:'正在打開收銀台...', paymentError:'暫時無法打開收銀台，請稍後重試。', paymentPending:'支付完成後回到本頁，會自動解鎖完整報告。', buyList:'查看篩選清單', brandCoop:'品牌合作',
    share:{title:'我的補劑避坑清單', subtitle:'已完成補劑風險審查', text:'我生成了一份補劑風險審查報告。', removed:'已移除', removedUnit:'項不適合自行嘗試', priority:'優先嘗試', review:'需要核對', reportCode:'報告碼', visit:'訪問網站生成你的補劑風險審查報告', atlas:'20 種常見成分圖鑑', riskLabels:['用藥','孕哺','肝腎','手術','重複補劑']},
    reports:{title:'我的報告', intro:'這裡保存目前瀏覽器生成過的報告，可繼續支付、下載 PDF 或複製報告碼。', empty:'目前瀏覽器還沒有保存報告。', unlocked:'已解鎖', locked:'未解鎖', view:'查看報告', continuePay:'繼續支付', download:'下載 PDF', copyCode:'複製報告碼', codeCopied:'報告碼已複製', code:'報告碼', top:'推薦優先級', localOnly:'解鎖狀態以目前瀏覽器記錄為準。'},
    quizPicker:{title:'選擇你的補劑報告', intro:'先選一個場景，再回答對應問卷。專題問卷會優先篩對應人群常見成分，並提示重複、衝突和不適用情況。'},
    generating:{title:'正在生成你的補劑風險審查報告', subtitle:'我們會先排除不適合自行嘗試的方向，再整理可執行的 7 天試用計畫。', keep:'不要關閉頁面，結果會保存在本機瀏覽器中。', removed:n=>`已移除不適合自行嘗試的成分：${n} 項`, tags:{risk:n=>`風險提示 ${n} 條`, duplicate:n=>`重複方向 ${n} 項`, caution:n=>`衝突核對 ${n} 項`, evidence:n=>`強/中證據候選 ${n} 項`, targets:n=>`健康目標 ${n} 項`}, steps:['正在讀取你的健康目標','正在排查可能不健康的風險','正在檢查已有補劑的重複方向','正在匹配證據等級和適用人群','正在生成相應建議以及方案','正在整理完整 PDF 報告']},
    manualPay:{title:'支付寶掃碼支付', amount:'支付金額', order:'訂單號', intro:'請使用支付寶掃碼支付，支付完成後點擊下方按鈕提交確認。', done:'我已完成支付', refresh:'付款後刷新', close:'稍後支付', pending:'稍等確認訂單中，確認完成後將自動解鎖完整報告。', notifyError:'暫時無法提交確認，請稍後重試。'},
    detail:{targets:'匹配目標', use:'使用與複盤', dose:'建議劑量：', cycle:'觀察週期：', risk:'風險邊界', mechanism:'機理流程', focus:'知識庫重點', literature:'文獻依據', source:'查看完整知識庫原文', noSummary:'知識庫暫未配置該部分摘要。', defaultRef:'該文獻作為目前成分建議的基礎參考，具體適用性仍需結合個人情況判斷。'},
    focus:{key:'重點結論', fit:'適合人群', notFit:'不適合人群', dose:'劑量與複盤', evidence:'證據更可靠', risk:'風險邊界', extra:'補充要點'},
    report:{title:'保健成分綜合報告', generated:'生成時間', summary:'匹配摘要', targets:'你的主要健康目標', risks:'風險篩查', safety:'安全阻斷', priority:'推薦優先級', cross:'交叉驗證', reason:'匹配原因', dose:'建議劑量', cycle:'建議週期', usage:'其他人使用方案', warning:'風險提示', evidence:'證據等級', literature:'文獻', oneLine:'一句話總結', note:'知識庫備註', checklist:'使用前檢查清單', trial:'試用建議', review:'7 天複盤表', noTargets:'未識別到明顯目標', noRisks:'未識別到特殊高風險項', none:'暫無', weighted:'由問卷加權命中', disclaimer:'免責聲明：本報告僅供教育參考，不構成醫療建議，不能替代醫師診斷、治療或用藥建議。', pdfLoading:'PDF 元件暫未載入完成，請刷新頁面後重試。',
      checks:['是否正在使用處方藥，尤其是抗凝、降壓、降糖、鎮靜類藥物？','是否懷孕、哺乳、準備手術，或存在肝腎疾病？','產品是否有第三方檢測、清晰劑量、有效成分含量和批次資訊？','是否設定了複盤週期，避免長期無目的疊加補劑？'],
      reviewRows:['第 0 天：記錄目標評分、已用藥物、已吃補劑和準備嘗試的 1-2 個成分。','第 3 天：記錄不良反應、睡眠/精力/壓力/訓練表現變化。','第 7 天：比較評分變化，決定繼續觀察、降低劑量、停止或諮詢醫師。','第 14 天：如仍無明確收益，優先停止無效項，避免長期疊加。']},
    consoleReady:'已就緒', consoleStats:(s,q)=>`${s}種成分 · ${q}道問卷題 · 循證推薦`,
  },
  en:{
    langAria:'Change language', loadingKnowledge:'Loading knowledge base...', resultTitle:'Your ingredient match report',
    resultSummary:'First: 3 strong-evidence picks + 3 moderate or emerging picks', resultAll:'Full recommendation list, sorted by match',
    warningStrong:'Consult a clinician before use.', warningText:'These suggestions are based on research literature and are not medical advice.',
    recheck:'Retake quiz', backHome:'Back home', moreResults:'More evidence and references', match:'Match',
    evidence:{strong:'Strong evidence',moderate:'Moderate evidence',emerging:'Emerging research'},
    audit:{title:'Decision basis', prior:'Prior', support:'Support', discount:'Discount', action:'Action',
      noSupport:'Matched by quiz weighting', highPrior:'Strong-evidence ingredient, higher prior', midPrior:'Moderate-evidence ingredient, medium prior', lowPrior:'Emerging research, weaker prior',
      boosted:'Extra support from this quiz context', duplicate:'Possible duplicate direction; check stacking first', caution:'Conflict or special context; review risk first', warning:'Medication, pregnancy, liver/kidney, surgery, or similar risk flag',
      dependent:'Some answers may share the same underlying problem chain; avoid over-counting', test:'Good candidate for a small staged trial', review:'Review risk before considering', reserve:'Keep as a backup option'},
    riskFlag:'⚠ Review needed', empty:'Based on your answers, no specific priority area stands out. Keep your current routine.',
    safetyTitle:'Self-supplementation is not recommended', safetyBody:'Higher-risk ingredients have been removed so dose and reference details are not shown. Consult a clinician or dietitian first.',
    safetyEmpty:'Based on your profile, self-supplementation is not recommended. Consult a clinician or dietitian before deciding whether supplements are appropriate.',
    trialTitle:'Trial suggestion', trialMetrics:{general:'target scores, sleep, energy, and adverse symptoms',sleep:'sleep latency, night waking, next-day fatigue, and stress score',women:'fatigue score, cycle discomfort, skin/hair changes, and digestion',fitness:'training performance, soreness, sleep, and GI tolerance'},
    trialBody:(first,second,metrics)=>`Try only ${first} for 1-2 weeks and record ${metrics}. If there is no improvement or discomfort appears, stop and reassess before considering ${second}. Do not add multiple supplements at once.`,
    trialHold:'Self-trial is not recommended right now. Consult a clinician or dietitian first, then reassess after clear guidance.',
    nextTitle:'Next step', nextBody:names=>`First check contraindications, medication interactions, third-party testing, and actual dose for ${names}. Pick only 1-2 high-match items for a 7-day trial and record sleep, energy, stress, or training scores. This site may later earn revenue through ads, sponsorships, or affiliate links; commercial relationships do not affect match ranking.`,
    currentLifestyle:'current lifestyle', copyReport:'Copy report', downloadReport:'Download PDF report', unlockReport:'Unlock full PDF report', shareCover:'System share', sharingCover:'Generating share cover...', shareFallback:'System sharing is not supported in this browser, so the cover was downloaded.', unlocking:'Opening checkout...', paymentError:'Checkout is temporarily unavailable. Please try again later.', paymentPending:'After payment, return to this page and the full report will unlock automatically.', buyList:'View shortlist', brandCoop:'Partnerships',
    share:{title:'My supplement risk checklist', subtitle:'Supplement risk review completed', text:'I generated a supplement risk-review report.', removed:'Removed', removedUnit:'unsuitable self-trial items', priority:'Priority picks', review:'Check before use', reportCode:'Report code', visit:'Visit the site to generate your supplement risk-review report', atlas:'20 common ingredients atlas', riskLabels:['Medication','Pregnancy','Liver/kidney','Surgery','Duplicate supplements']},
    reports:{title:'My reports', intro:'Reports generated in this browser are saved here. You can continue payment, download the PDF, or copy the report code.', empty:'No reports are saved in this browser yet.', unlocked:'Unlocked', locked:'Locked', view:'View report', continuePay:'Continue payment', download:'Download PDF', copyCode:'Copy code', codeCopied:'Report code copied', code:'Report code', top:'Priority picks', localOnly:'Unlock status is based on this browser record.'},
    quizPicker:{title:'Choose your supplement report', intro:'Pick a scenario first, then answer the matching quiz. Scenario reports prioritize common ingredients for that context and flag duplicates, conflicts, and unsuitable situations.'},
    generating:{title:'Generating your supplement risk-review report', subtitle:'We first remove directions unsuitable for self-trial, then prepare an executable 7-day trial plan.', keep:'Do not close this page. The result will be saved in this browser.', removed:n=>`Ingredients removed as unsuitable for self-trial: ${n}`, tags:{risk:n=>`${n} risk notes`, duplicate:n=>`${n} duplicate directions`, caution:n=>`${n} conflict checks`, evidence:n=>`${n} strong/moderate candidates`, targets:n=>`${n} health targets`}, steps:['Reading your health goals','Checking possible unhealthy risks','Checking duplicate directions from current supplements','Matching evidence level and suitable populations','Generating corresponding suggestions and plans','Preparing the full PDF report']},
    manualPay:{title:'Pay with Alipay', amount:'Amount', order:'Order ID', intro:'Scan with Alipay. After paying, tap the button below to request confirmation.', done:'I have paid', refresh:'Refresh after payment', close:'Pay later', pending:'Confirming your order. The full report will unlock automatically after confirmation.', notifyError:'Could not submit confirmation. Please try again later.'},
    detail:{targets:'Matched goals', use:'Use and review', dose:'Suggested dose: ', cycle:'Review window: ', risk:'Risk boundaries', mechanism:'Absorption and use pathway', focus:'Knowledge highlights', literature:'Evidence', source:'View original Chinese source note', noSummary:'No summary has been configured for this section.', defaultRef:'This source is a base reference for the current ingredient suggestion; personal fit still depends on your context.'},
    focus:{key:'Key takeaway', fit:'Who may fit', notFit:'Who should avoid', dose:'Dose and review', evidence:'Stronger evidence', risk:'Risk boundary', extra:'More notes'},
    report:{title:'Ingredient match report', generated:'Generated at', summary:'Match summary', targets:'Main health goals', risks:'Risk screen', safety:'Safety stop', priority:'Priority list', cross:'Cross-check', reason:'Match reason', dose:'Suggested dose', cycle:'Suggested review window', usage:'How others use it', warning:'Risk notes', evidence:'Evidence level', literature:'Reference', oneLine:'One-line summary', note:'Knowledge note', checklist:'Pre-use checklist', trial:'Trial suggestion', review:'7-day review table', noTargets:'No clear goal identified', noRisks:'No special high-risk item identified', none:'None', weighted:'Matched by quiz weighting', disclaimer:'Disclaimer: this report is for education only and is not medical advice. It cannot replace diagnosis, treatment, or medication guidance from a clinician.', pdfLoading:'The PDF component is still loading. Please refresh and try again.',
      checks:['Are you taking prescription medication, especially anticoagulants, blood-pressure, glucose-lowering, or sedative drugs?','Are you pregnant, breastfeeding, preparing for surgery, or dealing with liver or kidney disease?','Does the product provide third-party testing, clear dosage, active ingredient content, and batch information?','Have you set a review window so supplements do not stack up without a purpose?'],
      reviewRows:['Day 0: record target scores, medications, current supplements, and the 1-2 ingredients you plan to test.','Day 3: record adverse reactions and changes in sleep, energy, stress, or training performance.','Day 7: compare score changes and decide whether to continue, adjust dose, stop, or consult a clinician.','Day 14: if there is still no clear benefit, stop ineffective items first and avoid long-term stacking.']},
    consoleReady:'ready', consoleStats:(s,q)=>`${s} ingredients · ${q} quiz questions · evidence-informed matching`,
  },
};

const QUIZ_SET_COPY={
  'zh-TW':{
    general:{title:'通用補劑篩選', subtitle:'適合還沒有明確單一場景，只想先按目標、身體信號和風險做一次整體篩選。'},
    sleep:{title:'熬夜/睡眠/壓力人群補劑報告', subtitle:'優先排查入睡、夜醒、壓力、咖啡因、助眠補劑重複和鎮靜類用藥風險。'},
    women:{title:'女性基礎營養/經期營養報告', subtitle:'圍繞經期疲勞、飲食缺口、日曬、皮膚頭髮、腸胃和孕哺風險，先做基礎營養篩選。'},
    fitness:{title:'健身新手補劑避坑報告', subtitle:'按訓練目標、蛋白攝入、恢復、睡眠、既有補劑和血壓/腎功能風險篩掉不必要組合。'},
  },
  en:{
    general:{title:'General supplement screen', subtitle:'For people without one clear scenario who want an overall screen by goals, body signals, and risk.'},
    sleep:{title:'Sleep, late nights, and stress report', subtitle:'Prioritizes sleep onset, night waking, stress, caffeine, duplicate sleep aids, and sedative medication risks.'},
    women:{title:"Women's basic nutrition and cycle report", subtitle:'Screens basic nutrition around cycle-related fatigue, diet gaps, sun exposure, skin and hair, digestion, and pregnancy or breastfeeding risk.'},
    fitness:{title:'Fitness beginner supplement filter', subtitle:'Filters unnecessary combinations by training goals, protein intake, recovery, sleep, current supplements, and blood pressure or kidney risk.'},
  },
};

const QUIZ_COPY={
  'zh-CN':QUIZ.map(q=>({q:q.q,opts:q.opts})),
  'zh-TW':[
    ['您的運動頻率？',['幾乎不動','每週1-2次','每週3-5次','幾乎每天運動']],
    ['您的睡眠品質？',['很好，一覺到天亮','一般，偶爾失眠','差，經常入睡困難','很差，依賴藥物']],
    ['您近期的壓力水平？',['輕鬆自在','輕度壓力','中度壓力','高壓，身心俱疲']],
    ['您最關心的健康領域？（選最重要的）',['大腦/認知/情緒','運動/體能/恢復','心臟/代謝/體重','免疫/抗炎/抗老']],
    ['您是否有血壓偏高的困擾？',['沒有，血壓正常','偏高，在監測中','確診高血壓，在用藥']],
    ['以下哪種情況最符合您？',['均不符合','正在使用處方藥','備孕/懷孕/哺乳','肝腎疾病或近期手術']],
    ['您的消化系統狀況？',['很好，沒有不適','偶爾腹脹/消化不良','經常便秘或腹瀉','確診IBS/IBD等消化疾病']],
    ['您的關節/骨骼狀況？',['很好，沒有不適','偶爾痠痛','經常關節不適','確診關節炎/骨質疏鬆等']],
    ['您的皮膚狀況？',['很好','偏乾燥','有痤瘡/痘痘困擾','有明顯的皮膚老化/炎症']],
    ['您的注意力/記憶力？',['很好，思路清晰','偶爾腦霧/走神','經常注意力不集中','明顯下降，影響工作']],
    ['您是否經常感到疲勞？',['精力充沛','偶爾疲勞','經常疲勞','嚴重影響生活']],
    ['您是否容易生病/感染？',['很少生病','一年1-2次感冒','一年3次以上','免疫力明顯偏低']],
    ['您是否有過敏問題？',['沒有','季節性過敏（花粉/塵蟎）','食物過敏','藥物或接觸性過敏']],
  ].map(([q,opts])=>({q,opts})),
  en:[
    ['How often do you exercise?',['Almost never','1-2 times per week','3-5 times per week','Almost every day']],
    ['How is your sleep quality?',['Great, I sleep through the night','Average, occasional insomnia','Poor, often hard to fall asleep','Very poor, I rely on medication']],
    ['How stressed have you felt lately?',['Relaxed','Mild stress','Moderate stress','High pressure and exhausted']],
    ['Which health area matters most right now?',['Brain, cognition, mood','Exercise, fitness, recovery','Heart, metabolism, weight','Immunity, inflammation, healthy aging']],
    ['Do you deal with elevated blood pressure?',['No, normal blood pressure','Somewhat high, monitoring it','Diagnosed hypertension, on medication']],
    ['Which situation best describes you?',['None of these','Taking prescription medication','Trying to conceive, pregnant, or breastfeeding','Liver/kidney disease or recent surgery']],
    ['How is your digestive system?',['Good, no discomfort','Occasional bloating or indigestion','Frequent constipation or diarrhea','Diagnosed IBS/IBD or other digestive disease']],
    ['How are your joints and bones?',['Good, no discomfort','Occasional soreness','Frequent joint discomfort','Diagnosed arthritis, osteoporosis, etc.']],
    ['How is your skin?',['Good','Dry','Acne or breakouts','Visible skin aging or inflammation']],
    ['How are your focus and memory?',['Good and clear','Occasional brain fog or distraction','Often hard to focus','Clearly worse and affecting work']],
    ['Do you often feel tired?',['Energetic','Occasionally tired','Often tired','Severely affects daily life']],
    ['Do you get sick or infected easily?',['Rarely sick','1-2 colds per year','More than 3 times per year','Clearly low immunity']],
    ['Do you have allergy issues?',['No','Seasonal allergy, such as pollen or dust mites','Food allergy','Drug or contact allergy']],
  ].map(([q,opts])=>({q,opts})),
};

const SUPPLEMENT_EN={
  omega3:{cat:'Fatty acid',desc:'Long-chain omega-3 fatty acids mainly from low-mercury fish, fish oil, and algal oil. Most useful for filling EPA/DHA gaps, managing high triglycerides, and specific pregnancy or cardiovascular contexts.',dosage:'EPA+DHA about 250 mg/day to start; therapeutic doses require clinician guidance'},
  creatine:{name:'Creatine',cat:'Amino-acid derivative',desc:'One of the best-studied performance supplements. Recent research also discusses potential cognitive benefits.',dosage:'3-5 g/day for maintenance'},
  citrulline:{name:'L-Citrulline',cat:'Amino acid',desc:'A non-essential amino acid that can convert to arginine, support nitric oxide production, and improve blood flow.',dosage:'3-6 g/day, 60-90 minutes before training'},
  theanine:{name:'L-Theanine',cat:'Amino acid',desc:'A non-protein amino acid from tea that may support mild relaxation and calm alertness. Better suited to short-term checks for stress, bedtime tension, or caffeine-related discomfort.',dosage:'Start with 100-200 mg, assessed by use case'},
  magnesium:{name:'Magnesium',cat:'Mineral',desc:'An essential mineral involved in 300+ enzyme reactions. Magnesium glycinate and citrate are commonly discussed forms with better tolerance for many people.',dosage:'200-400 mg/day'},
  vitamind:{name:'Vitamin D3',cat:'Vitamin',desc:'A fat-soluble, hormone-like nutrient central to calcium/phosphorus metabolism, bone health, and correction of deficiency. Best used with risk assessment, testing, and follow-up.',dosage:'Start around 600-800 IU/day, review with testing'},
  zinc:{name:'Zinc',cat:'Mineral',desc:'An essential trace mineral important for immunity, wound healing, taste, and male reproductive health.',dosage:'15-30 mg/day'},
  ashwagandha:{name:'Ashwagandha',cat:'Botanical extract',desc:'An Ayurvedic adaptogenic herb used to help the body respond to stress and lower cortisol-related stress signals.',dosage:'300-600 mg/day standardized extract'},
  coq10:{name:'CoQ10',cat:'Coenzyme',desc:'A key coenzyme in the mitochondrial electron transport chain; endogenous synthesis tends to decline with age.',dosage:'100-300 mg/day'},
  probiotics:{name:'Probiotics',cat:'Microorganism',desc:'Live microbial supplements that may support digestion and immunity by interacting with the gut microbiome.',dosage:'1-10 billion CFU/day'},
  curcumin:{name:'Curcumin',cat:'Botanical extract',desc:'The active component in turmeric, known for anti-inflammatory and antioxidant activity. Absorption design matters.',dosage:'500-1500 mg/day, often with an absorption enhancer'},
  melatonin:{name:'Melatonin',cat:'Hormone',desc:'A sleep-timing hormone secreted by the pineal gland. Best suited to short-term circadian rhythm adjustment.',dosage:'0.5-5 mg, 30-60 minutes before bed'},
  collagen:{name:'Collagen Peptides',cat:'Protein',desc:'Hydrolyzed collagen providing peptide and amino-acid building blocks for skin, joints, and connective tissue.',dosage:'5-10 g/day'},
  nac:{name:'NAC',cat:'Amino-acid derivative',desc:'A glutathione precursor and antioxidant that supports redox balance and respiratory mucus handling.',dosage:'600-1200 mg/day'},
  berberine:{name:'Berberine',cat:'Botanical extract',desc:'A plant alkaloid discussed for glucose and lipid regulation, with medication-interaction concerns.',dosage:'500 mg, 2-3 times/day before meals'},
  rhodiola:{name:'Rhodiola Rosea',cat:'Botanical extract',desc:'A traditional adaptogenic herb from cold regions, used for fatigue, stress resilience, and endurance.',dosage:'200-600 mg/day standardized extract'},
  bcomplex:{name:'B-Complex',cat:'Vitamin',desc:'A combination of eight B vitamins important for energy metabolism, nervous system function, and red blood cell production.',dosage:'Depends on product, commonly 1 capsule/day'},
  lionsmane:{name:"Lion's Mane",cat:'Mushroom extract',desc:'A medicinal mushroom traditionally used for cognition and nerve support; mechanisms may involve nerve growth factor pathways.',dosage:'500-3000 mg/day'},
  glycine:{name:'Glycine',cat:'Amino acid',desc:'A conditionally essential amino acid and inhibitory neurotransmitter that may support sleep quality and thermoregulation.',dosage:'3 g before bed'},
  quercetin:{name:'Quercetin',cat:'Flavonoid',desc:'A flavonoid abundant in onions and apples, discussed for antihistamine-like and anti-inflammatory actions.',dosage:'500-1000 mg/day'},
};

const TERM_EN={
  '心血管健康':'cardiovascular health','高甘油三酯':'high triglycerides','关节炎症':'joint inflammation','脑雾/认知':'brain fog/cognition','情绪低落':'low mood','皮肤干燥':'dry skin',
  '运动表现提升':'exercise performance','肌肉恢复':'muscle recovery','疲劳感':'fatigue','血压偏高':'elevated blood pressure','血液循环差':'poor circulation','压力/焦虑':'stress/anxiety','睡眠质量差':'poor sleep quality','注意力不集中':'poor focus','肌肉痉挛/紧张':'muscle cramps/tension','偏头痛':'migraine','免疫力低下':'low immunity','骨质疏松风险':'osteoporosis risk','皮肤问题/痤疮':'skin issues/acne','伤口愈合慢':'slow wound healing','脱发':'hair loss','消化问题':'digestive issues','运动恢复':'exercise recovery','呼吸系统':'respiratory support','血糖控制':'glucose control','记忆下降':'memory decline','神经恢复':'nerve recovery','时差/轮班':'jet lag/shift work','过敏/季节性不适':'allergy/seasonal discomfort',
  '抗凝/抗血小板药使用者需咨询医生':'Consult a clinician if using anticoagulant or antiplatelet medication','围手术期需告知医生评估':'Tell your clinician around surgery','房颤史或高剂量使用需谨慎':'Use caution with atrial fibrillation history or high-dose use','肾功能不全者需咨询医生':'Consult a clinician with kidney impairment','初期可能有轻微水潴留':'Mild water retention may occur at first','低血压患者慎用':'Use caution with low blood pressure','可能与降压药相互作用':'May interact with blood-pressure medication','镇静/安眠/精神科药物使用者需咨询医生':'Consult a clinician if using sedatives, sleep aids, or psychiatric medication','孕期/哺乳期和儿童不建议自行使用':'Pregnancy, breastfeeding, and children should not self-use','低血压或易头晕者慎用':'Use caution with low blood pressure or dizziness','过量可能导致腹泻':'Excess intake may cause diarrhea','长期高剂量可能导致高钙血症':'Long-term high dose may cause hypercalcemia','肾病/结石史需咨询医生':'Kidney disease or stone history requires clinician input','合并补钙或相关药物需监测':'Monitor if combined with calcium or related medication','长期高剂量可能抑制铜吸收':'Long-term high dose may reduce copper absorption','空腹可能引起恶心':'May cause nausea on an empty stomach','孕期/哺乳期避免':'Avoid during pregnancy or breastfeeding','甲状腺疾病患者需咨询医生':'Consult a clinician with thyroid disease','可能与华法林相互作用':'May interact with warfarin','一般安全':'Generally safe','免疫力严重低下者慎用':'Use caution with severe immunosuppression','不同菌株效果差异大':'Effects vary by strain','胆结石患者慎用':'Use caution with gallstones','可能与抗凝血药物相互作用':'May interact with anticoagulants','长期高剂量安全性数据有限':'Long-term high-dose safety data are limited','可能引起次日嗜睡':'May cause next-day sleepiness','鱼胶原对鱼类过敏者慎用':'Fish collagen requires caution with fish allergy','可能引起胃部不适':'May cause stomach discomfort','对组胺不耐受者慎用':'Use caution with histamine intolerance','可能引起胃肠道不适':'May cause gastrointestinal discomfort','孕妇禁用':'Contraindicated in pregnancy','糖尿病药物使用者需监测血糖':'Monitor glucose if using diabetes medication','可能引起口干或头晕':'May cause dry mouth or dizziness','双相情感障碍患者避免使用':'Avoid with bipolar disorder','高剂量B6长期使用可能引起神经损伤':'Long-term high-dose B6 may cause nerve damage','一般安全范围广泛':'Generally has a wide safety margin','蘑菇过敏者慎用':'Use caution with mushroom allergy','长期安全数据有限':'Long-term safety data are limited','极高剂量可能引起胃肠不适':'Very high doses may cause gastrointestinal discomfort','可能影响某些药物的肝代谢':'May affect liver metabolism of some medications',
  '正在使用处方药，需要重点核对药物相互作用':'Taking prescription medication; interactions need careful review','备孕/怀孕/哺乳期不建议自行补充，需先咨询医生':'Trying to conceive, pregnancy, or breastfeeding: do not self-supplement without clinician input','肝肾疾病或近期手术属于高风险场景，需先咨询医生':'Liver/kidney disease or recent surgery is a high-risk context; consult a clinician first',
  '用户上传调研报告':'User-uploaded research note',
};

const TERM_TW={
  '强证据':'強證據','中等证据':'中等證據','新兴研究':'新興研究','当前生活方式':'目前生活方式',
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

function ui(path){
  return getPathValue(UI_COPY[App?.lang||currentLang()]||UI_COPY['zh-CN'],path);
}

function toTraditional(value){
  const phrases=[
    ['质量','品質'],['睡眠','睡眠'],['压力','壓力'],['焦虑','焦慮'],['关节','關節'],['骨质疏松','骨質疏鬆'],
    ['证据','證據'],['新兴','新興'],['医学','醫學'],['医生','醫師'],['咨询','諮詢'],['建议','建議'],
    ['补剂','補劑'],['补充','補充'],['筛选','篩選'],['冲突','衝突'],['复盘','複盤'],['风险','風險'],
    ['知识库','知識庫'],['调研','調研'],['报告','報告'],['文献','文獻'],['摘要','摘要'],
    ['当前','目前'],['信息','資訊'],['药物','藥物'],['处方药','處方藥'],['降压','降壓'],['降糖','降糖'],
    ['镇静','鎮靜'],['手术','手術'],['怀孕','懷孕'],['准备','準備'],['肝肾','肝腎'],['肾','腎'],
    ['长期','長期'],['剂量','劑量'],['机理','機理'],['流程','流程'],['目标','目標'],['优先','優先'],
    ['实际','實際'],['检测','檢測'],['营养','營養'],['健康','健康'],['运动','運動'],['恢复','恢復'],
    ['认知','認知'],['脑雾','腦霧'],['情绪','情緒'],['低落','低落'],['皮肤','皮膚'],['干燥','乾燥'],
    ['血压','血壓'],['血糖','血糖'],['血液','血液'],['循环','循環'],['炎症','炎症'],['免疫','免疫'],
    ['消化','消化'],['过敏','過敏'],['季节性','季節性'],['习惯','習慣'],['选择','選擇'],['记录','記錄'],
    ['变量','變數'],['评估','評估'],['监测','監測'],['复查','複查'],['围手术期','圍手術期'],
    ['鱼油','魚油'],['鱼类','魚類'],['低汞','低汞'],['甘油三酯','甘油三酯'],['维生素','維生素'],
    ['镁','鎂'],['锌','鋅'],['辅酶','輔酶'],['胶原蛋白','膠原蛋白'],['小檗碱','小檗鹼'],
    ['红景天','紅景天'],['复合','複合'],['猴头菇','猴頭菇'],['甘氨酸','甘胺酸'],['槲皮素','槲皮素'],
    ['视情况','視情況'],['适合','適合'],['不适合','不適合'],['明确','明確'],['默认','預設'],
  ];
  return phrases.reduce((text,[from,to])=>text.replaceAll(from,to),String(value??''));
}

function tr(value){
  if(value==null)return '';
  const text=String(value);
  if(App.lang==='en')return TERM_EN[text]||text;
  if(App.lang==='zh-TW')return TERM_TW[text]||toTraditional(text);
  return text;
}

function hasCjk(value){
  return /[\u3400-\u9fff]/.test(String(value??''));
}

function enSafe(value,fallback=''){
  return App.lang==='en'&&hasCjk(value)?fallback:String(value??'');
}

function joinLocalized(items, fallback=''){
  const list=asList(items).map(tr);
  return list.length?list.join(App.lang==='en'?', ':'、'):(fallback?tr(fallback):'');
}

function localizedSupplement(supplement){
  const en=App.lang==='en'?(SUPPLEMENT_EN[supplement.id]||{}):{};
  return {
    ...supplement,
    name:App.lang==='en'?(en.name||supplement.name):tr(supplement.name),
    cat:App.lang==='en'?(en.cat||tr(supplement.cat)):tr(supplement.cat),
    desc:App.lang==='en'?(en.desc||tr(supplement.desc)):tr(supplement.desc),
    dosage:App.lang==='en'?(en.dosage||tr(supplement.dosage)):tr(supplement.dosage),
    targets:supplement.targets.map(tr),
    warnings:supplement.warnings.map(tr),
    refs:supplement.refs.map(ref=>({
      ...ref,
      summary:tr(ref.summary||supplement.desc),
    })),
  };
}

function localizedInfo(info={}){
  return {
    ...info,
    supportedTargets:asList(info.supportedTargets).map(tr),
    cycle:tr(info.cycle),
    usagePlans:asList(info.usagePlans).map(tr),
    note:tr(info.note),
    mechanism:asList(info.mechanism).map(tr),
    literature:asList(info.literature).map(ref=>({
      ...ref,
      journal:tr(ref.journal),
      summary:tr(ref.summary),
    })),
    notes:asList(info.notes).map(note=>({
      ...note,
      title:tr(note.title),
      summary:tr(note.summary),
      mechanism:asList(note.mechanism).map(tr),
    })),
  };
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

function localizedQuizSet(set){
  if(!set)return set;
  const lang=App?.lang||currentLang();
  const copy=QUIZ_SET_COPY[lang]?.[set?.id];
  if(copy)return {...set,...copy};
  return lang==='zh-TW'
    ? {...set,title:toTraditional(set.title),subtitle:toTraditional(set.subtitle)}
    : set;
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
    : `<p class="detail-muted">${escHtml(ui('detail.noSummary'))}</p>`;
}

function focusSectionsFromNote(note){
  if(App.lang==='en')return [];
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
    const labelMap={'重点结论':'key','适合人群':'fit','不适合人群':'notFit','剂量与复盘':'dose','证据更可靠':'evidence','风险边界':'risk'};
    return {label:ui(`focus.${labelMap[label]}`)||tr(label),title:tr(sections[index].title),body:sections[index].body};
  }).filter(Boolean);
  sections.forEach((section,index)=>{
    if(focused.length>=6||used.has(index))return;
    used.add(index);
    focused.push({label:ui('focus.extra'),title:tr(section.title),body:section.body});
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

function defaultEnglishCycle(supplement){
  const name=SUPPLEMENT_EN[supplement.id]?.name||supplement.name;
  if(App.lang!=='en')return tr(detailFallback(supplement).cycle);
  return `Review ${name} for 4-8 weeks against the target symptom, tolerance, and any objective marker. Stop first if there is no clear benefit or if adverse effects appear.`;
}

function defaultEnglishUsage(supplement){
  const name=SUPPLEMENT_EN[supplement.id]?.name||supplement.name;
  if(App.lang!=='en')return detailFallback(supplement).usagePlans.map(tr);
  return [
    `Confirm the goal and contraindications before trying ${name}.`,
    'Add only one new ingredient at a time so the effect is easier to judge.',
    'Record baseline, mid-point, and review-day scores for the target outcome.',
  ];
}

function defaultEnglishMechanism(supplement){
  const name=SUPPLEMENT_EN[supplement.id]?.name||supplement.name;
  if(App.lang!=='en')return detailFallback(supplement).mechanism.map(tr);
  return [
    `${name} is taken orally through food or a supplement.`,
    'It enters digestion, absorption, metabolism, and tissue distribution pathways.',
    'It interacts with relevant enzymes, membranes, microbiome, or signaling systems depending on the ingredient.',
    'Those pathways connect to the matched goal, such as sleep, training, metabolism, immunity, or cognition.',
    'The body then stores, converts, uses, or clears the remaining compounds.',
  ];
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
  qIdx:0, answers:[], knowledge:null, result:null, manualCheckout:null, generationTimer:null, generationStepTimer:null, lang:currentLang(), quizSetId:DEFAULT_QUIZ_SET_ID,
  quizSet(id=this.quizSetId){
    return QUIZ_SETS[id]||QUIZ_SETS[DEFAULT_QUIZ_SET_ID];
  },

  quizQuestions(){
    return [...PROFILE_QUESTIONS,...(this.quizSet().questions||QUIZ)];
  },

  quizQuestionCopy(question,index){
    const profileCount=PROFILE_QUESTIONS.length;
    if(this.quizSetId===DEFAULT_QUIZ_SET_ID&&index>=profileCount){
      return QUIZ_COPY[this.lang]?.[index-profileCount]||{q:question.q,opts:question.opts};
    }
    return {q:question.q,opts:question.opts};
  },

  setLanguage(lang){
    this.lang=LANGS.includes(lang)?lang:'zh-CN';
    localStorage.setItem(LANG_KEY,this.lang);
    this.applyLanguage();
    this.closeLanguageMenu();
    if($('sec-quiz').classList.contains('on')){
      if($('quiz-runner').hidden)this.renderQuizPicker();
      else this.renderQ();
    }
    if($('sec-result').classList.contains('on'))this.showResult({updateHash:false,trackResult:false,mode:this.resultMode||'summary'});
    if($('sec-supplement').classList.contains('on')){
      const id=location.hash.startsWith('#supplement/')?location.hash.slice('#supplement/'.length):'';
      if(id)this.showSupplement(id,false);
    }
    if($('sec-reports').classList.contains('on'))this.renderReports();
  },

  toggleLanguageMenu(){
    const menu=document.querySelector('.lang-options');
    const button=document.querySelector('.lang-switch');
    if(!menu||!button)return;
    const willOpen=menu.hidden;
    menu.hidden=!willOpen;
    button.setAttribute('aria-expanded',String(willOpen));
  },

  closeLanguageMenu(){
    const menu=document.querySelector('.lang-options');
    const button=document.querySelector('.lang-switch');
    if(menu)menu.hidden=true;
    if(button)button.setAttribute('aria-expanded','false');
  },

  applyLanguage(){
    const dict=I18N[this.lang]||I18N['zh-CN'];
    const copy=UI_COPY[this.lang]||UI_COPY['zh-CN'];
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
    const quizCount=Object.keys(QUIZ_SETS).length;
    setText('supp-count-proof',suppCount);
    setText('quiz-count-proof',quizCount);
    setText('supp-proof-label',dict.home.suppProof(suppCount));
    setText('quiz-proof-label',dict.home.quizProof(quizCount));
    const langButton=document.querySelector('.lang-switch');
    if(langButton){
      langButton.textContent=dict.langLabel;
      langButton.setAttribute('aria-label',copy.langAria);
    }
    document.querySelectorAll('[data-lang-option]').forEach(option=>{
      const selected=option.dataset.langOption===this.lang;
      option.setAttribute('aria-selected',String(selected));
    });
    const title=document.querySelector('.result-title');
    if(title)title.textContent=copy.resultTitle;
    const warn=$('sec-result')?.querySelector('.result-warn');
    if(warn)warn.innerHTML=`<strong>⚕️ ${escHtml(copy.warningStrong)}</strong> ${escHtml(copy.warningText)}`;
    document.querySelector('[data-action="go-quiz"].btn-sm')?.replaceChildren(document.createTextNode(copy.recheck));
    document.querySelectorAll('[data-action="go-home"]').forEach(button=>button.textContent=copy.backHome);
    document.querySelectorAll('.supp-tag').forEach(button=>{
      const supplement=supplementById(button.dataset.supplementId);
      const label=button.querySelector('.supp-name');
      if(supplement&&label)label.textContent=localizedSupplement(supplement).name;
    });
  },

  go(section, updateHash=true){
    this.clearGenerationTimers();
    section=ROUTES[section]?section:'home';
    document.querySelectorAll('.section').forEach(s=>s.classList.remove('on'));
    $(ROUTES[section]).classList.add('on');
    if(updateHash&&location.hash!==`#${section}`)location.hash=section;
    if(section==='quiz'){
      this.renderQuizPicker();
    }else if(section==='reports'){
      this.renderReports();
    }
    window.scrollTo(0,0);
  },

  renderQuizPicker(){
    const copy=UI_COPY[this.lang]||UI_COPY['zh-CN'];
    $('quiz-picker').hidden=false;
    $('quiz-runner').hidden=true;
    $('quiz-progress').style.width='0%';
    $('quiz-num').textContent='';
    $('quiz-q').textContent='';
    $('quiz-opts').innerHTML='';
    const sets=[QUIZ_SETS.general,QUIZ_SETS.sleep,QUIZ_SETS.women,QUIZ_SETS.fitness].filter(Boolean);
    $('quiz-picker').innerHTML=`<div class="quiz-picker-head">
      <h2>${escHtml(copy.quizPicker.title)}</h2>
      <p>${escHtml(copy.quizPicker.intro)}</p>
    </div>
    <div class="quiz-set-grid">
      ${sets.map((rawSet,index)=>{
        const set=localizedQuizSet(rawSet);
        return `<button class="quiz-set-card anim-fade" type="button" style="--delay:${index*.05}s" data-quiz-set-id="${escHtml(set.id)}">
          <span class="quiz-set-kicker">${set.id===DEFAULT_QUIZ_SET_ID?'GENERAL':`SCENE 0${index}`}</span>
          <span class="quiz-set-title">${escHtml(set.title)}</span>
          <span class="quiz-set-desc">${escHtml(set.subtitle)}</span>
        </button>`;
      }).join('')}
    </div>`;
  },

  startQuizSet(id=DEFAULT_QUIZ_SET_ID, updateHash=true){
    this.clearGenerationTimers();
    this.quizSetId=QUIZ_SETS[id]?id:DEFAULT_QUIZ_SET_ID;
    this.qIdx=0;this.answers=[];this.result=null;
    localStorage.setItem(QUIZ_SET_KEY,this.quizSetId);
    localStorage.removeItem(ANSWERS_KEY);
    localStorage.removeItem(REPORT_ID_KEY);
    $('result-list').innerHTML='';
    $('next-steps').innerHTML='';
    document.querySelectorAll('.section').forEach(s=>s.classList.remove('on'));
    $('sec-quiz').classList.add('on');
    $('quiz-picker').hidden=true;
    $('quiz-runner').hidden=false;
    if(updateHash&&location.hash!==`#quiz/${this.quizSetId}`)location.hash=`quiz/${this.quizSetId}`;
    this.renderQ();
    if(updateHash)this.track('quiz_start',{quizSet:this.quizSetId});
    window.scrollTo(0,0);
  },
  
  renderQ(){
    const questions=this.quizQuestions();
    if(this.qIdx>=questions.length){this.showResult();return;}
    const q=questions[this.qIdx];
    const qCopy=this.quizQuestionCopy(q,this.qIdx);
    $('quiz-q').textContent=qCopy.q;
    $('quiz-num').textContent=`${this.qIdx+1}/${questions.length}`;
    $('quiz-progress').style.width=`${(this.qIdx/questions.length)*100}%`;
    
    const l=['A','B','C','D','E','F','G','H'];
    $('quiz-opts').innerHTML=qCopy.opts.map((o,i)=>
      `<button class="btn btn-outline anim-fade quiz-option" style="--delay:${i*.06}s" data-answer="${i}">
        <span class="quiz-option-letter">${l[i]}</span>${escHtml(o)}
      </button>`
    ).join('');
  },
  
  answer(idx){
    if(this.qIdx>=this.quizQuestions().length)return;
    this.answers.push(idx);
    localStorage.setItem(ANSWERS_KEY,JSON.stringify(this.answers));
    this.qIdx++;
    if(this.qIdx>=this.quizQuestions().length){
      $('quiz-progress').style.width='100%';
      $('quiz-opts').innerHTML='';
      this.showGeneratingResult();
    }else{this.renderQ();}
  },

  clearGenerationTimers(){
    clearTimeout(this.generationTimer);
    clearInterval(this.generationStepTimer);
    this.generationTimer=null;
    this.generationStepTimer=null;
  },

  showGeneratingResult(){
    this.clearGenerationTimers();
    const result=this.scoreResults();
    this.result=result;
    const copy=(UI_COPY[this.lang]||UI_COPY['zh-CN']).generating;
    document.querySelectorAll('.section').forEach(s=>s.classList.remove('on'));
    $('sec-generating').classList.add('on');
    $('generating-title').textContent=copy.title;
    $('generating-subtitle').textContent=copy.subtitle;
    $('generating-keep').textContent=copy.keep;
    $('generating-removed').textContent=copy.removed(result.blockedIds?.size||0);
    $('generating-tags').innerHTML=this.generatingTags(result).map(label=>
      `<span class="tag generating-tag">${escHtml(label)}</span>`
    ).join('');
    $('generating-steps').innerHTML=copy.steps.map((step,index)=>
      `<li class="${index===0?'is-active':''}">${escHtml(step)}</li>`
    ).join('');
    this.updateGeneratingProgress(0);
    let activeStep=0;
    this.generationStepTimer=setInterval(()=>{
      activeStep=Math.min(activeStep+1,copy.steps.length-1);
      this.updateGeneratingProgress(activeStep);
    },8000/copy.steps.length);
    this.generationTimer=setTimeout(()=>{
      this.clearGenerationTimers();
      this.showResult();
    },8000);
    window.scrollTo(0,0);
  },

  updateGeneratingProgress(activeStep){
    const steps=[...$('generating-steps').children];
    steps.forEach((step,index)=>{
      step.classList.toggle('is-done',index<activeStep);
      step.classList.toggle('is-active',index===activeStep);
    });
    $('generating-progress-fill').style.width=`${Math.min(100,Math.round((activeStep+1)/steps.length*100))}%`;
  },

  generatingTags(result){
    const copy=(UI_COPY[this.lang]||UI_COPY['zh-CN']).generating.tags;
    const strongOrModerate=result.top.filter(item=>['strong','moderate'].includes(item.evidence)).length;
    return [
      copy.targets(result.userTargets?.size||0),
      copy.risk((result.riskNotes?.length||0)+(result.safetyNotes?.length||0)),
      copy.duplicate(result.duplicateIds?.size||0),
      copy.caution(result.cautionIds?.size||0),
      copy.evidence(strongOrModerate),
    ];
  },
  
  showResult({updateHash=true,trackResult=true,mode='summary'}={}){
    this.clearGenerationTimers();
    document.querySelectorAll('.section').forEach(s=>s.classList.remove('on'));
    $('sec-result').classList.add('on');
    const resultHash=mode==='all'?'result/all':'result';
    if(updateHash&&location.hash!==`#${resultHash}`)location.hash=resultHash;
    
    this.result=this.scoreResults();
    this.resultMode=mode;
    this.saveCurrentReport(this.result);
    const {top,userTargets,safetyNotes=[]}=this.result;
    const set=localizedQuizSet(this.quizSet());
    const unlocked=this.hasPaidAccess();
    const visibleResults=unlocked
      ? (mode==='all'?top:this.featuredResults(top))
      : top.slice(0,3);
    const copy=UI_COPY[this.lang]||UI_COPY['zh-CN'];
    const evidenceLabel=copy.evidence;
    const evidenceClass={strong:'badge-strong',moderate:'badge-moderate',emerging:'badge-emerging'};
    const fillColors=['var(--green)','var(--teal)','var(--gold)','#5a7d6a','#8d6e63'];
    
    document.querySelector('.result-title').textContent=set.title||copy.resultTitle;
    $('result-subtitle').textContent=mode==='all'
      ? copy.resultAll
      : `${set.subtitle||''}${set.subtitle?' · ':''}${copy.resultSummary}`;

    $('safety-notice').innerHTML=this.safetyNoticeHtml(safetyNotes);
    
    const maxScore=Math.max(...visibleResults.map(s=>s.score),1);
    
    $('result-list').innerHTML=visibleResults.map((raw,i)=>{
      const s=localizedSupplement(raw);
      const pct=Math.round((s.score/maxScore)*100);
      return `<button class="card anim-fade result-card result-card-link" type="button" data-supplement-id="${s.id}" style="--delay:${i*.06}s;--match-pct:${pct}%;--match-color:${fillColors[i%fillColors.length]}">
        <div class="result-card-inner">
          ${supplementIconHtml(s,'result-supp-icon')}
          <div class="result-body">
            <div class="result-title-row">
              <h3 class="result-name">${s.name}</h3>
              <span class="badge ${evidenceClass[s.evidence]}">${evidenceLabel[s.evidence]}</span>
              ${s.isDuplicate?'<span class="risk-flag">重复核对</span>':''}
              ${s.isCaution?'<span class="risk-flag">冲突核对</span>':''}
              ${s.hasWarnings?`<span class="risk-flag">${escHtml(copy.riskFlag)}</span>`:''}
            </div>
            <p class="result-desc">${escHtml(s.desc)}</p>
            <div class="match-bar result-bar"><div class="match-fill"></div></div>
            <div class="result-meta">
              <span>${escHtml(copy.match)}: ${pct}%</span>
              <span>💊 ${escHtml(s.dosage)}</span>
            </div>
            ${this.decisionAuditHtml(raw)}
            ${s.refs.length?`<p class="result-ref">📚 ${s.refs[0].t} (${s.refs[0].j}, ${s.refs[0].y})</p>`:''}
          </div>
        </div>
      </button>`;
    }).join('');
    
    if(top.length===0){
      const emptyText=safetyNotes.length?copy.safetyEmpty:copy.empty;
      $('result-list').innerHTML=`<div class="card empty-result"><p>${escHtml(emptyText)}</p></div>`;
    }else if(unlocked&&mode!=='all'&&top.length>visibleResults.length){
      $('result-list').insertAdjacentHTML('beforeend', `<a class="btn btn-primary btn-more-results" href="#result/all">${escHtml(copy.moreResults)}</a>`);
    }

    this.renderNextSteps(visibleResults);
    if(!unlocked)this.verifyCurrentPayment().catch(()=>{});
    if(trackResult){
      this.track('result', {
        mode,
        quizSet:this.quizSetId,
        supplements:visibleResults.slice(0,6).map(s=>s.id),
        targets:[...userTargets],
      });
    }
    
    window.scrollTo(0,0);
  },

  scoreResults(){
    const set=this.quizSet();
    const questions=this.quizQuestions();
    const candidateSet=set.candidateIds?.length?new Set(set.candidateIds):null;
    const userTargets=new Set();
    const boostedIds=new Set();
    const duplicateIds=new Set();
    const cautionIds=new Set();
    const blockedIds=new Set();
    const riskNotes=[];
    const safetyNotes=[];
    let onBpMeds=false;
    this.answers.forEach((a,i)=>{
      const q=questions[i];
      if(!q)return;
      (q.targets?.[a]||[]).forEach(t=>userTargets.add(t));
      (q.boosts?.[a]||[]).forEach(id=>boostedIds.add(id));
      (q.duplicateIds?.[a]||[]).forEach(id=>duplicateIds.add(id));
      (q.cautionIds?.[a]||[]).forEach(id=>cautionIds.add(id));
      (q.blockedIds?.[a]||[]).forEach(id=>blockedIds.add(id));
      if(q.risks?.[a])riskNotes.push(q.risks[a]);
      if(q.safetyStops?.[a])safetyNotes.push(q.safetyStops[a]);
      if(q.id==='bp'&&a>=2)onBpMeds=true;
    });

    const scored=SUPPLEMENTS.map(s=>{
      let score=0;
      const matchedTargets=s.targets.filter(t=>userTargets.has(t));
      matchedTargets.forEach(()=>{score++;});
      const isBoosted=boostedIds.has(s.id);
      if(isBoosted)score++;
      if(candidateSet?.has(s.id)&&score>0)score+=0.5;
      const riskText=s.warnings.join(' ');
      const hasWarnings=(onBpMeds&&riskText.includes('降压'))||
        cautionIds.has(s.id)||
        duplicateIds.has(s.id)||
        (riskNotes.length>0&&/(孕期|哺乳|药物|肾功能|肝|手术|抗凝|降糖|镇静)/.test(riskText));
      const result={
        ...s,score,matchedTargets,isBoosted,hasWarnings,
        isDuplicate:duplicateIds.has(s.id),
        isCaution:cautionIds.has(s.id),
        isBlocked:blockedIds.has(s.id),
      };
      return {...result,decisionAudit:this.decisionAudit(result)};
    }).sort((a,b)=>b.score-a.score);

    const filtered=scored.filter(s=>s.score>0&&!s.isBlocked&&(!candidateSet||candidateSet.has(s.id)));
    return {quizSetId:this.quizSetId,userTargets,riskNotes,safetyNotes,duplicateIds,cautionIds,blockedIds,top:filtered.slice(0,12)};
  },

  featuredResults(results){
    const picked=[];
    const add=item=>{if(item&&!picked.some(s=>s.id===item.id))picked.push(item);};
    results.filter(s=>s.evidence==='strong').slice(0,3).forEach(add);
    results.filter(s=>s.evidence!=='strong').slice(0,3).forEach(add);
    results.forEach(item=>{if(picked.length<6)add(item);});
    return picked.slice(0,6);
  },

  decisionAudit(s){
    const copy=UI_COPY[this.lang]||UI_COPY['zh-CN'];
    const audit=copy.audit;
    const prior=s.evidence==='strong'?audit.highPrior:s.evidence==='moderate'?audit.midPrior:audit.lowPrior;
    const support=[...s.matchedTargets];
    if(s.isBoosted)support.push(audit.boosted);
    const discounts=[];
    if(this.hasDependentSignals(s.matchedTargets))discounts.push(audit.dependent);
    if(s.isDuplicate)discounts.push(audit.duplicate);
    if(s.isCaution)discounts.push(audit.caution);
    if(s.hasWarnings)discounts.push(audit.warning);
    const action=s.hasWarnings||s.isCaution||s.isDuplicate
      ? audit.review
      : (s.evidence==='emerging'||s.score<2?audit.reserve:audit.test);
    return {
      prior,
      support:support.length?support:[audit.noSupport],
      discounts:discounts.length?discounts:[this.lang==='en'?'None':'暂无'],
      action,
    };
  },

  hasDependentSignals(targets=[]){
    const clusterMap={
      '睡眠质量差':'sleep_stress','压力/焦虑':'sleep_stress','疲劳感':'sleep_stress',
      '脑雾/认知':'cognition_mood','注意力不集中':'cognition_mood','情绪低落':'cognition_mood','记忆下降':'cognition_mood',
      '运动表现提升':'training','肌肉恢复':'training','运动恢复':'training',
      '心血管健康':'metabolic','高甘油三酯':'metabolic','血压偏高':'metabolic','血糖控制':'metabolic',
      '免疫力低下':'immune_skin','皮肤问题/痤疮':'immune_skin','皮肤干燥':'immune_skin','过敏/季节性不适':'immune_skin',
      '关节炎症':'joint_bone','骨质疏松风险':'joint_bone',
    };
    const clusters=targets.map(t=>clusterMap[t]).filter(Boolean);
    return clusters.length>=2&&new Set(clusters).size<clusters.length;
  },

  decisionAuditHtml(s){
    const copy=UI_COPY[this.lang]||UI_COPY['zh-CN'];
    const audit=s.decisionAudit||this.decisionAudit(s);
    const line=(label,value)=>`<li><strong>${escHtml(label)}：</strong>${escHtml(value)}</li>`;
    const joiner=this.lang==='en'?', ':'、';
    return `<div class="decision-audit">
      <p>${escHtml(copy.audit.title)}</p>
      <ul>
        ${line(copy.audit.prior,audit.prior)}
        ${line(copy.audit.support,audit.support.map(tr).join(joiner))}
        ${line(copy.audit.discount,audit.discounts.map(tr).join(joiner))}
        ${line(copy.audit.action,audit.action)}
      </ul>
    </div>`;
  },

  safetyNoticeHtml(notes=[]){
    const copy=UI_COPY[this.lang]||UI_COPY['zh-CN'];
    const unique=[...new Set(notes.filter(Boolean).map(tr))];
    if(!unique.length)return '';
    return `<div class="safety-notice">
      <strong>${escHtml(copy.safetyTitle)}</strong><br>
      ${unique.map(escHtml).join(this.lang==='en'?'; ':'；')}。${escHtml(copy.safetyBody)}
    </div>`;
  },

  trialPlan(top){
    const copy=UI_COPY[this.lang]||UI_COPY['zh-CN'];
    if(!top.length)return copy.trialHold;
    const preferred=top.filter(s=>!s.isDuplicate&&!s.isCaution&&!s.hasWarnings);
    const first=localizedSupplement(preferred[0]||top[0]).name;
    const secondRaw=preferred[1]||top[1]||preferred[0]||top[0];
    const second=localizedSupplement(secondRaw).name;
    const metrics=copy.trialMetrics[this.quizSetId]||copy.trialMetrics.general;
    return copy.trialBody(first,second,metrics);
  },

  renderNextSteps(top){
    const copy=UI_COPY[this.lang]||UI_COPY['zh-CN'];
    const names=top.slice(0,3).map(s=>localizedSupplement(s).name).join(this.lang==='en'?', ':'、')||copy.currentLifestyle;
    const trialPlan=this.trialPlan(top);
    const paid=this.hasPaidAccess();
    const buyButton=SITE_CONFIG.affiliateUrl
      ? `<a class="btn btn-primary btn-sm" href="${SITE_CONFIG.affiliateUrl}" target="_blank" rel="sponsored noopener">${escHtml(copy.buyList)}</a>`
      : '';
    const contactButton=SITE_CONFIG.contactUrl
      ? `<a class="btn btn-outline btn-sm" href="${SITE_CONFIG.contactUrl}" target="_blank" rel="noopener">${escHtml(copy.brandCoop)}</a>`
      : '';
    $('next-steps').innerHTML=`<div class="sponsor">
      <strong>${escHtml(copy.nextTitle)}</strong><br>
      ${escHtml(copy.nextBody(names))}
      <br><br><strong>${escHtml(copy.trialTitle)}</strong><br>
      ${escHtml(trialPlan)}
      <div class="next-step-actions">
        <button class="btn btn-outline btn-sm" data-action="copy-report">${escHtml(copy.copyReport)}</button>
        <button class="btn btn-primary btn-sm" data-action="${paid?'download-report':'unlock-report'}">${escHtml(paid?copy.downloadReport:copy.unlockReport)}</button>
        ${paid?`<button class="btn btn-primary btn-sm" data-action="share-cover">${escHtml(copy.shareCover)}</button>`:''}
        ${buyButton}${contactButton}
      </div>
      ${paid?'':`<p class="payment-hint">${escHtml(copy.paymentPending)}</p>`}
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
    $('supplement-detail').innerHTML=`<div class="card detail-card"><p class="detail-muted">${escHtml(ui('loadingKnowledge'))}</p></div>`;
    const kb=await this.loadKnowledge();
    const info=kb.supplements?.[id]||{};
    this.renderSupplementDetail(supplement,info);
    this.track('view_supplement',{supplement:id});
    window.scrollTo(0,0);
  },

  renderSupplementDetail(supplement,info){
    const rawSupplement=supplement;
    supplement=localizedSupplement(supplement);
    info=localizedInfo(info);
    const note=info.notes?.[0];
    const copy=UI_COPY[this.lang]||UI_COPY['zh-CN'];
    const refs=info.literature?.length?info.literature:rawSupplement.refs.map(ref=>({
      title:ref.t,journal:ref.j,year:ref.y,url:'',summary:supplement.desc,
    }));
    const targets=info.supportedTargets?.length?info.supportedTargets:supplement.targets;
    const fallback=localizedInfo(detailFallback(rawSupplement));
    const cycle=enSafe(info.cycle)||enSafe(fallback.cycle)||defaultEnglishCycle(rawSupplement);
    const usagePlans=(info.usagePlans?.length?info.usagePlans:fallback.usagePlans)
      .map(plan=>enSafe(plan))
      .filter(Boolean);
    const visibleUsagePlans=usagePlans.length?usagePlans:defaultEnglishUsage(rawSupplement);
    const visibleNote=enSafe(info.note);
    const evidenceLabel=copy.evidence;
    const focusSections=focusSectionsFromNote(note);
    const mechanism=mechanismSteps(info,rawSupplement).map(step=>enSafe(tr(step))).filter(Boolean);
    const visibleMechanism=mechanism.length?mechanism:defaultEnglishMechanism(rawSupplement);
    const summary=enSafe(note?.summary)||enSafe(refs[0]?.summary)||supplement.desc;
    $('supplement-detail').innerHTML=`<article class="detail-card card">
      <header class="detail-hero">
        ${supplementIconHtml(supplement,'detail-icon')}
        <div>
          <p class="detail-kicker">${escHtml(supplement.cat)} · ${escHtml(evidenceLabel[supplement.evidence]||supplement.evidence)}</p>
          <h1>${escHtml(supplement.name)}</h1>
          <p>${escHtml(summary)}</p>
        </div>
      </header>

      <div class="detail-grid">
        <section>
          <h2>${escHtml(copy.detail.targets)}</h2>
          <div class="detail-tags">${targets.map(t=>`<span class="tag">${escHtml(t)}</span>`).join('')}</div>
        </section>
        <section>
          <h2>${escHtml(copy.detail.use)}</h2>
          <p><strong>${escHtml(copy.detail.dose)}</strong>${escHtml(supplement.dosage)}</p>
          <p><strong>${escHtml(copy.detail.cycle)}</strong>${escHtml(cycle)}</p>
          <ul>${visibleUsagePlans.map(plan=>`<li>${escHtml(plan)}</li>`).join('')}</ul>
        </section>
        <section>
          <h2>${escHtml(copy.detail.risk)}</h2>
          <ul>${supplement.warnings.map(warning=>`<li>${escHtml(warning)}</li>`).join('')}</ul>
          ${visibleNote?`<p class="detail-note">${escHtml(visibleNote)}</p>`:''}
        </section>
      </div>

      <section class="detail-mechanism">
        <h2>${escHtml(copy.detail.mechanism)}</h2>
        <div class="mechanism-flow">
          ${visibleMechanism.map((step,index)=>`<div class="mechanism-step">
            <span>${String(index+1).padStart(2,'0')}</span>
            <p>${escHtml(step)}</p>
          </div>`).join('')}
        </div>
      </section>

      ${focusSections.length?`<section class="detail-focus">
        <h2>${escHtml(copy.detail.focus)}</h2>
        <div class="focus-grid">
          ${focusSections.map(section=>`<section class="focus-card">
            <p class="focus-label">${escHtml(section.label)}</p>
            <h3>${escHtml(section.title)}</h3>
            ${previewMarkdown(section.body)}
          </section>`).join('')}
        </div>
      </section>`:''}

      <section class="detail-literature">
        <h2>${escHtml(copy.detail.literature)}</h2>
        ${refs.map(ref=>`<div class="detail-ref">
          <h3>${ref.url?`<a href="${escHtml(ref.url)}" target="_blank" rel="noopener">${escHtml(ref.title)}</a>`:escHtml(ref.title)}</h3>
          <p>${escHtml([ref.journal,ref.year].filter(Boolean).join(' · '))}</p>
          <p>${escHtml(enSafe(ref.summary)||copy.detail.defaultRef)}</p>
        </div>`).join('')}
      </section>

      ${note?.body?`<details class="detail-source">
        <summary>${escHtml(copy.detail.source)}</summary>
        <div class="detail-note-body">${markdownToHtml(note.body)}</div>
      </details>`:''}
    </article>`;
  },

  copyReport(){
    const text=[$('safety-notice').innerText,$('result-list').innerText,$('next-steps').innerText,SITE_CONFIG.publicUrl+'#result']
      .filter(Boolean)
      .join('\n\n');
    navigator.clipboard?.writeText(text);
    this.track('copy_report');
  },

  async shareReportCover(button){
    const copy=UI_COPY[this.lang]||UI_COPY['zh-CN'];
    if(!this.hasPaidAccess()){
      await this.startCheckout();
      return;
    }
    const original=button?.textContent;
    if(button){
      button.textContent=copy.sharingCover;
      button.disabled=true;
    }
    try{
      const blob=await this.createShareCoverBlob();
      const file=new File([blob],`supplement-risk-checklist-${new Date().toISOString().slice(0,10)}.png`,{type:'image/png'});
      const shareData={title:copy.share.title,text:copy.share.text,url:SITE_CONFIG.publicUrl};
      if(navigator.canShare?.({files:[file]})){
        await navigator.share({...shareData,files:[file]});
      }else if(navigator.share){
        await navigator.share(shareData);
      }else{
        this.downloadBlob(blob,file.name);
        alert(copy.shareFallback);
      }
      this.track('share_cover');
    }catch(e){
      if(e?.name!=='AbortError'){
        try{
          const blob=await this.createShareCoverBlob();
          this.downloadBlob(blob,`supplement-risk-checklist-${new Date().toISOString().slice(0,10)}.png`);
          alert(copy.shareFallback);
        }catch(_){}
      }
    }finally{
      if(button){
        button.textContent=original;
        button.disabled=false;
      }
    }
  },

  async createShareCoverBlob(){
    const copy=UI_COPY[this.lang]||UI_COPY['zh-CN'];
    const result=this.result||this.scoreResults();
    const reportId=this.currentReportId();
    const items=(result.top.length?result.top:SUPPLEMENTS.slice(0,1)).map(localizedSupplement);
    const riskCount=(result.riskNotes?.length||0)+(result.safetyNotes?.length||0);
    const siteLabel=SITE_CONFIG.publicUrl.replace(/^https?:\/\//,'').replace(/\/$/,'');
    const canvas=document.createElement('canvas');
    canvas.width=1080;
    canvas.height=1440;
    const ctx=canvas.getContext('2d');
    const colors={bg:'#edf2ee',card:'#fffdf7',green:'#153f2b',dim:'#617366',gold:'#b7791f',coral:'#d86f58',red:'#bd2b26',teal:'#0f7671',line:'#d7e1da',soft:'#f8fbf7'};
    const font=this.lang==='en'?'Inter, Arial, sans-serif':'Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif';
    const round=(x,y,w,h,r,fill,stroke)=>{
      ctx.beginPath();
      ctx.moveTo(x+r,y);
      ctx.arcTo(x+w,y,x+w,y+h,r);
      ctx.arcTo(x+w,y+h,x,y+h,r);
      ctx.arcTo(x,y+h,x,y,r);
      ctx.arcTo(x,y,x+w,y,r);
      if(fill){ctx.fillStyle=fill;ctx.fill();}
      if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=2;ctx.stroke();}
    };
    const text=(value,x,y,size,weight='400',color=colors.green,align='left')=>{
      ctx.font=`${weight} ${size}px ${font}`;
      ctx.fillStyle=color;
      ctx.textAlign=align;
      ctx.textBaseline='top';
      ctx.fillText(value,x,y);
    };
    const wrap=(value,x,y,maxWidth,lineHeight,size,weight='400',color=colors.dim,maxLines=3,align='left')=>{
      const raw=String(value||'');
      const parts=raw.includes(' ')?raw.split(/\s+/):[...raw];
      let line='',lines=[];
      ctx.font=`${weight} ${size}px ${font}`;
      parts.forEach((part,index)=>{
        const next=raw.includes(' ')?(line?`${line} ${part}`:part):line+part;
        if(ctx.measureText(next).width>maxWidth&&line){
          lines.push(line);
          line=part;
        }else{
          line=next;
        }
        if(index===parts.length-1&&line)lines.push(line);
      });
      const drawX=align==='center'?x+maxWidth/2:align==='right'?x+maxWidth:x;
      lines.slice(0,maxLines).forEach((lineText,index)=>text(lineText,drawX,y+index*lineHeight,size,weight,color,align));
      return y+Math.min(lines.length,maxLines)*lineHeight;
    };
    const loadImage=src=>new Promise(resolve=>{
      const img=new Image();
      img.onload=()=>resolve(img);
      img.onerror=()=>resolve(null);
      img.src=src;
    });
    const generatedAt=new Date().toLocaleString(this.lang==='en'?'en-US':this.lang,{
      year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',
    });
    const logo=await loadImage('assets/urgent-vitaminc-wordmark.png');
    const smallCopy=this.lang==='en'
      ? {
          spine:'PAID REPORT', spineTitle:'Personalized supplement picks', spineFoot:generatedAt,
          kicker:'INGREDIENT PRIORITY', eyebrow:'Priority pyramid', title:'Supplement priority',
          lead:'Your urgent supplement shortlist.',
          tierHint:'Priority runs top to bottom', layers:'recommended tiers', removed:'Removed',
          removedBody:n=>`${n} unsuitable self-trial directions`, check:'Confirm before use', riskNote:n=>`${n} risk notes`,
          reportCode:'Report code', visit:'Share your supplement report',
        }
      : this.lang==='zh-TW'
        ? {
            spine:'PAID REPORT', spineTitle:'補劑個性化推薦', spineFoot:generatedAt,
            kicker:'INGREDIENT PRIORITY', eyebrow:'成分優先金字塔', title:'補劑優先級',
            lead:'屬於你的「緊急補劑」',
            tierHint:'優先級由上到下', layers:'層推薦', removed:'已排除',
            removedBody:n=>`${n} 項暫不建議自行嘗試`, check:'使用前再確定', riskNote:n=>`${n} 條風險提示`,
            reportCode:'報告碼', visit:'分享你的補劑報告',
          }
        : {
            spine:'PAID REPORT', spineTitle:'补剂个性化推荐', spineFoot:generatedAt,
            kicker:'INGREDIENT PRIORITY', eyebrow:'成分优先金字塔', title:'补剂优先级',
            lead:'属于你的“紧急补剂”',
            tierHint:'优先级由上到下', layers:'层推荐', removed:'已排除',
            removedBody:n=>`${n} 项暂不建议自行尝试`, check:'使用前再确定', riskNote:n=>`${n} 条风险提示`,
            reportCode:'报告码', visit:'分享你的补剂报告',
          };

    ctx.fillStyle=colors.bg;
    ctx.fillRect(0,0,1080,1440);
    const bg=ctx.createLinearGradient(0,0,1080,1440);
    bg.addColorStop(0,'#edf2ee');
    bg.addColorStop(.58,'#fbfaf5');
    bg.addColorStop(1,'#dde8e2');
    ctx.fillStyle=bg;
    ctx.fillRect(0,0,1080,1440);
    round(38,38,1004,1364,32,colors.card,colors.line);
    round(38,38,196,1364,32,colors.green,colors.green);
    ctx.fillStyle=colors.green;
    ctx.fillRect(196,38,58,1364);

    ctx.save();
    ctx.translate(92,110);
    ctx.rotate(Math.PI/2);
    text(smallCopy.spine,0,0,18,'900','#e4bd73');
    ctx.restore();
    wrap(smallCopy.spineTitle,72,1022,104,38,29,'800','#fbfff8',3);
    wrap(smallCopy.spineFoot,72,1278,126,22,15,'800','#b7cbbf',3);

    const contentX=284;
    const contentW=720;
    text(smallCopy.kicker,contentX,88,16,'900',colors.coral);
    text(smallCopy.reportCode,contentX+contentW,88,16,'900',colors.coral,'right');
    text(smallCopy.eyebrow,contentX,162,22,'900',colors.gold);
    wrap(smallCopy.title,contentX,198,520,70,64,'900',colors.green,2);
    wrap(smallCopy.lead,contentX,280,560,34,23,'600',colors.dim,3);

    round(862,184,142,142,28,colors.green,colors.green);
    text(String(items.length),933,208,58,'900','#fff','center');
    text(smallCopy.layers,933,278,18,'900','#e4bd73','center');

    const tierCount=items.length;
    const density=tierCount<=7?'loose':tierCount<=10?'regular':'compact';
    const layout={
      loose:{bodyY:438,bodyH:464,tierH:46,rowH:62,rowGap:10,nameSize:18,metaSize:13},
      regular:{bodyY:418,bodyH:536,tierH:42,rowH:52,rowGap:8,nameSize:17,metaSize:12},
      compact:{bodyY:398,bodyH:610,tierH:40,rowH:38,rowGap:7,nameSize:15,metaSize:12},
    }[density];
    const bodyY=layout.bodyY;
    const bodyH=layout.bodyH;
    const pyramidX=284;
    const pyramidW=282;
    const gapW=38;
    const listX=pyramidX+pyramidW+gapW;
    const listW=contentX+contentW-listX;
    round(pyramidX,bodyY,pyramidW,bodyH,24,colors.soft,'#d9e6dc');
    round(listX,bodyY,listW,bodyH,24,colors.soft,'#d9e6dc');
    text(smallCopy.tierHint,pyramidX+pyramidW/2,bodyY+22,18,'900',colors.gold,'center');

    const tierTop=bodyY+70;
    const tierAreaH=bodyH-104;
    const tierH=Math.max(24,Math.min(layout.tierH,(tierAreaH-(tierCount-1)*8)/tierCount));
    const tierGap=tierCount>1?(tierAreaH-tierH*tierCount)/(tierCount-1):0;
    const listPad=14;
    const rowGap=layout.rowGap;
    const rowH=Math.max(38,Math.min(layout.rowH,(bodyH-listPad*2-rowGap*(tierCount-1))/tierCount));
    const listContentH=rowH*tierCount+rowGap*(tierCount-1);
    const listTop=bodyY+(bodyH-listContentH)/2;
    const tierCenters=[];
    const rowCenters=[];
    items.forEach((item,index)=>{
      const y=tierTop+index*(tierH+tierGap);
      const width=Math.min(pyramidW-46,70+index*((pyramidW-72)/Math.max(tierCount-1,1)));
      const x=pyramidX+(pyramidW-width)/2;
      const fill=index===0?colors.red:index===1?colors.coral:index===2?'#efc96e':index===3?colors.teal:'#eef6f0';
      const stroke=index<4?'rgba(0,0,0,.04)':'#d9e6dc';
      round(x,y,width,tierH,9,fill,stroke);
      text(String(index+1).padStart(2,'0'),x+width/2,y+(tierH-16)/2,15,'900',index<2?'#fff':colors.green,'center');
      tierCenters.push({x:pyramidX+pyramidW,y:y+tierH/2});
      const rowY=listTop+index*(rowH+rowGap);
      round(listX+listPad,rowY,listW-listPad*2,rowH,14,colors.card,'rgba(23,77,50,.1)');
      round(listX+listPad+10,rowY+8,30,30,15,colors.green,colors.green);
      text(String(index+1).padStart(2,'0'),listX+listPad+25,rowY+15,13,'900','#fff','center');
      const labelX=listX+listPad+52;
      const nameSize=layout.nameSize;
      const metaSize=layout.metaSize;
      const compact=rowH<50;
      wrap(item.name,labelX,rowY+7,listW-listPad*2-64,compact?18:20,nameSize,'900',colors.green,compact?2:1,'center');
      if(!compact){
        const meta=[copy.evidence[item.evidence]||item.evidence, `${copy.match} ${Math.round(item.score||0)}`].filter(Boolean).join(' · ');
        wrap(meta,labelX,rowY+rowH-20,listW-listPad*2-64,16,metaSize,'700',colors.dim,1,'center');
      }
      rowCenters.push({x:listX+listPad,y:rowY+rowH/2});
    });

    ctx.save();
    ctx.setLineDash([7,7]);
    ctx.strokeStyle='rgba(183,121,31,.58)';
    ctx.lineWidth=2;
    ctx.lineCap='round';
    tierCenters.forEach((from,index)=>{
      const to=rowCenters[index];
      ctx.beginPath();
      ctx.moveTo(from.x+6,from.y);
      ctx.bezierCurveTo(from.x+28,from.y,to.x-28,to.y,to.x-8,to.y);
      ctx.stroke();
    });
    ctx.restore();

    const auditY=Math.min(1030,bodyY+bodyH+22);
    round(contentX,auditY,310,96,18,colors.soft,'#d9e6dc');
    text(smallCopy.removed,contentX+20,auditY+16,21,'800',colors.gold);
    text(smallCopy.removedBody(result.blockedIds?.size||0),contentX+20,auditY+50,18,'800',colors.dim);
    round(contentX+326,auditY,contentW-326,96,18,'#fff9ed','#efca96');
    text(smallCopy.check,contentX+346,auditY+16,21,'800',colors.gold);
    wrap(copy.share.riskLabels.join(this.lang==='en'?' / ':' / '),contentX+346,auditY+48,contentW-374,24,18,'800',colors.dim,2);
    if(riskCount){
      round(contentX+contentW-126,auditY+12,106,28,14,'#fffdf7','#efca96');
      text(smallCopy.riskNote(riskCount),contentX+contentW-73,auditY+18,13,'800',colors.coral,'center');
    }

    ctx.strokeStyle='rgba(183,121,31,.5)';
    ctx.lineWidth=2;
    ctx.beginPath();
    ctx.moveTo(contentX,1238);
    ctx.lineTo(contentX+contentW,1238);
    ctx.stroke();
    if(logo){
      const logoW=150;
      const logoH=logo.height*logoW/logo.width;
      const logoX=contentX+contentW/2-logoW/2;
      ctx.fillStyle=colors.card;
      ctx.fillRect(logoX-14,1238-logoH/2-6,logoW+28,logoH+12);
      ctx.drawImage(logo,logoX,1238-logoH/2,logoW,logoH);
    }else{
      ctx.fillStyle=colors.card;
      ctx.fillRect(contentX+contentW/2-70,1220,140,36);
      text('紧急维C',contentX+contentW/2,1226,24,'900',colors.green,'center');
    }
    text(siteLabel,contentX+contentW/2,1274,30,'900',colors.green,'center');
    text(smallCopy.visit,contentX+contentW/2,1322,20,'700',colors.dim,'center');

    return await new Promise(resolve=>canvas.toBlob(resolve,'image/png',.95));
  },

  downloadBlob(blob,filename){
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;
    a.download=filename;
    a.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
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

  savedReports(){
    try{
      const reports=JSON.parse(localStorage.getItem(REPORTS_KEY)||'[]');
      return Array.isArray(reports)?reports:[];
    }catch(e){
      return [];
    }
  },

  saveReports(reports){
    const unique=[];
    reports.forEach(report=>{
      if(report?.id&&!unique.some(item=>item.id===report.id))unique.push(report);
    });
    localStorage.setItem(REPORTS_KEY,JSON.stringify(unique.slice(0,30)));
  },

  currentReportSnapshot(result){
    return {
      top:result.top.slice(0,6).map(item=>({
        id:item.id,
        name:item.name,
        evidence:item.evidence,
        score:item.score,
      })),
      userTargets:[...result.userTargets],
      riskNotes:result.riskNotes||[],
      safetyNotes:result.safetyNotes||[],
    };
  },

  saveCurrentReport(result=this.result){
    if(!result||!this.answers.length)return;
    const reportId=this.currentReportId();
    const saved=this.savedReports();
    const reports=saved.filter(report=>report.id!==reportId);
    const existing=saved.find(report=>report.id===reportId);
    const now=new Date().toISOString();
    const record={
      id:reportId,
      userId:this.getUserId(),
      quizSetId:this.quizSetId,
      title:localizedQuizSet(this.quizSet()).title,
      lang:this.lang,
      answers:this.answers.slice(),
      result:this.currentReportSnapshot(result),
      paid:this.paidReportIds().includes(reportId)||Boolean(existing?.paid),
      createdAt:existing?.createdAt||now,
      updatedAt:now,
    };
    this.saveReports([record,...reports]);
  },

  updateSavedReport(reportId, patch){
    const reports=this.savedReports();
    const index=reports.findIndex(report=>report.id===reportId);
    if(index<0)return;
    reports[index]={...reports[index],...patch,updatedAt:new Date().toISOString()};
    this.saveReports(reports);
  },

  openSavedReport(reportId, show=true){
    const report=this.savedReports().find(item=>item.id===reportId);
    if(!report)return false;
    this.quizSetId=report.quizSetId||DEFAULT_QUIZ_SET_ID;
    this.answers=Array.isArray(report.answers)?report.answers.slice():[];
    this.result=null;
    localStorage.setItem(REPORT_ID_KEY,report.id);
    localStorage.setItem(QUIZ_SET_KEY,this.quizSetId);
    localStorage.setItem(ANSWERS_KEY,JSON.stringify(this.answers));
    if(show)this.showResult({mode:'summary'});
    return true;
  },

  async paySavedReport(reportId){
    if(!this.openSavedReport(reportId,false))return;
    await this.startCheckout();
  },

  async downloadSavedReport(reportId){
    if(!this.openSavedReport(reportId,false))return;
    await this.downloadReport();
  },

  async copyReportCode(reportId=this.currentReportId()){
    const copy=(UI_COPY[this.lang]||UI_COPY['zh-CN']).reports;
    try{
      await navigator.clipboard?.writeText(reportId);
      this.flashReportMessage(copy.codeCopied);
    }catch(e){
      window.prompt(copy.code,reportId);
    }
  },

  flashReportMessage(message){
    const node=$('reports-list')?.querySelector('.reports-message');
    if(!node)return;
    node.textContent=message;
    setTimeout(()=>{node.textContent='';},1800);
  },

  renderReports(){
    const copy=(UI_COPY[this.lang]||UI_COPY['zh-CN']).reports;
    const head=document.querySelector('.reports-head');
    if(head){
      head.querySelector('h2').textContent=copy.title;
      head.querySelector('p').textContent=copy.intro;
    }
    const paidIds=this.paidReportIds();
    const reports=this.savedReports()
      .map(report=>({...report,paid:Boolean(report.paid||paidIds.includes(report.id))}))
      .sort((a,b)=>String(b.updatedAt||b.createdAt).localeCompare(String(a.updatedAt||a.createdAt)));
    if(!reports.length){
      $('reports-list').innerHTML=`<div class="card empty-result"><p>${escHtml(copy.empty)}</p></div>`;
      return;
    }
    const locale=this.lang==='en'?'en-US':this.lang;
    $('reports-list').innerHTML=`<p class="reports-message" aria-live="polite"></p>${reports.map(report=>{
      const created=report.createdAt?new Date(report.createdAt).toLocaleString(locale):'';
      const set=localizedQuizSet(QUIZ_SETS[report.quizSetId]||QUIZ_SETS[DEFAULT_QUIZ_SET_ID]);
      const title=set?.title||report.title||copy.title;
      const top=(report.result?.top||[]).slice(0,3).map(item=>{
        const supplement=supplementById(item.id);
        return escHtml(supplement?localizedSupplement(supplement).name:tr(item.name||item.id));
      }).join(this.lang==='en'?', ':'、')||copy.localOnly;
      const status=report.paid?copy.unlocked:copy.locked;
      return `<article class="card report-card">
        <div class="report-card-head">
          <div>
            <h3>${escHtml(title)}</h3>
            <p>${escHtml(created)} · ${escHtml(copy.code)} ${escHtml(report.id.slice(0,8))}</p>
          </div>
          <span class="report-status ${report.paid?'is-paid':''}">${escHtml(status)}</span>
        </div>
        <p class="report-summary"><strong>${escHtml(copy.top)}：</strong>${top}</p>
        <p class="report-local-note">${escHtml(copy.localOnly)}</p>
        <div class="report-actions">
          <button class="btn btn-outline btn-sm" data-action="view-saved-report" data-report-id="${escHtml(report.id)}">${escHtml(copy.view)}</button>
          ${report.paid
            ? `<button class="btn btn-primary btn-sm" data-action="download-saved-report" data-report-id="${escHtml(report.id)}">${escHtml(copy.download)}</button>`
            : `<button class="btn btn-primary btn-sm" data-action="pay-saved-report" data-report-id="${escHtml(report.id)}">${escHtml(copy.continuePay)}</button>`}
          <button class="btn btn-outline btn-sm" data-action="copy-report-code" data-report-id="${escHtml(report.id)}">${escHtml(copy.copyCode)}</button>
        </div>
      </article>`;
    }).join('')}`;
  },

  paidReportIds(){
    try{
      const ids=JSON.parse(localStorage.getItem(PAID_REPORTS_KEY)||'[]');
      return Array.isArray(ids)?ids:[];
    }catch(e){
      return [];
    }
  },

  currentReportId(){
    let id=localStorage.getItem(REPORT_ID_KEY);
    if(!id){
      id=crypto.randomUUID();
      localStorage.setItem(REPORT_ID_KEY,id);
    }
    return id;
  },

  markReportPaid(reportId=this.currentReportId()){
    const ids=this.paidReportIds();
    if(!ids.includes(reportId)){
      ids.push(reportId);
      localStorage.setItem(PAID_REPORTS_KEY,JSON.stringify(ids.slice(-10)));
    }
    this.updateSavedReport(reportId,{paid:true,paidAt:new Date().toISOString()});
  },

  hasPaidAccess(){
    return this.paidReportIds().includes(this.currentReportId());
  },

  async verifyPaymentFromUrl(){
    const reportId=new URLSearchParams(location.search).get('report');
    if(!reportId)return;
    for(let attempt=0;attempt<5;attempt++){
      try{
        const res=await fetch(`/api/verify-payment?reportId=${encodeURIComponent(reportId)}`);
        const data=await res.json();
        if(data.paid){
          localStorage.setItem(REPORT_ID_KEY,reportId);
          this.markReportPaid(reportId);
          if($('sec-result').classList.contains('on'))this.showResult({updateHash:false,trackResult:false,mode:this.resultMode||'summary'});
          return;
        }
      }catch(e){}
      if(attempt<4){
        await new Promise(resolve=>setTimeout(resolve,1200));
      }
    }
  },

  async verifyCurrentPayment(){
    const reportId=this.currentReportId();
    const res=await fetch(`/api/verify-payment?reportId=${encodeURIComponent(reportId)}`);
    const data=await res.json();
    if(data.paid){
      this.markReportPaid(reportId);
      this.closeManualCheckout();
      if($('sec-result').classList.contains('on'))this.showResult({updateHash:false,trackResult:false,mode:this.resultMode||'summary'});
      return true;
    }
    return false;
  },

  async pollPaymentUnlock(){
    for(let attempt=0;attempt<60;attempt++){
      try{
        if(await this.verifyCurrentPayment())return;
      }catch(e){}
      await new Promise(resolve=>setTimeout(resolve,3000));
    }
  },

  showManualCheckout(data){
    this.manualCheckout=data;
    this.closeManualCheckout();
    const copy=(UI_COPY[this.lang]||UI_COPY['zh-CN']).manualPay;
    const qrUrl=data.qrUrl||'/assets/alipay-qr.jpg';
    const amount=data.amount||'6.90';
    const orderId=data.orderId||data.reportId;
    document.body.insertAdjacentHTML('beforeend', `<div class="payment-modal" role="dialog" aria-modal="true" aria-labelledby="payment-title">
      <div class="payment-modal-card">
        <button class="payment-modal-close" type="button" data-action="close-manual-payment" aria-label="${escHtml(copy.close)}">×</button>
        <h2 id="payment-title">${escHtml(copy.title)}</h2>
        <p class="payment-modal-intro">${escHtml(copy.intro)}</p>
        <img class="payment-qr" src="${escHtml(qrUrl)}" alt="${escHtml(copy.title)}">
        <div class="payment-order">
          <span>${escHtml(copy.amount)}：<strong>${escHtml(amount)} 元</strong></span>
          <span>${escHtml(copy.order)}：<strong>${escHtml(orderId)}</strong></span>
        </div>
        <p class="payment-status" id="payment-status"></p>
        <div class="payment-modal-actions">
          <button class="btn btn-primary btn-sm" type="button" data-action="confirm-manual-payment">${escHtml(copy.done)}</button>
          <button class="btn btn-outline btn-sm" type="button" data-action="refresh-page">${escHtml(copy.refresh)}</button>
          <button class="btn btn-outline btn-sm" type="button" data-action="close-manual-payment">${escHtml(copy.close)}</button>
        </div>
      </div>
    </div>`);
  },

  closeManualCheckout(){
    document.querySelector('.payment-modal')?.remove();
  },

  async confirmManualPayment(){
    if(!this.manualCheckout)return;
    const copy=(UI_COPY[this.lang]||UI_COPY['zh-CN']).manualPay;
    const button=document.querySelector('[data-action="confirm-manual-payment"]');
    const status=$('payment-status');
    if(button)button.disabled=true;
    if(status)status.textContent=copy.pending;
    try{
      const res=await fetch(this.manualCheckout.confirmEndpoint||'/api/notify-payment',{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({
          reportId:this.manualCheckout.reportId,
          userId:this.getUserId(),
        }),
      });
      if(!res.ok)throw new Error('notify failed');
      this.pollPaymentUnlock();
    }catch(e){
      if(status)status.textContent=copy.notifyError;
      if(button)button.disabled=false;
    }
  },

  async startCheckout(){
    const copy=UI_COPY[this.lang]||UI_COPY['zh-CN'];
    const button=document.querySelector('[data-action="unlock-report"]');
    const original=button?.textContent;
    if(button)button.textContent=copy.unlocking;
    try{
      const result=this.result||this.scoreResults();
      const reportId=this.currentReportId();
      const res=await fetch('/api/create-checkout',{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({
          reportId,
          userId:this.getUserId(),
          quizSet:this.quizSetId,
          lang:this.lang,
          supplements:result.top.slice(0,5).map(s=>s.id),
          targets:[...result.userTargets],
        }),
      });
      const data=await res.json();
      if(!res.ok)throw new Error(data.error||'checkout failed');
      if(data.provider==='manual_alipay'){
        if(button&&original)button.textContent=original;
        this.showManualCheckout(data);
        return;
      }
      if(!data.url)throw new Error(data.error||'checkout failed');
      location.href=data.url;
    }catch(e){
      alert(copy.paymentError);
      if(button&&original)button.textContent=original;
    }
  },

  async downloadReport(){
    if(!this.hasPaidAccess()){
      await this.startCheckout();
      return;
    }
    const result=this.result||this.scoreResults();
    const kb=await this.loadKnowledge();
    const report=this.buildReport(result,kb);
    await this.savePdf(report);
    this.track('paid_download',{supplements:result.top.slice(0,5).map(s=>s.id)});
  },

  buildReport({top,userTargets,riskNotes=[],safetyNotes=[]},kb){
    const copy=UI_COPY[this.lang]||UI_COPY['zh-CN'];
    const set=localizedQuizSet(this.quizSet());
    const reportTypeLabel=this.lang==='en'?'Report type':this.lang==='zh-TW'?'報告類型':'报告类型';
    const locale=this.lang==='en'?'en-US':this.lang;
    const generatedAt=new Date().toLocaleString(locale);
    const items=top.slice(0,5).map((raw,i)=>{
      const s=localizedSupplement(raw);
      const rawInfo=kb.supplements?.[raw.id]||{};
      const info=localizedInfo(rawInfo);
      const fallback=localizedInfo(detailFallback(raw));
      const matched=(rawInfo.supportedTargets?.length?rawInfo.supportedTargets:raw.targets).filter(t=>userTargets.has(t)).map(tr);
      const refs=info.literature?.length?info.literature:s.refs;
      const usagePlans=(info.usagePlans?.length?info.usagePlans:fallback.usagePlans).map(plan=>enSafe(plan)).filter(Boolean);
      return {
        rank:i+1,
        name:s.name,
        reason:matched.join(this.lang==='en'?', ':'、')||copy.report.weighted,
        audit:raw.decisionAudit||this.decisionAudit(raw),
        dosage:s.dosage,
        cycle:enSafe(info.cycle)||enSafe(fallback.cycle)||defaultEnglishCycle(raw),
        usagePlans:usagePlans.length?usagePlans:defaultEnglishUsage(raw),
        warnings:s.warnings,
        evidence:s.evidence,
        literature:refs.map(ref=>({
          title:ref.title||ref.t,
          journal:ref.journal||ref.j,
          year:ref.year||ref.y,
          url:ref.url||'',
          summary:enSafe(ref.summary)||copy.detail.defaultRef,
        })),
        note:enSafe(info.note),
      };
    });
    const report={
      generatedAt,
      reportType:set.title||copy.report.title,
      targets:[...userTargets].map(tr),
      riskNotes:riskNotes.map(tr),
      safetyNotes:[...new Set(safetyNotes.filter(Boolean).map(tr))],
      priority:top.slice(0,5).map(s=>localizedSupplement(s).name),
      trialPlan:this.trialPlan(top),
      items,
    };
    const lines=[
      `# ${copy.report.title}`,
      '',
      `${copy.report.generated}：${report.generatedAt}`,
      '',
      `## ${copy.report.summary}`,
      `${reportTypeLabel}：${report.reportType}`,
      `${copy.report.targets}：${report.targets.join(this.lang==='en'?', ':'、')||copy.report.noTargets}`,
      `${copy.report.risks}：${report.riskNotes.join(this.lang==='en'?'; ':'；')||copy.report.noRisks}`,
      `${copy.report.safety}：${report.safetyNotes.join(this.lang==='en'?'; ':'；')||copy.report.none}`,
      `${copy.report.priority}：${report.priority.join(this.lang==='en'?', ':'、')||copy.report.none}`,
      '',
      `## ${copy.report.cross}`,
    ];

    report.items.forEach(item=>{
      lines.push(
        '',
        `### ${item.rank}. ${item.name}`,
        `- ${copy.report.reason}：${item.reason}`,
        `- ${copy.audit.title}：${copy.audit.prior} ${item.audit.prior}；${copy.audit.support} ${item.audit.support.map(tr).join(this.lang==='en'?', ':'、')}；${copy.audit.discount} ${item.audit.discounts.map(tr).join(this.lang==='en'?', ':'、')}；${copy.audit.action} ${item.audit.action}`,
        `- ${copy.report.dose}：${item.dosage}`,
        `- ${copy.report.cycle}：${item.cycle}`,
        `- ${copy.report.usage}：${item.usagePlans.join(this.lang==='en'?'; ':'；')}`,
        `- ${copy.report.warning}：${item.warnings.join(this.lang==='en'?'; ':'；')}`,
        `- ${copy.report.evidence}：${copy.evidence[item.evidence]||item.evidence}`,
      );
      item.literature.forEach(ref=>{
        const source=[ref.journal,ref.year].filter(Boolean).join(this.lang==='en'?', ':'，');
        lines.push(`- ${copy.report.literature}：${ref.title}${source?`（${source}）`:''}`);
        lines.push(`  - ${copy.report.oneLine}：${ref.summary}`);
      });
      if(item.note)lines.push(`- ${copy.report.note}：${item.note}`);
    });

    lines.push(
      '',
      `## ${copy.report.checklist}`,
      ...copy.report.checks.map(item=>`- ${item}`),
      '',
      `## ${copy.report.trial}`,
      `- ${report.trialPlan}`,
      '',
      `## ${copy.report.review}`,
      ...copy.report.reviewRows.map(item=>`- ${item}`),
      '',
      copy.report.disclaimer
    );
    report.markdown=lines.join('\n');
    return report;
  },

  reportHtml(report){
    const copy=UI_COPY[this.lang]||UI_COPY['zh-CN'];
    const reportTypeLabel=this.lang==='en'?'Report type':this.lang==='zh-TW'?'報告類型':'报告类型';
    const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    return `<div class="pdf-report">
      <h1>${esc(copy.report.title)}</h1>
      <p>${esc(copy.report.generated)}：${esc(report.generatedAt)}</p>
      <div class="box">
        <h2>${esc(copy.report.summary)}</h2>
        <p><strong>${esc(reportTypeLabel)}：</strong>${esc(report.reportType)}</p>
        <p><strong>${esc(copy.report.targets)}：</strong>${esc(report.targets.join(this.lang==='en'?', ':'、')||copy.report.noTargets)}</p>
        <p><strong>${esc(copy.report.risks)}：</strong>${esc(report.riskNotes.join(this.lang==='en'?'; ':'；')||copy.report.noRisks)}</p>
        <p><strong>${esc(copy.report.safety)}：</strong>${esc(report.safetyNotes.join(this.lang==='en'?'; ':'；')||copy.report.none)}</p>
        <p><strong>${esc(copy.report.priority)}：</strong>${esc(report.priority.join(this.lang==='en'?', ':'、')||copy.report.none)}</p>
      </div>
      <h2>${esc(copy.report.cross)}</h2>
      ${report.items.map(item=>`
        <div class="box">
          <h3>${item.rank}. ${esc(item.name)}</h3>
          <ul>
            <li><strong>${esc(copy.report.reason)}：</strong>${esc(item.reason)}</li>
            <li><strong>${esc(copy.audit.title)}：</strong>${esc(copy.audit.prior)} ${esc(item.audit.prior)}；${esc(copy.audit.support)} ${esc(item.audit.support.map(tr).join(this.lang==='en'?', ':'、'))}；${esc(copy.audit.discount)} ${esc(item.audit.discounts.map(tr).join(this.lang==='en'?', ':'、'))}；${esc(copy.audit.action)} ${esc(item.audit.action)}</li>
            <li><strong>${esc(copy.report.dose)}：</strong>${esc(item.dosage)}</li>
            <li><strong>${esc(copy.report.cycle)}：</strong>${esc(item.cycle)}</li>
            <li><strong>${esc(copy.report.usage)}：</strong>${esc(item.usagePlans.join(this.lang==='en'?'; ':'；'))}</li>
            <li><strong>${esc(copy.report.warning)}：</strong>${esc(item.warnings.join(this.lang==='en'?'; ':'；'))}</li>
            <li><strong>${esc(copy.report.evidence)}：</strong>${esc(copy.evidence[item.evidence]||item.evidence)}</li>
          </ul>
          <p><strong>${esc(copy.report.literature)}：</strong></p>
          <ul>${item.literature.map(ref=>`<li>${esc(ref.title)}${ref.journal||ref.year?`（${esc([ref.journal,ref.year].filter(Boolean).join(this.lang==='en'?', ':'，'))}）`:''}<br>${esc(copy.report.oneLine)}：${esc(ref.summary)}</li>`).join('')}</ul>
          ${item.note?`<p><strong>${esc(copy.report.note)}：</strong>${esc(item.note)}</p>`:''}
        </div>
      `).join('')}
      <h2>${esc(copy.report.checklist)}</h2>
      <ul>${copy.report.checks.map(item=>`<li>${esc(item)}</li>`).join('')}</ul>
      <h2>${esc(copy.report.trial)}</h2>
      <ul><li>${esc(report.trialPlan)}</li></ul>
      <h2>${esc(copy.report.review)}</h2>
      <ul>${copy.report.reviewRows.map(item=>`<li>${esc(item)}</li>`).join('')}</ul>
      <p>${esc(copy.report.disclaimer)}</p>
    </div>`;
  },

  async savePdf(report){
    if(!window.html2canvas||!window.jspdf?.jsPDF){
      const win=window.open('', '_blank');
      if(!win){alert((UI_COPY[this.lang]||UI_COPY['zh-CN']).report.pdfLoading);return;}
      win.document.write(`<!doctype html><html><head><title>${escHtml((UI_COPY[this.lang]||UI_COPY['zh-CN']).report.title)}</title><style>body{font-family:sans-serif;padding:24px;line-height:1.7}</style></head><body><pre style="white-space:pre-wrap">${report.markdown.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))}</pre></body></html>`);
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
      const prefix=this.lang==='en'?'ingredient-match-report':this.lang==='zh-TW'?'保健成分綜合報告':'保健成分综合报告';
      pdf.save(`${prefix}-${new Date().toISOString().slice(0,10)}.pdf`);
    }finally{
      wrap.remove();
    }
  },

  bindEvents(){
    document.addEventListener('click',event=>{
      const langOption=event.target.closest('[data-lang-option]');
      if(langOption){
        this.setLanguage(langOption.dataset.langOption);
        return;
      }
      if(!event.target.closest('.lang-menu'))this.closeLanguageMenu();

      const answerButton=event.target.closest('[data-answer]');
      if(answerButton){
        this.answer(Number(answerButton.dataset.answer));
        return;
      }

      const quizSetButton=event.target.closest('[data-quiz-set-id]');
      if(quizSetButton){
        this.startQuizSet(quizSetButton.dataset.quizSetId);
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
        'go-reports':()=>this.go('reports'),
        'scroll-supplements':()=>$('supp-preview').scrollIntoView({behavior:'smooth',block:'center'}),
        'copy-report':()=>this.copyReport(),
        'download-report':()=>this.downloadReport(),
        'unlock-report':()=>this.startCheckout(),
        'share-cover':()=>this.shareReportCover(actionButton),
        'view-saved-report':()=>this.openSavedReport(actionButton.dataset.reportId),
        'pay-saved-report':()=>this.paySavedReport(actionButton.dataset.reportId),
        'download-saved-report':()=>this.downloadSavedReport(actionButton.dataset.reportId),
        'copy-report-code':()=>this.copyReportCode(actionButton.dataset.reportId),
        'confirm-manual-payment':()=>this.confirmManualPayment(),
        'close-manual-payment':()=>this.closeManualCheckout(),
        'refresh-page':()=>location.reload(),
        'toggle-language-menu':()=>this.toggleLanguageMenu(),
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
  App.getUserId();
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
    }else if(section.startsWith('quiz/')){
      App.startQuizSet(section.slice('quiz/'.length),false);
    }else if(section==='result'||section==='result/all'){
      App.quizSetId=localStorage.getItem(QUIZ_SET_KEY)||DEFAULT_QUIZ_SET_ID;
      try{App.answers=JSON.parse(localStorage.getItem(ANSWERS_KEY)||'[]');}catch(e){App.answers=[];}
      App.showResult({updateHash:false,trackResult:false,mode:section==='result/all'?'all':'summary'});
    }else{
      App.go(section||'home',false);
    }
  });
  window.dispatchEvent(new HashChangeEvent('hashchange'));
  App.verifyPaymentFromUrl();
  App.track('page_view');
  
  console.log('%c🧬 紧急维C %c已就绪','color:#1a5632;font-size:16px','');
  console.log(`%c  ${SUPPLEMENTS.length}种成分 · ${Object.keys(QUIZ_SETS).length}份问卷 · 循证推荐`,'color:#5a7d6a');
})();
