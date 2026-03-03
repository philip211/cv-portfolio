const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');
const originalContent = content;

const dict = [
  ['Этот проект был пробным продуктом, и он дал главные уроки:', 'This project was an MVP and taught main lessons:'],
  ['в social/realtime играх важны не только фичи, а культура, комьюнити и экономика.', 'in social/realtime games, features aren\\'t everything; culture, community, and economy are.'],
  ['Но именно поэтому этот кейс крутой: он показывает, что я умею:', 'But that\\'s exactly why this case is cool: it shows that I can:'],
  ['строить сложную систему,', 'build a complex system,'],
  ['доводить до релиза,', 'take it to release,'],
  ['видеть слабые места продукта,', 'see the weak points of the product,'],
  ['и на следующей итерации делать уже правильнее (как в NOIR).', 'and do it better in the next iteration (like NOIR).'],
  ['NOIR — это премиальный социальный продукт в Telegram (TMA).', 'NOIR is a premium social product in Telegram (TMA).'],
  ['Я хотел сделать не просто интерфейс, а цельную систему (на будущее):', 'I wanted to build not just an interface, but a complete system (for the future):'],
  ['Я увидел простую проблему: большинство соц/знакомств в TWA/TMA — это мусорные клоны Tinder.', 'I saw a simple problem: most social/dating Mini Apps are garbage Tinder clones.'],
  ['И я подумал: а если сделать продукт, который ощущается как нативное Apple-приложение, но живёт в Telegram?', 'And I thought: what if I build a product that feels like a native Apple app, but lives in Telegram?'],
  ['быстрый вход без установки,', 'quick entry without installation,'],
  ['Сначала я зафиксировал архитектуру продукта, а не кода. Мои правила для NOIR:', 'First I set product architecture, not code. My rules for NOIR:'],
  ['меньше шума, больше смысла', 'less noise, more meaning'],
  ['Я разложил продукт на состояния (пузыри, модалки, скелетоны, drawer-ы, action sheets) и компоненты.', 'I broke down the product into states (bubbles, modals, skeletons, drawers, action sheets) and components.'],
  ['В NOIR я изначально закладывал production-ready практики:', 'In NOIR I initially laid down production-ready practices:'],
  ['Деплой я строю так, чтобы можно было катить фичи каждую неделю (Vite, Docker, CI/CD).', 'I build the deploy so that features can be shipped every week (Vite, Docker, CI/CD).'],
  ['В соц-продуктах важна не только разработка. Решает продуктовое видение и системный подход.', 'In social products, development isn\\'t the only thing. Product vision and systemic approach decide.'],
  ['системный UX (сценарии, удержание, понятные состояния)', 'systemic UX (scenarios, retention, clear states)'],
  ['Проект закрыт и находится под NDA (Non-Disclosure Agreement). Я не могу раскрывать скриншоты, точные метрики или детали реализации.', 'The project is closed and under NDA (Non-Disclosure Agreement). I cannot disclose screenshots, exact metrics, or precise implementation details.'],
  ['Я собрал систему, где ИИ-агенты работают как команда разработчиков, чтобы закрывать весь цикл создания фичи до написания кода.', 'I built a system where AI agents work as a dev team to close the whole feature creation cycle before writing code.'],
  ['Цель — не «нагенерить код», а сделать так, чтобы разработка была предсказуемой и системной.', 'Goal is not to "generate code", but to make development predictable and systemic.'],
  ['В реальной разработке (особенно в стартапах) 80% времени уходит на коммуникацию и согласования:', 'In real development (especially in startups) 80% of the time is spent on communication and approvals:'],
  ['задачи в хаосе и без чётких критериев «готово»,', 'tasks in chaos and without clear "done" criteria,'],
  ['долгое ревью и бесконечные правки,', 'long review and endless edits,'],
  ['отсутствие артефактов (спеки, схемы, чеклисты, тесты),', 'absence of artifacts (specs, schemas, checklists, tests),'],
  ['зависимость от «в голове держу».', 'dependency on "keep it in my head".'],
  ['Я хотел это убрать и сделать процесс таким, чтобы ИИ брал на себя всю черновую работу по системному анализу, проектированию и ревью.', 'I wanted to remove this and make process such that AI takes all rough work on systemic analysis, design and review.'],
  ['Каждый агент — это отдельный скрипт с промптом и доступом к контексту (AST, схемы БД, файлы API).', 'Each agent is a separate script with prompt and access to context (AST, DB schemas, API files).'],
  ['На выходе (для небольших фич) я получаю не просто «код», а готовый PR-набор:', 'On output (for small features) I receive not just "code", but ready PR-set:'],
  ['Скорость разработки растёт, потому что меньше времени тратится на согласования.', 'Development speed grows because less time is spent on approvals.'],
  ['Качество не падает, потому что есть quality-gates на каждом этапе (спека -> схемы -> код).', 'Quality doesn\\'t drop because of quality-gates at each stage (spec -> schemas -> code).'],
  ['Процесс становится повторяемым: любая фича проходит один и тот же цикл независимо от того, кто её инициировал.', 'Process becomes repeatable: any feature goes through the same cycle regardless of who initiated it.']
];

for (const [ru, en] of dict) {
  content = content.split(">" + ru + "<").join(">{i18n.language === 'en' ? '" + en.replace(/'/g, "\\'") + "' : '" + ru.replace(/'/g, "\\'") + "'}<");
  content = content.split(ru).join("{i18n.language === 'en' ? '" + en.replace(/'/g, "\\'") + "' : '" + ru.replace(/'/g, "\\'") + "'}");
}

let modified = (content !== originalContent);
fs.writeFileSync('src/App.tsx', content);
console.log('Modified:', modified);
