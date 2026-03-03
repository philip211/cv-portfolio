const fs = require('fs');

const enNew = {
  projects: {
    title: "Projects",
    subtitle: "/ Cinematic Cases",
    sort: "SORT BY: IMPACT",
    p1: {
      tag: "Multiplayer / WebSockets",
      title1: "Ravenhill:",
      title2: "Night Streets",
      desc: "Multiplayer social deduction game (up to 30 players)",
      tech1: "React / TS",
      tech2: "WebSockets",
      problem_label: "Problem",
      problem_text: "complex synchronization and fair game logic",
      solution_label: "Solution",
      solution_text: "developed a robust architecture with roles, phases, and private channels.",
      feature1: "Fully functional chat with private role-rooms and system events",
      feature2: "State predictability mechanism via phases (Day/Night) avoiding desyncs",
      feature3: "Custom hooks architecture handling disconnected players and edge cases"
    },
    p2: {
      tag: "Mini App / Telegram",
      title1: "Tap-Game:",
      title2: "Tokenomics",
      desc: "Fully functional Telegram Mini App mechanics",
      tech1: "React / Zustand",
      tech2: "TG Web Apps API",
      problem_label: "Problem",
      problem_text: "low retention and unengaging onboarding",
      solution_label: "Solution",
      solution_text: "smooth, non-annoying frontend with satisfying mechanics.",
      feature1: "Implemented 60fps animations for continuous tapping feedback",
      feature2: "Configured offline-first behavior caching energy state between sessions",
      feature3: "Native TG integration (haptic feedback, user theme sync)"
    }
  },
  ai_pipeline: {
    title1: "Speed",
    title2: "x3",
    subtitle: "HOW I USE AI",
    desc: "I don't just 'ask ChatGPT'. I have built a predictable architectural flow where AI acts as a 10x accelerator for boilerplate, leaving engineering control completely in my hands."
  },
  contact: {
    title1: "Ready to",
    title2: "Deploy?",
    subtitle: "I read emails and respond in TG within hours.",
    tgBtn: "CONNECT ON T-GRAM",
    gitBtn: "BROWSE COMMITS",
    mailBtn: "DROP AN EMAIL",
    footer_built: "Built with React + Framer Motion. 2024."
  }
};

const ruNew = {
  projects: {
    title: "Проекты",
    subtitle: "/ Cinematic Cases",
    sort: "SORT BY: IMPACT",
    p1: {
      tag: "Многопользовательская / WebSockets",
      title1: "Рейвенхилл:",
      title2: "Ночные улицы",
      desc: "Многопользовательская социальная игра (до 30 игроков)",
      tech1: "React / TS",
      tech2: "Веб-сокеты",
      problem_label: "Проблема",
      problem_text: "сложная синхронизация и честная игровая логика",
      solution_label: "Решение",
      solution_text: "разработал крепкую архитектуру с ролями, фазами и приватными каналами.",
      feature1: "Полнофункциональный чат с приватными комнатами ролей и системными событиями",
      feature2: "Механизм предсказуемости состояния через фазы (День/Ночь), исключающий рассинхрон",
      feature3: "Архитектура кастомных хуков, обрабатывающая отключения игроков и edge-cases"
    },
    p2: {
      tag: "Mini App / Telegram",
      title1: "Твалка:",
      title2: "Токеномика",
      desc: "Полноценная механика Telegram Mini App",
      tech1: "React / Zustand",
      tech2: "TG Web Apps API",
      problem_label: "Проблема",
      problem_text: "низкий retention и скучный онбординг",
      solution_label: "Решение",
      solution_text: "плавный, не бесящий фронтенд с залипательной механикой.",
      feature1: "Реализовал 60fps анимации для непрерывного отклика при кликах",
      feature2: "Настроил offline-first поведение, кеширующее состояние энергии между сессиями",
      feature3: "Нативная интеграция TG (haptic feedback, синхронизация темы пользователя)"
    }
  },
  ai_pipeline: {
    title1: "Скорость",
    title2: "x3",
    subtitle: "HOW I USE AI",
    desc: "Я не просто 'спрашиваю чатгпт'. У меня выстроен предсказуемый архитектурный флоу, где ИИ работает как 10x-ускоритель бойлерплейта, оставляя инженерный контроль полностью в моих руках."
  },
  contact: {
    title1: "Ready to",
    title2: "Deploy?",
    subtitle: "Читаю почту и отвечаю в ТГ в течение пары часов.",
    tgBtn: "НАПИСАТЬ В ТГ",
    gitBtn: "СМОТРЕТЬ КОММИТЫ",
    mailBtn: "НАПИСАТЬ EMAIL",
    footer_built: "Built with React + Framer Motion. 2024."
  }
};

let content = fs.readFileSync('src/i18n.ts', 'utf8');

// replace previously appended ones just in case
content = content.replace(/,\s*"projects":\s*\{[\s\S]*?(?=\n      "(?:ai_pipeline|contact|experience_edu|process)"|n    \}|\s*\}\s*\}\s*;)/g, '');
content = content.replace(/,\s*"ai_pipeline":\s*\{[\s\S]*?(?=\n      "(?:projects|contact|experience_edu|process)"|n    \}|\s*\}\s*\}\s*;)/g, '');
content = content.replace(/,\s*"contact":\s*\{[\s\S]*?(?=\n      "(?:projects|ai_pipeline|experience_edu|process)"|n    \}|\s*\}\s*\}\s*;)/g, '');
content = content.replace(/,\s*"cta":\s*\{[\s\S]*?(?=\n      "(?:projects|ai_pipeline|experience_edu|process)"|n    \}|\s*\}\s*\}\s*;)/g, '');

content = content.replace(/(en:\s*{\s*translation:\s*{)([\s\S]*?)(\s*}\s*})/, (match, p1, p2, p3) => {
  return p1 + p2 + ",\n      \"projects\": " + JSON.stringify(enNew.projects, null, 6).trim().replace(/\n/g, '\n      ') +
   ",\n      \"ai_pipeline\": " + JSON.stringify(enNew.ai_pipeline, null, 6).trim().replace(/\n/g, '\n      ') +
   ",\n      \"contact\": " + JSON.stringify(enNew.contact, null, 6).trim().replace(/\n/g, '\n      ') + p3;
});

content = content.replace(/(ru:\s*{\s*translation:\s*{)([\s\S]*?)(\s*}\s*})/, (match, p1, p2, p3) => {
  return p1 + p2 + ",\n      \"projects\": " + JSON.stringify(ruNew.projects, null, 6).trim().replace(/\n/g, '\n      ') +
   ",\n      \"ai_pipeline\": " + JSON.stringify(ruNew.ai_pipeline, null, 6).trim().replace(/\n/g, '\n      ') +
   ",\n      \"contact\": " + JSON.stringify(ruNew.contact, null, 6).trim().replace(/\n/g, '\n      ') + p3;
});

fs.writeFileSync('src/i18n.ts', content);
