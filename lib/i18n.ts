export type Language = "ru" | "kk"

type I18nDict = {
  header: {
    home: string
    audience: string
    howItWorks: string
    navigator: string
    contacts: string
    magnifierHint: string
    magnifierLabel: string
    langRu: string
    langKk: string
  }
  hero: {
    titlePrefix: string
    titleAccent: string
    titleSuffix: string
    subtitle: string
    cta: string
    ctaAria: string
    features: Array<{
      title: string
      description: string
    }>
    collage: {
      accessibleTitle: string
      accessibleSubtitle: string
      calmTitle: string
      calmSubtitle: string
    }
  }
  audience: {
    title: string
    cards: Array<{
      title: string
      description: string
      ariaLabel: string
    }>
  }
  howItWorks: {
    title: string
    stepsLabel: string
    steps: Array<{
      text: string
    }>
  }
  navigator: {
    title: string
    subtitle: string
    cta: string
    ctaAria: string
  }
  footer: {
    description: string
    partnersTitle: string
    contactsTitle: string
    socialLabel: string
    socialItems: {
      telegram: string
      instagram: string
      youtube: string
    }
    copyright: string
    partners: Array<{
      src: string
      alt: string
    }>
  }
}

export const I18N: Record<Language, I18nDict> = {
  ru: {
    header: {
      home: "Главная",
      audience: "Для кого",
      howItWorks: "Как работает",
      navigator: "Навигатор",
      contacts: "Контакты",
      magnifierHint: "Наведи на текст, чтобы увеличить",
      magnifierLabel: "Включить лупу",
      langRu: "Русский язык",
      langKk: "Казахский язык",
    },
    hero: {
      titlePrefix: "ALAU: Твой ",
      titleAccent: "потенциал",
      titleSuffix: " ярче, чем ты думаешь",
      subtitle: "Платформа для обучения и работы, где тебя понимают.",
      cta: "Зажечь искру (Начать)",
      ctaAria: "Зажечь искру — Начать в Telegram",
      features: [
        {
          title: "Доступно",
          description: "Озвучка, субтитры и спокойный интерфейс.",
        },
        {
          title: "Удобно",
          description: "Навигация с клавиатуры и крупные элементы.",
        },
        {
          title: "Понятно",
          description: "Тест → план → обучение → работа.",
        },
      ],
      collage: {
        accessibleTitle: "Доступно",
        accessibleSubtitle: "без перегруза",
        calmTitle: "Спокойно",
        calmSubtitle: "без мигания",
      },
    },
    audience: {
      title: "Для кого мы?",
      cards: [
        {
          title: "Зрение",
          description: "Озвучиваем всё. Есть аудиокурсы",
          ariaLabel: "Для людей с нарушением зрения",
        },
        {
          title: "Слух",
          description: "Везде есть субтитры и сурдоперевод",
          ariaLabel: "Для людей с нарушением слуха",
        },
        {
          title: "Моторика",
          description: "Удобно управлять одной рукой или голосом",
          ariaLabel: "Для людей с нарушением моторики",
        },
        {
          title: "Нейро",
          description: "Спокойный дизайн без мигания",
          ariaLabel: "Для людей с нейроособенностями",
        },
      ],
    },
    howItWorks: {
      title: "Как это работает?",
      stepsLabel: "Шаги",
      steps: [
        { text: "Пройди тест в Telegram." },
        { text: "Получи план обучения." },
        { text: "Учись онлайн." },
        { text: "Подай уверенно на работу." },
      ],
    },
    navigator: {
      title: "Навигатор",
      subtitle: "Ищете вакансии, пособия или центры помощи?",
      cta: "Смотреть карту доступности",
      ctaAria: "Смотреть карту доступности — навигатор ресурсов",
    },
    footer: {
      description: "Платформа для обучения и работы, где тебя понимают.",
      partnersTitle: "Партнёры",
      contactsTitle: "Контакты",
      socialLabel: "Социальные сети",
      socialItems: {
        telegram: "Telegram",
        instagram: "Instagram",
        youtube: "YouTube",
      },
      copyright: "© 2026 ALAU. Все права защищены.",
      partners: [
        {
          src: "/partners/chevron.png",
          alt: "Chevron",
        },
        {
          src: "/partners/iteachme.png",
          alt: "ITeachMe",
        },
        {
          src: "/partners/ministry-edu-kz.png",
          alt: "Министерство образования Республики Казахстан",
        },
      ],
    },
  },
  kk: {
    header: {
      // TODO: verify kk translations with native speaker.
      home: "Басты бет",
      audience: "Кім үшін",
      howItWorks: "Қалай жұмыс істейді",
      navigator: "Навигатор",
      contacts: "Байланыс",
      magnifierHint: "Мәтінге апарсаңыз, үлкейеді",
      magnifierLabel: "Лупаны қосу",
      langRu: "Орыс тілі",
      langKk: "Қазақ тілі",
    },
    hero: {
      // TODO: verify kk translations with native speaker.
      titlePrefix: "ALAU: Сенің ",
      titleAccent: "әлеуетің",
      titleSuffix: " ойлағаныңнан да жарқын",
      subtitle: "Түсінетін ортада оқу мен жұмыс платформасы.",
      cta: "Ұшқын жақ (Бастау)",
      ctaAria: "Ұшқын жақ — Telegram-да бастау",
      features: [
        {
          title: "Қолжетімді",
          description: "Дыбыстау, субтитрлер және тыныш интерфейс.",
        },
        {
          title: "Ыңғайлы",
          description: "Пернетақта арқылы навигация және ірі элементтер.",
        },
        {
          title: "Түсінікті",
          description: "Тест → жоспар → оқу → жұмыс.",
        },
      ],
      collage: {
        accessibleTitle: "Қолжетімді",
        accessibleSubtitle: "артық жүктемесіз",
        calmTitle: "Тыныш",
        calmSubtitle: "жыпылықтаусыз",
      },
    },
    audience: {
      title: "Кім үшін?",
      cards: [
        {
          title: "Көру",
          description: "Барлығы дыбысталған. Аудиокурстар бар",
          ariaLabel: "Көру қабілеті бұзылған адамдарға арналған",
        },
        {
          title: "Есту",
          description: "Бар жерде субтитр және ым тілі бар",
          ariaLabel: "Есту қабілеті бұзылған адамдарға арналған",
        },
        {
          title: "Қимыл",
          description: "Бір қолмен немесе дауыспен басқару ыңғайлы",
          ariaLabel: "Қимыл-қозғалысы бұзылған адамдарға арналған",
        },
        {
          title: "Нейро",
          description: "Жыпылықтаусыз тыныш дизайн",
          ariaLabel: "Нейроерекшелігі бар адамдарға арналған",
        },
      ],
    },
    howItWorks: {
      title: "Қалай жұмыс істейді?",
      stepsLabel: "Қадамдар",
      steps: [
        { text: "Telegram-да тесттен өт." },
        { text: "Оқу жоспарын ал." },
        { text: "Онлайн оқы." },
        { text: "Жұмысқа сенімді өтінім бер." },
      ],
    },
    navigator: {
      title: "Навигатор",
      subtitle: "Бос орындар, жәрдемақылар немесе көмек орталықтарын іздейсіз бе?",
      cta: "Қолжетімділік картасын көру",
      ctaAria: "Қолжетімділік картасын көру — ресурстар навигаторы",
    },
    footer: {
      description: "Түсінетін ортада оқу мен жұмыс платформасы.",
      partnersTitle: "Серіктестер",
      contactsTitle: "Байланыс",
      socialLabel: "Әлеуметтік желілер",
      socialItems: {
        telegram: "Telegram",
        instagram: "Instagram",
        youtube: "YouTube",
      },
      copyright: "© 2026 ALAU. Барлық құқықтар қорғалған.",
      partners: [
        {
          src: "/partners/chevron.png",
          alt: "Chevron",
        },
        {
          src: "/partners/iteachme.png",
          alt: "ITeachMe",
        },
        {
          src: "/partners/ministry-edu-kz.png",
          alt: "Қазақстан Республикасының Білім министрлігі",
        },
      ],
    },
  },
}

function mergeDeep<T extends Record<string, unknown>>(base: T, override?: Partial<T>): T {
  const result = { ...base }
  if (!override) return result
  Object.keys(override).forEach((key) => {
    const value = override[key]
    if (Array.isArray(value) || typeof value !== "object" || value === null) {
      if (value !== undefined) {
        result[key] = value as T[Extract<keyof T, string>]
      }
      return
    }
    const baseValue = base[key] as Record<string, unknown>
    result[key] = mergeDeep(baseValue ?? {}, value as Record<string, unknown>) as T[Extract<
      keyof T,
      string
    >]
  })
  return result
}

export function getI18n(lang: Language) {
  const base = I18N.ru
  if (lang === "ru") return base
  return mergeDeep(base, I18N[lang])
}
