export const CONTACT = {
  email: "hellobrisavo@gmail.com",
  instagram: {
    handle: "hellobrisavo",
    href: "https://www.instagram.com/hellobrisavo/",
  },
  phones: [
    { label: "Canada", number: "+1 236 818 4654", href: "tel:+12368184654", flag: "🇨🇦" },
    { label: "India", number: "+91 99991 07733", href: "tel:+919999107733", flag: "🇮🇳" },
  ],
  offices: "Vancouver 🇨🇦 · Gurugram 🇮🇳",
} as const;

export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Technology", href: "/technology" },
  { label: "Products", href: "/products" },
  { label: "Why Us", href: "/why-us" },
  { label: "Team", href: "/team" },
  { label: "Founders", href: "/founders-office" },
  // { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = {
  Company: [
    { label: "Why Us", href: "/why-us" },
    { label: "Meet the Team", href: "/team" },
    { label: "Founders Office", href: "/founders-office" },
    { label: "Global Presence", href: "/global" },
  ],
  Services: [
    { label: "AI Solutions", href: "/services" },
    { label: "Software Development", href: "/services" },
    { label: "Cloud Infrastructure", href: "/services" },
    { label: "Digital Transformation", href: "/services" },
  ],
  Products: [
    { label: "Real Estate CRM", href: "/products#real-estate-crm" },
    { label: "Property Management", href: "/products#real-estate-crm" },
    { label: "Lead Management", href: "/products#real-estate-crm" },
    { label: "WhatsApp Automation", href: "/products#whatsapp" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
} as const;

export const WHY_US = [
  {
    title: "Global Delivery Model",
    description: "Canada × India engineering network delivering 24/7 development velocity with local expertise in every timezone.",
    icon: "globe",
  },
  {
    title: "Enterprise-Grade Engineering",
    description: "Mission-critical systems built with security-first architecture, 99.9% uptime SLAs, and production-proven patterns.",
    icon: "shield",
  },
  {
    title: "AI-Native Thinking",
    description: "Every solution is designed with intelligence at its core — from LLM integrations to autonomous automation pipelines.",
    icon: "brain",
  },
  {
    title: "End-to-End Ownership",
    description: "From discovery to deployment to scale — one partner accountable for your entire technology lifecycle.",
    icon: "layers",
  },
  {
    title: "Transparent Partnership",
    description: "Direct access to engineering leadership, clear roadmaps, and collaborative delivery without agency overhead.",
    icon: "handshake",
  },
  {
    title: "Proven at Scale",
    description: "150+ enterprise clients across 30 countries trust BRISΛVO for platforms handling millions of daily transactions.",
    icon: "chart",
  },
] as const;

export const TEAM = [
  {
    name: "Engineering Leadership",
    role: "Global Engineering",
    department: "Technology",
    bio: "Architecting scalable systems and leading cross-continental engineering teams across Canada and India.",
    avatar: "EL",
    location: "Vancouver · Gurugram",
  },
  {
    name: "Product Strategy",
    role: "Head of Product",
    department: "Product",
    bio: "Driving product vision from concept to market — aligning business goals with world-class user experiences.",
    avatar: "PS",
    location: "Vancouver",
  },
  {
    name: "AI Research",
    role: "AI Engineering Lead",
    department: "Artificial Intelligence",
    bio: "Building production ML systems, LLM integrations, and intelligent automation for enterprise clients worldwide.",
    avatar: "AR",
    location: "Gurugram",
  },
  {
    name: "Client Success",
    role: "Director of Delivery",
    department: "Operations",
    bio: "Ensuring every engagement exceeds expectations with transparent communication and on-time delivery.",
    avatar: "CS",
    location: "Vancouver · Gurugram",
  },
  {
    name: "Cloud Architecture",
    role: "Principal Architect",
    department: "Infrastructure",
    bio: "Designing resilient cloud-native architectures on AWS, GCP, and Azure for global-scale deployments.",
    avatar: "CA",
    location: "Gurugram",
  },
  {
    name: "Design Systems",
    role: "Lead Designer",
    department: "Design",
    bio: "Crafting premium digital experiences and design systems that define how enterprise software should feel.",
    avatar: "DS",
    location: "Vancouver",
  },
] as const;

export const FOUNDERS = [
  {
    name: "Founder & CEO",
    title: "Chief Executive Officer",
    bio: "Visionary leader driving BRISΛVO's global expansion and strategic partnerships. Passionate about building technology that transforms how businesses operate at international scale.",
    focus: ["Global Strategy", "Enterprise Partnerships", "Company Vision"],
    avatar: "CEO",
    location: "Vancouver, Canada",
  },
  {
    name: "Co-Founder & CTO",
    title: "Chief Technology Officer",
    bio: "Technical architect behind BRISΛVO's engineering excellence. Leads AI research, platform architecture, and the Canada-India delivery network that powers 24/7 development.",
    focus: ["AI & Platform Architecture", "Engineering Culture", "Technical Strategy"],
    avatar: "CTO",
    location: "Gurugram, India",
  },
] as const;

export const SERVICES = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    description: "Production-grade ML systems, LLM integrations, and intelligent automation at enterprise scale.",
    icon: "brain",
    span: "col-span-2 row-span-2",
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    accent: "#8b5cf6",
  },
  {
    id: "software",
    title: "Software Development",
    description: "Mission-critical applications engineered for reliability, performance, and global scale.",
    icon: "code",
    span: "col-span-1 row-span-1",
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    accent: "#3b82f6",
  },
  {
    id: "saas",
    title: "SaaS Development",
    description: "Multi-tenant platforms with subscription billing, analytics, and enterprise security.",
    icon: "cloud",
    span: "col-span-1 row-span-1",
    gradient: "from-cyan-500/20 via-teal-500/10 to-transparent",
    accent: "#06b6d4",
  },
  {
    id: "enterprise",
    title: "Enterprise Systems",
    description: "ERP, workflow engines, and distributed architectures for Fortune 500 operations.",
    icon: "building",
    span: "col-span-1 row-span-2",
    gradient: "from-indigo-500/20 via-blue-500/10 to-transparent",
    accent: "#6366f1",
  },
  {
    id: "crm",
    title: "CRM Platforms",
    description: "Customer intelligence systems that unify sales, support, and lifecycle automation.",
    icon: "users",
    span: "col-span-1 row-span-1",
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    accent: "#ec4899",
  },
  {
    id: "fintech",
    title: "FinTech Solutions",
    description: "Payment rails, compliance frameworks, and real-time financial infrastructure.",
    icon: "credit-card",
    span: "col-span-1 row-span-1",
    gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
    accent: "#10b981",
  },
  {
    id: "cloud",
    title: "Cloud Infrastructure",
    description: "AWS, GCP, Azure — architected for resilience, auto-scaling, and zero-downtime.",
    icon: "server",
    span: "col-span-1 row-span-1",
    gradient: "from-sky-500/20 via-blue-500/10 to-transparent",
    accent: "#0ea5e9",
  },
  {
    id: "mobile",
    title: "Mobile Applications",
    description: "Native and cross-platform experiences with offline-first architecture.",
    icon: "smartphone",
    span: "col-span-1 row-span-1",
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
    accent: "#f59e0b",
  },
  {
    id: "automation",
    title: "Automation Systems",
    description: "RPA, workflow orchestration, and intelligent process automation pipelines.",
    icon: "zap",
    span: "col-span-1 row-span-1",
    gradient: "from-yellow-500/20 via-orange-500/10 to-transparent",
    accent: "#eab308",
  },
  {
    id: "transformation",
    title: "Digital Transformation",
    description: "End-to-end modernization of legacy systems into cloud-native architectures.",
    icon: "refresh",
    span: "col-span-1 row-span-1",
    gradient: "from-fuchsia-500/20 via-purple-500/10 to-transparent",
    accent: "#d946ef",
  },
  {
    id: "data",
    title: "Data Engineering",
    description: "Real-time pipelines, data lakes, and analytics platforms at petabyte scale.",
    icon: "database",
    span: "col-span-1 row-span-1",
    gradient: "from-teal-500/20 via-cyan-500/10 to-transparent",
    accent: "#14b8a6",
  },
  {
    id: "product",
    title: "Product Engineering",
    description: "From concept to launch — full-cycle product development with design systems.",
    icon: "layers",
    span: "col-span-2 row-span-1",
    gradient: "from-violet-500/20 via-indigo-500/10 to-transparent",
    accent: "#7c3aed",
  },
] as const;

