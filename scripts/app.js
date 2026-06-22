const SITE_CONFIG = {
  publicUrl:'https://turbo-adventure-7ii.pages.dev',
  contactUrl:'',
  affiliateUrl:'',
  analyticsEndpoint:'/api/track',
  knowledgeUrl:'knowledge/supplements.json',
  knowledgeManifestUrl:'knowledge/manifest.json',
};

// ==================== SUPPLEMENT DATABASE ====================
const SUPPLEMENTS = [
  {
    id:'omega3',name:'Omega-3 (EPA/DHA)',cat:'脂肪酸',emoji:'🐟',
    desc:'长链Omega-3脂肪酸，主要来自低汞鱼类、鱼油和藻油。更适合补足EPA/DHA缺口、管理高甘油三酯和特定孕期/心血管场景。',
    evidence:'strong',
    dosage:'EPA+DHA 约250mg/天起；治疗剂量遵医嘱',
    targets:['心血管健康','高甘油三酯','关节炎症','脑雾/认知','情绪低落','皮肤干燥'],
    warnings:['抗凝/抗血小板药使用者需咨询医生','围手术期需告知医生评估','房颤史或高剂量使用需谨慎'],
    refs:[{t:'Omega-3 Fatty Acids - Health Professional Fact Sheet',j:'NIH ODS',y:2026}]
  },
  {
    id:'creatine',name:'肌酸 (Creatine)',cat:'氨基酸衍生物',emoji:'💪',
    desc:'最被研究证实的运动表现增强剂。近年研究还发现对认知功能有益。',
    evidence:'strong',
    dosage:'3-5g/天，维持期',
    targets:['运动表现提升','肌肉恢复','脑雾/认知','疲劳感'],
    warnings:['肾功能不全者需咨询医生','初期可能有轻微水潴留'],
    refs:[{t:'Creatine supplementation with specific view to exercise/sports performance',j:'J Int Soc Sports Nutr',y:2017}]
  },
  {
    id:'citrulline',name:'L-瓜氨酸 (L-Citrulline)',cat:'氨基酸',emoji:'🏃',
    desc:'非必需氨基酸，在体内转化为精氨酸，促进一氧化氮生成，改善血流。',
    evidence:'moderate',
    dosage:'3-6g/天，运动前60-90分钟',
    targets:['运动表现提升','血压偏高','血液循环差','疲劳感'],
    warnings:['低血压患者慎用','可能与降压药相互作用'],
    refs:[{t:'Effects of Citrulline Supplementation on Exercise Performance',j:'Sports Med',y:2018}]
  },
  {
    id:'theanine',name:'L-茶氨酸 (L-Theanine)',cat:'氨基酸',emoji:'🍵',
    desc:'茶叶中的非蛋白氨基酸，可能带来轻度放松和平静清醒感。更适合短期评估压力、睡前紧张和咖啡因后不适。',
    evidence:'moderate',
    dosage:'100-200mg起，按场景短期评估',
    targets:['压力/焦虑','睡眠质量差','注意力不集中','脑雾/认知'],
    warnings:['镇静/安眠/精神科药物使用者需咨询医生','孕期/哺乳期和儿童不建议自行使用','低血压或易头晕者慎用'],
    refs:[{t:'Effects of L-Theanine on Stress-Related Symptoms and Cognitive Functions',j:'Nutrients',y:2019}]
  },
  {
    id:'magnesium',name:'镁 (Magnesium)',cat:'矿物质',emoji:'⚡',
    desc:'参与300+酶反应的必需矿物质。现代饮食中普遍缺乏。甘氨酸镁和柠檬酸镁吸收较好。',
    evidence:'strong',
    dosage:'200-400mg/天',
    targets:['睡眠质量差','压力/焦虑','肌肉痉挛/紧张','偏头痛','血压偏高'],
    warnings:['肾功能不全者需咨询医生','过量可能导致腹泻'],
    refs:[{t:'The Role of Magnesium in Sleep Health',j:'Nutrients',y:2021}]
  },
  {
    id:'vitamind',name:'维生素D3',cat:'维生素',emoji:'☀️',
    desc:'脂溶性前激素样营养素，核心价值在钙磷代谢、骨骼健康和纠正缺乏。更适合按风险、检测和复查来补。',
    evidence:'strong',
    dosage:'600-800 IU/天起，按检测复盘',
    targets:['免疫力低下','情绪低落','骨质疏松风险','疲劳感','肌肉恢复'],
    warnings:['长期高剂量可能导致高钙血症','肾病/结石史需咨询医生','合并补钙或相关药物需监测'],
    refs:[{t:'Vitamin D - Health Professional Fact Sheet',j:'NIH ODS',y:2026}]
  },
  {
    id:'zinc',name:'锌 (Zinc)',cat:'矿物质',emoji:'🛡️',
    desc:'必需微量矿物质，对免疫、伤口愈合、味觉和男性生殖健康至关重要。',
    evidence:'moderate',
    dosage:'15-30mg/天',
    targets:['免疫力低下','皮肤问题/痤疮','伤口愈合慢','脱发'],
    warnings:['长期高剂量可能抑制铜吸收','空腹可能引起恶心'],
    refs:[{t:'Zinc in Wound Healing Modulation',j:'Nutrients',y:2018}]
  },
  {
    id:'ashwagandha',name:'印度人参 (Ashwagandha)',cat:'植物提取物',emoji:'🌿',
    desc:'阿育吠陀适应原草药，帮助身体应对压力，降低皮质醇水平。',
    evidence:'moderate',
    dosage:'300-600mg/天（标准化提取物）',
    targets:['压力/焦虑','睡眠质量差','疲劳感','运动表现提升'],
    warnings:['孕期/哺乳期避免','甲状腺疾病患者需咨询医生'],
    refs:[{t:'An investigation into the stress-relieving effects of an extract of Ashwagandha',j:'Medicine',y:2019}]
  },
  {
    id:'coq10',name:'辅酶Q10 (CoQ10)',cat:'辅酶',emoji:'❤️',
    desc:'线粒体电子传递链的关键辅酶，随年龄增长合成减少。',
    evidence:'moderate',
    dosage:'100-300mg/天',
    targets:['心血管健康','疲劳感','偏头痛','运动表现提升'],
    warnings:['可能与华法林相互作用','一般安全'],
    refs:[{t:'Coenzyme Q10 supplementation in aging and disease',j:'Front Physiol',y:2018}]
  },
  {
    id:'probiotics',name:'益生菌 (Probiotics)',cat:'微生物',emoji:'🦠',
    desc:'活的微生物补充剂，通过调节肠道菌群促进消化和免疫健康。',
    evidence:'moderate',
    dosage:'10-100亿 CFU/天',
    targets:['消化问题','免疫力低下','皮肤问题/痤疮','情绪低落'],
    warnings:['免疫力严重低下者慎用','不同菌株效果差异大'],
    refs:[{t:'Probiotics and the gut-brain axis',j:'Ann Gastroenterol',y:2015}]
  },
  {
    id:'curcumin',name:'姜黄素 (Curcumin)',cat:'植物提取物',emoji:'🟡',
    desc:'姜黄中的活性成分，强效抗炎和抗氧化剂。需与黑胡椒素同服以提高吸收率。',
    evidence:'moderate',
    dosage:'500-1500mg/天，与黑胡椒素同服',
    targets:['关节炎症','消化问题','运动恢复','脑雾/认知'],
    warnings:['胆结石患者慎用','可能与抗凝血药物相互作用'],
    refs:[{t:'Curcumin: A Review of Its Effects on Human Health',j:'Foods',y:2017}]
  },
  {
    id:'melatonin',name:'褪黑素 (Melatonin)',cat:'激素',emoji:'🌙',
    desc:'松果体分泌的睡眠调节激素。短期使用调整昼夜节律。',
    evidence:'strong',
    dosage:'0.5-5mg，睡前30-60分钟',
    targets:['睡眠质量差','时差/轮班'],
    warnings:['长期高剂量安全性数据有限','可能引起次日嗜睡'],
    refs:[{t:'Melatonin for the management of sleep disorders in children and adolescents',j:'Paediatr Child Health',y:2020}]
  },
  {
    id:'collagen',name:'胶原蛋白肽 (Collagen Peptides)',cat:'蛋白质',emoji:'✨',
    desc:'水解胶原蛋白，为皮肤、关节和骨骼提供结构蛋白的前体。',
    evidence:'moderate',
    dosage:'5-10g/天',
    targets:['皮肤干燥','关节炎症','骨质疏松风险','伤口愈合慢'],
    warnings:['一般安全','鱼胶原对鱼类过敏者慎用'],
    refs:[{t:'Oral Collagen Supplementation: A Systematic Review',j:'J Drugs Dermatol',y:2019}]
  },
  {
    id:'nac',name:'N-乙酰半胱氨酸 (NAC)',cat:'氨基酸衍生物',emoji:'🫁',
    desc:'谷胱甘肽前体，强效抗氧化剂，支持肝脏解毒和呼吸系统健康。',
    evidence:'moderate',
    dosage:'600-1200mg/天',
    targets:['呼吸系统','免疫力低下','脑雾/认知','疲劳感'],
    warnings:['可能引起胃部不适','对组胺不耐受者慎用'],
    refs:[{t:'N-Acetylcysteine in the treatment of psychiatric disorders',j:'J Psychiatry Neurosci',y:2011}]
  },
  {
    id:'berberine',name:'小檗碱 (Berberine)',cat:'植物提取物',emoji:'🩸',
    desc:'黄连等植物中的生物碱，对血糖和血脂调节有显著效果。',
    evidence:'moderate',
    dosage:'500mg，2-3次/天，餐前服用',
    targets:['血糖控制','高甘油三酯','消化问题'],
    warnings:['可能引起胃肠道不适','孕妇禁用','糖尿病药物使用者需监测血糖'],
    refs:[{t:'Berberine in the Treatment of Type 2 Diabetes Mellitus',j:'Metabolism',y:2008}]
  },
  {
    id:'rhodiola',name:'红景天 (Rhodiola Rosea)',cat:'植物提取物',emoji:'🏔️',
    desc:'北极地区传统适应原草药，帮助对抗疲劳，提高精神和身体耐力。',
    evidence:'moderate',
    dosage:'200-600mg/天（标准化提取物）',
    targets:['疲劳感','压力/焦虑','脑雾/认知','运动表现提升'],
    warnings:['可能引起口干或头晕','双相情感障碍患者避免使用'],
    refs:[{t:'Rhodiola rosea for physical and mental fatigue',j:'Phytother Res',y:2012}]
  },
  {
    id:'bcomplex',name:'复合维生素B (B-Complex)',cat:'维生素',emoji:'⚙️',
    desc:'8种B族维生素的综合补充，对能量代谢、神经功能和红细胞生成至关重要。',
    evidence:'strong',
    dosage:'随产品而定，通常每天1粒',
    targets:['疲劳感','脑雾/认知','情绪低落','脱发','皮肤问题/痤疮'],
    warnings:['高剂量B6长期使用可能引起神经损伤','一般安全范围广泛'],
    refs:[{t:'B Vitamins and the Brain: Mechanisms, Dose and Efficacy',j:'Nutrients',y:2016}]
  },
  {
    id:'lionsmane',name:"猴头菇 (Lion's Mane)",cat:'菌类提取物',emoji:'🍄',
    desc:'药用蘑菇，传统用于认知增强和神经保护。促进神经生长因子(NGF)合成。',
    evidence:'emerging',
    dosage:'500-3000mg/天',
    targets:['脑雾/认知','记忆下降','情绪低落','神经恢复'],
    warnings:['蘑菇过敏者慎用','长期安全数据有限'],
    refs:[{t:"Neurotrophic properties of the Lion's mane medicinal mushroom",j:'J Neurochem',y:2012}]
  },
  {
    id:'glycine',name:'甘氨酸 (Glycine)',cat:'氨基酸',emoji:'😴',
    desc:'条件必需氨基酸，作为抑制性神经递质，改善睡眠质量和降低核心体温。',
    evidence:'moderate',
    dosage:'3g，睡前服用',
    targets:['睡眠质量差','肌肉恢复','关节炎症'],
    warnings:['一般安全','极高剂量可能引起胃肠不适'],
    refs:[{t:'Glycine ingestion improves subjective sleep quality',j:'Sleep Biol Rhythms',y:2007}]
  },
  {
    id:'quercetin',name:'槲皮素 (Quercetin)',cat:'类黄酮',emoji:'🍎',
    desc:'洋葱和苹果中富含的类黄酮，天然抗组胺和抗炎作用。',
    evidence:'emerging',
    dosage:'500-1000mg/天',
    targets:['过敏/季节性不适','运动恢复','血压偏高','免疫力低下'],
    warnings:['可能影响某些药物的肝代谢','一般安全'],
    refs:[{t:'Quercetin, Inflammation and Immunity',j:'Nutrients',y:2016}]
  },
];

