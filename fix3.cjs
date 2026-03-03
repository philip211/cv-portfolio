import fs from 'fs';

let content = fs.readFileSync('src/i18n.ts', 'utf8');

// Remove all "experience_edu": { ... }, blocks completely
content = content.replace(/"experience_edu":\s*\{[\s\S]*?\},/g, '');

const enExp = `
    "experience_edu": {
      "title": "Experience & Education",
      "job_company": "Trood | 2021 — 2022",
      "job_stack": "Frontend • React / TypeScript",
      "job_point1": "Collaborated with the core team to refine UX and interface components.",
      "job_point2": "Refactored UI elements to improve front-end architecture and code standards.",
      "job_point3": "Helped establish clear design-to-code pipelines to boost team velocity.",
      "job_point4": "Developed interactive and stable components for dynamic data.",
      "edu_track": "Software Engineering • 2024",
      "edu_point1": "Solid foundation in computer science and software development.",
      "edu_point2": "Mentored junior students and guided paired programming sessions.",
      "edu_point3": "Deep dive into data structures, algorithms, and application design.",
      "edu_point4": "Defended final milestone project utilizing modern web standards."
    },`;

const ruExp = `
    "experience_edu": {
      "title": "Опыт и Образование",
      "job_company": "Trood | 2021 — 2022",
      "job_stack": "Frontend • React / TypeScript",
      "job_point1": "Взаимодействовал с командой для улучшения UX и компонентов интерфейса.",
      "job_point2": "Рефакторил UI-элементы для улучшения архитектуры фронтенда и стандартов кода.",
      "job_point3": "Помогал выстраивать процессы дизайн-в-код для ускорения работы команды.",
      "job_point4": "Разрабатывал интерактивные и стабильные компоненты для работы с динамическими данными.",
      "edu_track": "Программная инженерия • 2024",
      "edu_point1": "Твердая база в компьютерных науках и разработке программного обеспечения.",
      "edu_point2": "Менторил студентов младших курсов и проводил сессии парного программирования.",
      "edu_point3": "Глубокое погружение в структуры данных, алгоритмы и проектирование приложений.",
      "edu_point4": "Защитил итоговый проект с использованием современных веб-стандартов."
    },`;

// The translation has two blocks:
// en: { translation: { ..., "nav": {...} } }
// ru: { translation: { ..., "nav": {...} } }
let firstNav = content.indexOf('"nav": {');
content = content.substring(0, firstNav) + enExp.trimStart() + '\n    ' + content.substring(firstNav);

let secondNav = content.indexOf('"nav": {', firstNav + 100);
content = content.substring(0, secondNav) + ruExp.trimStart() + '\n    ' + content.substring(secondNav);

fs.writeFileSync('src/i18n.ts', content);
console.log('Fixed src/i18n.ts properly.');
