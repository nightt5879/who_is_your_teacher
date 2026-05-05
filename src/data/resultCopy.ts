import type { ResultCode, ResultCopy } from "../types";

export const RESULT_COPY: Record<ResultCode, ResultCopy> = {
  KHRUSHCHEV: {
    code: "KHRUSHCHEV",
    name: "赫鲁晓夫",
    subtitle: "集体任务推进器",
    oneLiner: "TA 不是在布置作业，TA 是在推进班级生产指标。",
    damageIndex: "作业轰炸 98 / 统筹压力 91 / 生存概率 18",
    teacherQuote: "同学们，这个任务我们集体完成一下。",
    survivalGuide: "不要单打独斗。组队分工、共享资料、提前排产，才有机会在任务海里保住呼吸。",
    tags: ["集体劳动", "作业密集", "DDL 管理"],
    visual: "集"
  },
  ART_STUDENT: {
    code: "ART_STUDENT",
    name: "小胡子美术生",
    subtitle: "纪律与格式的极致信徒",
    oneLiner: "TA 的课堂像精密仪式，迟到一秒都像历史错误。",
    damageIndex: "纪律威压 100 / 格式洁癖 96 / 呼吸自由 6",
    teacherQuote: "规则只有一套，所有人都按这套来。",
    survivalGuide: "把格式模板、签到规则、平时分细则全部置顶。少问为什么，多检查一遍。",
    tags: ["高压纪律", "格式统一", "规则至上"],
    visual: "规"
  },
  TRUMP: {
    code: "TRUMP",
    name: "特朗普",
    subtitle: "课堂气势型选手",
    oneLiner: "TA 的重点可能会绕路，但气势永远先到。",
    damageIndex: "整活浓度 94 / 话术风暴 88 / 笔记可用率 31",
    teacherQuote: "这个东西，非常重要，非常非常重要。",
    survivalGuide: "抓关键词，不要追每一次话题漂移。TA 起势时记标题，TA 收尾时记结论。",
    tags: ["演讲型", "强气场", "跳跃表达"],
    visual: "势"
  },
  PATRICK: {
    code: "PATRICK",
    name: "派大星",
    subtitle: "松弛但迷航",
    oneLiner: "TA 给了你自由，也顺手把课程导航关了。",
    damageIndex: "摆烂指数 91 / 神游半径 80 / 压迫感 8",
    teacherQuote: "这个你们自己看看，应该不难。",
    survivalGuide: "自由不是放飞，是自救。自己列学习路线，按周补齐，不然期末会突然醒来。",
    tags: ["低压", "失联", "自学警告"],
    visual: "松"
  },
  THANOS: {
    code: "THANOS",
    name: "灭霸",
    subtitle: "考试响指执行者",
    oneLiner: "TA 出卷不杀生，只让半个班安静。",
    damageIndex: "考试突袭 100 / 精神压迫 94 / 班级音量 0",
    teacherQuote: "这题不难，认真学过都能做。",
    survivalGuide: "别赌重点。按知识树复习，保基础、冲大题，考前别被“简单”两个字骗走。",
    tags: ["卷面压迫", "期末杀伤", "冷酷评分"],
    visual: "考"
  },
  BUU: {
    code: "BUU",
    name: "魔人布欧",
    subtitle: "笑着开副本的人",
    oneLiner: "TA 很会整活，问题是整着整着作业也变异了。",
    damageIndex: "混沌整活 96 / 项目爆炸 88 / 安全距离 12",
    teacherQuote: "我们做个小项目，很简单，大家发挥一下。",
    survivalGuide: "先确认验收标准，再确认截止时间。所有口头变化都截图，别让快乐变成返工。",
    tags: ["项目副本", "欢乐高压", "不可预测"],
    visual: "副"
  },
  GOTHAM_RIDDLER: {
    code: "GOTHAM_RIDDLER",
    name: "哥谭谜语人",
    subtitle: "每句话都像暗号",
    oneLiner: "TA 不是不讲重点，TA 是把重点藏进谜面里。",
    damageIndex: "谜语浓度 100 / 暗示准确率 22 / 玄学尊重 89",
    teacherQuote: "这个地方你们要自己体会。",
    survivalGuide: "课后立刻和同学对答案，把模糊表达翻译成行动项。别独自解谜。",
    tags: ["玄学表达", "重点不明", "答疑更迷"],
    visual: "谜"
  },
  RONG: {
    code: "RONG",
    name: "容嬷嬷",
    subtitle: "精准扣分艺术家",
    oneLiner: "TA 的红笔落点很准，准到你开始反思人生排版。",
    damageIndex: "扣分精度 96 / 红笔密度 92 / 心理防线 17",
    teacherQuote: "错在哪，就扣在哪。",
    survivalGuide: "交作业前照着 rubric 逐项自查。格式、引用、单位、页边距，一个都别放过。",
    tags: ["严厉批改", "格式扣分", "精准打击"],
    visual: "批"
  },
  HOLMES: {
    code: "HOLMES",
    name: "福尔摩斯",
    subtitle: "课堂侦探",
    oneLiner: "TA 能从你的眼神里推理出你昨晚没预习。",
    damageIndex: "观察力 97 / 抽问压强 75 / 逃逸成功率 9",
    teacherQuote: "你这个表情，说明这个概念还没过。",
    survivalGuide: "课前看目录和例题，哪怕只会三成，也比裸奔更容易保住现场。",
    tags: ["抽问", "推理式点名", "细节敏锐"],
    visual: "侦"
  },
  KONGMING: {
    code: "KONGMING",
    name: "诸葛亮",
    subtitle: "清醒但费命的推进者",
    oneLiner: "TA 的路线很清楚，只是每一步都要你亲自北伐。",
    damageIndex: "规划清晰 93 / 学习消耗 84 / 服气程度 76",
    teacherQuote: "我们按计划推进，今天把这部分拿下。",
    survivalGuide: "跟紧节奏，别拖欠。TA 的课最怕小债滚成大债，周周清才是正解。",
    tags: ["路线清楚", "强推进", "严格有效"],
    visual: "谋"
  },
  SPONGEBOB: {
    code: "SPONGEBOB",
    name: "海绵宝宝",
    subtitle: "热情救场型",
    oneLiner: "TA 的课堂像一块黄色海绵，能把尴尬和错误都吸走。",
    damageIndex: "人性关怀 95 / 课堂活力 82 / 精神恢复 90",
    teacherQuote: "没关系，我们再来一遍。",
    survivalGuide: "珍惜这种老师。主动反馈、主动提问，TA 的善意会变成你真正学会的东西。",
    tags: ["温柔", "鼓励", "课堂有光"],
    visual: "暖"
  },
  SQUIDWARD: {
    code: "SQUIDWARD",
    name: "章鱼哥",
    subtitle: "疲惫但仍在营业",
    oneLiner: "TA 像是想下班，但职业道德把 TA 留在讲台上。",
    damageIndex: "疲惫浓度 88 / 回复速度 33 / 低气压 42",
    teacherQuote: "你先看一下课件。",
    survivalGuide: "沟通尽量具体，别发大段情绪。问清楚问题、给出页码，TA 才更可能精准回复。",
    tags: ["低能量", "慢回复", "务实求生"],
    visual: "倦"
  },
  CAPYBARA: {
    code: "CAPYBARA",
    name: "卡皮巴拉",
    subtitle: "稳定情绪稀有物种",
    oneLiner: "天塌下来 TA 也会先确认大家有没有带伞。",
    damageIndex: "情绪稳定 99 / 压迫感 5 / 课堂舒适度 92",
    teacherQuote: "没事，慢慢处理。",
    survivalGuide: "别因为低压就摆烂。TA 给你的空间，是让你把事情做好，不是让事情消失。",
    tags: ["稳定", "低压", "治愈"],
    visual: "稳"
  },
  NPC_AI: {
    code: "NPC_AI",
    name: "人机",
    subtitle: "语言完整但灵魂离线",
    oneLiner: "TA 的回答每个字都对，合起来却让你更想重启。",
    damageIndex: "机械感 96 / 有用信息 28 / 困惑回声 91",
    teacherQuote: "根据相关要求，建议你综合理解。",
    survivalGuide: "把问题拆成选择题或判断题问。越具体，越能从长答案里挖出能用的部分。",
    tags: ["机械答疑", "长但没用", "信息迷雾"],
    visual: "机"
  },
  TAILOR: {
    code: "TAILOR",
    name: "裁缝",
    subtitle: "祖传课件拼接师",
    oneLiner: "TA 的 PPT 像时间胶囊，打开能看见很多届老师的灵感。",
    damageIndex: "拼布浓度 94 / 课件年代感 87 / 重点辨识 36",
    teacherQuote: "这个 PPT 是以前留下来的，我补充一下。",
    survivalGuide: "别迷信课件顺序。按老师现场强调、作业要求和考试范围重新整理一版自己的笔记。",
    tags: ["祖传 PPT", "材料拼接", "重点散落"],
    visual: "拼"
  },
  QIN: {
    code: "QIN",
    name: "秦始皇",
    subtitle: "统一格式第一人",
    oneLiner: "TA 看见不统一的命名，就像看见边疆还没收复。",
    damageIndex: "格式统治 100 / 纪律秩序 96 / 反抗空间 4",
    teacherQuote: "所有文件名按要求来，标点也要统一。",
    survivalGuide: "建立模板，复制模板，检查模板。和 TA 相处，标准化就是护身符。",
    tags: ["统一", "秩序", "格式强迫"],
    visual: "统"
  },
  PRESSURE_MONSTER: {
    code: "PRESSURE_MONSTER",
    name: "压力怪",
    subtitle: "低气压训练营主理人",
    oneLiner: "TA 不一定大声，但椅子都知道今天不能响。",
    damageIndex: "精神压迫 100 / DDL 闪击 94 / 睡眠余额 8",
    teacherQuote: "这个明天交，大家应该来得及。",
    survivalGuide: "把所有任务提前一天当截止。和压力怪比速度，别和压力怪比心态。",
    tags: ["高压", "DDL", "低气压"],
    visual: "压"
  },
  KAKASHI: {
    code: "KAKASHI",
    name: "卡卡西",
    subtitle: "永远在路上的隐藏老师",
    oneLiner: "TA 会迟到，但理由听起来像刚完成秘密任务。",
    damageIndex: "失联概率 95 / 调课频率 89 / 忍者气质 100",
    teacherQuote: "不好意思，路上有点事，我们顺延一下。",
    survivalGuide: "把所有通知截图，随时确认教室和时间。别凭记忆上课，凭证据活着。",
    tags: ["隐藏结果", "调课", "迟到"],
    visual: "隐"
  },
  LINGZHU: {
    code: "LINGZHU",
    name: "灵珠",
    subtitle: "温柔但有边界",
    oneLiner: "TA 很照顾人，但不会把课变成无条件放水。",
    damageIndex: "人性关怀 100 / 要求强度 52 / 安全感 88",
    teacherQuote: "你可以慢一点，但要真的弄懂。",
    survivalGuide: "认真回应 TA 的善意。该问就问，该改就改，这种老师值得你拿出配合度。",
    tags: ["隐藏结果", "温柔有要求", "正向成长"],
    visual: "善"
  },
  MOWAN: {
    code: "MOWAN",
    name: "魔丸",
    subtitle: "混沌高压复合体",
    oneLiner: "TA 的课堂不是暴风雨，是暴风雨学会了出卷。",
    damageIndex: "混沌 98 / 压迫 99 / 关怀余额 5",
    teacherQuote: "临时加一个小测，检验一下大家。",
    survivalGuide: "所有东西都留备份，所有通知都当真，所有侥幸都删掉。求稳是唯一战术。",
    tags: ["隐藏结果", "混沌", "高压"],
    visual: "乱"
  },
  NINE_COLORED_DEER: {
    code: "NINE_COLORED_DEER",
    name: "九色鹿",
    subtitle: "梦中情师",
    oneLiner: "TA 是教务系统里罕见的温柔补丁。",
    damageIndex: "人性关怀 100 / 精神损伤 3 / 珍稀程度 SSS",
    teacherQuote: "先照顾好自己，学习我们慢慢来。",
    survivalGuide: "好好学，别辜负。遇到九色鹿不是躺平许可，是认真生活的奖励。",
    tags: ["隐藏结果", "低压", "梦中情师"],
    visual: "鹿"
  },
  SWEEPING_MONK: {
    code: "SWEEPING_MONK",
    name: "扫地僧",
    subtitle: "低调高手",
    oneLiner: "TA 不制造压迫，但每句话都能把知识点放回原位。",
    damageIndex: "教学功力 96 / 温和严格 84 / 服气程度 93",
    teacherQuote: "这个地方本质上很简单，我们从头看。",
    survivalGuide: "别被温和迷惑，TA 讲的都是干货。课后复盘一遍，会发现自己真的在升级。",
    tags: ["隐藏结果", "高手", "清晰"],
    visual: "悟"
  },
  FINAL_BOSS: {
    code: "FINAL_BOSS",
    name: "大boss",
    subtitle: "人生副本守门员",
    oneLiner: "这不是一门课，这是你大学生涯的主线战役。",
    damageIndex: "综合威压 100 / 副本难度 S+ / 存档需求 100",
    teacherQuote: "这部分都要掌握，后面还会用。",
    survivalGuide: "建立复习档案、作业档案、问题档案。打大boss 不靠临场发挥，靠装备和队友。",
    tags: ["隐藏结果", "终极压迫", "副本战"],
    visual: "Boss"
  }
};
