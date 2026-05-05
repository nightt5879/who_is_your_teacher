import { QUESTIONS } from "./data/questions";
import { RESULT_COPY } from "./data/resultCopy";
import type { Dimension, Question, ResultCode, ResultCopy } from "./types";

export type Language = "zh" | "en";

export const REPO_URL = "https://github.com/nightt5879/who_is_your_teacher";

export const VISITOR_COUNT_API = "https://api.counterapi.dev/v1/nightt5879_who_is_your_teacher/visits/up";

export const UI_TEXT = {
  zh: {
    appName: "你老师最像谁？",
    brandMark: "师",
    homeAria: "返回首页",
    languageZh: "中文",
    languageEn: "English",
    topbarNote: "纯娱乐测试",
    eyebrow: "Who Is Your Teacher",
    heroTitle: "你老师最像谁？",
    tagQuestions: "24 题",
    tagResults: "17+n 个结果",
    tagLocal: "本地计算",
    playedPrefix: "已有",
    playedSuffix: "人参与测试",
    aliasLabel: "老师代号 / 外号",
    aliasPlaceholder: "默认：某老师",
    defaultAlias: "某老师",
    start: "开始测试",
    previous: "上一题",
    next: "下一题",
    resultButton: "看结果",
    resultPrefix: "最像",
    damageTitle: "精神损伤指数",
    radarTitle: "八维成分雷达",
    quoteTitle: "老师名言",
    guideTitle: "生存攻略",
    loadingTitle: "正在调取老师隐藏档案",
    loadingSubtitle: "统计作业轰炸、考试突袭、谜语玄学与精神压迫中...",
    loadingProgress: "匹配最终成分",
    copyResult: "复制结果",
    copied: "已复制",
    copyFailed: "复制失败",
    hiddenUnlocked: "隐藏款解锁",
    hiddenBadge: "隐藏款",
    artModeHint: "双击角色看原画",
    artModeExit: "原画模式 · 双击返回",
    artModeA11y: "切换手机端原画模式",
    disclaimer: "本测试纯属娱乐，不构成对任何现实人物的评价。不要输入真实姓名，不上传照片或个人数据。",
    githubTitle: "GitHub",
    githubText: "欢迎来仓库聊聊、提想法，等公开后一起玩。",
    githubAction: "打开仓库",
    restart: "再测一次",
    shareTitle: "你老师最像谁？",
    entertainmentLine: "本测试纯属娱乐。"
  },
  en: {
    appName: "Who Is Your Teacher?",
    brandMark: "T",
    homeAria: "Back to home",
    languageZh: "中文",
    languageEn: "English",
    topbarNote: "Just for fun",
    eyebrow: "Who Is Your Teacher",
    heroTitle: "Who Is Your Teacher?",
    tagQuestions: "24 questions",
    tagResults: "17+n results",
    tagLocal: "Local scoring",
    playedPrefix: "",
    playedSuffix: "people have tried it",
    aliasLabel: "Teacher codename / nickname",
    aliasPlaceholder: "Default: A certain teacher",
    defaultAlias: "A certain teacher",
    start: "Start",
    previous: "Previous",
    next: "Next",
    resultButton: "Reveal result",
    resultPrefix: "is most like",
    damageTitle: "Mental Damage Index",
    radarTitle: "Eight-Dimension Radar",
    quoteTitle: "Teacher Quote",
    guideTitle: "Survival Guide",
    loadingTitle: "Loading the hidden teacher file",
    loadingSubtitle: "Checking homework load, exam ambushes, riddle energy, and pressure...",
    loadingProgress: "Matching final profile",
    copyResult: "Copy result",
    copied: "Copied",
    copyFailed: "Copy failed",
    hiddenUnlocked: "Hidden Result Unlocked",
    hiddenBadge: "Hidden",
    artModeHint: "Double tap art",
    artModeExit: "Art mode · double tap back",
    artModeA11y: "Toggle mobile art mode",
    disclaimer:
      "This quiz is for entertainment only and is not an evaluation of any real person. Do not enter real names or upload photos or personal data.",
    githubTitle: "GitHub",
    githubText: "Drop by the repository to chat, suggest ideas, and play along once it is public.",
    githubAction: "Open repo",
    restart: "Try again",
    shareTitle: "Who Is Your Teacher?",
    entertainmentLine: "This quiz is just for fun."
  }
} satisfies Record<Language, Record<string, string>>;