const DETAIL_FALLBACKS = {
  citrulline:{
    cycle:'2-4 周观察训练泵感、疲劳、血压和胃肠耐受；若用于血压相关目标，应同步记录血压并咨询专业人士。',
    usagePlans:['运动表现目标可在训练前 60-90 分钟使用', '血压偏低、正在用降压药或容易头晕者不应自行尝试', '一次只调整一个补剂变量，避免和硝酸盐、精氨酸等同类方向叠加后难以判断'],
    mechanism:['口服后在小肠吸收进入门静脉循环', '部分避开肝脏首过代谢并进入肾脏', '在肾脏等组织转化为精氨酸', '精氨酸经一氧化氮合酶生成一氧化氮', '一氧化氮促进血管舒张并影响运动血流与血压反应'],
  },
  zinc:{
    cycle:'4-8 周观察免疫、皮肤或伤口相关目标；长期补充应关注铜摄入和总锌剂量。',
    usagePlans:['优先确认饮食缺口，不把高剂量锌当作长期免疫增强方案', '空腹恶心时随餐使用', '连续使用超过 8-12 周应复盘是否需要保留'],
    mechanism:['口服锌在小肠吸收', '与白蛋白等结合进入血液运输', '进入细胞后参与多种酶和转录因子功能', '影响免疫、皮肤修复、味觉和生殖相关过程', '过量时可能竞争性影响铜吸收'],
  },
  ashwagandha:{
    cycle:'4-8 周观察压力、睡眠和疲劳变化；甲状腺疾病、孕哺期或复杂用药者应先咨询医生。',
    usagePlans:['优先选择标准化提取物并从低剂量开始', '记录睡眠、压力和胃肠反应', '出现嗜睡、胃肠不适或甲状腺相关异常时停止并评估'],
    mechanism:['口服植物提取物后经胃肠吸收', '活性成分如 withanolides 进入循环', '分布到神经内分泌和免疫相关组织', '可能影响应激轴和炎症/氧化应激相关通路', '经肝脏代谢后排泄'],
  },
  coq10:{
    cycle:'4-12 周观察疲劳、运动耐受或偏头痛频率；心血管用药人群需核对相互作用。',
    usagePlans:['随含脂肪餐服用通常更利于吸收', '偏头痛或疲劳目标应记录频率和强度', '华法林等抗凝药使用者需先咨询医生'],
    mechanism:['脂溶性辅酶 Q10 随餐进入肠道', '经胆汁乳化后进入乳糜微粒吸收', '随脂蛋白运输到组织', '进入线粒体膜相关结构', '在线粒体电子传递链中参与能量生成'],
  },
  probiotics:{
    cycle:'2-4 周观察腹胀、排便、胃肠耐受；免疫或皮肤目标通常需要更长周期且应按菌株判断。',
    usagePlans:['优先选择标注清楚菌株和 CFU 的产品', '消化目标先观察 2-4 周', '免疫力严重低下者不应自行使用'],
    mechanism:['活菌经口服进入胃肠道', '部分菌株耐受胃酸和胆汁后到达肠道', '短期定植或经过肠道时与原有菌群互动', '影响黏膜屏障、短链脂肪酸和免疫信号', '随肠道环境变化而增减或排出'],
  },
  curcumin:{
    cycle:'4-8 周观察关节、消化或恢复目标；胆囊疾病或抗凝药使用者需先咨询医生。',
    usagePlans:['选择吸收设计清楚的产品，避免只看姜黄粉总量', '随餐使用并观察胃肠耐受', '不要和抗凝风险场景自行叠加'],
    mechanism:['姜黄素口服后在肠道吸收率较低', '配方常通过黑胡椒素或脂质载体提高暴露量', '吸收后经肝脏和肠道快速代谢', '代谢物进入循环并分布到组织', '影响炎症和氧化应激相关信号'],
  },
  melatonin:{
    cycle:'3-7 天观察入睡和次日困倦；时差或短期节律调整可短期使用，长期失眠应先评估原因。',
    usagePlans:['从低剂量开始，睡前 30-60 分钟使用', '记录入睡时间、夜醒和次日困倦', '避免与酒精、镇静药或复杂助眠复方自行叠加'],
    mechanism:['口服褪黑素经胃肠吸收进入血液', '经肝脏首过代谢后形成短时血药峰值', '与 MT1/MT2 等褪黑素受体结合', '向中枢提供夜间节律信号', '经肝脏代谢后由尿液排出代谢物'],
  },
  collagen:{
    cycle:'8-12 周观察皮肤、关节或训练恢复目标；过敏来源和蛋白总摄入需一起考虑。',
    usagePlans:['按日补充并配合足量蛋白和维生素 C 摄入', '皮肤和关节目标至少观察 8 周', '鱼源胶原需注意鱼类过敏'],
    mechanism:['水解胶原蛋白在胃肠道分解为小肽和氨基酸', '小肽和氨基酸经小肠吸收进入血液', '分布到皮肤、关节和结缔组织', '为胶原合成提供原料并可能提供信号刺激', '未利用部分进入普通氨基酸代谢池'],
  },
  nac:{
    cycle:'2-4 周观察呼吸道黏液、疲劳或耐受；长期或高风险场景应咨询医生。',
    usagePlans:['从低剂量开始观察胃部不适', '呼吸系统目标记录咳痰和不适变化', '哮喘、组胺不耐受或复杂用药者需谨慎'],
    mechanism:['NAC 口服后经胃肠吸收', '在体内脱乙酰成为半胱氨酸来源', '进入谷胱甘肽合成和氧化还原代谢', '巯基结构可影响黏液二硫键', '经代谢后进入硫氨基酸相关排泄路径'],
  },
  berberine:{
    cycle:'8-12 周观察血糖、血脂和胃肠耐受；正在使用降糖药或孕期禁用场景需先咨询医生。',
    usagePlans:['通常围绕餐前分次使用，但应先核对药物和禁忌', '血糖血脂目标必须看指标而不是体感', '出现低血糖或明显胃肠不适应停止评估'],
    mechanism:['小檗碱口服后吸收率较低', '在肠道腔内和肠上皮局部产生作用', '少量吸收后经肝脏代谢', '影响 AMPK、肠道菌群和糖脂代谢相关通路', '经胆汁和尿液等路径排泄代谢物'],
  },
  rhodiola:{
    cycle:'2-4 周观察疲劳、压力和睡眠；双相情感障碍或易激惹人群不应自行使用。',
    usagePlans:['早些时候使用更利于观察精神状态，避免影响睡眠', '记录疲劳、焦虑和睡眠变化', '出现兴奋、头晕或口干时停止评估'],
    mechanism:['红景天提取物经胃肠道吸收', 'rosavins 和 salidroside 等成分进入循环', '分布到神经和应激反应相关组织', '可能影响单胺递质和应激反应通路', '经肝肾代谢与排泄'],
  },
  bcomplex:{
    cycle:'4-8 周观察疲劳、口腔/皮肤和神经相关目标；长期高剂量尤其需关注 B6。',
    usagePlans:['优先用于饮食不足、素食或特定缺乏风险', '不要把高剂量 B 族当作长期提神方案', '复盘尿色变化以外的真实目标改善'],
    mechanism:['B 族维生素经胃肠吸收进入血液', '在组织内转化为辅酶活性形式', '参与能量代谢、神经递质和红细胞生成', '水溶性成分多余部分主要经尿液排出', '不同 B 族成员在体内周转和储存能力不同'],
  },
  lionsmane:{
    cycle:'8-12 周观察认知、情绪或胃肠耐受；蘑菇过敏者需避免。',
    usagePlans:['从单一产品开始，避免和多种认知复方叠加', '记录注意力、记忆和情绪变化', '对认知收益保持探索级预期'],
    mechanism:['猴头菇提取物口服后在胃肠道消化吸收', '多糖和脂溶性小分子成分进入不同代谢路径', '部分成分可能与免疫和神经相关信号互动', '机制研究提示可能影响神经生长因子相关路径', '未吸收成分继续与肠道环境互动或排出'],
  },
  glycine:{
    cycle:'1-2 周观察入睡、夜醒和次日精神；运动恢复目标可观察 2-4 周。',
    usagePlans:['睡眠目标常在睡前使用', '记录睡眠质量和胃肠反应', '不要和多种助眠复方同时新增'],
    mechanism:['甘氨酸口服后经小肠吸收进入血液', '进入普通氨基酸代谢池', '参与蛋白质、胶原和谷胱甘肽等合成', '也可作为抑制性神经递质参与中枢信号', '多余部分经代谢后进入能量或排泄路径'],
  },
  quercetin:{
    cycle:'2-4 周观察过敏、鼻眼症状或运动恢复；用药人群需核对代谢相互作用。',
    usagePlans:['过敏季可按症状短期观察', '记录鼻塞、喷嚏、眼痒和胃肠耐受', '正在使用窄治疗窗药物者需先咨询医生'],
    mechanism:['槲皮素口服后在肠道吸收', '吸收过程中发生葡萄糖醛酸化、硫酸化等代谢', '代谢物进入循环并分布到组织', '可能影响肥大细胞、组胺释放和炎症信号', '经胆汁和尿液等路径排泄代谢物'],
  },
};

