import { asset } from "./site";

export const PROFILE = {
  name: "Muhammad Abdullah",
  role: "Lead Web Developer",
  location: "Pakistan · remote worldwide",
  tagline: "WordPress · Shopify · React · Node",
  email: "m.abdullah.abs@gmail.com",
  blurb:
    "Lead web developer with 3.5+ years and 250+ production websites — WordPress, Shopify and full-stack builds for e-commerce, real estate, healthcare and media.",
  links: {
    github: "https://github.com/abdullah0335",
    linkedin: "https://www.linkedin.com/in/muhammad-abdullah-ba3b7a214/",
    resume: asset("/Muhammad_Abdullah_CV.pdf"),
  },
};

export const CATEGORIES = [
  "E-commerce",
  "Real estate & build",
  "Platforms & software",
  "Brands & services",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Engagement = {
  company: string;
  role: string;
  period: string;
};

const EMERALDS: Engagement = {
  company: "Emeralds Media",
  role: "Lead Web Developer",
  period: "2023 – present",
};
const ABS: Engagement = {
  company: "ABS Solutions",
  role: "Lead Web Developer",
  period: "2021 – 2023",
};
const FREELANCE: Engagement = {
  company: "Freelance",
  role: "Web Developer",
  period: "2021 – present",
};

export type Feature = { title: string; body: string };

export type Project = {
  slug: string;
  index: string;
  name: string;
  domain: string;
  url: string;
  category: Category;
  summary: string;
  /** Only platforms detected on the live site. */
  platform?: string[];
  region?: string;
  /** Offline sites are listed but not linked and have no case study. */
  status?: "live" | "offline";
  /** Only set where the CV ties the project to a role. */
  engagement?: Engagement;
  overview?: string;
  brief?: string;
  features?: Feature[];
  extraLinks?: { label: string; url: string }[];
  /** "plugin" for software that isn't itself a website (default: a website). */
  kind?: "site" | "plugin";
  /** Label shown above the case study title (defaults to the domain). */
  eyebrow?: string;
  /** Slug of a closely related case study, linked from this one. */
  related?: string;
  /** Captions for a step-by-step screenshot gallery (lib/shots `steps`), in order. */
  flow?: Feature[];
};

const WP = ["WordPress", "Elementor"];

const RAW: Omit<Project, "index">[] = [
  {
    slug: "emrix-media",
    name: "Emrix Media",
    domain: "emrixmedia.com",
    url: "https://emrixmedia.com/",
    category: "Brands & services",
    summary:
      "Website for an Islamabad digital agency offering web development, online stores, SEO, branding, CGI and video.",
    region: "Pakistan",
    engagement: EMERALDS,
    overview:
      "Emrix Media is a creative and digital agency in Islamabad building websites, online stores, SEO, branding, CGI and video for brands in Pakistan, the UAE and the US.",
    brief:
      "An agency's own site has to prove what it sells: show the work up front and make each service easy to tell apart.",
    features: [
      {
        title: "Service-led homepage",
        body: "Four headline services — brands, websites, motion and growth — each get their own statement and section.",
      },
      {
        title: "Work index",
        body: "A showcase of client projects including MYPASS, DEEPAL, World Star League and Sufra.",
      },
      {
        title: "Clear next step",
        body: "The page closes on a direct “You next?” prompt that leads into the contact section.",
      },
    ],
  },
  {
    slug: "media-sniffers",
    name: "Media Sniffers",
    domain: "mediasniffers.pk",
    url: "https://mediasniffers.pk/",
    category: "Brands & services",
    summary:
      "Experiential marketing and event production company — brand activations, live events and creative experiences.",
    platform: WP,
    region: "Pakistan",
    engagement: EMERALDS,
    overview:
      "Media Sniffers is an experiential marketing and event production company in Pakistan, delivering events, brand activations and talent management for national brands.",
    brief:
      "Present a production company as a full partner rather than a vendor, with proof of past events and an easy route to a quote.",
    features: [
      {
        title: "Three service lines",
        body: "Event management, brand activation and talent management, each with its own pitch.",
      },
      {
        title: "Portfolio and case studies",
        body: "Event highlights and a portfolio section that shows the work at production scale.",
      },
      {
        title: "Clients and upcoming events",
        body: "A featured-clients wall and an upcoming-events block that keep the site current.",
      },
      {
        title: "Process and contact",
        body: "A step-by-step process section leading into a “Turn your brand into a trend” enquiry form.",
      },
    ],
  },
  {
    slug: "mypass",
    name: "MYPASS",
    domain: "mypass.pk",
    url: "https://mypass.pk/",
    category: "Platforms & software",
    summary:
      "Event ticketing platform for concerts, festivals and live shows, with upcoming-event listings.",
    region: "Pakistan",
    overview:
      "MYPASS sells tickets for concerts, festivals and live shows across Pakistan.",
    brief:
      "Get fans from an event announcement to a ticket in as few steps as possible, and keep the line-up fresh.",
    features: [
      {
        title: "Event listings",
        body: "Upcoming events — such as Revival Episode 13 in Lahore and Noor-e-Maskan — up front, each with its own page.",
      },
      {
        title: "Help and policies",
        body: "FAQs, support and policy pages so buyers can answer their own questions before checkout.",
      },
      {
        title: "Stay updated",
        body: "A sign-up so fans hear about new events as they are announced.",
      },
    ],
  },
  {
    slug: "lr-by-dr-ahmed",
    name: "LR by Dr Ahmed",
    domain: "lrbydrahmed.com",
    url: "https://lrbydrahmed.com/",
    category: "Brands & services",
    summary:
      "Coaching site for PTE Academic and other English exams, with course enrolment and discounted exam offers.",
    platform: WP,
    overview:
      "LR by Dr Ahmed coaches students for English proficiency exams — PTE Academic first, alongside PTE Core, LanguageCert, OET, IELTS, CELPIP and TOEFL.",
    brief:
      "Turn visitors planning to study or move abroad into enrolled students, and show the practice tools that make the coaching different.",
    features: [
      {
        title: "Every major English exam",
        body: "Dedicated sections for PTE Academic, PTE Core (Canada), LanguageCert, OET, IELTS, CELPIP and TOEFL.",
      },
      {
        title: "Practice platform",
        body: "Practice questions, full and sectional mock tests, vocabulary resources and a diagnostic test with a daily plan.",
      },
      {
        title: "AI scoring and feedback",
        body: "AI-generated scoring and guidance presented as part of the course offer.",
      },
      {
        title: "Enrolment offers",
        body: "Discounted PTE exam vouchers and a free mock-analysis form to capture leads.",
      },
    ],
  },
  {
    slug: "magnum-properties",
    name: "Magnum Properties",
    domain: "magnumproperties.co.uk",
    url: "https://magnumproperties.co.uk/",
    category: "Real estate & build",
    summary:
      "Residential and commercial estate agents in Middlesbrough, with valuation booking and a stamp duty calculator.",
    platform: WP,
    region: "United Kingdom",
    overview:
      "Magnum Properties is a residential and commercial estate agent in Middlesbrough, covering sales, lettings and commercial property across Teesside.",
    brief:
      "Win valuation requests from homeowners and serve buyers, renters and commercial clients from one site.",
    features: [
      {
        title: "Valuation booking",
        body: "Free same-day home valuations, instant valuations and commercial valuations, each with its own booking route.",
      },
      {
        title: "Stamp duty calculator",
        body: "Residential and commercial calculations, with options for first-time buyers, second properties and non-UK buyers.",
      },
      {
        title: "Property search",
        body: "Search for sales, homes to rent and commercial property from the homepage.",
      },
    ],
  },
  {
    slug: "phroduck",
    name: "Phroduck",
    domain: "phroduck.co.uk",
    url: "https://www.phroduck.co.uk/",
    category: "E-commerce",
    summary:
      "Online store for pet care, pet toys, accessories and baby care essentials.",
    platform: ["Shopify"],
    region: "United Kingdom",
    overview:
      "PHRODUCK iT is a UK store for pet and home essentials — grooming, toys, travel accessories, baby care and personal care.",
    brief:
      "Make a broad catalogue feel curated and easy to browse, and build trust for a new UK brand.",
    features: [
      {
        title: "Category-first navigation",
        body: "Pet care and grooming, pet toys, pet accessories, baby care and personal care, plus a Shop All view.",
      },
      {
        title: "Search suggestions",
        body: "Popular searches such as grooming brush, cat toy and slow feeder surface right in the search bar.",
      },
      {
        title: "Trust signals",
        body: "Hand-picked essentials, secure checkout and friendly UK support called out on the homepage.",
      },
      {
        title: "Return visits",
        body: "Wish lists, recently viewed products and a “Join the family” newsletter sign-up.",
      },
    ],
  },
  {
    slug: "am-tradez",
    name: "AM Tradez",
    domain: "amtradez.com",
    url: "https://www.amtradez.com/",
    category: "E-commerce",
    summary: "Online electronics store serving customers across the UAE.",
    platform: ["Shopify"],
    region: "UAE",
    engagement: ABS,
    overview:
      "AM Tradez is an online electronics store in the UAE selling laptops, tablets, smart devices, audio and accessories.",
    brief:
      "Organise a large, fast-changing electronics catalogue so shoppers can find a specific model quickly.",
    features: [
      {
        title: "Deep category menu",
        body: "Laptops, tablets, smartwatches, headphones, earbuds, iPhones, streaming devices and computer accessories.",
      },
      {
        title: "Merchandising rails",
        body: "Trending Now, Popular Products and Featured Products rails for brands such as Amazon, Anker and Apple.",
      },
      {
        title: "Sales contact up front",
        body: "Phone and sales email sit in the header, plus accounts and wish lists.",
      },
    ],
  },
  {
    slug: "vapes-direct",
    name: "Vapes Direct",
    domain: "vapesdirect.pk",
    url: "https://vapesdirect.pk/",
    category: "E-commerce",
    summary:
      "Store for vape devices, pods, e-liquids and accessories with nationwide delivery.",
    platform: ["Shopify"],
    region: "Pakistan",
    engagement: EMERALDS,
    overview:
      "Vapes Direct sells vape devices, pods, disposables, e-liquids and accessories with delivery across Pakistan.",
    brief:
      "Help repeat customers reorder fast and push bundles and offers without cluttering the catalogue.",
    features: [
      {
        title: "Category grid",
        body: "Devices, disposable pods, e-liquids and accessories, a tap away from the homepage.",
      },
      {
        title: "Offers built in",
        body: "Dedicated Bundle & Save and Sales & Offers sections alongside a Trending Now rail.",
      },
      {
        title: "Latest products",
        body: "A live product feed with brands such as Uwell Caliburn, Vaporesso, OXVA and Tokyo.",
      },
    ],
  },
  {
    slug: "skin-matters",
    name: "Skin Matters",
    domain: "skinmatters.shop",
    url: "https://skinmatters.shop/",
    category: "E-commerce",
    summary:
      "Dermatologist-formulated skincare by Dr. Attiya Tareen — serums, cleansers and SPF made for Pakistani skin.",
    platform: ["Shopify"],
    region: "Pakistan",
    engagement: FREELANCE,
    overview:
      "Skin Matters is the skincare line of dermatologist Dr. Attiya Tareen, formulated for South Asian skin.",
    brief:
      "Let customers shop by the problem they want to solve, and grow the average order with routines.",
    features: [
      {
        title: "Shop by concern",
        body: "Acne, melasma, pigmentation, scars, freckles and dull skin, plus ingredients such as vitamin C and retinol.",
      },
      {
        title: "Build-your-own routine",
        body: "Bundle & Save lets customers assemble a full routine from individual products.",
      },
      {
        title: "Search-friendly products",
        body: "Product names spell out what they treat and where they ship — for example “Acne-Free Skin Face Wash”.",
      },
      {
        title: "Free shipping threshold",
        body: "Free delivery over Rs 3,000, shown in the announcement bar.",
      },
    ],
  },
  {
    slug: "careapex",
    name: "CareApex",
    domain: "careapexhealth.com",
    url: "https://careapexhealth.com/",
    category: "E-commerce",
    summary:
      "Skin and hair care brand store with cash on delivery across Pakistan.",
    platform: ["Shopify"],
    region: "Pakistan",
    engagement: EMERALDS,
    overview:
      "CareApex sells skin, hair and health care products across Pakistan — face washes, creams, sunscreens, serums and more.",
    brief:
      "Present a multi-category beauty and health range clearly, with the payment and delivery terms local shoppers expect.",
    features: [
      {
        title: "Mega menu by category",
        body: "Skin care (face wash, cream, sunscreen, soap, gel, serum), health care and hair care.",
      },
      {
        title: "Local checkout terms",
        body: "Cash on delivery nationwide and free delivery over Rs 1,400.",
      },
      {
        title: "Accounts and wish lists",
        body: "Customer log-in and a wish list for repeat purchases.",
      },
    ],
  },
  {
    slug: "nixcer",
    name: "Nixcer",
    domain: "nixcer.co.uk",
    url: "https://nixcer.co.uk/",
    category: "Brands & services",
    summary:
      "IT services company offering web, e-commerce, CMS and mobile app development.",
    platform: WP,
    region: "United Kingdom",
    engagement: ABS,
    overview:
      "Nixcer is a UK IT services provider offering software, web and mobile app development, product listings, data entry and customer services.",
    brief:
      "Lay out a wide service range clearly and back it with a portfolio of delivered client work.",
    features: [
      {
        title: "Service overview",
        body: "Data entry, software development, web development, product listings, customer services and mobile apps.",
      },
      {
        title: "Client portfolio",
        body: "Work for clients including AMTradez, InventorySol, Care Petals and Phone Clinix.",
      },
      {
        title: "Project enquiries",
        body: "A “Would you like to start a project with us?” call to action leading to contact.",
      },
    ],
  },
  {
    slug: "inventory-sol",
    name: "Inventory Sol",
    domain: "inventorysol.com",
    url: "https://inventorysol.com/",
    category: "Platforms & software",
    summary:
      "Product site for inventory management software built for businesses in Dubai.",
    platform: WP,
    region: "UAE",
    engagement: ABS,
    overview:
      "Inventory Sol is inventory management software for businesses in Dubai and the UAE, covering stock, purchasing, sales and reporting.",
    brief:
      "Explain a feature-dense software product module by module, and turn interest into sign-ups for the web app.",
    features: [
      {
        title: "Core modules",
        body: "Payment status, purchase orders, point of sale, inventory, current stock and stock transfers.",
      },
      {
        title: "Feature breakdown",
        body: "Product identification, categories, replacements, instant invoicing, payment recording, shipping and reporting.",
      },
      {
        title: "Social proof",
        body: "A “What users say” testimonials section alongside why-choose-us points.",
      },
    ],
    extraLinks: [{ label: "Web app", url: "https://app.inventorysol.com/" }],
  },
  {
    slug: "uamma",
    name: "UAMMA",
    domain: "uamma.co.uk",
    url: "https://www.uamma.co.uk/",
    category: "Brands & services",
    summary: "Website for UAMMA.",
    region: "United Kingdom",
    status: "offline",
  },
  {
    slug: "care-petals",
    name: "Care Petals",
    domain: "carepetals.com",
    url: "https://carepetals.com/",
    category: "Brands & services",
    summary: "Website for a professional care recruitment agency.",
    platform: ["WordPress"],
    status: "offline",
  },
  {
    slug: "phone-clinix",
    name: "Phone Clinix",
    domain: "phoneclinix.com",
    url: "https://phoneclinix.com/",
    category: "Platforms & software",
    summary:
      "Product site for phone diagnostics software that checks battery health, performance and hardware faults.",
    platform: WP,
    overview:
      "Phone Clinix is mobile diagnostics software that tests a phone's hardware and produces reports, built for the phone repair and resale industry.",
    brief:
      "Explain a technical product to repair shops and refurbishers, and show exactly what it tests.",
    features: [
      {
        title: "Test coverage, listed",
        body: "Wi-Fi, Bluetooth, Face ID, camera, sensors, buttons, LCD, vibration, gyroscope, speaker, mic and NFC.",
      },
      {
        title: "Built for the trade",
        body: "Sections for repair shops, refurbishers, retailers and QA teams.",
      },
      {
        title: "Product benefits",
        body: "Accurate hardware testing, multi-device testing and automated reports and labels.",
      },
    ],
  },
  {
    slug: "nouba-real-estate",
    name: "Nouba Real Estate",
    domain: "noubarealestate.com",
    url: "https://noubarealestate.com/",
    category: "Real estate & build",
    summary:
      "Dubai real estate brokerage connecting international investors with premium properties.",
    platform: WP,
    region: "UAE",
    engagement: EMERALDS,
    overview:
      "Nouba Real Estate connects international investors with Dubai property — off-plan, sales and rentals — backed by roadshows abroad.",
    brief:
      "Sell Dubai as an investment to overseas buyers, and turn listings and roadshows into enquiries.",
    features: [
      {
        title: "Listings",
        body: "Offices, apartments and villas for rent, sale and off-plan — from Business Bay to Damac Islands.",
      },
      {
        title: "International roadshows",
        body: "Events in Islamabad, Ankara, Ahmedabad, Jeddah, Gaziantep and the UK.",
      },
      {
        title: "Why Dubai",
        body: "An investment case covering infrastructure, market stability, tax-free returns and location.",
      },
      {
        title: "Seller enquiries",
        body: "An “Interested in selling your home?” lead capture section.",
      },
    ],
  },
  {
    slug: "shan-and-associates",
    name: "Shan & Associates",
    domain: "shanbuilder.com",
    url: "https://shanbuilder.com/",
    category: "Real estate & build",
    summary:
      "Boutique interior design-and-build contractor for high-end residential renovations.",
    platform: WP,
    region: "Singapore",
    overview:
      "Shan & Associates is a boutique design-and-build contractor in Singapore focused on high-end residential renovation, managed directly by the principal contractor.",
    brief:
      "Earn the trust of homeowners planning an expensive renovation, with the portfolio and process doing the convincing.",
    features: [
      {
        title: "Design and build, end to end",
        body: "A single offer covering design through handover, personally managed from first walkthrough.",
      },
      {
        title: "Why choose us",
        body: "Project management expertise, high-end renovation experience and craftsmanship backed by discipline.",
      },
      {
        title: "Portfolio and reviews",
        body: "Completed homes and workspaces alongside client testimonials and a contact prompt.",
      },
    ],
  },
  {
    slug: "elaris-real-estate",
    name: "Elaris Real Estate",
    domain: "elarisrealestate.com",
    url: "https://elarisrealestate.com/",
    category: "Real estate & build",
    summary:
      "Dubai property experts listing homes and investment opportunities from top developers.",
    platform: WP,
    region: "UAE",
    engagement: EMERALDS,
    overview:
      "Elaris Real Estate helps buyers and investors — many from the UK — find homes and investments in Dubai from leading developers.",
    brief:
      "Showcase flagship developer projects and educate overseas investors enough to start a conversation.",
    features: [
      {
        title: "Developer projects",
        body: "Featured launches such as Burj Azizi, Emaar The Valley, Danube Bayz 102 and Damac Islands.",
      },
      {
        title: "Investor content",
        body: "Articles on the Golden Visa, UAE vs UK returns and tax-free rental income.",
      },
      {
        title: "Specialist advice",
        body: "Residential, commercial and investment advice routes, with a “What sets us apart” section.",
      },
    ],
  },
  {
    slug: "sky-chauffeur",
    name: "Sky Chauffeur",
    domain: "sky-chauffeur.com",
    url: "https://sky-chauffeur.com/",
    category: "Brands & services",
    summary:
      "Airport transfer service for Frankfurt Airport, with fixed-price online booking on the homepage.",
    platform: WP,
    region: "Germany",
    engagement: EMERALDS,
    related: "car-booking-plugin",
    overview:
      "Sky Chauffeur runs private transfers to and from Frankfurt Airport at fixed prices, around the clock.",
    brief:
      "Let travellers book an airport transfer in a few steps, in German or English, and give each popular route its own page.",
    features: [
      {
        title: "Booking on the homepage",
        body: "My custom car booking plugin sits in the hero: trip, vehicle and details in three steps.",
      },
      {
        title: "Route landing pages",
        body: "Dedicated pages for transfers to Frankfurt from Düsseldorf, Dortmund, Mannheim, Heidelberg and Bensheim.",
      },
      {
        title: "Fleet and fares",
        body: "Economy and business classes — Vito, V Class, Business and Limousine — plus fares to other German cities.",
      },
      {
        title: "Trust and contact",
        body: "Customer reviews, a WhatsApp chat button and a 24/7 phone line in the header.",
      },
    ],
  },
  {
    slug: "car-booking-plugin",
    name: "Car Booking Plugin",
    domain: "sky-chauffeur.com",
    url: "https://sky-chauffeur.com/",
    category: "Platforms & software",
    kind: "plugin",
    eyebrow: "Custom WordPress plugin",
    summary:
      "Custom WordPress plugin for chauffeur and airport-transfer bookings — trip, vehicle, extras and payment in one wizard.",
    platform: ["WordPress", "Custom plugin"],
    region: "Germany",
    engagement: EMERALDS,
    related: "sky-chauffeur",
    overview:
      "A booking plugin I built for chauffeur and airport-transfer companies. It runs the whole booking on the Sky Chauffeur homepage and is reused across client sites.",
    brief:
      "Replace phone-and-email bookings with a self-serve wizard that shows fares, sells extras and collects everything the driver needs.",
    features: [
      {
        title: "Four trip types",
        body: "To airport, from airport, round trip and standard transfer, with extra stops and a return date and time.",
      },
      {
        title: "Fares per vehicle",
        body: "Each vehicle's fare appears once a route is entered; the trip's distance and duration are saved with the booking.",
      },
      {
        title: "Vehicle cards",
        body: "Every class shows passenger and luggage capacity, what's included and its fare.",
      },
      {
        title: "Paid extras",
        body: "Baby, booster and child seats, a name plate (+€30) and waiting time billed per hour (€5/hr).",
      },
      {
        title: "Customer details",
        body: "Name, email, phone with country code, flight number, notes and an opt-in for WhatsApp updates.",
      },
      {
        title: "Payment options",
        body: "Cash or card on arrival, an optional card surcharge set by the operator, and terms acceptance before confirming.",
      },
      {
        title: "Configurable per client",
        body: "Brand colours, currency, rates and payment options come from the plugin settings, and the form switches between German and English.",
      },
      {
        title: "Secure submission",
        body: "Bookings are sent over AJAX and checked with a WordPress nonce.",
      },
    ],
    flow: [
      {
        title: "Trip",
        body: "Trip type, pickup and destination, date and time, passengers and luggage.",
      },
      {
        title: "Vehicle",
        body: "Choose a vehicle class, then add seats, a name plate or waiting time.",
      },
      {
        title: "Details",
        body: "Contact details, payment method and the booking total.",
      },
    ],
  },
];

export const PROJECTS: Project[] = RAW.map((p, i) => ({
  ...p,
  index: String(i + 1).padStart(2, "0"),
}));

/** Projects with a live site get their own case study page. */
export const CASE_STUDIES = PROJECTS.filter((p) => p.status !== "offline");

export const getProject = (slug: string) =>
  CASE_STUDIES.find((p) => p.slug === slug);

export const COUNTRIES = new Set(
  PROJECTS.map((p) => p.region).filter(Boolean)
).size;

/* ---------- Skills ---------- */

export type Skill = { name: string; note?: string };
export type SkillGroup = { group: string; skills: Skill[] };

/** Websites (not plugins) in the portfolio built on a platform. */
const count = (platform: string) =>
  PROJECTS.filter((p) => p.kind !== "plugin" && p.platform?.includes(platform)).length;

export const SKILL_GROUPS: SkillGroup[] = [
  {
    group: "Platforms",
    skills: [
      {
        name: "WordPress",
        note: `${count("WordPress")} sites in this portfolio · custom themes and plugins`,
      },
      { name: "Shopify", note: `${count("Shopify")} stores in this portfolio` },
    ],
  },
  {
    group: "Front end",
    skills: [
      { name: "HTML, CSS & JavaScript" },
      { name: "React.js" },
      { name: "React Native" },
    ],
  },
  {
    group: "Back end",
    skills: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "Python" },
      { name: "Django" },
    ],
  },
  {
    group: "AI",
    skills: [
      { name: "AI bots", note: "Built a custom AI chatbot plugin for WordPress" },
      {
        name: "AI vibe coding",
        note: "AI-assisted builds for faster landing pages and features",
      },
    ],
  },
];

export const LANGUAGES: { name: string; level?: string }[] = [
  { name: "English", level: "Fluent" },
  { name: "Urdu", level: "Native" },
  { name: "Punjabi" },
];

/* ---------- Experience (from CV) ---------- */

export const EXPERIENCE = [
  {
    role: "Lead Web Developer",
    company: "Emeralds Media",
    period: "Nov 2023 – present",
    detail: "80+ live WordPress and Shopify projects and 3 reusable custom plugins.",
  },
  {
    role: "Lead Web Developer",
    company: "ABS Solutions",
    period: "Nov 2021 – Oct 2023",
    detail: "WordPress, WooCommerce and Shopify sites, plus custom PHP and Laravel builds.",
  },
  {
    role: "Freelance Web Developer",
    company: "Fiverr & Upwork",
    period: "2021 – present",
    detail: "End-to-end builds for clients in the UK, Pakistan and beyond.",
  },
  {
    role: "BS Computer Science",
    company: "Capital University of Science and Technology",
    period: "Education",
    detail: "",
  },
];
