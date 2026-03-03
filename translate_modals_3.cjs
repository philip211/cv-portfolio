const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const replacements = [
  ['React + TypeScript фронт', 'React + TypeScript Front-end'],
  ['Backend на NestJS/Fastify', 'NestJS/Fastify Backend'],
  ['Redis (кэш/события/скейл)', 'Redis (Cache/Events/Scale)'],
  ['Мониторинг/логирование', 'Monitoring/Logging'],
  ['Этот проект был пробным продуктом, и он дал главные уроки', 'This project was an MVP and taught key lessons'],
  ['в social/realtime играх важны не только фичи, а культура, комьюнити и экономика.', 'in social/realtime games, features aren\\'t everything; culture, community, and economy are.'],
  ['Но именно поэтому этот кейс крутой: он показывает, что я умею', 'But that\\'s exactly why this case is important: it proves I can'],
  ['строить сложную систему,', 'build a complex system,'],
  ['доводить до релиза,', 'take it to release,'],
  ['видеть слабые места продукта,', 'identify product weaknesses,'],
  ['и на следующей итерации делать уже правильнее', 'and do it better in the next iteration'],
  ['NOIR — это премиальный социальный продукт в Telegram', 'NOIR is a premium social product in Telegram'],
  ['Я хотел сделать не просто интерфейс, а цельную систему', 'I wanted to build not just an interface, but a complete system'],
  ['лента / контент / сценарии (чтобы было что делать),', 'feed / content / scenarios (to have things to do),'],
  ['комьюнити и взаимодействия (чтобы было с кем),', 'community and interactions (to have people to do it with),'],
  ['слой доверия (чтобы не было мусора и токсичности),', 'trust layer (to avoid spam and toxicity),'],
  ['и всё это — в premium UX, как iOS-продукт.', 'and all this in a premium UX, like an iOS product.'],
  ['Я увидел простую проблему: большинство соц/знакомств в TWA/TMA — это мусорные клоны Tinder.', 'I saw a simple problem: most social/dating Mini Apps are garbage Tinder clones.'],
  ['подумал: а если сделать продукт, который ощущается', 'And I thought: what if I build a product that feels'],
  ['быстрый вход без установки,', 'instant entry without installation,'],
  ['привычная среда,', 'familiar environment,'],
  ['легко масштабировать аудиторию,', 'easy to scale audience,'],
  ['можно строить продукт прямо внутри мессенджера.', 'you can build products right inside the messenger.'],
  ['1) Концепт и Принципы', '1) Concept and Principles'],
  ['Сначала я зафиксировал архитектуру', 'First, I defined the architecture'],
  ['качество > количество', 'quality > quantity'],
  ['меньше шума, больше смысла', 'less noise, more meaning'],
  ['доверие и безопасность — часть архитектуры, а не фича', 'trust and security are part of architecture, not a feature'],
  ['premium feel: скорость, микровзаимодействия, чистый UI', 'premium feel: speed, micro-interactions, clean UI'],
  ['2) UX/UI Система', '2) UX/UI System'],
  ['Я разложил продукт на состояния', 'I broke down the product into states'],
  ['Цель была — сделать интерфейс бесшовным', 'The goal was a seamless interface'],
  ['3) Дата-слой и Контракты', '3) Data Layer and Contracts'],
  ['Я сразу пошёл через дизайн API (Swagger/OpenAPI-first мышление). Сначала контракты, потом код.', 'I started with API design (Swagger/OpenAPI-first mindset). Contracts first, code second.'],
  ['Это та часть, где full-stack мышление решает: я не жду бэкенд, я проектирую данные вместе с ним.', 'This is where full-stack thinking wins: I don\\'t wait for the backend, I design data with it.'],
  ['4) Архитектура Клиента (React + TS)', '4) Client Architecture (React + TS)'],
  ['Инженерный принцип: типа данных — король. Строгий TypeScript во всём приложении.', 'Engineering principle: data type is king. Strict TypeScript across the app.'],
  ['TanStack Query (кэш, refetch)', 'TanStack Query (cache, refetch)'],
  ['Zustand (локальные стейты)', 'Zustand (local states)'],
  ['Redis (кэш/сессии/события)', 'Redis (cache/sessions/events)'],
  ['Socket.io (опционально)', 'Socket.io (optional)'],
  ['5) Безопасность и Инфраструктура', '5) Security and Infrastructure'],
  ['В NOIR я изначально закладывал production-ready практики', 'In NOIR I initially laid down production-ready practices'],
  ['верификация Telegram initData', 'Telegram initData verification'],
  ['логирование критических операций и health checks', 'critical operation logging and health checks'],
  ['контроль спама и rate limits', 'spam control and rate limits'],
  ['миграции БД через Drizzle и мониторинг через Sentry', 'DB migrations via Drizzle and monitoring via Sentry'],
  ['политика приватности данных', 'data privacy policy'],
  ['6) Деплой и Релиз-цикл', '6) Deploy and Release Cycle'],
  ['Деплой я строю так, чтобы можно было катить фичи каждую неделю (Vite, Docker, CI/CD).', 'I build deployment so features can be shipped weekly (Vite, Docker, CI/CD).'],
  ['В соц-продуктах важна не только разработка. Решает продуктовое видение и системный подход.', 'In social products, development isn\\'t the only thing. Product vision and systemic approach decide.'],
  ['Что в этом кейсе самое сильное (что видно работодателю):', 'What is the strongest part of this case (what the employer sees):'],
  ['системный UX (сценарии, удержание, понятные состояния)', 'systemic UX (scenarios, retention, clear states)'],
  ['дизайн-система и premium UI', 'design system and premium UI'],
  ['full-stack мышление (данные, контракты, инфраструктура)', 'full-stack mindset (data, contracts, infra)'],
  ['доверие/безопасность как часть архитектуры', 'trust/security as part of architecture'],
  ['продакшн-подход: мониторинг, миграции, health checks', 'production approach: monitoring, migrations, health checks'],
  ['Конфиденциально', 'Confidential'],
  ['Проект закрыт и находится под NDA (Non-Disclosure Agreement). Я не могу раскрывать скриншоты, точные метрики или детали реализации.', 'The project is closed and under NDA (Non-Disclosure Agreement). I cannot disclose screenshots, exact metrics, or precise implementation details.']
];

for (const [ru, en] of replacements) {
    const escapedRu = ru.replace(/[.*+?^\\$\\(\\)|\\[\\]\\\\{}]/g, '\\\\$&');
    const regex = new RegExp(">(?:\\\\s*)(" + escapedRu + ")(?:\\\\s*)<", "g");
    
    content = content.replace(regex, (match, p1) => {
        return match.replace(p1, "{i18n.language === 'en' ? '"+ en.replace(/'/g, "\\\\'") +"' : '"+ ru.replace(/'/g, "\\\\'") +"'}");
    });
    
    const regex2 = new RegExp(">(" + escapedRu + ")(.*?)</", "g");
    content = content.replace(regex2, (match, p1, p2) => {
        return ">{i18n.language === 'en' ? '"+ en.replace(/'/g, "\\\\'") +"' : '"+ ru.replace(/'/g, "\\\\'") +"'}"+ p2 + "</";
    });
}
fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log('Done');