export const FEATURED_PRODUCT = {
  id: "real-estate-crm",
  name: "Real Estate CRM",
  tagline: "Property Management Software CRM",
  headline: "The operating system for real estate teams",
  description:
    "A multi-tenant real estate CRM that unifies contacts, leads, properties, bookings, site visits, organizations, users, roles, and reporting in one dashboard — with marketing automation and WhatsApp outreach built in.",
  summary:
    "Built with a modern React + TypeScript frontend and a Node.js + Express + MongoDB backend, this platform combines operational CRM workflows with marketing tools so real estate businesses can manage relationships and outreach from a single system.",
  color: "#3b82f6",
  image: "/products/real-estate-crm-dashboard.png",
  imageAlt: "BRISΛVO Real Estate CRM dashboard showing properties, revenue, occupancy, and maintenance",
  stack: ["React", "TypeScript", "Node.js", "Express", "MongoDB"],
  metrics: ["Multi-tenant", "JWT auth", "WhatsApp API", "Role-based access"],
  capabilities: [
    {
      title: "Contacts & Leads",
      description: "Manual contact creation, organization-level data, and lead pipelines in one place.",
    },
    {
      title: "Properties & Bookings",
      description: "Property workflows, site visit scheduling, and lead–property associations.",
    },
    {
      title: "Roles & Security",
      description: "JWT authentication with role-based permissions for secure team access.",
    },
    {
      title: "WhatsApp Marketing",
      description: "Send template or custom messages via WhatsApp Business API from stored campaigns.",
    },
    {
      title: "Org Settings",
      description: "Company and organization settings separated from marketing configuration.",
    },
    {
      title: "Unified Reporting",
      description: "Dashboards and reporting across contacts, properties, bookings, and outreach.",
    },
  ],
} as const;

