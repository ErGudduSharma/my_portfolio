// Project data for the portfolio. Sourced from Guddu's resume, with slide
// copy matched to the approved mockup. repo/demo are intentionally blank
// where no real URL was supplied — the UI must not fabricate links, it
// falls back to a GitHub profile link instead.
const PROJECTS = [
    {
        id: "ai-ops-research-agent",
        title: "AI Ops Research Agent",
        tabLabel: "Research Agent",
        category: "AI Agents / Full-Stack",
        date: "Feb 2026",
        color: "lime",
        headline: "~70% less research prep time",
        flow: ["Plan", "Search", "Write", "Review"],
        summary: "A multi-agent system that turns a single prompt into a structured research paper.",
        description: "Architected an autonomous multi-agent AI system using LangGraph orchestration that generates structured research papers from a single user prompt by coordinating planning, web search, writing, and review agents. Integrated the Tavily API for real-time web data extraction and automated literature review, reducing research preparation time by ~70%. Built a full-stack real-time monitoring dashboard with FastAPI and React using live WebSocket updates.",
        caseStudy: {
            whatItDoes: "Coordinates planning, web search, writing and review agents with LangGraph orchestration.",
            howBuilt: "Tavily API for real-time web data and automated literature review. A FastAPI and React dashboard shows each run live over WebSockets.",
            resultLabel: "Result",
            result: "Research preparation time down by ~70%, with 4+ specialised agents working end to end."
        },
        tech: ["LangGraph", "Google Gemini", "Tavily API", "FastAPI", "React"],
        skills: ["python", "langgraph", "agentic-ai", "fastapi", "react"],
        repo: "",
        demo: ""
    },
    {
        id: "whatsapp-chatbot",
        title: "AI Agent WhatsApp Chatbot",
        tabLabel: "WhatsApp Chatbot",
        category: "NLP / AI Agents",
        date: "Nov 2025",
        color: "coral",
        headline: "1,000+ conversations a day at 95% intent accuracy",
        flow: ["Message", "Detect domain", "Classify intent", "Reply"],
        summary: "A production WhatsApp chatbot for education and food service businesses.",
        description: "Engineered a production-deployed WhatsApp AI chatbot automating 1,000+ daily conversations across education and food service domains using NLP-based domain detection. Achieved 95% intent classification accuracy using a fine-tuned text classifier and reduced response turnaround from hours to seconds. Integrated real-time database context persistence and high-availability deployment supporting 100+ concurrent sessions, contributing to a 60% operational cost reduction.",
        caseStudy: {
            whatItDoes: "Automates 1,000+ daily conversations across education and food service using NLP-based domain detection.",
            howBuilt: "A fine-tuned text classifier for intent, real-time database context persistence, and a high-availability deployment supporting 100+ concurrent sessions.",
            resultLabel: "Result",
            result: "95% intent classification accuracy, replies in seconds instead of hours, and a 60% operational cost reduction."
        },
        tech: ["Python", "NLP", "WhatsApp API", "Real-time DB"],
        skills: ["python"],
        repo: "",
        demo: ""
    },
    {
        id: "intelligent-ai-services",
        title: "Intelligent AI Services",
        tabLabel: "AI Services",
        category: "AI Agents / NLP",
        date: "Jan – Feb 2026",
        color: "aqua",
        headline: "Messy requests in, validated workflows out",
        flow: ["Request", "Plan", "Extract", "Validate"],
        summary: "A stateful multi-agent orchestrator for unstructured business requests.",
        description: "Engineered a stateful multi-agent workflow orchestrator using LangGraph that decomposes unstructured business requests into structured, validated, executable workflows. Developed an AI Planning Node powered by Gemini Pro and an LLM-based NER pipeline to extract structured JSON entities with field-level validation. Implemented a Hybrid Security Layer and exposed services through FastAPI REST APIs with end-to-end API testing using Postman.",
        caseStudy: {
            whatItDoes: "Decomposes unstructured business requests into structured, validated, executable workflows.",
            howBuilt: "An AI Planning Node on Gemini Pro and an LLM-based NER pipeline that extracts structured JSON entities with field-level validation.",
            resultLabel: "Delivery",
            result: "A Hybrid Security Layer, FastAPI REST APIs, and end-to-end API testing with Postman."
        },
        tech: ["LangGraph", "Gemini Pro", "FastAPI", "NLP", "REST APIs"],
        skills: ["python", "langgraph", "agentic-ai", "fastapi"],
        repo: "",
        demo: ""
    },
    {
        id: "dlops-cnn-classification",
        title: "DLOps-Based CNN Image Classification System",
        tabLabel: "CNN on AWS",
        category: "MLOps / Computer Vision",
        date: "Nov – Dec 2025",
        color: "amber",
        headline: "From training to inference on AWS",
        flow: ["Ingest", "Preprocess", "Train", "Evaluate", "Infer"],
        summary: "A modular CNN computer vision pipeline with CI/CD automation.",
        description: "Designed a modular end-to-end CNN computer vision pipeline with components for data ingestion, preprocessing, training, evaluation, and inference. Implemented YAML configuration, CI/CD automation, versioned model artifacts, structured logging, and experiment tracking. Deployed the trained CNN model on AWS using S3 and EC2 with a FastAPI inference endpoint and Weights & Biases monitoring.",
        caseStudy: {
            whatItDoes: "Modular components for data ingestion, preprocessing, training, evaluation and inference.",
            howBuilt: "YAML configuration, CI/CD automation, versioned model artifacts, structured logging and experiment tracking.",
            resultLabel: "Deployment",
            result: "Deployed on AWS with S3 and EC2, a FastAPI inference endpoint and Weights & Biases monitoring."
        },
        tech: ["Python", "CNN", "DLOps", "CI/CD", "AWS"],
        skills: ["python", "aws"],
        repo: "",
        demo: ""
    }
];