export const DIMENSION_LABELS: Record<
  Language,
  Record<Dimension, { short: string; long: string }>
> = {
  zh: {
    HW: { short: "作业", long: "作业轰炸" },
    CT: { short: "纪律", long: "控制纪律" },
    EX: { short: "考试", long: "考试突袭" },
    CH: { short: "混沌", long: "混沌整活" },
    MY: { short: "谜语", long: "谜语玄学" },
    SL: { short: "失联", long: "摆烂失联" },
    CA: { short: "关怀", long: "人性关怀" },
    AU: { short: "压迫", long: "压迫威慑" }
  },
  en: {
    HW: { short: "HW", long: "Homework Load" },
    CT: { short: "Rule", long: "Control & Discipline" },
    EX: { short: "Exam", long: "Exam Ambush" },
    CH: { short: "Chaos", long: "Chaos Energy" },
    MY: { short: "Riddle", long: "Riddle Logic" },
    SL: { short: "Away", long: "Absent / Delayed" },
    CA: { short: "Care", long: "Human Care" },
    AU: { short: "Aura", long: "Authority Pressure" }
  }
};

type QuestionTranslation = {
  text: string;
  options: Record<string, string>;
};

const EN_QUESTIONS: Record<string, QuestionTranslation> = {
  q1: {
    text: "How much homework does this teacher assign?",
    options: {
      a: "A symbolic spoonful, as if worried students might starve.",
      b: "Just enough to remind me I am still in school.",
      c: "Usually normal, then mutates on Friday night.",
      d: "Collective labor: everyone gets a task, nobody escapes.",
      e: "It feels like high school again: homework, corrections, mistake notebooks, the full set."
    }
  },
  q2: {
    text: "What is this teacher's DDL style?",
    options: {
      a: "Clear from the start, with a deadline that still respects human life.",
      b: "Explained clearly, then you submit on your own like an adult.",
      c: "The DDL is known early, but daily reminders tick like a bomb in the class chat.",
      d: "They only say 'submit it soon'; the exact date appears later as a surprise attack.",
      e: "The real DDL is two weeks away, but TA says it like it is due in two days."
    }
  },
  q3: {
    text: "How does TA take attendance?",
    options: {
      a: "Attendance? People should trust each other.",
      b: "Occasionally, like opening a mystery box.",
      c: "Every class, rain or shine.",
      d: "High-tech location check-in, theoretically survivable only with a friend's WeChat login.",
      e: "Dynamic QR code + location + human inspection: a three-piece anti-escape system."
    }
  },
  q4: {
    text: "How clear are the lectures?",
    options: {
      a: "After class, I could go home and teach someone else.",
      b: "I understand 80%; the other 20% depends on ancestral luck.",
      c: "The PPT teaches. The teacher occasionally passes by.",
      d: "Like a Gotham Riddler: every sentence is a clue, but never the answer.",
      e: "Like an NPC: every sentence sounds correct, but together it does not sound human."
    }
  },
  q5: {
    text: "What level is TA's PowerPoint?",
    options: {
      a: "Clean, like a freshly washed whiteboard.",
      b: "Normal, except the fonts have slight rebellious tendencies.",
      c: "An inherited PPT with '2009' still sitting in the corner.",
      d: "One slide contains the Big Bang, the syllabus, and the homework.",
      e: "Three fonts, four watermarks, five previous teachers: live patchwork tailoring."
    }
  },
  q6: {
    text: "How does TA ask questions in class?",
    options: {
      a: "Gently gives you a step down, then rolls out a red carpet.",
      b: "Calls on you, but does not execute you.",
      c: "A triple combo: do you get it, really get it, why do your eyes look wrong?",
      d: "Sherlock style: deducing from your frown that you did not preview.",
      e: "After the whole class goes silent, TA starts random judgment."
    }
  },
  q7: {
    text: "How accurate are TA's exam hints?",
    options: {
      a: "They mark what will be tested. No psychological warfare.",
      b: "When they say it is important, it usually is.",
      c: "What they say will not be tested may be smoke.",
      d: "TA says 'everything is important,' which means nothing.",
      e: "TA says 'this is not hard' before the whole class sinks."
    }
  },
  q8: {
    text: "How strict is TA about formatting points?",
    options: {
      a: "They give effort points. Humanity still exists.",
      b: "Wrong format gets deducted, but not in a cursed-detail way.",
      c: "Wrong format costs three points immediately, proving the universe has order.",
      d: "Spaces, punctuation, and margins are all TA's subjects.",
      e: "Even an emperor of standardization would say: this person understands unity."
    }
  },
  q9: {
    text: "How emotionally stable is TA?",
    options: {
      a: "Stable as a capybara: if the sky falls, first take a bath.",
      b: "A normal human, occasionally fails to load.",
      c: "Unpredictable; you read the class-chat avatar like weather radar.",
      d: "Low pressure enters the room and the whole class auto-mutes.",
      e: "SpongeBob one second, chaos demon the next."
    }
  },
  q10: {
    text: "What is TA's class pace?",
    options: {
      a: "Slowly. Students are carbon-based life forms.",
      b: "Moderate pace, not treating brains like GPUs.",
      c: "Very fast, though TA believes they are going slowly.",
      d: "Strategic campaign style: the route is clear, but everyone is exhausted.",
      e: "Pressure sprint: one class runs through the whole textbook."
    }
  },
  q11: {
    text: "What is TA like in the class group chat?",
    options: {
      a: "Only necessary notices, like civilized society.",
      b: "Occasionally posts, everyone survives.",
      c: "Late at night: 'Students, one more thing.'",
      d: "Chain @everyone messages, like a bomber returning to base.",
      e: "A midnight emergency: DDL directly becomes tomorrow."
    }
  },
  q12: {
    text: "What is TA's Q&A style?",
    options: {
      a: "Instant replies in human language.",
      b: "Replies, but only in office-hours mode.",
      c: "Three days later: 'See the slides.'",
      d: "Replies with a single question mark; your life becomes one too.",
      e: "The answer feels AI-generated: long, complete, and useless."
    }
  },
  q13: {
    text: "How does TA handle student mistakes?",
    options: {
      a: "No problem, we fix it together.",
      b: "Corrects you without public embarrassment.",
      c: "Public execution, but educational.",
      d: "Turns your mistake into a case study for three future cohorts.",
      e: "Pinpoint heart-stabbing: exactly where it is wrong, exactly where it hurts."
    }
  },
  q14: {
    text: "How demanding is TA with labs or projects?",
    options: {
      a: "Allows trial and error, like real engineering.",
      b: "High standards, but gives a template.",
      c: "High standards; the template exists only in TA's mind.",
      d: "Every detail must align, or the project attacks you first.",
      e: "The project is a dungeon, and TA smiles while blowing up the map."
    }
  },
  q15: {
    text: "How often does TA reschedule or arrive late?",
    options: {
      a: "Notifies in advance and respects human calendars.",
      b: "Occasional changes, acceptable.",
      c: "Schedule changes like weather forecasts: useful in theory.",
      d: "TA is late, but the reason sounds like a secret mission.",
      e: "TA is always on the way, and class is always being made up later."
    }
  },
  q16: {
    text: "What is TA's classic catchphrase?",
    options: {
      a: "\"Don't worry, take it slowly.\"",
      b: "\"This is very important.\"",
      c: "\"Read this yourselves.\"",
      d: "\"This is not hard.\"",
      e: "\"I will only explain this once.\""
    }
  },
  q17: {
    text: "What kind of entity is TA's participation grade?",
    options: {
      a: "Transparent, like sunlight entering the academic system.",
      b: "Mostly fair, with a little mystery.",
      c: "You do not know where it comes from, but it arrives.",
      d: "Lateness, speaking, homework, eye contact: all entered into the cosmic ledger.",
      e: "It is a tiny needle in TA's hand: one poke and you wake up."
    }
  },
  q18: {
    text: "Does TA care about students' lives?",
    options: {
      a: "Checks whether you have slept, almost like a rare divine teacher.",
      b: "Tough mouth, soft heart.",
      c: "Shows care by assigning one more exercise for your growth.",
      d: "Believes students do not need sleep, only willpower.",
      e: "You say you are sick; TA says online attendance is fine too."
    }
  },
  q19: {
    text: "How funny or meme-capable is TA?",
    options: {
      a: "No jokes at all, but teaching is unaffected.",
      b: "Occasional bits; the classroom has oxygen.",
      c: "Many memes, some from ancient ruins.",
      d: "Speech-rally style: the point may wander, but the energy is full.",
      e: "Comedy with danger: everyone laughs, then realizes something is wrong."
    }
  },
  q20: {
    text: "What is TA's exam-writing style?",
    options: {
      a: "Questions cover what was taught, like a normal world.",
      b: "There are hard questions, but you can still see humanity.",
      c: "The question stem is short; life is long.",
      d: "Every question is reading comprehension plus psychological warfare.",
      e: "One paper, one snap, half the class falls silent."
    }
  },
  q21: {
    text: "What does TA's classroom atmosphere feel like?",
    options: {
      a: "Like a study group, with discussion and feedback.",
      b: "Quiet but not suffocating.",
      c: "You may breathe, but preferably quietly.",
      d: "Everyone's posture improves automatically, like system control.",
      e: "A pressure lair where even chairs dare not make noise."
    }
  },
  q22: {
    text: "What is TA's homework feedback like?",
    options: {
      a: "Specific enough to improve, like code review.",
      b: "Marks the problem clearly enough to understand.",
      c: "Only writes 'redo' without saying which part.",
      d: "Red-pen density like a crime scene.",
      e: "Comments longer than the essay; after reading them I want to change majors."
    }
  },
  q23: {
    text: "What does TA usually do in the first class?",
    options: {
      a: "Introduces the course and rules, a smooth landing.",
      b: "Talks about ideals first, then rules.",
      c: "Starts with the fail rate to wake everyone up.",
      d: "First line: 'This course is not hard; last year only a few failed.'",
      e: "Starts with a quiz, as if everyone already owes TA a life."
    }
  },
  q24: {
    text: "What is your biggest feeling about this teacher?",
    options: {
      a: "TA saved my academic life.",
      b: "TA is strict, but I learned.",
      c: "TA is a riddle, but I respect riddles.",
      d: "TA trained me into a DDL special forces unit.",
      e: "This is not a teacher; this is my life's final boss."
    }
  }
};

