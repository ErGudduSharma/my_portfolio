// Profile data for the portfolio. Sourced from Guddu's resume and the approved
// design/portfolio-mockup-reference.html mockup.
const PROFILE = {
    name: "Guddu Sharma",
    title: "Full Stack AI Developer",
    currentRole: "Full Stack AI Developer, Create Consciously AI Pvt. Ltd.",
    currentRoleShort: "Full Stack AI Developer at Create Consciously AI Pvt. Ltd.",
    location: "Jaipur, Rajasthan",
    email: "guddusharma0071@gmail.com",
    phone: "+91 9057057804",
    phoneDisplay: "+91-90570-57804",
    linkedin: "https://www.linkedin.com/in/ErGudduSharma",
    github: "https://github.com/ErGudduSharma",
    photo: "guddu_img.jpeg",
    photoAlt: "Guddu Sharma",

    // Hero headline: headlineAccent is the trailing substring rendered in the
    // accent color, matched against the end of headline.
    headline: "I build full-stack applications with AI at the core.",
    headlineAccent: "AI at the core.",
    heroSummary: "Full Stack AI Developer in Jaipur. I lead a technical team at Create Consciously AI, building FastAPI and React products with LLM agents, RAG pipelines and n8n automation.",

    // Typed "role >" line in the hero cycles through these (matches the
    // resume header's own title list, in its own order).
    titles: ["Full Stack AI Developer", "AI/ML Engineer", "Technical Team Leadership", "GenAI & Automation"],

    // Profile card back face ("Quick facts").
    focus: "AI agents, RAG pipelines, full-stack apps, n8n automation",

    // About section.
    aboutHeading: "Mechanical engineer turned AI developer.",
    aboutParagraphs: [
        "I build AI-powered applications, RAG pipelines, multi-agent systems and full-stack products, and I automate workflows with n8n.",
        "I studied Mechanical Engineering, then moved into AI and ML through self-directed study from 2022 to 2025 before my first data science role."
    ],
    // In Guddu's own words, why he moved from mechanical engineering to AI.
    // Left empty deliberately — render nothing until he supplies this himself.
    // Never ship bracketed placeholder text in its place.
    ownWords: "",

    // Contact section heading.
    contactHeading: "Hiring for a full-stack or AI role? Talk to me.",

    // Hero "agent panel" widget — references the AI Ops Research Agent project
    // by id so its title isn't duplicated as a literal string.
    agentPanel: {
        projectId: "ai-ops-research-agent",
        tagline: "One run, step by step",
        steps: [
            { label: "Plan", log: "plan: break prompt into sections" },
            { label: "Search", log: "search: pull live sources via Tavily" },
            { label: "Write", log: "write: draft each section" },
            { label: "Review", log: "review: check the draft" },
            { label: "Paper", log: "done: structured research paper" }
        ]
    },

    // Impact numbers count up from 0 to target on first view, formatted as
    // prefix + (comma-grouped number) + suffix, e.g. "~" + "70" + "%".
    impact: [
        { target: 1000, prefix: "", suffix: "+", label: "conversations automated every day", project: "whatsapp-chatbot" },
        { target: 95, prefix: "", suffix: "%", label: "intent classification accuracy", project: "whatsapp-chatbot" },
        { target: 60, prefix: "", suffix: "%", label: "operational cost reduction", project: "whatsapp-chatbot" },
        { target: 70, prefix: "~", suffix: "%", label: "less research preparation time", project: "ai-ops-research-agent" }
    ]
};
