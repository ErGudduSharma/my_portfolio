// Skills data for the portfolio. Grouped taxonomy matches the approved
// mockup (7 tabs), sourced from Guddu's resume TECHNICAL SKILLS section.
// Note: the mockup's 7 groups omit the resume's "Tools" category (Postman,
// Streamlit, Jupyter Notebook, Google Colab, VS Code) — following the
// mockup exactly per approval, so those 5 tools are not shown here.
const SKILLS = [
    {
        group: "AI and LLMs",
        items: ["Generative AI", "Agentic AI", "AI Agents", "Prompt Engineering", "LangChain", "LangGraph", "RAG Pipelines", "LLM Fine-Tuning", "Google Gemini", "Claude", "ChatGPT", "Grok", "OpenAI APIs", "Transformers", "Hugging Face"]
    },
    {
        group: "Full-stack",
        items: ["Python", "SQL", "FastAPI", "React", "REST APIs", "WebSockets", "MySQL", "PostgreSQL"]
    },
    {
        group: "Automation",
        items: ["n8n", "AI Workflow Automation", "API Integrations", "Business Process Automation"]
    },
    {
        group: "ML and NLP",
        items: ["Scikit-learn", "Random Forest", "SVM", "Regression and Classification", "Hyperparameter Tuning", "Cross-Validation", "Feature Engineering", "Model Evaluation", "CNN", "Named Entity Recognition", "Text Classification", "Sentiment Analysis", "Tokenization", "Embeddings"]
    },
    {
        group: "MLOps and Cloud",
        items: ["DLOps", "CI/CD Pipelines", "Docker", "AWS", "Git and GitHub"]
    },
    {
        group: "Data",
        items: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "EDA", "Data Cleaning", "Statistical Analysis", "FAISS", "Pinecone", "Chroma"]
    },
    {
        group: "Leadership",
        items: ["Technical Team Leadership", "Task Planning", "Code Review", "Team Coordination", "Project Delivery", "Debugging"]
    }
];

// Core stack marquee under the hero, alternating solid/outline treatment.
const MARQUEE = [
    { name: "Python", outline: false },
    { name: "FastAPI", outline: true },
    { name: "React", outline: false },
    { name: "LangGraph", outline: true },
    { name: "LangChain", outline: false },
    { name: "RAG", outline: true },
    { name: "n8n", outline: false },
    { name: "Docker", outline: true },
    { name: "AWS", outline: false }
];