const EN_RESULT_COPY: Record<ResultCode, ResultCopy> = {
  KHRUSHCHEV: {
    code: "KHRUSHCHEV",
    name: "Khrushchev",
    subtitle: "Collective Task Accelerator",
    oneLiner: "TA is not assigning homework. TA is advancing class production targets.",
    damageIndex: "Homework 98 / Coordination pressure 91 / Survival chance 18",
    teacherQuote: "Students, let us complete this task collectively.",
    survivalGuide: "Do not solo this. Form study groups, divide work, share notes, and schedule early.",
    tags: ["Collective labor", "Heavy homework", "DDL management"],
    visual: "Team"
  },
  ART_STUDENT: {
    code: "ART_STUDENT",
    name: "Tiny Mustache Art Student",
    subtitle: "Discipline and Format Absolutist",
    oneLiner: "TA's class feels like a strict ritual where one second late is a historical error.",
    damageIndex: "Discipline 100 / Format obsession 96 / Free breathing 6",
    teacherQuote: "There is one standard. Everyone follows it.",
    survivalGuide: "Pin every rule, template, and grading detail. Ask less why, check one more time.",
    tags: ["High discipline", "Format unity", "Rules first"],
    visual: "Rule"
  },
  TRUMP: {
    code: "TRUMP",
    name: "Trump",
    subtitle: "Classroom Momentum Speaker",
    oneLiner: "The key point may take a detour, but the energy always arrives first.",
    damageIndex: "Chaos show 94 / Speech storm 88 / Notes usability 31",
    teacherQuote: "This thing is very important, very, very important.",
    survivalGuide: "Catch keywords instead of every tangent. Write headings when TA starts and conclusions when TA lands.",
    tags: ["Speech mode", "Strong aura", "Topic jumps"],
    visual: "Hype"
  },
  PATRICK: {
    code: "PATRICK",
    name: "Patrick",
    subtitle: "Relaxed but Lost",
    oneLiner: "TA gives you freedom, then accidentally turns off the course navigation.",
    damageIndex: "Chill drift 91 / Wandering radius 80 / Pressure 8",
    teacherQuote: "You can read this part yourselves. It should be fine.",
    survivalGuide: "Freedom is not disappearance. Build your own weekly study route before finals wake you up.",
    tags: ["Low pressure", "Hard to find", "Self-study alert"],
    visual: "Chill"
  },
  THANOS: {
    code: "THANOS",
    name: "Thanos",
    subtitle: "Exam Snap Executor",
    oneLiner: "TA does not raise their voice. One exam is enough to silence half the class.",
    damageIndex: "Exam attack 100 / Mental pressure 94 / Class volume 0",
    teacherQuote: "This is not hard if you studied carefully.",
    survivalGuide: "Do not gamble on hints. Review by knowledge tree, secure basics, and never trust 'easy'.",
    tags: ["Exam pressure", "Final boss paper", "Cold grading"],
    visual: "Exam"
  },
  BUU: {
    code: "BUU",
    name: "Majin Buu",
    subtitle: "Smiling Dungeon Builder",
    oneLiner: "TA is funny until the assignment mutates mid-laugh.",
    damageIndex: "Chaos show 96 / Project explosion 88 / Safe distance 12",
    teacherQuote: "Let us do a small project. It is simple; be creative.",
    survivalGuide: "Confirm acceptance criteria and deadlines first. Screenshot every verbal change.",
    tags: ["Project dungeon", "Funny pressure", "Unpredictable"],
    visual: "Quest"
  },
  GOTHAM_RIDDLER: {
    code: "GOTHAM_RIDDLER",
    name: "Gotham Riddler",
    subtitle: "Every Sentence Is a Cipher",
    oneLiner: "TA does give hints. TA just hides them inside a riddle.",
    damageIndex: "Riddle density 100 / Hint accuracy 22 / Mystical respect 89",
    teacherQuote: "You need to feel this part yourselves.",
    survivalGuide: "Compare notes right after class and translate vague hints into concrete action items.",
    tags: ["Mystery talk", "Hidden focus", "Q&A fog"],
    visual: "?"
  },
  RONG: {
    code: "RONG",
    name: "Auntie Rong",
    subtitle: "Precision Deduction Artist",
    oneLiner: "TA's red pen lands so accurately that you start questioning your margins.",
    damageIndex: "Deduction precision 96 / Red ink density 92 / Mental shield 17",
    teacherQuote: "Where it is wrong is where points are deducted.",
    survivalGuide: "Check every rubric item before submitting: format, citation, unit, margin, all of it.",
    tags: ["Strict feedback", "Format points", "Precise strike"],
    visual: "Mark"
  },
  HOLMES: {
    code: "HOLMES",
    name: "Sherlock Holmes",
    subtitle: "Classroom Detective",
    oneLiner: "TA can infer from your eyes that you did not preview.",
    damageIndex: "Observation 97 / Question pressure 75 / Escape chance 9",
    teacherQuote: "Your expression tells me this concept has not landed yet.",
    survivalGuide: "Preview the outline and examples. Even 30% preparation beats live exposure.",
    tags: ["Cold calls", "Deduction", "Sharp details"],
    visual: "Detect"
  },
  KONGMING: {
    code: "KONGMING",
    name: "Zhuge Liang",
    subtitle: "Clear but Exhausting Strategist",
    oneLiner: "TA's route is clear, but every step still asks you to march.",
    damageIndex: "Planning 93 / Learning cost 84 / Respect 76",
    teacherQuote: "We proceed according to plan and finish this section today.",
    survivalGuide: "Keep up weekly. This class punishes small debts that become giant debts.",
    tags: ["Clear route", "Strong push", "Strict but useful"],
    visual: "Plan"
  },
  SPONGEBOB: {
    code: "SPONGEBOB",
    name: "SpongeBob",
    subtitle: "Energetic Rescuer",
    oneLiner: "TA absorbs awkwardness and mistakes before they hurt anyone.",
    damageIndex: "Care 95 / Class energy 82 / Recovery 90",
    teacherQuote: "It is okay. Let us try again.",
    survivalGuide: "Treasure this teacher. Ask questions and give feedback; kindness can turn into real learning.",
    tags: ["Kind", "Encouraging", "Bright class"],
    visual: "Warm"
  },
  SQUIDWARD: {
    code: "SQUIDWARD",
    name: "Squidward",
    subtitle: "Tired but Still Working",
    oneLiner: "TA wants to clock out, but professional duty keeps them at the podium.",
    damageIndex: "Fatigue 88 / Reply speed 33 / Low mood 42",
    teacherQuote: "Read the slides first.",
    survivalGuide: "Ask specific questions with page numbers. Clear input gets better output.",
    tags: ["Low energy", "Slow replies", "Practical survival"],
    visual: "Tired"
  },
  CAPYBARA: {
    code: "CAPYBARA",
    name: "Capybara",
    subtitle: "Rare Stable Presence",
    oneLiner: "If the sky falls, TA first checks whether everyone has an umbrella.",
    damageIndex: "Emotional stability 99 / Pressure 5 / Comfort 92",
    teacherQuote: "It is okay. Handle it slowly.",
    survivalGuide: "Low pressure is space to do better, not permission to vanish.",
    tags: ["Stable", "Low pressure", "Healing"],
    visual: "Calm"
  },
  NPC_AI: {
    code: "NPC_AI",
    name: "NPC AI",
    subtitle: "Complete Sentences, Offline Soul",
    oneLiner: "Every sentence is correct, but together they make you want to reboot.",
    damageIndex: "Mechanical tone 96 / Useful info 28 / Confusion echo 91",
    teacherQuote: "Based on the relevant requirements, you should understand it comprehensively.",
    survivalGuide: "Ask binary or highly specific questions. The narrower the prompt, the more usable the answer.",
    tags: ["Mechanical Q&A", "Long but useless", "Info fog"],
    visual: "AI"
  },
  TAILOR: {
    code: "TAILOR",
    name: "Tailor",
    subtitle: "Inherited Slides Stitcher",
    oneLiner: "TA's PPT is a time capsule stitched from many academic eras.",
    damageIndex: "Patchwork 94 / Slide age 87 / Key-point clarity 36",
    teacherQuote: "This PPT was left from before; I will add something.",
    survivalGuide: "Do not trust slide order. Rebuild your own notes from live emphasis, homework, and exam scope.",
    tags: ["Inherited PPT", "Patchwork", "Scattered focus"],
    visual: "Sew"
  },
  QIN: {
    code: "QIN",
    name: "Qin Shi Huang",
    subtitle: "First Emperor of Formatting",
    oneLiner: "TA sees inconsistent filenames like an ununified empire.",
    damageIndex: "Format rule 100 / Discipline 96 / Rebellion space 4",
    teacherQuote: "All filenames follow the required format. Punctuation too.",
    survivalGuide: "Make templates, copy templates, check templates. Standardization is your shield.",
    tags: ["Unity", "Order", "Format control"],
    visual: "Unify"
  },
  PRESSURE_MONSTER: {
    code: "PRESSURE_MONSTER",
    name: "Pressure Monster",
    subtitle: "Low-Pressure Training Camp Owner",
    oneLiner: "TA may not be loud, but even the chairs know not to squeak today.",
    damageIndex: "Mental pressure 100 / DDL strike 94 / Sleep balance 8",
    teacherQuote: "This is due tomorrow. You should have enough time.",
    survivalGuide: "Treat every task as due one day earlier. Beat pressure with speed, not emotions.",
    tags: ["High pressure", "DDL", "Low atmosphere"],
    visual: "Stress"
  },
  KAKASHI: {
    code: "KAKASHI",
    name: "Kakashi",
    subtitle: "Hidden Teacher Always on the Way",
    oneLiner: "TA may be late, but the reason sounds like a classified mission.",
    damageIndex: "Missing rate 95 / Reschedule rate 89 / Ninja vibe 100",
    teacherQuote: "Sorry, something happened on the way. Let us push it back.",
    survivalGuide: "Screenshot every notice and confirm room and time every time. Survive with evidence.",
    tags: ["Hidden result", "Reschedule", "Late"],
    visual: "Hide"
  },
  LINGZHU: {
    code: "LINGZHU",
    name: "Spirit Pearl",
    subtitle: "Kind with Boundaries",
    oneLiner: "TA cares about people without turning the course into free points.",
    damageIndex: "Care 100 / Requirement 52 / Safety 88",
    teacherQuote: "You can slow down, but you need to truly understand it.",
    survivalGuide: "Respond to the kindness with effort. Ask, revise, and cooperate.",
    tags: ["Hidden result", "Kind but firm", "Growth"],
    visual: "Kind"
  },
  MOWAN: {
    code: "MOWAN",
    name: "Demon Pill",
    subtitle: "Chaotic High-Pressure Compound",
    oneLiner: "TA's class is not a storm. It is a storm that learned how to write exams.",
    damageIndex: "Chaos 98 / Pressure 99 / Care balance 5",
    teacherQuote: "Let us add a quick quiz to check everyone.",
    survivalGuide: "Back up everything, believe every notice, delete every lucky guess. Stability is the only tactic.",
    tags: ["Hidden result", "Chaos", "High pressure"],
    visual: "Chaos"
  },
  NINE_COLORED_DEER: {
    code: "NINE_COLORED_DEER",
    name: "Nine-Colored Deer",
    subtitle: "Dream Teacher",
    oneLiner: "TA is a rare kindness patch inside the academic system.",
    damageIndex: "Care 100 / Damage 3 / Rarity SSS",
    teacherQuote: "Take care of yourself first. We can learn slowly.",
    survivalGuide: "Study well and do not waste it. This is not permission to lie flat; it is a reward for living better.",
    tags: ["Hidden result", "Low pressure", "Dream teacher"],
    visual: "Deer"
  },
  SWEEPING_MONK: {
    code: "SWEEPING_MONK",
    name: "Sweeping Monk",
    subtitle: "Quiet Master",
    oneLiner: "TA does not create pressure, but every sentence puts knowledge back in place.",
    damageIndex: "Teaching skill 96 / Gentle strictness 84 / Respect 93",
    teacherQuote: "This part is simple in essence. Let us start from the beginning.",
    survivalGuide: "Do not mistake gentleness for looseness. Review after class and you will feel yourself leveling up.",
    tags: ["Hidden result", "Master", "Clear"],
    visual: "Zen"
  },
  FINAL_BOSS: {
    code: "FINAL_BOSS",
    name: "Final Boss",
    subtitle: "Gatekeeper of the Main Quest",
    oneLiner: "This is not a course. This is the main battle of your student life.",
    damageIndex: "Total pressure 100 / Dungeon difficulty S+ / Save-file need 100",
    teacherQuote: "You need to master all of this. It will be used later.",
    survivalGuide: "Build archives for review, homework, and questions. Final bosses are beaten with gear and teammates.",
    tags: ["Hidden result", "Ultimate pressure", "Dungeon battle"],
    visual: "Boss"
  }
};

export function getQuestions(language: Language): Question[] {
  if (language === "zh") return QUESTIONS;

  return QUESTIONS.map((question) => {
    const translation = EN_QUESTIONS[question.id];
    return {
      ...question,
      text: translation.text,
      options: question.options.map((option) => ({
        ...option,
        text: translation.options[option.id]
      }))
    };
  });
}

export function getResultCopy(language: Language): Record<ResultCode, ResultCopy> {
  return language === "zh" ? RESULT_COPY : EN_RESULT_COPY;
}
