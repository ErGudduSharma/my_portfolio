// Experience data for the portfolio. Sourced from Guddu's resume, with card
// copy and tag selection matched to the approved mockup.
const EXPERIENCE = [
    {
        id: "exp-leadership",
        role: "Technical Team Lead & Full-Stack Developer",
        company: "Create Consciously Pvt. Ltd.",
        companyUrl: "",
        location: "Jaipur, India",
        date: "April 2026 — Present",
        start: { y: 2026, m: 4 },
        end: null,
        summary: "I lead a technical team and build AI-powered and full-stack applications from planning through delivery.",
        bullets: [
            "Lead the team through planning, development, integration, testing and delivery.",
            "Build end-to-end web applications with Python, FastAPI, React, REST APIs, databases and AI/LLM integrations.",
            "Design AI-powered workflows, prompt engineering solutions and automation pipelines in n8n.",
            "Work with Claude, ChatGPT, Grok and Google Gemini for development, research, automation and AI solution design.",
            "Manage task allocation, priorities, code reviews, debugging and coordination across the team.",
            "Build and integrate AI agents, APIs, automation workflows and backend services for business applications."
        ],
        tech: ["Python", "FastAPI", "React", "REST APIs", "n8n", "Claude", "ChatGPT", "Grok", "Google Gemini"],
        stats: null,
        pathYears: "Apr 2026 – Present",
        pathOrg: "Create Consciously Pvt. Ltd., Jaipur",
        pathBlurb: "Leading a technical team and building AI-powered, full-stack applications."
    },
    {
        id: "exp-datascience",
        role: "Data Science Intern",
        company: "Regex Software Services",
        companyUrl: "",
        location: "Jaipur, India",
        date: "May 2025 — March 2026",
        start: { y: 2025, m: 5 },
        end: { y: 2026, m: 3 },
        summary: "I built ML pipelines, tuned models and prototyped a RAG document Q&A tool for the analytics team.",
        bullets: [
            "Designed and deployed end-to-end ML pipelines in Python processing 10,000+ records.",
            "Tuned Random Forest and SVM models with GridSearchCV, RandomizedSearchCV and k-fold cross-validation for a ~20% accuracy improvement over baseline.",
            "Ran EDA and feature engineering with Pandas, NumPy, Matplotlib and Seaborn, uncovering 3+ high-impact data patterns.",
            "Prototyped a RAG document Q&A tool with LangChain and FAISS, cutting manual lookup time by ~40%.",
            "Integrated Transformer-based LLMs and RAG into ML workflows with real-time FastAPI endpoints."
        ],
        tech: ["Python", "Random Forest", "SVM", "LangChain", "FAISS", "FastAPI", "Pandas", "NumPy"],
        stats: [
            { value: "~20%", label: "accuracy over baseline" },
            { value: "~40%", label: "less manual lookup time" },
            { value: "10,000+", label: "records processed" }
        ],
        pathYears: "May 2025 – Mar 2026",
        pathOrg: "Regex Software Services, Jaipur",
        pathBlurb: "ML pipelines, model tuning and a RAG document Q&A tool built with LangChain and FAISS."
    }
];
