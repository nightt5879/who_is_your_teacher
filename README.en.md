# Who Is Your Teacher?

[中文](./README.md)

A just-for-fun teacher personality quiz. Enter a teacher codename or nickname, answer 24 single-choice questions, and receive a character-style result card. The project is a static frontend app designed for GitHub Pages.

> This quiz is for entertainment only and is not an evaluation of any real person. Do not enter real names, photos, or private personal information.

## Live Site

GitHub Pages:

https://nightt5879.github.io/who_is_your_teacher/

## Features

- Chinese / English UI, questions, and result copy.
- 24 single-choice questions, with matching calculated locally in the browser.
- 17+n possible results, including hidden results that require special trigger conditions.
- A homepage participation counter. Page visits increment a public counter API; if the API is unavailable, the app falls back to a local display without blocking the quiz.
- Immersive result pages with character art, an eight-dimension radar chart, scores, short comments, quote, survival guide, and hidden-result markers.
- Save a 1080x1920 vertical result poster; if generation fails, copy the result text instead.
- A GitHub repository link on the result page for feedback, discussion, and remixing.

## How Scoring Works

The quiz uses 8 internal dimensions to describe the teacher profile:

- Homework Load
- Control & Discipline
- Exam Ambush
- Chaos Energy
- Riddle Logic
- Absent / Delayed
- Human Care
- Authority Pressure

Each option adds points to some dimensions and may add a small result-specific bias. The full flow is:

1. Add up dimension scores and result biases from the 24 answers.
2. Automatically calculate each dimension's maximum possible score from the question bank, then normalize the profile to 0-100.
3. Match the normalized profile against result prototype vectors using weighted Manhattan distance.
4. Add option bias and a tiny deterministic chaos value to break close ties.
5. Score regular results first, then evaluate hidden-result trigger rules; hidden results only override when their trigger is met and their score is close enough.

The frontend only shows the final result and the eight-dimension profile. It does not expose internal boosts, distance scores, or ranking details.

## Privacy

- No login required.
- Teacher names, answers, and results are not uploaded.
- The participation counter only increments a public visit counter and does not include user input.
- Result posters are generated locally in the browser.

## Development

```bash
npm install
npm run dev
npm test
npm run build
```

The Vite base is `/who_is_your_teacher/`, matching the GitHub Pages repository path.

## Deployment

The repository includes a GitHub Actions workflow. On every push to `main`, it will:

1. Install dependencies
2. Run tests
3. Build the Vite static output
4. Upload and deploy the site to GitHub Pages

In GitHub repository Settings, enable Pages and choose GitHub Actions as the publishing source.

## License

MIT License. Copyright (c) 2026 nightt5879.
