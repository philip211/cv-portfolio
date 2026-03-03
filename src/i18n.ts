import i18n from "i18next";
import { initReactI18next } from "react-i18next";


const resources = {
  en: { translation: {
"process_steps": {"s1_t":"Align","s1_d":"Goal, user, acceptance criteria. No fog.","s2_t":"Blueprint","s2_d":"Screen/event schematic. Marking risks immediately.","s3_t":"Build","s3_d":"Skeleton and architecture first, then details. TS-first.","s4_t":"Polish","s4_d":"Micro-UX, speed, animations. Premium feel.","s5_t":"Ship","s5_d":"Release → feedback → priority improvements."},
"ai_pipeline2": {"desc":"I use AI as a second brain and a team. Final decisions on architecture, UX, and quality are always mine. AI accelerates the routine.","s1_t":"Clarify (Spec)","s1_d":"AI helps turn ideas into clear specs: user stories, scenarios, edge-cases, acceptance criteria.","s2_t":"Design (System)","s2_d":"I make state/event diagrams and API contracts. AI helps quickly check risks and alternatives.","s3_t":"Build (Code)","s3_d":"Generate skeleton, types, modules (React, NestJS). I control structure — AI accelerates typing.","s4_t":"Review (Quality Gate)","s4_d":"Check: types, readability, errors, security. Change lists — straight to the point.","s5_t":"Test (Skeleton)","s5_d":"AI helps quickly build test skeletons and checklists: what must be covered.","s6_t":"Ship (Release)","s6_d":"Final check: migrations, env, monitoring, health checks, operational logs."},


    
    
    
    
    "experience_edu": {
      "title": "Experience & Education",
      "job_company": "Trood | Internship • 2024",
      "job_stack": "Frontend • React / TypeScript",
      "job_point1": "Collaborated with the core team to refine UX and interface components.",
      "job_point2": "Refactored UI elements to improve front-end architecture and code standards.",
      "job_point3": "Helped establish clear design-to-code pipelines to boost team velocity.",
      "job_point4": "Developed interactive and stable components for dynamic data.",
      "edu_track": "Frontend Development • React • 2021 — 2022",
      "edu_point1": "Studied frontend development with a focus on React framework and modern JavaScript.",
      "edu_point2": "Built a full-featured online store: designed and implemented the UI from scratch.",
      "edu_point3": "Integrated the frontend with a backend API — product listings, cart, and order flow.",
      "edu_point4": "Successfully defended the online store project as the final graduation milestone."
    },

    "nav": {
        "home": "Home",
        "work": "Work",
        "stack": "Stack",
        "path": "Path",
        "ai_pipeline": "AI Pipeline",
        "talk": "TALK",
        "cv": "CV"
    },
    "hero": {
        "status": "Open to: Internship / Junior+",
        "title1": "I don’t build pages.",
        "title2": "I ship products.",
        "stack": "Frontend / Full-stack • React • TypeScript • Telegram UI",
        "desc1": "I turn ideas into engaging interfaces and systems that don’t break under load.",
        "desc2": "Premium UI + engineering logic + delivery speed.",
        "desc3": "From prototype to production with clean architecture, predictable state, and realtime mechanics.",
        "subtext": "Right now I do more than just “pages”. I build apps where the UX is truly felt, and where the system comfortably handles complex scenarios and load.",
        "f1_title": "Clean TypeScript-first codebase",
        "f1_desc": "structure, conventions, readability",
        "f2_title": "Predictable state & flows",
        "f2_desc": "no chaos or magic",
        "f3_title": "Premium UI polish",
        "f3_desc": "micro-UX, animations, interface rhythm",
        "f4_title": "Realtime reliability",
        "f4_desc": "rooms/events/roles without desync",
        "f5_title": "Shipping mindset",
        "f5_desc": "I make “done”, not “almost”",
        "download_cv": "DOWNLOAD CV",
        "case_studies": "CASE STUDIES"
    },
    "metrics": {
        "shipped": "shipped features",
        "prod_releases": "prod releases",
        "ux_focus": "UX polish focus",
        "realtime": "Realtime roles"
    },
    "competencies": {
        "title": "Core Competencies",
        "subtitle": "What I bring to the table",
        "item1_title": "Product Engineering",
        "item1_desc": "I think in terms of results: user → value → metric → solution. I don't do features for features sake — I do what improves the product.",
        "item2_title": "Premium UI",
        "item2_desc": "Design system, components, state, typing, micro-animations. The interface looks like an iOS product, not a set of screens.",
        "item3_title": "Realtime Systems",
        "item3_desc": "Sockets, rooms, events, roles, private chats. When fairness, stability, and predictability are important, I am in my element.",
        "item4_title": "Automation with AI",
        "item4_desc": "I speed up the development cycle: spec → code → review → tests → release. I build workflows for the quality pipeline."
    },
    "about": {
        "title1": "I build interfaces people feel —",
        "title2": "and systems that scale.",
        "p1": "I came into programming not because I just wanted to code, but because I really like building things that people use.",
        "p2": "At first, I made simple interfaces — and very quickly I realized: a beautiful UI is not enough. If there is no system under the hood, everything falls apart: logic, states, scenarios, errors, load. Therefore, I started digging deeper — into architecture, state, edge-cases, realtime, load scaling.",
        "p3_1": "Over time, this became my style:",
        "p3_2": "premium UI + engineering logic.",
        "p4_1": "I get high when structure emerges from chaos:",
        "p4_2": "idea → prototype → product → releases."
    },
    "projects": {
        "title": "Projects",
        "subtitle": "Cinematic Cases",
        "sort_impact": "SORT BY: IMPACT",
        "p1": {
            "tag": "Multiplayer / WebSockets",
            "title1": "Ravenhill:",
            "title2": "Night Streets",
            "desc": "Multiplayer social game (up to 30 players)",
            "problem_label": "Problem",
            "problem_text": "complex synchronization and fair game logic",
            "build_label": "Built",
            "build_text": "locations, cutscenes, private chats, voice/chat events, deterministic resolver",
            "impact_label": "Impact",
            "impact_text": "stable realtime loop, massive potential, fewer bugs in production",
            "view_btn": "View Case",
            "demo_btn": "Demo",
            "repo_btn": "Repo",
            "tech1": "React / TS",
            "tech2": "WebSockets"
        },
        "p2": {
            "tag": "Telegram / Premium UI",
            "title1": "NOIR",
            "wip": "In Development",
            "desc": "Telegram-focused product with an emphasis on UX and premium feel.",
            "problem_label": "Problem",
            "problem_text": "retention and trust in social product = UX + scripts",
            "build_label": "Built",
            "build_text": "design system, feed, core loops, product scripts",
            "impact_label": "Impact",
            "impact_text": "interface you want to touch + logic that holds structure",
            "view_btn": "View Case",
            "review_btn": "UI Review"
        },
        "p3": {
            "tag": "Tooling / LLM",
            "title1": "AI Dev Team",
            "title2": "Workflows",
            "desc": "Orchestration of AI agent team for development",
            "problem_label": "Problem",
            "problem_text": "task chaos, long reviews, no artifacts",
            "build_label": "Built",
            "build_text": "pipeline: spec → generation → review → test-skeleton → release-checklist",
            "impact_label": "Impact",
            "impact_text": "speed increases, quality does not drop"
        }
    },
    "process": {
        "title1": "Process",
        "title2": "& Pipeline",
        "subtitle": "HOW I WORK",
        "step1_title": "Architecture & State",
        "step1_desc": "I do not write code immediately. I design state machines. Zustand, contexts, events.",
        "step2_title": "Types & UI Kit",
        "step2_desc": "Strict interfaces, basic scalable components, semantic tokens.",
        "step3_title": "Logic Integration",
        "step3_desc": "I connect realtime, routing, requests. With loading and error handlers.",
        "step4_title": "UX Polish",
        "step4_desc": "Micro-animations, rhythms, Framer Motion. Making the interface feel premium.",
        "step_num": "STEP"
    },
    "experience": {
        "title": "Experience",
        "subtitle": "THE PATH",
        "wip": "ACTIVE",
        "role1": "Frontend / Full-stack Developer",
        "desc1": "Development of multiplayer game (React, WebSockets). Architecture, realtime, AI dev tools.",
        "role2": "Self-Education / Free-play",
        "desc2": "Deep dive into TS, architecture, network protocols, Telegram Mini Apps, Framer Motion.",
        "role3": "First steps in Frontend",
        "desc3": "Layouts, JS, React basics, interfaces."
    },
    "ai_pipeline": {
        "title1": "Speed",
        "title2": "x3",
        "subtitle": "HOW I USE AI",
        "desc": "I do not just ask chatgpt. I have a predictable architectural flow where AI acts as a 10x-accelerator for boilerplate, leaving engineering control entirely in my hands.",
        "c1_title": "Decomposition & Specs",
        "c1_desc": "I force AI to write strict TDD specifications.",
        "c2_title": "Code Gen & Refactor",
        "c2_desc": "Generation of CRUD, types, and basic hooks.",
        "c3_title": "Review & Tests",
        "c3_desc": "AI analyzes my code for edge-cases and performance."
    },
    "contact": {
        "title1": "Ready to",
        "title2": "Deploy?",
        "subtitle": "I read mail and answer in TG within a couple of hours.",
        "tgBtn": "WRITE IN TG",
        "gitBtn": "VIEW COMMITS",
        "mailBtn": "WRITE EMAIL",
        "footer_built": "Built with React + Framer Motion. 2024."
    }
} },
  ru: { translation: {
"process_steps": {"s1_t":"Align","s1_d":"Цель, пользователь, критерий готовности. Без тумана.","s2_t":"Blueprint","s2_d":"Схема экранов / событий. Где риски — отмечаю сразу.","s3_t":"Build","s3_d":"Сначала скелет и архитектура, затем детали. TS-first.","s4_t":"Polish","s4_d":"Микро-UX, скорость, анимации. “Premium feel”.","s5_t":"Ship","s5_d":"Релиз → фидбэк → улучшения по приоритетам."},
"ai_pipeline2": {"desc":"Я использую ИИ как «второй мозг» и как команду. Финальные решения: архитектура, UX, качество — всегда принимаю я. ИИ ускоряет рутину.","s1_t":"Clarify (Spec)","s1_d":"ИИ помогает превратить идею в чёткое ТЗ: user story, сценарии, edge-cases, acceptance criteria.","s2_t":"Design (System)","s2_d":"Делаю схему состояний/событий, контракты API. ИИ помогает быстро проверить риски и варианты.","s3_t":"Build (Code)","s3_d":"Генерирую каркас, типы, модули (React, NestJS). Я контролирую структуру — ИИ ускоряет написание.","s4_t":"Review (Quality Gate)","s4_d":"Проверка: типы, читаемость, ошибки, безопасность. Список правок — сразу по делу без воды.","s5_t":"Test (Skeleton)","s5_d":"ИИ помогает быстро собрать тест-скелет и чеклист: что точно должно быть покрыто автотестами.","s6_t":"Ship (Release)","s6_d":"Финальная проверка: миграции Drizzle, env, мониторинг, health checks, логи операций."},


        "experience_edu": {
      "title": "Опыт и Образование",
      "job_company": "Trood | Практика • 2024",
      "job_stack": "Frontend • React / TypeScript",
      "job_point1": "Взаимодействовал с командой для улучшения UX и компонентов интерфейса.",
      "job_point2": "Рефакторил UI-элементы для улучшения архитектуры фронтенда и стандартов кода.",
      "job_point3": "Помогал выстраивать процессы дизайн-в-код для ускорения работы команды.",
      "job_point4": "Разрабатывал интерактивные и стабильные компоненты для работы с динамическими данными.",
      "edu_track": "Фронтенд разработка • React • 2021 — 2022",
      "edu_point1": "Изучал фронтенд-разработку с уроном на фреймворк React и современный JavaScript.",
      "edu_point2": "Разработал полноценный онлайн-магазин: свёрстал интерфейс с нуля по макету.",
      "edu_point3": "Связал фронтенд с бэкендом — каталог товаров, корзина и оформление заказов.",
      "edu_point4": "Защитил итоговый проект — онлайн-магазин с полной интеграцией фронтенда и бэкенда."
    },
    "nav": {
        "home": "Главная",
        "work": "Проекты",
        "stack": "Стек",
        "path": "Опыт",
        "ai_pipeline": "ИИ Пайплайн",
        "talk": "КОНТАКТ",
        "cv": "Резюме"
    },
    "hero": {
        "status": "Открыт для: Internship / Junior+",
        "title1": "Я не просто собираю экраны.",
        "title2": "Я делаю готовые продукты.",
        "stack": "Frontend / Full-stack • React • TypeScript • Telegram UI",
        "desc1": "Я превращаю идею в интерфейс, который цепляет, и в систему, которая не ломается, когда приходит нагрузка.",
        "desc2": "Премиальный UI + инженерная логика + скорость доставки.",
        "desc3": "От прототипа до продакшна — с чистой архитектурой, предсказуемым состоянием и realtime-механиками.",
        "subtext": "Сейчас я делаю не просто “страницы”. Я собираю приложения, где UX реально ощущается, и где система спокойно держит сложные сценарии и нагрузку.",
        "f1_title": "Чистая TypeScript-first база кода",
        "f1_desc": "структура, соглашения, читаемость",
        "f2_title": "Предсказуемые состояния и потоки",
        "f2_desc": "без хаоса и магии",
        "f3_title": "Премиальная полировка UI",
        "f3_desc": "микро-UX, анимации, ритм интерфейса",
        "f4_title": "Надежность в реальном времени",
        "f4_desc": "комнаты/события/роли без рассинхрона",
        "f5_title": "Нацеленность на релиз",
        "f5_desc": "делаю “готово”, а не “почти”",
        "download_cv": "СКАЧАТЬ CV",
        "case_studies": "СМОТРЕТЬ КЕЙСЫ"
    },
    "metrics": {
        "shipped": "запущенных фич",
        "prod_releases": "prod релизов",
        "ux_focus": "фокус на UX",
        "realtime": "Realtime ролей"
    },
    "competencies": {
        "title": "Ключевые компетенции",
        "subtitle": "Основа моего подхода к разработке",
        "item1_title": "Продуктовая инженерия",
        "item1_desc": "Думаю результатом: пользователь → ценность → метрика → решение. Не делаю “фичи ради фич” — делаю то, что улучшает продукт.",
        "item2_title": "Премиальный UI",
        "item2_desc": "Дизайн-система, компоненты, состояние, типизация, микро-анимации. Интерфейс выглядит как iOS-продукт, а не как набор экранов.",
        "item3_title": "Realtime Системы",
        "item3_desc": "Сокеты, комнаты, события, роли, приватные чаты. Когда важны честность, стабильность и предсказуемость — я на своём поле.",
        "item4_title": "Автоматизация с ИИ",
        "item4_desc": "Ускоряю цикл разработки: спека → код → ревью → тесты → релиз. Собираю воркфлоу для конвейера качества."
    },
    "about": {
        "title1": "Создаю интерфейсы, которые чувствуют —",
        "title2": "и системы, которые масштабируются.",
        "p1": "Я в программирование пришёл не потому что “хочу просто кодить”, а потому что мне реально нравится строить вещи, которыми люди пользуются.",
        "p2": "Сначала делал обычные интерфейсы — и очень быстро дошло: одного красивого UI мало. Если под капотом нет системы, всё разваливается: логика, состояния, сценарии, ошибки, нагрузка. Поэтому я начал копать глубже — в архитектуру, состояние, edge-cases, realtime, масштабирование.",
        "p3_1": "Со временем это стало моим стилем:",
        "p3_2": "премиальный интерфейс + инженерная логика.",
        "p4_1": "Мне кайфово, когда из хаоса получается структура:",
        "p4_2": "идея → прототип → продукт → релизы."
    },
    "projects": {
        "title": "Проекты",
        "subtitle": "Cinematic Cases",
        "sort_impact": "СОРТИРОВКА: ВЛИЯНИЕ",
        "p1": {
            "tag": "Multiplayer / WebSockets",
            "title1": "Рейвенхилл:",
            "title2": "Ночные улицы",
            "desc": "Многопользовательская социальная игра (до 30 игроков)",
            "problem_label": "Проблема",
            "problem_text": "сложная синхронизация и честная игровая логика",
            "build_label": "Построен",
            "build_text": "локации, ролики, приватные чаты, голос/чат-события, детерминированный резолвер",
            "impact_label": "Влияние",
            "impact_text": "стабильный реалтайм-контур, выгодные условия, меньше багов «в бою»",
            "view_btn": "Просмотреть дело",
            "demo_btn": "Демо",
            "repo_btn": "Репо",
            "tech1": "React / TS",
            "tech2": "Веб-сокеты"
        },
        "p2": {
            "tag": "Telegram / Премиум-интерфейс",
            "title1": "НУАР",
            "wip": "В разработке",
            "desc": "Продукт, ориентированный на Telegram, с акцентом на UX и ощущением премиум-класса.",
            "problem_label": "Проблема",
            "problem_text": "удержание и доверие к социальному продукту = UX + скрипты",
            "build_label": "Построен",
            "build_text": "дизайн-система, лента, движущие темы, продуктовые скрипты",
            "impact_label": "Влияние",
            "impact_text": "интерфейс, который хочется трогать + логика, которая держит структуру",
            "view_btn": "Просмотреть дело",
            "review_btn": "Обзор пользовательского интерфейса"
        },
        "p3": {
            "tag": "Tooling / LLM",
            "title1": "AI Dev Team",
            "title2": "Workflows",
            "desc": "Оркестрация команды ИИ-агентов под разработку",
            "problem_label": "Проблема",
            "problem_text": "хаос задач, долгое ревью, нет артефактов",
            "build_label": "Построен",
            "build_text": "pipeline: спека → генерация → ревью → тест-скелет → релиз-чеклист",
            "impact_label": "Влияние",
            "impact_text": "скорость растёт, качество не падает"
        }
    },
    "process": {
        "title1": "Процесс",
        "title2": "& Пайплайн",
        "subtitle": "КАК Я РАБОТАЮ",
        "step1_title": "Архитектура и Состояния",
        "step1_desc": "Не пишу код сразу. Проектирую машины состояний. Zustand, контексты, события.",
        "step2_title": "Типы и UI Kit",
        "step2_desc": "Строгие интерфейсы, базовые масштабируемые компоненты, семантические токены.",
        "step3_title": "Интеграция логики",
        "step3_desc": "Подключаю realtime, роутинг, запросы. С обработчиками загрузки и ошибок.",
        "step4_title": "UX Полировка",
        "step4_desc": "Микро-анимации, ритмы, Framer Motion. Делаю так, чтобы интерфейс ощущался премиально.",
        "step_num": "ШАГ"
    },
    "experience": {
        "title": "Опыт",
        "subtitle": "ПУТЬ",
        "wip": "АКТИВНО",
        "role1": "Frontend / Full-stack Разработчик",
        "desc1": "Разработка многопользовательской игры (React, WebSockets). Архитектура, realtime, AI-инструменты.",
        "role2": "Самообразование / Свободное плавание",
        "desc2": "Глубокое погружение в TS, архитектуру, сетевые протоколы, Telegram Mini Apps, Framer Motion.",
        "role3": "Первые шаги во Frontend",
        "desc3": "Вёрстка, JS, основы React, базовые интерфейсы."
    },
    "ai_pipeline": {
        "title1": "Скорость",
        "title2": "x3",
        "subtitle": "HOW I USE AI",
        "desc": "Я не просто «спрашиваю чатгпт». У меня выстроен предсказуемый архитектурный флоу, где ИИ работает как 10x-ускоритель бойлерплейта, оставляя инженерный контроль полностью в моих руках.",
        "c1_title": "Декомпозиция и Спецификации",
        "c1_desc": "Заставляю ИИ писать строгие TDD-спецификации.",
        "c2_title": "Кодогенерация и Рефакторинг",
        "c2_desc": "Генерация CRUD, типов и базовых хуков.",
        "c3_title": "Ревью и Тесты",
        "c3_desc": "ИИ анализирует мой код на edge-cases и производительность."
    },
    "contact": {
        "title1": "Готовы к",
        "title2": "Релизу?",
        "subtitle": "Читаю почту и отвечаю в ТГ в течение пары часов.",
        "tgBtn": "НАПИСАТЬ В ТГ",
        "gitBtn": "СМОТРЕТЬ КОММИТЫ",
        "mailBtn": "НАПИСАТЬ EMAIL",
        "footer_built": "Built with React + Framer Motion. 2024."
    }
} }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ru",
    interpolation: { escapeValue: false }
  });

export default i18n;
