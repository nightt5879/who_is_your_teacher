import type { Question } from "../types";

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "你的老师布置作业的量怎么样？",
    options: [
      { id: "a", text: "象征性留一口锅底，怕学生饿着。", delta: { CA: 2 } },
      { id: "b", text: "刚好能让我想起我还在上学。", delta: { HW: 1, CA: 1 } },
      { id: "c", text: "平时正常，周五晚上开始变异。", delta: { HW: 2, EX: 1, CH: 1 } },
      {
        id: "d",
        text: "集体劳动，人人有份，谁也别想跑。",
        delta: { HW: 3, CT: 2, AU: 1 },
        boost: { KHRUSHCHEV: 4 }
      },
      {
        id: "e",
        text: "我好像回到了高中：作业、订正、错题本，一样不缺。",
        delta: { HW: 3, CT: 3, AU: 2 },
        boost: { PRESSURE_MONSTER: 3 }
      }
    ]
  },
  {
    id: "q2",
    text: "这位老师说 DDL / 盯 DDL 的风格是什么？",
    options: [
      { id: "a", text: "布置时就说清楚，时间还给得像个人。", delta: { CA: 2, CT: 1 } },
      { id: "b", text: "布置时说明白，到点自己交，主打一个成年人自觉。", delta: { CA: 1, SL: 1 } },
      { id: "c", text: "DDL 一开始就说了，但每天提醒，像倒计时炸弹挂在班群里。", delta: { HW: 1, CT: 2, AU: 1 } },
      { id: "d", text: "布置时只说“最近交”，具体哪天靠群里突然补刀。", delta: { HW: 2, CH: 2, MY: 1, AU: 1 } },
      {
        id: "e",
        text: "DDL 是临时掉下来的：今晚通知，明早收。",
        delta: { HW: 3, EX: 3, CH: 2, AU: 2 },
        boost: { PRESSURE_MONSTER: 3 }
      }
    ]
  },
  {
    id: "q3",
    text: "TA 的点名方式是什么？",
    options: [
      { id: "a", text: "点名？人与人之间要信任。", delta: { CA: 2, SL: 2 }, boost: { PATRICK: 2 } },
      { id: "b", text: "偶尔点，像抽盲盒。", delta: { EX: 1, CH: 1 } },
      { id: "c", text: "每节课点，风雨无阻。", delta: { CT: 2, EX: 1 } },
      {
        id: "d",
        text: "高科技定位签到，理论上只能靠同学登微信续命。",
        delta: { CT: 3, EX: 1, CH: 1, AU: 1 },
        boost: { QIN: 2 }
      },
      {
        id: "e",
        text: "动态二维码 + 定位 + 人眼监察，三位一体防逃课。",
        delta: { CT: 3, EX: 2, CH: 1, AU: 3 },
        boost: { ART_STUDENT: 3, QIN: 2 }
      }
    ]
  },
  {
    id: "q4",
    text: "TA 讲课的清晰度如何？",
    options: [
      { id: "a", text: "讲完我能回家教别人。", delta: { CA: 3 }, boost: { SWEEPING_MONK: 2 } },
      { id: "b", text: "听懂 80%，剩下 20% 靠祖坟冒青烟。", delta: { MY: 1 } },
      { id: "c", text: "PPT 会讲，老师偶尔路过。", delta: { MY: 2, SL: 1 }, boost: { TAILOR: 2 } },
      {
        id: "d",
        text: "像歌坛谜语人：每句话都有旋律，但没有答案。",
        delta: { MY: 3, CH: 1, AU: 1 },
        boost: { RIDDLE_SINGER: 4 }
      },
      {
        id: "e",
        text: "像人机：每句话都像答案，但合起来不像人话。",
        delta: { MY: 3, CH: 2, SL: 1 },
        boost: { NPC_AI: 4 }
      }
    ]
  },
  {
    id: "q5",
    text: "TA 的 PPT 是什么水平？",
    options: [
      { id: "a", text: "干净，像刚洗过的白板。", delta: { CA: 1 } },
      { id: "b", text: "正常，最多字体有点叛逆。", delta: { CH: 1 } },
      { id: "c", text: "祖传 PPT，右下角写着 2009。", delta: { SL: 1, MY: 1 }, boost: { TAILOR: 1 } },
      { id: "d", text: "一页塞满宇宙大爆炸到课后作业。", delta: { MY: 2, HW: 1, AU: 1 } },
      {
        id: "e",
        text: "三种字体、四个水印、五位前任老师，像裁缝现场拼布。",
        delta: { CH: 3, MY: 2, SL: 2 },
        boost: { TAILOR: 5 }
      }
    ]
  },
  {
    id: "q6",
    text: "TA 上课提问是什么风格？",
    options: [
      { id: "a", text: "温柔地给你台阶，顺手铺红毯。", delta: { CA: 3 }, boost: { NINE_COLORED_DEER: 2 } },
      { id: "b", text: "点你但不杀你。", delta: { EX: 1, CA: 1 } },
      { id: "c", text: "一问三连：懂了吗、真懂了吗、你眼神不对。", delta: { EX: 2, AU: 1 } },
      {
        id: "d",
        text: "福尔摩斯式：从你皱眉推理你没预习。",
        delta: { EX: 2, CT: 2, AU: 2 },
        boost: { HOLMES: 5 }
      },
      {
        id: "e",
        text: "全班沉默后，TA 开始随机处决。",
        delta: { EX: 3, CH: 2, AU: 3 },
        boost: { PRESSURE_MONSTER: 3 }
      }
    ]
  },
  {
    id: "q7",
    text: "TA 考前暗示准不准？",
    options: [
      { id: "a", text: "考什么直接划，不玩心理战。", delta: { CA: 3 }, boost: { NINE_COLORED_DEER: 2 } },
      { id: "b", text: "说重点基本就是重点。", delta: { CA: 1, EX: 1 } },
      { id: "c", text: "说不考的，可能是烟雾弹。", delta: { MY: 2, EX: 1 } },
      { id: "d", text: "TA 说“都很重要”，等于没说。", delta: { MY: 3, EX: 2 }, boost: { RIDDLE_SINGER: 2 } },
      {
        id: "e",
        text: "考前一句“这个不难”，然后全班沉没。",
        delta: { EX: 3, MY: 2, AU: 2 },
        boost: { THANOS: 4 }
      }
    ]
  },
  {
    id: "q8",
    text: "TA 扣格式分严不严？",
    options: [
      { id: "a", text: "会给辛苦分，人间还有温度。", delta: { CA: 3 } },
      { id: "b", text: "错了扣，但不玩阴间细节。", delta: { CT: 1, EX: 1 } },
      { id: "c", text: "格式不对先扣三分，让你知道宇宙有秩序。", delta: { CT: 3, EX: 2 } },
      { id: "d", text: "空格、标点、页边距都是 TA 的子民。", delta: { CT: 3, AU: 2 }, boost: { QIN: 3 } },
      {
        id: "e",
        text: "秦始皇看了都说：此人很懂统一。",
        delta: { CT: 3, HW: 1, AU: 3 },
        boost: { QIN: 6 }
      }
    ]
  },
  {
    id: "q9",
    text: "TA 的情绪稳定吗？",
    options: [
      { id: "a", text: "稳定得像卡皮巴拉，天塌了先泡澡。", delta: { CA: 2, SL: 1 }, boost: { CAPYBARA: 4 } },
      { id: "b", text: "正常人类，偶尔加载失败。", delta: { CA: 1 } },
      { id: "c", text: "阴晴不定，看班群头像判断天气。", delta: { CH: 2, AU: 1 } },
      { id: "d", text: "一进门低气压，全班自动静音。", delta: { AU: 3, CT: 1 }, boost: { PRESSURE_MONSTER: 2 } },
      {
        id: "e",
        text: "上一秒海绵宝宝，下一秒魔丸降世。",
        delta: { CH: 3, AU: 3, EX: 1 },
        boost: { MOWAN: 5 }
      }
    ]
  },
  {
    id: "q10",
    text: "TA 的上课节奏是什么？",
    options: [
      { id: "a", text: "慢慢来，学生也是碳基生命。", delta: { CA: 3 }, boost: { NINE_COLORED_DEER: 2 } },
      { id: "b", text: "节奏适中，不把大脑当 GPU。", delta: { CA: 2 } },
      { id: "c", text: "讲得飞快，但 TA 觉得自己很慢。", delta: { MY: 1, AU: 1 } },
      {
        id: "d",
        text: "诸葛亮北伐式推进：路线清楚，但人要累死。",
        delta: { HW: 2, CT: 2, MY: 1 },
        boost: { KONGMING: 4 }
      },
      {
        id: "e",
        text: "压力怪冲刺式教学：一节课跑完整本书。",
        delta: { HW: 2, EX: 2, AU: 3 },
        boost: { PRESSURE_MONSTER: 5 }
      }
    ]
  },
  {
    id: "q11",
    text: "TA 在班群里是什么状态？",
    options: [
      { id: "a", text: "只发必要通知，像文明社会。", delta: { CA: 2 } },
      { id: "b", text: "偶尔发，大家还能活。", delta: { CA: 1 } },
      { id: "c", text: "深夜突然：“同学们，补充一下。”", delta: { HW: 2, CH: 1 } },
      {
        id: "d",
        text: "连环 @全体成员，像轰炸机返航。",
        delta: { CT: 2, HW: 2, AU: 1 },
        boost: { KHRUSHCHEV: 2 }
      },
      {
        id: "e",
        text: "凌晨突发恶疾，DDL 直接第二天。",
        delta: { HW: 3, EX: 3, CH: 3, AU: 2 },
        boost: { PRESSURE_MONSTER: 4 }
      }
    ]
  },
  {
    id: "q12",
    text: "TA 答疑是什么风格？",
    options: [
      { id: "a", text: "秒回且讲人话。", delta: { CA: 3 }, boost: { NINE_COLORED_DEER: 2 } },
      { id: "b", text: "会回，但像办公时间限定皮肤。", delta: { CA: 1 } },
      { id: "c", text: "三天后回一个“看课件”。", delta: { SL: 2, MY: 1 }, boost: { SQUIDWARD: 2 } },
      { id: "d", text: "只回一个问号，你的人生也变成问号。", delta: { MY: 2, AU: 2 }, boost: { RIDDLE_SINGER: 2 } },
      {
        id: "e",
        text: "回答像人机生成：很长，很完整，很没用。",
        delta: { SL: 2, MY: 3, CH: 2 },
        boost: { NPC_AI: 5 }
      }
    ]
  },
  {
    id: "q13",
    text: "TA 如何对待学生错误？",
    options: [
      { id: "a", text: "错了没事，我们一起修。", delta: { CA: 3 }, boost: { SPONGEBOB: 2 } },
      { id: "b", text: "会纠正，但不让你社死。", delta: { CA: 2, CT: 1 } },
      { id: "c", text: "当场公开处刑，但带教学意义。", delta: { EX: 2, AU: 2 } },
      {
        id: "d",
        text: "把你的错讲成案例，流传三届。",
        delta: { EX: 3, CH: 1, AU: 2 },
        boost: { HOLMES: 2 }
      },
      {
        id: "e",
        text: "容嬷嬷式精准扎心：错在哪，痛在哪。",
        delta: { EX: 3, CT: 2, AU: 3 },
        boost: { RONG: 6 }
      }
    ]
  },
  {
    id: "q14",
    text: "TA 对实验 / 项目要求如何？",
    options: [
      { id: "a", text: "允许试错，像真正做工程。", delta: { CA: 2 }, boost: { SWEEPING_MONK: 2 } },
      { id: "b", text: "要求高但给模板。", delta: { HW: 1, CT: 1, CA: 1 } },
      { id: "c", text: "要求高，模板在 TA 脑内。", delta: { HW: 2, MY: 2 } },
      {
        id: "d",
        text: "所有细节要对齐，不然项目先对你开刀。",
        delta: { HW: 2, CT: 3, AU: 2 },
        boost: { QIN: 2 }
      },
      {
        id: "e",
        text: "项目像副本，老师像魔人布欧，笑着把地图炸了。",
        delta: { HW: 3, CT: 2, EX: 2, CH: 2, AU: 3 },
        boost: { BUU: 5 }
      }
    ]
  },
  {
    id: "q15",
    text: "TA 调课 / 迟到频率如何？",
    options: [
      { id: "a", text: "提前通知，尊重人类日程。", delta: { CA: 3 } },
      { id: "b", text: "偶尔变动，能接受。", delta: { CA: 1, CH: 1 } },
      { id: "c", text: "调课像天气预报，看看就好。", delta: { CH: 2, SL: 1 } },
      {
        id: "d",
        text: "老师迟到但理由像忍者任务。",
        delta: { CH: 2, SL: 2, MY: 1 },
        boost: { KAKASHI: 4 }
      },
      {
        id: "e",
        text: "TA 永远在路上，课永远在补。",
        delta: { SL: 3, CH: 2, HW: 1 },
        boost: { KAKASHI: 7 }
      }
    ]
  },
  {
    id: "q16",
    text: "TA 的经典口头禅是什么？",
    options: [
      { id: "a", text: "“别怕，慢慢来。”", delta: { CA: 3 }, boost: { SPONGEBOB: 2 } },
      { id: "b", text: "“这个很重要。”", delta: { EX: 1, CT: 1 } },
      { id: "c", text: "“这个你们自己看。”", delta: { SL: 2, MY: 1 }, boost: { PATRICK: 2 } },
      { id: "d", text: "“这个不难。”", delta: { MY: 2, EX: 2, AU: 1 }, boost: { RIDDLE_SINGER: 2 } },
      { id: "e", text: "“我只讲一遍。”", delta: { CT: 3, AU: 3 }, boost: { ART_STUDENT: 3 } }
    ]
  },
  {
    id: "q17",
    text: "TA 的平时分是什么存在？",
    options: [
      { id: "a", text: "透明公开，像阳光照进教务系统。", delta: { CA: 3, CT: 1 }, boost: { NINE_COLORED_DEER: 2 } },
      { id: "b", text: "基本公平，偶尔玄学。", delta: { CA: 1, MY: 1 } },
      { id: "c", text: "你不知道它怎么来，但它来了。", delta: { MY: 3 } },
      {
        id: "d",
        text: "迟到、发言、作业、眼神，全被纳入宇宙账本。",
        delta: { CT: 3, EX: 2, AU: 2 },
        boost: { ART_STUDENT: 2 }
      },
      {
        id: "e",
        text: "平时分是容嬷嬷手里的针，轻轻一扎你就醒了。",
        delta: { CT: 3, EX: 3, AU: 3 },
        boost: { RONG: 6 }
      }
    ]
  },
  {
    id: "q18",
    text: "TA 关心学生生活吗？",
    options: [
      { id: "a", text: "会关心你有没有睡觉，甚至像九色鹿下凡。", delta: { CA: 3 }, boost: { NINE_COLORED_DEER: 5 } },
      { id: "b", text: "嘴硬但心软。", delta: { CA: 2, AU: 1 }, boost: { SPONGEBOB: 2 } },
      { id: "c", text: "关心方式是再布置一个练习让你成长。", delta: { HW: 2, CA: 1 } },
      {
        id: "d",
        text: "认为学生不需要睡眠，只需要意志。",
        delta: { HW: 3, CT: 2, AU: 2 },
        boost: { KHRUSHCHEV: 2 }
      },
      {
        id: "e",
        text: "你说你病了，TA 说那线上参加也行。",
        delta: { HW: 3, CT: 2, AU: 3 },
        boost: { PRESSURE_MONSTER: 4 }
      }
    ]
  },
  {
    id: "q19",
    text: "TA 的搞笑 / 梗力如何？",
    options: [
      { id: "a", text: "完全没梗，但不影响教学。", delta: { CA: 1 } },
      { id: "b", text: "偶尔整活，课堂有空气。", delta: { CH: 1, CA: 1 } },
      { id: "c", text: "梗很多，但有些像上古遗迹。", delta: { CH: 2, MY: 1 } },
      {
        id: "d",
        text: "特朗普式演讲：重点不一定在，但气势必须满。",
        delta: { CH: 3, MY: 2, AU: 2 },
        boost: { TRUMP: 6 }
      },
      {
        id: "e",
        text: "魔人布欧式整活：大家一边笑，一边发现事情不妙。",
        delta: { CH: 3, AU: 2, EX: 1 },
        boost: { BUU: 4 }
      }
    ]
  },
  {
    id: "q20",
    text: "TA 的出卷风格是什么？",
    options: [
      { id: "a", text: "题目覆盖所讲内容，像正常世界。", delta: { CA: 2, EX: 1 } },
      { id: "b", text: "有难题，但能看出人性。", delta: { EX: 2, CA: 1 } },
      { id: "c", text: "题干很短，人生很长。", delta: { EX: 2, MY: 2 } },
      {
        id: "d",
        text: "每道题都是阅读理解 + 心理博弈。",
        delta: { EX: 3, MY: 3 },
        boost: { RIDDLE_SINGER: 2 }
      },
      {
        id: "e",
        text: "灭霸式：一张卷子，一个响指，半个班安静。",
        delta: { EX: 3, AU: 3, CT: 1 },
        boost: { THANOS: 7 }
      }
    ]
  },
  {
    id: "q21",
    text: "TA 的课堂氛围像什么？",
    options: [
      { id: "a", text: "像学习小组，有讨论有反馈。", delta: { CA: 3 }, boost: { SWEEPING_MONK: 2 } },
      { id: "b", text: "安静但不窒息。", delta: { CA: 1, CT: 1 } },
      { id: "c", text: "你可以呼吸，但最好小声。", delta: { CT: 2, AU: 1 } },
      {
        id: "d",
        text: "全班坐姿自动变好，像被系统托管。",
        delta: { CT: 3, AU: 2 },
        boost: { ART_STUDENT: 2 }
      },
      {
        id: "e",
        text: "压力怪老巢，椅子都不敢响。",
        delta: { AU: 3, CT: 3 },
        boost: { PRESSURE_MONSTER: 6 }
      }
    ]
  },
  {
    id: "q22",
    text: "TA 批改作业的反馈如何？",
    options: [
      { id: "a", text: "具体到能改，像代码 review。", delta: { CA: 2, CT: 1 }, boost: { SWEEPING_MONK: 3 } },
      { id: "b", text: "会圈问题，能懂。", delta: { CA: 1, EX: 1 } },
      { id: "c", text: "只写“重做”，但不说重哪。", delta: { MY: 2, AU: 1 } },
      {
        id: "d",
        text: "红笔密度像犯罪现场。",
        delta: { EX: 2, CT: 2, AU: 2 },
        boost: { RONG: 2 }
      },
      {
        id: "e",
        text: "批注比正文长，批完我想换专业。",
        delta: { HW: 1, EX: 3, AU: 3 },
        boost: { RONG: 4 }
      }
    ]
  },
  {
    id: "q23",
    text: "开学第一节课，TA 通常会做什么？",
    options: [
      { id: "a", text: "介绍课程、说清规则，平稳降落。", delta: { CA: 2, CT: 1 } },
      { id: "b", text: "先讲理想，再讲规则。", delta: { CA: 1, CT: 1 } },
      { id: "c", text: "先讲挂科率，给大家提神。", delta: { EX: 2, AU: 2 }, boost: { PRESSURE_MONSTER: 2 } },
      {
        id: "d",
        text: "第一句话：“这门课不难，去年挂了几个。”",
        delta: { EX: 3, AU: 2, MY: 1 },
        boost: { THANOS: 2 }
      },
      {
        id: "e",
        text: "直接开始随堂测，仿佛大家已经欠 TA 一条命。",
        delta: { EX: 3, CH: 3, AU: 3 },
        boost: { PRESSURE_MONSTER: 5 }
      }
    ]
  },
  {
    id: "q24",
    text: "你对这位老师最大的感受是什么？",
    options: [
      { id: "a", text: "TA 救我狗命。", delta: { CA: 3 }, boost: { NINE_COLORED_DEER: 3 } },
      {
        id: "b",
        text: "TA 严格但我学到了。",
        delta: { CT: 2, HW: 1, CA: 1 },
        boost: { SWEEPING_MONK: 4 }
      },
      { id: "c", text: "TA 像谜语，但我尊重谜语。", delta: { MY: 3 }, boost: { RIDDLE_SINGER: 4 } },
      {
        id: "d",
        text: "TA 把我训练成了 DDL 特种兵。",
        delta: { HW: 3, EX: 2, CT: 1 },
        boost: { KHRUSHCHEV: 3 }
      },
      {
        id: "e",
        text: "这不是老师，这是我人生副本的大boss。",
        delta: { HW: 2, EX: 2, CT: 2, AU: 3, CH: 1 },
        boost: { FINAL_BOSS: 8 }
      }
    ]
  }
];
