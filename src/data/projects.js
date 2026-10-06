// Project data for the Dossier portfolio. Sourced from Guddu's resume.
// repo/demo are intentionally blank where no real URL was supplied — the UI
// must not fabricate links, it falls back to a GitHub profile link instead.
const PROJECTS = [
    {
        id: "ai-ops-research-agent",
        title: "AI Ops Research Agent",
        date: "Feb 2026",
        summary: "Multi-agent LangGraph system that turns a single prompt into a full structured research paper, with live monitoring built in.",
        description: "Architected an autonomous multi-agent AI system using LangGraph orchestration that generates structured research papers from a single user prompt by coordinating planning, web search, writing, and review agents. Integrated the Tavily API for real-time web data extraction and automated literature review, reducing research preparation time by ~70%. Built a full-stack real-time monitoring dashboard with FastAPI and React using live WebSocket updates.",
        tech: ["LangGraph", "Google Gemini", "Tavily API", "FastAPI", "React"],
        skills: ["python", "langgraph", "agentic-ai", "fastapi", "react"],
        repo: "",
        demo: ""
    },
    {
        id: "intelligent-ai-services",
        title: "Intelligent AI Services",
        date: "Jan – Feb 2026",
        summary: "LangGraph orchestrator that turns unstructured business requests into structured, validated, executable workflows.",
        description: "Engineered a stateful multi-agent workflow orchestrator using LangGraph that decomposes unstructured business requests into structured, validated, executable workflows. Developed an AI Planning Node powered by Gemini Pro and an LLM-based NER pipeline to extract structured JSON entities with field-level validation. Implemented a Hybrid Security Layer and exposed services through FastAPI REST APIs with end-to-end API testing using Postman.",
        tech: ["LangGraph", "Gemini Pro", "FastAPI", "NLP", "REST APIs"],
        skills: ["python", "langgraph", "agentic-ai", "fastapi"],
        repo: "",
        demo: ""
    },
    {
        id: "dlops-cnn-classification",
        title: "DLOps-Based CNN Image Classification System",
        date: "Nov – Dec 2025",
        summary: "End-to-end CNN computer vision pipeline with CI/CD automation, deployed on AWS.",
        description: "Designed a modular end-to-end CNN computer vision pipeline with components for data ingestion, preprocessing, training, evaluation, and inference. Implemented YAML configuration, CI/CD automation, versioned model artifacts, structured logging, and experiment tracking. Deployed the trained CNN model on AWS using S3 and EC2 with a FastAPI inference endpoint and Weights & Biases monitoring.",
        tech: ["Python", "CNN", "DLOps", "CI/CD", "AWS"],
        skills: ["python", "aws"],
        repo: "",
        demo: ""
    },
    {
        id: "whatsapp-chatbot",
        title: "AI Agent WhatsApp Chatbot",
        date: "Nov 2025",
        summary: "Production WhatsApp AI chatbot automating 1,000+ daily conversations with 95% intent accuracy.",
        description: "Engineered a production-deployed WhatsApp AI chatbot automating 1,000+ daily conversations across education and food service domains using NLP-based domain detection. Achieved 95% intent classification accuracy using a fine-tuned text classifier and reduced response turnaround from hours to seconds. Integrated real-time database context persistence and high-availability deployment supporting 100+ concurrent sessions, contributing to a 60% operational cost reduction.",
        tech: ["Python", "NLP", "WhatsApp API", "Real-time DB"],
        skills: ["python"],
        repo: "",
        demo: ""
    }
];