// ==================== HEALTH QUESTIONNAIRE ====================
const QUIZ = [
  {
    q:'您的运动频率？',
    opts:['几乎不动','每周1-2次','每周3-5次','几乎每天运动'],
    boosts:[[],[],['creatine','citrulline','magnesium'],['creatine','citrulline','magnesium']]
  },
  {
    q:'您的睡眠质量？',
    opts:['很好，一觉到天亮','一般，偶尔失眠','差，经常入睡困难','很差，依赖药物'],
    targets:[[],['睡眠质量差'],['睡眠质量差','压力/焦虑'],['睡眠质量差','压力/焦虑']]
  },
  {
    q:'您近期的压力水平？',
    opts:['轻松自在','轻度压力','中度压力','高压，身心俱疲'],
    targets:[[],['压力/焦虑'],['压力/焦虑'],['压力/焦虑']]
  },
  {
    q:'您最关心的健康领域？（选最重要的）',
    opts:['大脑/认知/情绪','运动/体能/恢复','心脏/代谢/体重','免疫/抗炎/抗老'],
    targets:[['脑雾/认知','情绪低落'],['运动表现提升','肌肉恢复'],['心血管健康','高甘油三酯'],['免疫力低下','关节炎症']]
  },
  {
    id:'bp',
    q:'您是否有血压偏高的困扰？',
    opts:['没有，血压正常','偏高，在监测中','确诊高血压，在用药'],
    targets:[[],['血压偏高'],['血压偏高']]
  },
  {
    id:'risk',
    q:'以下哪种情况最符合您？',
    opts:['均不符合','正在使用处方药','备孕/怀孕/哺乳','肝肾疾病或近期手术'],
    risks:['','正在使用处方药，需要重点核对药物相互作用','备孕/怀孕/哺乳期不建议自行补充，需先咨询医生','肝肾疾病或近期手术属于高风险场景，需先咨询医生']
  },
  {
    q:'您的消化系统状况？',
    opts:['很好，没有不适','偶尔腹胀/消化不良','经常便秘或腹泻','确诊IBS/IBD等消化疾病'],
    targets:[[],['消化问题'],['消化问题'],['消化问题']]
  },
  {
    q:'您的关节/骨骼状况？',
    opts:['很好，没有不适','偶尔酸痛','经常关节不适','确诊关节炎/骨质疏松等'],
    targets:[[],['关节炎症'],['关节炎症'],['关节炎症','骨质疏松风险']]
  },
  {
    q:'您的皮肤状况？',
    opts:['很好','偏干燥','有痤疮/痘痘困扰','有明显的皮肤老化/炎症'],
    targets:[[],['皮肤干燥'],['皮肤问题/痤疮'],['皮肤干燥']]
  },
  {
    q:'您的注意力/记忆力？',
    opts:['很好，思路清晰','偶尔脑雾/走神','经常注意力不集中','明显下降，影响工作'],
    targets:[[],['脑雾/认知'],['注意力不集中','脑雾/认知'],['记忆下降','脑雾/认知']]
  },
  {
    q:'您是否经常感到疲劳？',
    opts:['精力充沛','偶尔疲劳','经常疲劳','严重影响生活'],
    targets:[[],['疲劳感'],['疲劳感'],['疲劳感']]
  },
  {
    q:'您是否容易生病/感染？',
    opts:['很少生病','一年1-2次感冒','一年3次以上','免疫力明显偏低'],
    targets:[[],['免疫力低下'],['免疫力低下'],['免疫力低下']]
  },
  {
    q:'您是否有过敏问题？',
    opts:['没有','季节性过敏（花粉/尘螨）','食物过敏','药物或接触性过敏'],
    targets:[[],['过敏/季节性不适'],['消化问题'],['过敏/季节性不适']]
  },
];

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
  
  console.log('%c🧬 保健成分匹配引擎 %c已就绪','color:#1a5632;font-size:16px','');
  console.log(`%c  ${SUPPLEMENTS.length}种成分 · ${QUIZ.length}道问卷题 · 循证推荐`,'color:#5a7d6a');
})();
