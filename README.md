# Who Is Your Teacher?

一个纯娱乐的老师类型测试站。用户输入一个老师代号，回答 24 道单选题，页面会在本地计算画像并生成一张结果卡。项目是静态前端应用，适合部署到 GitHub Pages。

> 本测试仅用于娱乐，不构成对任何现实人物的评价。不要输入真实姓名、照片或个人隐私信息。

## 功能

- 中文 / English 双语界面、题目和结果页文案。
- 24 道单选题，所有分数和权重只在本地浏览器计算。
- 首页展示参与人数，当前静态版本使用本地计数并从 935 起步。
- 结果页支持系统分享 API，失败时复制分享文本。
- 结果页提供 GitHub 仓库入口，方便反馈、讨论和二次创作。
- GitHub Actions 自动构建并部署到 GitHub Pages。

## 计算方式

测试内部使用 8 个维度表示老师画像：作业强度、纪律控制、考试压力、混沌程度、表达玄学、失联程度、人性关怀、压迫感。每个选项会给部分维度增加分数，也可以给某些结果增加少量倾向加成。

计算流程：

1. 累加用户 24 个答案的维度分数和结果倾向加成。
2. 自动根据题库计算每个维度的最大可能分，并把用户画像归一化到 0-100。
3. 使用加权曼哈顿距离把用户画像和结果原型向量做匹配。
4. 加入选项倾向加成和极小的确定性混沌因子，用来打破接近的结果。
5. 先计算常规结果，再判断隐藏结果触发条件；隐藏结果只有在条件满足且分数接近时才会覆盖常规结果。

所有计算都发生在浏览器端，不会上传用户输入或答案。

## Development

```bash
npm install
npm run dev
npm test
npm run build
```

默认 Vite base 是 `/who_is_your_teacher/`，对应 GitHub Pages 仓库路径。

## License

MIT License. Copyright (c) 2026 nightt5879.

---

# Who Is Your Teacher?

A just-for-fun teacher personality quiz. Users enter a teacher codename, answer 24 single-choice questions, and receive a locally calculated result card. The project is a static frontend app designed for GitHub Pages.

> This quiz is for entertainment only and is not an evaluation of any real person. Do not enter real names, photos, or personal private information.

## Features

- Chinese / English UI, questions, and result copy.
- 24 single-choice questions, with all scoring handled locally in the browser.
- A homepage participation counter; the current static version uses local counting and starts from 935.
- Result sharing through the native Web Share API, with clipboard fallback.
- A GitHub repository link on the result page for feedback, discussion, and remixing.
- GitHub Actions workflow for automatic GitHub Pages deployment.

## How Scoring Works

The quiz uses 8 internal dimensions to describe the teacher profile: homework load, control and discipline, exam pressure, chaos, unclear expression, absence or delay, care, and authority pressure. Each option adds points to some dimensions and may add a small result-specific bias.

Flow:

1. Add up dimension scores and result biases from the 24 answers.
2. Automatically calculate each dimension's maximum possible score from the question bank, then normalize the user profile to 0-100.
3. Match the user profile against result prototype vectors with weighted Manhattan distance.
4. Add option bias and a tiny deterministic chaos value to break close ties.
5. Score regular results first, then evaluate hidden-result trigger rules; hidden results only override when their trigger is met and their score is close enough.

All scoring runs in the browser. User input and answers are not uploaded.

## Development

```bash
npm install
npm run dev
npm test
npm run build
```

The Vite base is `/who_is_your_teacher/`, matching the GitHub Pages repository path.

## License

MIT License. Copyright (c) 2026 nightt5879.
