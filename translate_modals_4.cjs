const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const replacements = [
  ['Этот проект был пробным продуктом, и он дал главные уроки:', 'This project was an MVP and taught key lessons:'],
  ['Но именно поэтому этот кейс крутой: он показывает, что я умею:', 'But that\\'s exactly why this case is important: it proves I can:'],
  ['и на следующей итерации делать уже правильнее (как в NOIR).', 'and do it better in the next iteration (like NOIR).'],
  ['NOIR — это премиальный социальный продукт в Telegram (TMA).', 'NOIR is a premium social product in Telegram (TMA).'],
  ['Я хотел сделать не просто интерфейс, а цельную систему (на будущее):', 'I wanted to build not just an interface, but a complete system (for the future):'],
  ['подумал: а если сделать продукт, который ощущается как нативное Apple-приложение, но живёт в Telegram?', 'And I thought: what if I build a product that feels like a native Apple app, but lives in Telegram?'],
  ['Сначала я зафиксировал архитектуру продукта, а не кода. Мои правила для NOIR:', 'First, I defined the product architecture, not the code. My rules for NOIR:'],
  ['Я разложил продукт на состояния (пузыри, модалки, скелетоны, drawer-ы, action sheets) и компоненты.', 'I broke down the product into states (bubbles, modals, skeletons, drawers, action sheets) and components.'],
  ['Цель была — сделать интерфейс бесшовным, с плавными переходами и 60fps анимациями.', 'The goal was a seamless interface with smooth transitions and 60fps animations.'],
  ['В NOIR я изначально закладывал production-ready практики:', 'In NOIR I initially laid down production-ready practices:'],
  // GPT modal
  ['Проект закрыт и находится под NDA (Non-Disclosure Agreement)', 'The project is closed and under NDA (Non-Disclosure Agreement)'],
  ['Я собрал систему, где ИИ-агенты работают как команда', 'I built a system where AI agents work as a team'],
  ['Цель — не «нагенерить код», а сделать так, чтобы разработка', 'The goal is not to "generate code", but to make development'],
  ['В реальной разработке (особенно в стартапах) 80% времени', 'In real development (especially in startups) 80% of time'],
  ['задачи в хаосе и без чётких критериев «готово»,', 'tasks in chaos without clear "done" criteria,'],
  ['долгое ревью и бесконечные правки,', 'long review and endless edits,'],
  ['отсутствие артефактов (спеки, схемы, чеклисты, тесты),', 'lack of artifacts (specs, schemas, checklists, tests),'],
  ['зависимость от «в голове держу».', 'dependency on "keep in mind".'],
  ['Я хотел это убрать и сделать процесс таким, чтобы ИИ', 'I wanted to remove this and make the process such that AI'],
  ['Каждый агент — это отдельный скрипт с промптом и доступом', 'Each agent is a separate script with prompt and access'],
  ['Output: Цель, сценарии использования, edge-cases', 'Output: Goal, use cases, edge-cases'],
  ['Output: Структура модулей, контракты, машина состояний', 'Output: Modules structure, contracts, state machine'],
  ['Output: Исходный код фичи, разбитый по компонентам', 'Output: Feature source code broken down by components'],
  ['Output: PR Summary, список замечаний, автоматический fix', 'Output: PR Summary, review notes, auto fix'],
  ['Output: Файлы .test.ts, моки данных, покрытие', 'Output: .test.ts files, data mocks, coverage'],
  ['Output: Чеклист (миграции БД, новые ENV переменные)', 'Output: Checklist (DB migrations, new ENV variables)'],
  ['На выходе (для небольших фич) я получаю не просто', 'As an output (for small features) I receive not just'],
  ['Спецификация + acceptance criteria', 'Specification + acceptance criteria'],
  ['Схема потоков/состояний', 'Flow/state diagram'],
  ['Контракты API/событий', 'API/Event Contracts'],
  ['PR summary и список рисков', 'PR summary and risk list'],
  ['Тест-скелет', 'Test skeleton'],
  ['Релиз-чеклист', 'Release checklist'],
  ['Скорость разработки растёт, потому что меньше', 'Development speed increases because there is less'],
  ['Качество не падает, потому что есть quality-gates', 'Quality does not drop because of quality-gates'],
  ['Процесс становится повторяемым: любая фича проходит', 'Process becomes repeatable: any feature goes'],
  ['Меньше хаоса → меньше багов → быстрее time-to-market', 'Less chaos → fewer bugs → faster time-to-market'],
  ['Я собрал pipeline для разработки с ИИ-агентами', 'I built a pipeline for development with AI agents']
];

for (const [ru, en] of replacements) {
    const escapedRu = ru.replace(/[.*+?^\\$\\(\\)|\\[\\]\\\\{}]/g, '\\\\$&');
    content = content.replace(escapedRu, "{i18n.language === 'en' ? '"+ en.replace(/'/g, "\\\\'") +"' : '"+ ru.replace(/'/g, "\\\\'") +"'}");
}

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log('Done');
