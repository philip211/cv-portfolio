const fs = require('fs');
let code = fs.readFileSync('i18n.ts', 'utf8');

const enExp = "experience_edu": {
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
    },;

const ruExp = "experience_edu": {
        "title": "Опыт и Образование",
        "job_company": "Trood | 2021 — 2022",
        "job_stack": "Frontend • React / TypeScript",
        "job_point1": "Тесно работал с командой над улучшением UX и компонентов интерфейса.",
        "job_point2": "Рефакторил UI-элементы для улучшения архитектуры фронтенда и стандартов кода.",
        "job_point3": "Помогал выстраивать процессы «дизайн → код» для ускорения работы команды.",
        "job_point4": "Разрабатывал интерактивные и стабильные компоненты для работы с динамическими данными.",
        "edu_track": "Software Engineering • 2024",
        "edu_point1": "Твердая база в компьютерных науках и разработке программного обеспечения.",
        "edu_point2": "Менторил студентов младших курсов и проводил сессии парного программирования.",
        "edu_point3": "Глубокое погружение в структуры данных, алгоритмы и проектирование приложений.",
        "edu_point4": "Защитил дипломный проект с использованием современных веб-стандартов."
    },;

// Check where to inject (before "nav": {)
// For EN
let enNavIndex = code.indexOf('"nav": {');
if (enNavIndex !== -1 && !code.includes('"experience_edu":')) {
    code = code.slice(0, enNavIndex) + enExp + '\n    ' + code.slice(enNavIndex);
}

// For RU
let ruNavIndex = code.indexOf('"nav": {', enNavIndex + 100);
if (ruNavIndex !== -1 && code.indexOf('"experience_edu"', enNavIndex + 100) === -1) {
    code = code.slice(0, ruNavIndex) + ruExp + '\n    ' + code.slice(ruNavIndex);
}

fs.writeFileSync('i18n.ts', code);
console.log('Fixed i18n.ts');
