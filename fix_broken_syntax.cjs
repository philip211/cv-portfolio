const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const replacements = [
    ['{i18n.language === "en" ? "{>"} Output: Goal, usage scenarios, edge-cases, acceptance criteria." : "{>"} Output: Цель, сценарии использования, edge-cases, критерии готовности (Acceptance Criteria)."}', '{i18n.language === "en" ? "> Output: Goal, usage scenarios, edge-cases, acceptance criteria." : "> Output: Цель, сценарии использования, edge-cases, критерии готовности (Acceptance Criteria)."}'],
    ['{i18n.language === "en" ? "{>"} Output: Module structure, contracts, state machine, potential technical risks." : "{>"} Output: Структура модулей, контракты, машина состояний, потенциальные технические риски."}', '{i18n.language === "en" ? "> Output: Module structure, contracts, state machine, potential technical risks." : "> Output: Структура модулей, контракты, машина состояний, потенциальные технические риски."}'],
    ['{i18n.language === "en" ? "{>"} Output: Feature source code broken down into components and services." : "{>"} Output: Исходный код фичи, разбитый по компонентам и сервисам."}', '{i18n.language === "en" ? "> Output: Feature source code broken down into components and services." : "> Output: Исходный код фичи, разбитый по компонентам и сервисам."}'],
    ['{i18n.language === "en" ? "{>"} Output: PR Summary, remarks list, auto bug fixes." : "{>"} Output: PR Summary, список замечаний, автоматические исправления багов."}', '{i18n.language === "en" ? "> Output: PR Summary, remarks list, auto bug fixes." : "> Output: PR Summary, список замечаний, автоматические исправления багов."}'],
    ['{i18n.language === "en" ? "{>"} Output: .test.ts files, data mocks, coverage of main use-cases from step 1." : "{>"} Output: Файлы .test.ts, моки данных, покрытие основных use-cases из шага 1."}', '{i18n.language === "en" ? "> Output: .test.ts files, data mocks, coverage of main use-cases from step 1." : "> Output: Файлы .test.ts, моки данных, покрытие основных use-cases из шага 1."}'],
    ['{i18n.language === "en" ? "{>"} Output: Checklist (DB migrations, new ENV variables, health checks, metrics logging)." : "{>"} Output: Чеклист (миграции БД, новые ENV переменные, health checks, логирование метрик)."}', '{i18n.language === "en" ? "> Output: Checklist (DB migrations, new ENV variables, health checks, metrics logging)." : "> Output: Чеклист (миграции БД, новые ENV переменные, health checks, логирование метрик)."}']
];

replacements.forEach(([oldStr, newStr]) => {
    content = content.replace(oldStr, newStr);
});

fs.writeFileSync('src/App.tsx', content);
