// Experience data for the Dossier portfolio. Sourced from Guddu's resume.
const EXPERIENCE = [
    {
        id: "exp-leadership",
        role: "Technical Team Lead & Full-Stack Developer",
        company: "Create Consciously Pvt. Ltd.",
        companyUrl: "",
        date: "April 2026 — Present",
        start: { y: 2026, m: 4 },
        end: null,
        summary: "Leading a technical team building AI-powered and full-stack applications end to end.",
        bullets: [
            "Leading a technical team in the planning, development, integration, testing, and delivery of AI-powered and full-stack applications.",
            "Developing end-to-end web applications using Python, FastAPI, React, REST APIs, databases, and AI/LLM integrations.",
            "Designing and implementing AI-powered workflows, prompt engineering solutions, and automation pipelines using n8n.",
            "Working with modern AI tools including Claude, ChatGPT, Grok, and Google Gemini for development, research, automation, and AI solution design.",
            "Managing technical task allocation, development priorities, code reviews, debugging, and coordination across team members to support timely project delivery.",
            "Building and integrating AI agents, APIs, automation workflows, and backend services for business-oriented applications."
        ],
        tech: ["Python", "FastAPI", "React", "REST APIs", "n8n", "Claude", "Google Gemini", "Team Leadership"]
    },
    {
        id: "exp-datascience",
        role: "Data Science Intern",
        company: "Regex Software Services",
        companyUrl: "",
        date: "May 2025 — March 2026",
        start: { y: 2025, m: 5 },
        end: { y: 2026, m: 3 },
        summary: "Built ML pipelines and a RAG-based document Q&A tool using LangChain and FAISS.",
        bullets: [
            "Designed and deployed scalable end-to-end ML pipelines in Python to process and analyze 10,000+ records, enabling automated extraction of actionable strategic insights that supported data-driven decision-making.",
            "Fine-tuned Random Forest and SVM classification and regression models using GridSearchCV, RandomizedSearchCV, and k-fold cross-validation, achieving ~20% improvement in prediction accuracy over the baseline.",
            "Conducted comprehensive EDA and feature engineering using Pandas, NumPy, Matplotlib, and Seaborn, uncovering 3+ high-impact data patterns.",
            "Architected and prototyped a RAG-based document Q&A tool using LangChain and FAISS, reducing manual data lookup time by ~40% for the analytics team.",
            "Integrated Transformer-based LLMs and RAG architectures into traditional ML workflows, with real-time API endpoints built on FastAPI."
        ],
        tech: ["Python", "Random Forest", "SVM", "LangChain", "FAISS", "FastAPI", "Pandas", "NumPy"]
    }
];
