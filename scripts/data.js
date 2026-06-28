(() => {
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
    id:'ashwagandha',name:'南非醉茄 (Ashwagandha)',cat:'植物提取物',emoji:'🌿',
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

const ALL_SUPPLEMENT_IDS = SUPPLEMENTS.map(s=>s.id);
const PREGNANCY_BLOCK_IDS = ['theanine','melatonin','ashwagandha','rhodiola','berberine'];
const MEDICATION_BLOCK_IDS = ['omega3','citrulline','theanine','melatonin','ashwagandha','coq10','curcumin','berberine','rhodiola','quercetin'];
const KIDNEY_LIVER_BLOCK_IDS = ['creatine','magnesium','vitamind','zinc','melatonin','ashwagandha','rhodiola','berberine','nac'];

const PROFILE_QUESTIONS = [
  {
    profile:true,
    q:'先确认基础画像：你的年龄段？',
    opts:['未满18岁','18-39岁','40-59岁','60岁以上'],
    blockedIds:[ALL_SUPPLEMENT_IDS,[],[],['melatonin','ashwagandha','rhodiola','berberine','citrulline','coq10','curcumin','quercetin']],
    cautionIds:[[],[],[],ALL_SUPPLEMENT_IDS],
    safetyStops:['未成年人不建议自行使用补剂推荐报告，请由监护人陪同咨询医生或营养师','','','60岁以上人群更容易存在用药、慢病和肝肾功能差异，建议先咨询医生再补充']
  },
  {
    profile:true,
    q:'你的生理性别或当前状态？',
    opts:['男性','女性，非备孕/孕哺','备孕/怀孕/哺乳','不便透露'],
    blockedIds:[[],[],PREGNANCY_BLOCK_IDS,[]],
    cautionIds:[[],[],['omega3','vitamind','magnesium','zinc','probiotics','collagen'],[]],
    safetyStops:['','','备孕/怀孕/哺乳期不建议自行新增补剂，应先咨询医生或营养师','']
  },
  {
    profile:true,
    q:'你现在是否正在使用处方药或固定补剂？',
    opts:['都没有','正在使用处方药','正在吃补剂','处方药和补剂都有'],
    blockedIds:[[],MEDICATION_BLOCK_IDS,[],MEDICATION_BLOCK_IDS],
    cautionIds:[[],ALL_SUPPLEMENT_IDS,[],ALL_SUPPLEMENT_IDS],
    safetyStops:['','正在使用处方药时，补剂可能存在相互作用，不建议自行新增','已有补剂时需先核对重复和剂量，避免继续叠加','处方药和补剂同时使用时，建议先由医生或药师核对相互作用']
  },
  {
    profile:true,
    q:'如果你正在吃补剂，最主要是哪一类？',
    opts:['没有或不确定','复合维生素/B族','维D/钙/镁','鱼油','肌酸/运动补剂','助眠放松类','美容/益生菌复方'],
    duplicateIds:[[],['bcomplex'],['vitamind','magnesium'],['omega3'],['creatine','citrulline','bcomplex'],['magnesium','theanine','melatonin','glycine','ashwagandha'],['collagen','probiotics','zinc']],
    risks:['','已使用复合维生素或B族时，需要核对B6等剂量，避免长期高剂量重复','已使用维D/钙/镁时，需要核对剂量和肾结石/肾功能风险','已使用鱼油时，需要核对EPA+DHA实际含量和抗凝风险','运动补剂常见肌酸、瓜氨酸、咖啡因和B族重复，建议先拆配方','助眠放松类补剂不建议叠加新增，应先确认已有成分','美容或益生菌复方常有锌、胶原、益生菌重复，建议先核对配方表']
  },
];

const QUIZ_SETS = {
  general:{
    id:'general',
    title:'通用补剂筛选',
    subtitle:'适合还没有明确单一场景，只想先按目标、身体信号和风险做一次整体筛选。',
    candidateIds:null,
    questions:QUIZ,
  },
  sleep:{
    id:'sleep',
    title:'熬夜/睡眠/压力人群补剂报告',
    subtitle:'优先排查入睡、夜醒、压力、咖啡因、助眠补剂重复和镇静类用药风险。',
    candidateIds:['magnesium','theanine','melatonin','glycine','ashwagandha','rhodiola','bcomplex','vitamind','omega3'],
    questions:[
      {
        q:'你最想改善的睡眠或压力问题是什么？',
        opts:['入睡困难','夜醒/睡不沉','熬夜后疲劳恢复慢','白天压力大、放松困难'],
        targets:[['睡眠质量差'],['睡眠质量差'],['疲劳感','脑雾/认知'],['压力/焦虑']],
        boosts:[['melatonin','glycine'],['magnesium','glycine'],['bcomplex','vitamind'],['theanine','magnesium']]
      },
      {
        q:'你通常几点后还在工作、学习或刷手机？',
        opts:['23点前基本结束','23点-0点','0点-1点','1点以后'],
        targets:[[],['睡眠质量差'],['睡眠质量差','疲劳感'],['睡眠质量差','疲劳感','脑雾/认知']],
        boosts:[[],['theanine'],['magnesium','glycine'],['melatonin','glycine']]
      },
      {
        q:'你下午或晚上摄入咖啡因的情况？',
        opts:['几乎不喝咖啡/茶/能量饮料','只在上午喝','下午也会喝','晚上也会喝'],
        targets:[[],[],['睡眠质量差','压力/焦虑'],['睡眠质量差','压力/焦虑']],
        cautionIds:[[],[],['theanine','melatonin'],['theanine','melatonin']],
        boosts:[[],[],['theanine'],['theanine']]
      },
      {
        q:'你现在是否已经在用助眠或放松类补剂？',
        opts:['没有','镁/茶氨酸/甘氨酸之一','褪黑素或助眠复方','同时用了好几种'],
        duplicateIds:[[],['magnesium','theanine','glycine'],['melatonin'],['magnesium','theanine','glycine','melatonin','ashwagandha']],
        risks:['','','已使用褪黑素或助眠复方，需要避免重复叠加','已同时使用多种助眠方向成分，建议先减少重复而不是继续新增']
      },
      {
        q:'你是否使用安眠、抗焦虑、抗抑郁或镇静类药物？',
        opts:['没有','偶尔使用','正在规律使用','不确定药物类型'],
        cautionIds:[[],['theanine','melatonin','ashwagandha','glycine'],['theanine','melatonin','ashwagandha','glycine'],['theanine','melatonin','ashwagandha','glycine']],
        risks:['','镇静/精神科相关药物场景需先咨询医生','正在规律使用镇静或精神科相关药物，不建议自行叠加助眠补剂','不确定药物类型时，应先核对药物相互作用']
      },
      {
        q:'你的运动频率更接近哪种？',
        opts:['几乎不运动','每周1-2次','每周3-5次','高强度或几乎每天'],
        targets:[[],['疲劳感'],['肌肉恢复','疲劳感'],['肌肉恢复','疲劳感']],
        boosts:[[],['magnesium'],['magnesium','omega3'],['magnesium','glycine','omega3']]
      },
      {
        q:'你近期主要的压力表现是？',
        opts:['没有明显压力','脑子停不下来','紧张易怒','持续疲惫、提不起劲'],
        targets:[[],['压力/焦虑','脑雾/认知'],['压力/焦虑'],['疲劳感','情绪低落']],
        boosts:[[],['theanine','magnesium'],['theanine','ashwagandha'],['rhodiola','bcomplex','vitamind']]
      },
      {
        q:'以下哪种情况最符合你？',
        opts:['均不符合','备孕/怀孕/哺乳','肝肾疾病或近期手术','低血压或容易头晕'],
        blockedIds:[[],PREGNANCY_BLOCK_IDS,KIDNEY_LIVER_BLOCK_IDS,[]],
        cautionIds:[[],['omega3','vitamind','magnesium'],KIDNEY_LIVER_BLOCK_IDS,['theanine','magnesium','citrulline']],
        risks:['','备孕/怀孕/哺乳期不建议自行补充助眠或适应原类成分','肝肾疾病或近期手术属于高风险场景，需先咨询医生','低血压或容易头晕时，放松类和血流相关成分需谨慎']
      },
      {
        q:'你希望这份报告更偏向什么？',
        opts:['尽量温和、先排除风险','快速改善入睡体验','熬夜后恢复精力','白天压力管理'],
        targets:[[],['睡眠质量差'],['疲劳感','脑雾/认知'],['压力/焦虑','注意力不集中']],
        boosts:[['magnesium','glycine'],['melatonin','glycine'],['bcomplex','rhodiola'],['theanine','magnesium']]
      },
    ],
  },
  women:{
    id:'women',
    title:'女性基础营养/经期营养报告',
    subtitle:'围绕经期疲劳、饮食缺口、日晒、皮肤头发、肠胃和孕哺风险，先做基础营养筛选。',
    candidateIds:['bcomplex','vitamind','magnesium','omega3','probiotics','collagen','zinc','glycine'],
    questions:[
      {
        q:'你最想改善的女性基础营养问题是什么？',
        opts:['经期前后疲劳或情绪波动','皮肤干燥/头发状态差','饮食不规律、容易累','肠胃和排便不稳定'],
        targets:[['疲劳感','情绪低落'],['皮肤干燥','脱发'],['疲劳感'],['消化问题']],
        boosts:[['magnesium','bcomplex'],['collagen','zinc'],['bcomplex','vitamind'],['probiotics','magnesium']]
      },
      {
        q:'你的经期情况更接近哪种？',
        opts:['周期和经量基本稳定','经期容易腹部不适或睡不好','经量明显偏多或周期紊乱','已闭经/不适用'],
        targets:[[],['睡眠质量差','压力/焦虑'],['疲劳感'],[]],
        boosts:[[],['magnesium','glycine'],['bcomplex'],[]],
        risks:['','','经量明显偏多或周期紊乱时，铁/叶酸等不应盲补，建议先做检查或咨询医生','']
      },
      {
        q:'你的饮食结构更接近哪种？',
        opts:['比较均衡','经常外卖/节食','素食或很少吃肉蛋奶','蛋白质摄入不足'],
        targets:[[],['疲劳感','皮肤问题/痤疮'],['疲劳感','脱发'],['皮肤干燥','伤口愈合慢']],
        boosts:[[],['bcomplex','probiotics'],['bcomplex','zinc'],['collagen','zinc']]
      },
      {
        q:'你的日晒和户外活动情况？',
        opts:['经常户外活动','偶尔晒太阳','大多数时间室内','几乎不晒太阳且防晒严格'],
        targets:[[],['疲劳感'],['骨质疏松风险','疲劳感'],['骨质疏松风险','疲劳感','情绪低落']],
        boosts:[[],['vitamind'],['vitamind'],['vitamind']]
      },
      {
        q:'你现在已经在吃哪些补剂？',
        opts:['没有或很少','复合维生素/B族','维D/钙/镁','胶原/益生菌/美容复方'],
        duplicateIds:[[],['bcomplex'],['vitamind','magnesium'],['collagen','probiotics','zinc']],
        risks:['','已使用复合维生素或B族时，需要核对B6等剂量，避免长期高剂量重复','已使用维D/钙/镁时，需要核对剂量和肾结石/肾功能风险','美容复方常有重复成分，建议先拆清配方表']
      },
      {
        q:'备孕、怀孕或哺乳情况？',
        opts:['均不符合','备孕中','怀孕中','哺乳中'],
        blockedIds:[[],PREGNANCY_BLOCK_IDS,PREGNANCY_BLOCK_IDS,PREGNANCY_BLOCK_IDS],
        cautionIds:[[],['omega3','vitamind','magnesium'],['omega3','vitamind','magnesium'],['omega3','vitamind','magnesium']],
        risks:['','备孕期叶酸/铁/碘等需按指南或医生建议，不建议用普通补剂报告替代','怀孕期不建议自行新增草本、褪黑素或降糖类补剂','哺乳期新增补剂需先咨询医生或营养师']
      },
      {
        q:'你的消化和皮肤状态？',
        opts:['都比较稳定','容易腹胀/便秘/腹泻','痘痘或皮肤炎症明显','皮肤干燥、弹性下降'],
        targets:[[],['消化问题'],['皮肤问题/痤疮','消化问题'],['皮肤干燥']],
        boosts:[[],['probiotics','magnesium'],['zinc','probiotics'],['collagen','omega3']]
      },
      {
        q:'是否有长期用药、肝肾疾病或近期手术？',
        opts:['没有','正在长期用药','肝肾疾病','近期手术或准备手术'],
        blockedIds:[[],MEDICATION_BLOCK_IDS,KIDNEY_LIVER_BLOCK_IDS,['omega3','curcumin','quercetin']],
        cautionIds:[[],ALL_SUPPLEMENT_IDS,KIDNEY_LIVER_BLOCK_IDS,['omega3','curcumin']],
        risks:['','长期用药时需要核对补剂相互作用','肝肾疾病属于高风险场景，矿物质和脂溶性维生素需谨慎','围手术期应告知医生所有补剂，尤其抗凝风险方向']
      },
      {
        q:'你希望报告优先帮你做什么？',
        opts:['基础营养缺口筛选','经期前后状态支持','皮肤/头发基础营养','减少重复购买和叠加'],
        targets:[['疲劳感','骨质疏松风险'],['疲劳感','压力/焦虑'],['皮肤干燥','脱发'],[]],
        boosts:[['vitamind','bcomplex'],['magnesium','omega3'],['collagen','zinc'],['bcomplex','vitamind','magnesium']]
      },
    ],
  },
  fitness:{
    id:'fitness',
    title:'健身新手补剂避坑报告',
    subtitle:'按训练目标、蛋白摄入、恢复、睡眠、现有补剂和血压/肾功能风险筛掉不必要组合。',
    candidateIds:['creatine','citrulline','magnesium','omega3','vitamind','glycine','collagen','curcumin','coq10','bcomplex'],
    questions:[
      {
        q:'你的主要训练目标是什么？',
        opts:['增肌/力量提升','减脂塑形','提升耐力或有氧表现','减少酸痛、恢复更好'],
        targets:[['运动表现提升','肌肉恢复'],['疲劳感'],['运动表现提升','血液循环差'],['肌肉恢复','关节炎症']],
        boosts:[['creatine'],['bcomplex','magnesium'],['citrulline','coq10'],['magnesium','omega3','curcumin']]
      },
      {
        q:'你目前训练频率？',
        opts:['刚开始或每周1次以内','每周2-3次','每周4-5次','高强度或几乎每天'],
        targets:[[],['运动表现提升'],['运动表现提升','肌肉恢复'],['肌肉恢复','疲劳感']],
        boosts:[[],['creatine'],['creatine','magnesium'],['creatine','magnesium','omega3']]
      },
      {
        q:'你的蛋白质摄入情况？',
        opts:['每餐基本有肉蛋奶豆','有时不足','经常不足或节食','已经在喝蛋白粉'],
        targets:[[],['肌肉恢复','疲劳感'],['肌肉恢复','疲劳感'],['肌肉恢复']],
        boosts:[[],['bcomplex'],['bcomplex'],[]],
        duplicateIds:[[],[],[],['collagen']],
        risks:['','','','已使用蛋白粉时，胶原蛋白不应被当作完整蛋白替代']
      },
      {
        q:'你现在已经在吃哪些运动补剂？',
        opts:['没有','蛋白粉/复合维生素','肌酸','氮泵/咖啡因/多成分复方'],
        duplicateIds:[[],['bcomplex'],['creatine'],['citrulline','creatine','bcomplex']],
        cautionIds:[[],[],[],['citrulline','theanine','rhodiola']],
        risks:['','','已使用肌酸时，不需要重复购买肌酸复方','多成分运动复方容易重复咖啡因、瓜氨酸和B族，建议先拆配方']
      },
      {
        q:'你的训练恢复问题更明显的是？',
        opts:['没有明显问题','肌肉酸痛久','睡眠影响恢复','关节或软组织不适'],
        targets:[[],['肌肉恢复'],['睡眠质量差','肌肉恢复'],['关节炎症']],
        boosts:[[],['magnesium','omega3'],['glycine','magnesium'],['collagen','omega3','curcumin']]
      },
      {
        q:'你的血压、心血管或头晕情况？',
        opts:['没有相关问题','血压偏高但未用药','确诊高血压/正在用药','低血压或运动中易头晕'],
        targets:[[],['血压偏高'],['血压偏高'],['血液循环差']],
        cautionIds:[[],['citrulline'],['citrulline','coq10','omega3'],['citrulline','magnesium']],
        risks:['','血压偏高时，氮泵/瓜氨酸类不应盲目叠加','正在用降压药时，血流和心血管相关补剂需先咨询医生','低血压或易头晕时，血流相关成分需谨慎']
      },
      {
        q:'你的肾功能、结石或胃肠耐受情况？',
        opts:['没有相关问题','肠胃容易不适','肾功能异常或不确定','有肾结石史'],
        blockedIds:[[],[],['creatine','magnesium','vitamind'],['vitamind','magnesium']],
        cautionIds:[[],['creatine','magnesium','curcumin'],['creatine','magnesium','vitamind'],['vitamind','magnesium']],
        risks:['','肠胃敏感时应避免一次新增多种粉剂或高剂量矿物质','肾功能异常或不确定时，肌酸和矿物质需先咨询医生','肾结石史时，维D/钙镁相关组合需结合检测评估']
      },
      {
        q:'你的睡眠和精力对训练的影响？',
        opts:['影响不大','偶尔睡不好','经常熬夜训练','白天疲劳明显'],
        targets:[[],['睡眠质量差'],['睡眠质量差','疲劳感'],['疲劳感','脑雾/认知']],
        boosts:[[],['magnesium','glycine'],['magnesium','glycine'],['bcomplex','vitamind']]
      },
      {
        q:'你希望报告优先避开什么坑？',
        opts:['少买没必要的复方','先选证据强的基础项','避免重复成分','避免和身体情况冲突'],
        boosts:[['creatine','magnesium'],['creatine','vitamind'],['creatine','bcomplex','citrulline'],['magnesium','omega3']],
        risks:['健身新手优先避免多成分复方，先验证单一成分','','重点核对肌酸、B族、咖啡因、瓜氨酸是否重复','优先排除血压、肾功能、胃肠和用药风险']
      },
    ],
  },
};

window.HealthMatchData = { SUPPLEMENTS, DETAIL_FALLBACKS, QUIZ, QUIZ_SETS, PROFILE_QUESTIONS };
})();