export const PRODUCTS = [
  {
    id: "real-estate-crm",
    name: "Real Estate CRM",
    tagline: "Property management software CRM",
    description:
      "Multi-tenant CRM for contacts, leads, properties, bookings, site visits, roles, reporting, and WhatsApp marketing — in one dashboard.",
    color: "#3b82f6",
    metrics: ["Multi-tenant", "Site visits", "WhatsApp API"],
    featured: true,
  },
  {
    id: "leads",
    name: "Lead Management",
    tagline: "Convert faster, scale smarter",
    description: "AI-driven lead scoring, multi-channel capture, and automated nurture sequences that close deals.",
    color: "#06b6d4",
    metrics: ["3x conversion", "Multi-channel", "Smart routing"],
    featured: false,
  },
  {
    id: "whatsapp",
    name: "WhatsApp Automation",
    tagline: "Conversations at scale",
    description: "Enterprise WhatsApp Business API with templates, broadcast campaigns, and CRM-connected outreach.",
    color: "#10b981",
    metrics: ["Templates", "Graph API", "CRM sync"],
    featured: false,
  },
  {
    id: "ai-assistant",
    name: "AI Assistant",
    tagline: "Your intelligent co-pilot",
    description: "Custom AI agents trained on your data — support, sales, operations, and internal knowledge.",
    color: "#ec4899",
    metrics: ["Custom training", "Multi-modal", "Enterprise secure"],
    featured: false,
  },
] as const;

export const OFFICES = [
  {
    country: "Canada",
    flag: "🇨🇦",
    city: "Vancouver",
    role: "North American Headquarters",
    phone: "+1 236 818 4654",
    phoneHref: "tel:+12368184654",
    coordinates: { lat: 43.6532, lng: -79.3832 },
    timezone: "EST",
  },
  {
    country: "India",
    flag: "🇮🇳",
    city: "Gurugram",
    role: "Engineering & Delivery Center",
    phone: "+91 99991 07733",
    phoneHref: "tel:+919999107733",
    coordinates: { lat: 12.9716, lng: 77.5946 },
    timezone: "IST",
  },
] as const;

export const METRICS = [
  { value: 150, suffix: "+", label: "Enterprise Clients", description: "Across 30+ countries" },
  { value: 500, suffix: "+", label: "Projects Delivered", description: "Mission-critical systems" },
  { value: 99.9, suffix: "%", label: "System Uptime", description: "Enterprise SLA guaranteed" },
  { value: 2, suffix: "", label: "Global Offices", description: "Canada × India network" },
] as const;

export const TESTIMONIALS = [
  {
    id: "1",
    quote: "BRISΛVO transformed our entire digital infrastructure. Their engineering team delivered a platform that handles millions of transactions daily with zero downtime.",
    author: "Sarah Chen",
    role: "CTO, FinScale Global",
    company: "FinScale",
    avatar: "SC",
    rating: 5,
  },
  {
    id: "2",
    quote: "The AI automation platform they built reduced our operational costs by 60% while improving customer satisfaction scores across all channels.",
    author: "Rajesh Patel",
    role: "VP Engineering, NovaTech",
    company: "NovaTech",
    avatar: "RP",
    rating: 5,
  },
  {
    id: "3",
    quote: "Working with BRISΛVO feels like having an elite in-house engineering team. Their Canada-India delivery model gives us 24/7 development velocity.",
    author: "Michael Torres",
    role: "CEO, CloudBridge Systems",
    company: "CloudBridge",
    avatar: "MT",
    rating: 5,
  },
  {
    id: "4",
    quote: "From concept to production in 8 weeks. The BRISΛVO CRM platform now powers our entire sales organization across 15 countries.",
    author: "Emily Watson",
    role: "Director of Sales Ops, Meridian",
    company: "Meridian",
    avatar: "EW",
    rating: 5,
  },
] as const;

export const TIMELINE = [
  { year: "2018", title: "Founded", description: "BRISΛVO established with a vision for global technology excellence" },
  { year: "2020", title: "India Expansion", description: "Engineering center launched in Gurugram" },
  { year: "2022", title: "AI Division", description: "Dedicated AI research and product engineering team" },
  { year: "2024", title: "Enterprise Scale", description: "150+ enterprise clients across 30 countries" },
  { year: "2026", title: "Global Leader", description: "Recognized as a premier global technology partner" },
] as const;

export const HOME_LINKS = [
  { label: "Services", href: "/services", description: "12 engineering disciplines", icon: "layers" },
  { label: "Technology", href: "/technology", description: "65+ production technologies", icon: "cpu" },
  { label: "Products", href: "/products", description: "Real Estate CRM & platforms", icon: "box" },
  { label: "Global", href: "/global", description: "Canada × India network", icon: "globe" },
  { label: "Why Us", href: "/why-us", description: "What sets us apart", icon: "star" },
  { label: "Team", href: "/team", description: "Meet our leaders", icon: "users" },
] as const;
