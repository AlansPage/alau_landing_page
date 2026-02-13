export type Language = "ru" | "kk"

type I18nDict = {
  header: {
    home: string
    audience: string
    howItWorks: string
    features: string
    testimonials: string
    contact: string
    faq: string
    menuOpen: string
    menuClose: string
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
  features: {
    title: string
    items: Array<{
      title: string
      description: string
    }>
    ctaPrimary: string
    ctaPrimaryAria: string
    ctaSecondary: string
    ctaSecondaryAria: string
  }
  socialProof: {
    title: string
    quotes: Array<{
      text: string
      name: string
      role: string
    }>
  }
  contact: {
    title: string
    subtitle: string
    firstName: string
    lastName: string
    company: string
    email: string
    message: string
    submit: string
    success: string
  }
  faq: {
    title: string
    items: Array<{
      question: string
      answer: string
    }>
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
    emailLabel: string
    accessibilityMap: string
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
      features: "Возможности",
      testimonials: "Отзывы",
      contact: "Контакты",
      faq: "FAQ",
      menuOpen: "Открыть меню",
      menuClose: "Закрыть меню",
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
    features: {
      title: "Возможности платформы",
      items: [
        {
          title: "Голосовое управление и скринридер",
          description:
            "Полная совместимость со средствами чтения экрана. Управляйте платформой голосом — без клавиатуры и мыши.",
        },
        {
          title: "Контраст и спокойный дизайн",
          description:
            "Высокий контраст текста, мягкие цвета и отсутствие мигающих элементов. Комфортно для всех.",
        },
        {
          title: "Интерактивное онлайн-обучение",
          description:
            "Видеоуроки с субтитрами, практические задания и персональный прогресс. Учитесь в своём темпе.",
        },
        {
          title: "Проверка готовности к работе",
          description:
            "Тест определяет ваши сильные стороны и подсказывает, какие навыки прокачать для трудоустройства.",
        },
      ],
      ctaPrimary: "Попробовать платформу",
      ctaPrimaryAria: "Попробовать платформу — перейти в Telegram",
      ctaSecondary: "Смотреть карту доступности",
      ctaSecondaryAria: "Смотреть карту доступности — навигатор ресурсов",
    },
    socialProof: {
      title: "Что говорят о нас",
      quotes: [
        {
          text: "Впервые чувствую, что платформа сделана для меня. Озвучка работает идеально.",
          name: "Айгерим К.",
          role: "Студентка, нарушение зрения",
        },
        {
          text: "Спокойный дизайн — это именно то, что мне нужно. Никакого мигания и перегруза.",
          name: "Дамир Т.",
          role: "Веб-разработчик, нейроособенности",
        },
        {
          text: "Субтитры и сурдоперевод — наконец-то всё понятно. Рекомендую коллегам.",
          name: "Мадина С.",
          role: "HR-менеджер, нарушение слуха",
        },
      ],
    },
    contact: {
      title: "Свяжитесь с нами",
      subtitle: "Для работодателей и организаций",
      firstName: "Имя",
      lastName: "Фамилия",
      company: "Компания",
      email: "Email",
      message: "Опишите ваши потребности",
      submit: "Отправить заявку",
      success: "Спасибо! Мы свяжемся с вами в ближайшее время.",
    },
    faq: {
      title: "Частые вопросы",
      items: [
        {
          question: "Платформа бесплатная?",
          answer:
            "Да, базовые курсы и инструменты доступны бесплатно. Расширенные функции могут потребовать подписку.",
        },
        {
          question: "Какие виды инвалидности поддерживаются?",
          answer:
            "Платформа адаптирована для людей с нарушением зрения, слуха, моторики и нейроособенностями.",
        },
        {
          question: "Можно ли учиться с телефона?",
          answer:
            "Да, платформа полностью адаптивна и работает на любом устройстве — телефоне, планшете или компьютере.",
        },
        {
          question: "Как получить помощь в трудоустройстве?",
          answer:
            "После прохождения курсов вы получите доступ к навигатору вакансий и персональные рекомендации.",
        },
        {
          question: "Есть ли поддержка на казахском языке?",
          answer:
            "Да, интерфейс и основные курсы доступны на русском и казахском языках.",
        },
      ],
    },
    footer: {
      description: "Платформа для обучения и работы, где тебя понимают.",
      partnersTitle: "Нас спонсируют",
      contactsTitle: "Контакты",
      socialLabel: "Социальные сети",
      socialItems: {
        telegram: "Telegram",
        instagram: "Instagram",
        youtube: "YouTube",
      },
      emailLabel: "Написать нам",
      accessibilityMap: "Карта доступности",
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
      ],
    },
  },
  kk: {
    header: {
      // TODO: verify kk translations with native speaker.
      home: "Басты бет",
      audience: "Кім үшін",
      howItWorks: "Қалай жұмыс істейді",
      features: "Мүмкіндіктер",
      testimonials: "Пікірлер",
      contact: "Байланыс",
      faq: "Сұрақтар",
      menuOpen: "Мәзірді ашу",
      menuClose: "Мәзірді жабу",
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
    features: {
      title: "Платформа мүмкіндіктері",
      items: [
        {
          title: "Дауыспен басқару және скринридер",
          description:
            "Экран оқу құралдарымен толық үйлесімді. Платформаны дауыспен басқарыңыз — пернетақта мен тінтуірсіз.",
        },
        {
          title: "Контраст және тыныш дизайн",
          description:
            "Мәтіннің жоғары контрасты, жұмсақ түстер және жыпылықтайтын элементтер жоқ. Барлығына ыңғайлы.",
        },
        {
          title: "Интерактивті онлайн оқыту",
          description:
            "Субтитрлі бейнесабақтар, тәжірибелік тапсырмалар және жеке прогресс. Өз қарқыныңызбен оқыңыз.",
        },
        {
          title: "Жұмысқа дайындық тексерісі",
          description:
            "Тест сіздің күшті жақтарыңызды анықтап, жұмысқа орналасу үшін қандай дағдыларды дамыту керектігін ұсынады.",
        },
      ],
      ctaPrimary: "Платформаны байқап көру",
      ctaPrimaryAria: "Платформаны байқап көру — Telegram-ға өту",
      ctaSecondary: "Қолжетімділік картасын көру",
      ctaSecondaryAria: "Қолжетімділік картасын көру — ресурстар навигаторы",
    },
    socialProof: {
      title: "Біз туралы не айтады",
      quotes: [
        {
          text: "Алғаш рет платформа мен үшін жасалған деп сезінемін. Дыбыстау тамаша жұмыс істейді.",
          name: "Айгерім Қ.",
          role: "Студент, көру бұзылысы",
        },
        {
          text: "Тыныш дизайн — маған дәл осы керек еді. Ешқандай жыпылықтау мен шамадан тыс жүктеме жоқ.",
          name: "Дамир Т.",
          role: "Веб-әзірлеуші, нейроерекшелік",
        },
        {
          text: "Субтитрлер мен ым тілі — ақырында бәрі түсінікті. Әріптестеріме ұсынамын.",
          name: "Мадина С.",
          role: "HR-менеджер, есту бұзылысы",
        },
      ],
    },
    contact: {
      title: "Бізбен байланысыңыз",
      subtitle: "Жұмыс берушілер мен ұйымдар үшін",
      firstName: "Аты",
      lastName: "Тегі",
      company: "Компания",
      email: "Email",
      message: "Қажеттіліктеріңізді сипаттаңыз",
      submit: "Өтінім жіберу",
      success: "Рахмет! Жақын арада сізбен хабарласамыз.",
    },
    faq: {
      title: "Жиі қойылатын сұрақтар",
      items: [
        {
          question: "Платформа тегін бе?",
          answer:
            "Иә, негізгі курстар мен құралдар тегін қолжетімді. Кеңейтілген функциялар жазылымды қажет етуі мүмкін.",
        },
        {
          question: "Мүгедектіктің қандай түрлері қолдау көрсетіледі?",
          answer:
            "Платформа көру, есту, қимыл-қозғалыс бұзылыстары мен нейроерекшеліктері бар адамдарға бейімделген.",
        },
        {
          question: "Телефоннан оқуға бола ма?",
          answer:
            "Иә, платформа толығымен бейімделген және кез келген құрылғыда жұмыс істейді.",
        },
        {
          question: "Жұмысқа орналасуға көмек қалай алуға болады?",
          answer:
            "Курстарды аяқтағаннан кейін бос орындар навигаторына және жеке ұсыныстарға қол жеткізесіз.",
        },
        {
          question: "Қазақ тілінде қолдау бар ма?",
          answer:
            "Иә, интерфейс және негізгі курстар орыс және қазақ тілдерінде қолжетімді.",
        },
      ],
    },
    footer: {
      description: "Түсінетін ортада оқу мен жұмыс платформасы.",
      partnersTitle: "Бізді демеушілер",
      contactsTitle: "Байланыс",
      socialLabel: "Әлеуметтік желілер",
      socialItems: {
        telegram: "Telegram",
        instagram: "Instagram",
        youtube: "YouTube",
      },
      emailLabel: "Бізге жазыңыз",
      accessibilityMap: "Қолжетімділік картасы",
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
