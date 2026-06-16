// Single source of truth — real data from CV only. Never invent.
import portrait from "@/assets/portrait.asset.json";
import githubbot from "@/assets/githubbot.asset.json";

export const profile = {
  name: {
    en: "Abdelhamed Nada",
    ar: "عبد الحميد ندى",
  },
  initials: "AN",
  roles: {
    en: ["Full-Stack Developer", "Frontend Specialist", "AI Tools Expert"],
    ar: ["مطور Full-Stack", "متخصص Frontend", "خبير أدوات AI"],
  },
  tagline: {
    en: "Crafting production-grade web experiences with React, Next.js, and AI-augmented workflows.",
    ar: "أصمم وأبني تجارب ويب احترافية باستخدام React و Next.js وأدوات الذكاء الاصطناعي.",
  },
  summary: {
    en: "Versatile Full-Stack Developer with a strong specialization in modern Frontend development. Experienced in building production-grade web applications using React, Next.js, TypeScript, and Supabase. Proficient in GitHub workflows, CI/CD practices, and the strategic integration of AI tools to accelerate development cycles and deliver higher-quality software.",
    ar: "مطور Full-Stack متعدد المهارات بتخصص قوي في الـ Frontend الحديث. خبرة في بناء تطبيقات ويب جاهزة للإنتاج باستخدام React و Next.js و TypeScript و Supabase. متمرس في سير عمل GitHub و CI/CD والدمج الاستراتيجي لأدوات الذكاء الاصطناعي لتسريع دورة التطوير وتقديم جودة أعلى.",
  },
  status: {
    en: "Available for remote roles",
    ar: "متاح للعمل عن بُعد",
  },
  contact: {
    email: "dior53634@gmail.com",
    phone: "+201096144345",
    phoneDisplay: "+20 109 614 4345",
    whatsappMessage: {
      en: "Hello Abdelhamed, I visited your portfolio and would like to discuss a project.",
      ar: "مرحباً عبد الحميد، لقد زرت بروتفوليو الخاص بك وأود مناقشة مشروع معك.",
    },
    github: "https://github.com/abbn7",
    githubUser: "abbn7",
  },
  portrait: portrait.url,
  highlights: {
    en: [
      { title: "Frontend-First Mindset", body: "Pixel-perfect UI, smooth UX, performance optimization." },
      { title: "AI-Augmented Developer", body: "Leverages AI tools to deliver faster without sacrificing quality." },
      { title: "GitHub Power User", body: "Clean commits, PRs, CI/CD, and collaborative workflows." },
      { title: "Remote-Ready", body: "Available for international remote roles and freelance projects." },
    ],
    ar: [
      { title: "عقلية Frontend-First", body: "واجهات بدقة البكسل، تجربة سلسة، وأداء محسّن." },
      { title: "مطور مدعوم بـ AI", body: "يستخدم أدوات الذكاء الاصطناعي للتسليم الأسرع بدون التنازل عن الجودة." },
      { title: "خبير GitHub", body: "كوميتات نظيفة، PRs، CI/CD، وسير عمل تعاوني." },
      { title: "جاهز للعمل عن بُعد", body: "متاح للأدوار الدولية والمشاريع المستقلة." },
    ],
  },
  skills: {
    Frontend: ["React.js", "Next.js 15", "TypeScript", "JavaScript (ES2024)", "HTML5", "CSS3", "Tailwind CSS", "Shadcn/UI", "Framer Motion"],
    Backend: ["Node.js", "Supabase", "REST APIs", "PostgreSQL", "Python"],
    "AI & Tools": ["Claude AI", "ChatGPT", "GitHub Copilot", "Cursor AI", "Prompt Engineering", "AI-Augmented Dev"],
    DevOps: ["Git", "GitHub", "GitHub Actions", "Vercel", "Netlify"],
    Other: ["Telegram Bot API", "SaaS Architecture", "E-Commerce Systems", "Performance Optimization"],
    Languages: ["Arabic (Native)", "English (Professional)"],
  } as Record<string, string[]>,
  education: {
    en: [
      {
        school: "Tanta University (TNU)",
        degree: "B.Sc. Computer Science & Artificial Intelligence",
        period: "2024 – Present",
        body: "Currently studying Computer Science with a specialization track in Artificial Intelligence.",
      },
      {
        school: "Pharos University in Alexandria (PUA)",
        degree: "B.Sc. Computer Science",
        period: "2022 – 2024",
        body: "Completed foundational studies in Computer Science. Coursework included Social Issues in CS, Algorithms, and Software Engineering.",
      },
    ],
    ar: [
      {
        school: "جامعة طنطا",
        degree: "بكالوريوس علوم الحاسب والذكاء الاصطناعي",
        period: "2024 – الآن",
        body: "أدرس علوم الحاسب حاليًا مع تخصص في الذكاء الاصطناعي.",
      },
      {
        school: "جامعة فاروس بالإسكندرية",
        degree: "بكالوريوس علوم الحاسب",
        period: "2022 – 2024",
        body: "أتممت الدراسات التأسيسية في علوم الحاسب: الخوارزميات، هندسة البرمجيات، والقضايا الاجتماعية.",
      },
    ],
  },
  projects: [
    {
      slug: "github-bot",
      title: {
        en: "GitHub Management SaaS — Telegram Bot",
        ar: "بوت تليجرام لإدارة GitHub",
      },
      tagline: {
        en: "Manage your GitHub repositories from Telegram.",
        ar: "إدارة مستودعات GitHub بالكامل من تليجرام.",
      },
      period: "2024",
      role: { en: "Designer · Engineer · Author", ar: "مصمم · مهندس · مؤلف" },
      type: { en: "Open-Source / Personal", ar: "مفتوح المصدر / شخصي" },
      cover: githubbot.url,
      live: "https://giit-website.vercel.app/",
      repo: "https://github.com/abbn7",
      stack: ["Python 3.11", "Telegram Bot API", "GitHub REST API", "HTML", "CSS", "Vercel"],
      summary: {
        en: "A Python 3.11 Telegram bot offering GitHub repository management as a service — view repos, upload ZIP files, download code, and control privacy, all from inside Telegram. Shipped with a dark-themed marketing landing page.",
        ar: "بوت تليجرام مبني بـ Python 3.11 يقدم إدارة مستودعات GitHub كخدمة — عرض المستودعات، رفع ملفات ZIP، تنزيل الكود، والتحكم في الخصوصية، كل ذلك من داخل تليجرام. مع صفحة هبوط تسويقية بثيم داكن.",
      },
      challenge: {
        en: "A critical import bug in handlers.py blocked the bot's core functionality. The codebase also lacked clean separation between command routing and API integration, making it hard to extend.",
        ar: "خطأ استيراد حرج في handlers.py كان يمنع الوظيفة الأساسية للبوت. كما افتقر الكود إلى فصل نظيف بين توجيه الأوامر وطبقة التكامل مع الـ API.",
      },
      process: {
        en: [
          "Diagnosed and resolved the handlers.py import bug that broke command routing.",
          "Architected clean separation: handlers layer, command routing layer, GitHub API integration layer.",
          "Designed and built a dark-themed HTML landing page targeting developers.",
          "Shipped to Vercel with zero-config deployment.",
        ],
        ar: [
          "تشخيص وحل خطأ الاستيراد في handlers.py الذي عطّل توجيه الأوامر.",
          "هيكلة فصل نظيف: طبقة handlers، طبقة توجيه الأوامر، طبقة التكامل مع GitHub API.",
          "تصميم وبناء صفحة هبوط HTML بثيم داكن موجهة للمطورين.",
          "النشر على Vercel بإعدادات صفرية.",
        ],
      },
      results: {
        en: [
          { label: "Core flow restored", value: "Bug → Fix" },
          { label: "Layers of separation", value: "3" },
          { label: "Deploy target", value: "Vercel" },
        ],
        ar: [
          { label: "إصلاح المسار الأساسي", value: "تم" },
          { label: "طبقات الفصل", value: "3" },
          { label: "هدف النشر", value: "Vercel" },
        ],
      },
    },
    {
      slug: "ecommerce-platform",
      title: {
        en: "E-Commerce Platform — Freelance Client",
        ar: "منصة تجارة إلكترونية — عميل Freelance",
      },
      tagline: {
        en: "Full-scale storefront audited against Shopify standards.",
        ar: "متجر إلكتروني متكامل بمعايير Shopify.",
      },
      period: "2024 – 2025",
      role: { en: "Full-Stack Engineer", ar: "مهندس Full-Stack" },
      type: { en: "Client Work", ar: "عمل عميل" },
      cover: null,
      live: null,
      repo: null,
      stack: ["Next.js 15", "Supabase", "TypeScript", "Tailwind CSS", "PostgreSQL"],
      summary: {
        en: "A production e-commerce application built end-to-end. Includes product catalog, cart, wishlist, and a checkout flow backed by localStorage persistence and Supabase. Underwent a comprehensive code audit benchmarked against Shopify standards.",
        ar: "تطبيق تجارة إلكترونية إنتاجي مبني من البداية للنهاية. يشمل كتالوج المنتجات، السلة، قائمة الرغبات، ومسار checkout مع تخزين محلي وSupabase. خضع لتدقيق شامل للكود بمعايير Shopify.",
      },
      challenge: {
        en: "Resolved critical security issues, fixed category query bugs, repaired non-functional newsletter forms, and wired dynamic ProductCard hover interactions plus full Cart/Wishlist context systems.",
        ar: "حل ثغرات أمنية حرجة، إصلاح أخطاء استعلامات الفئات، إصلاح نماذج النشرة البريدية المعطلة، وبناء تفاعلات ProductCard ديناميكية وأنظمة Context كاملة للسلة وقائمة الرغبات.",
      },
      process: {
        en: [
          "Built product catalog, cart, wishlist, and checkout with localStorage persistence.",
          "Conducted a Shopify-benchmarked audit and resolved every critical finding.",
          "Repaired non-functional newsletter forms and broken category queries.",
          "Integrated SEO metadata, responsive design, and performance-optimized data fetching.",
        ],
        ar: [
          "بناء كتالوج المنتجات، السلة، قائمة الرغبات، و checkout مع تخزين محلي.",
          "تنفيذ تدقيق بمعايير Shopify وحل كل النتائج الحرجة.",
          "إصلاح نماذج النشرة البريدية واستعلامات الفئات المعطلة.",
          "دمج بيانات SEO وتصميم Responsive وجلب بيانات محسّن للأداء.",
        ],
      },
      results: {
        en: [
          { label: "Audit benchmark", value: "Shopify" },
          { label: "Security findings", value: "Resolved" },
          { label: "Stack", value: "Next.js + Supabase" },
        ],
        ar: [
          { label: "معيار التدقيق", value: "Shopify" },
          { label: "الثغرات الأمنية", value: "تم حلها" },
          { label: "التقنيات", value: "Next.js + Supabase" },
        ],
      },
    },
  ],
} as const;

export type Project = (typeof profile.projects)[number];

export const getProject = (slug: string) =>
  profile.projects.find((p) => p.slug === slug);

export const whatsappUrl = (lang: "en" | "ar") =>
  `https://wa.me/${profile.contact.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
    profile.contact.whatsappMessage[lang],
  )}`;
