export const profile = {
  name: "Thinindu Akuranthilake",
  role: "Associate Software Engineer",
  focus: "Mobile & Full-Stack Systems",
  location: "Colombo, Sri Lanka",
  summary:
    "Passionate and driven software engineer with a strong focus on mobile and web application development — eager to grow into a full-stack developer by building innovative, user-focused digital solutions.",
  philosophy: [
    {
      title: "Ship through every stage",
      body: "Real engineering doesn't end at a merged pull request. I've shipped white-label mobile apps end to end — DEV through PROD — owning builds, releases, and the pipelines that carry them there.",
    },
    {
      title: "Systems over screens",
      body: "Whether it's an ERP workflow in Odoo or an API gateway in WSO2, I care about how the pieces connect. Good architecture is invisible when it works, and painfully obvious when it doesn't.",
    },
    {
      title: "Build for the person on the other end",
      body: "From posture correction to injury prediction for athletes, the projects I return to are the ones built around a real person's problem, not just a technical exercise.",
    },
  ],
};

export const pipelineStages = ["DEV", "QA", "UAT", "PROD"] as const;

export const experience = [
  {
    id: "vs-one-world",
    company: "VS ONE WORLD (Pvt) Ltd",
    role: "Associate Software Engineer",
    period: "Dec 2025 — Present",
    stage: "PROD",
    points: [
      "Working on Odoo ERP development, customizing modules and implementing business workflows.",
      "Utilized WSO2 API Manager to orchestrate API gateways.",
      "Designed and executed memory-efficient data pipelines.",
    ],
  },
  {
    id: "swivel-group",
    company: "Swivel Group",
    link: "swivelgroup.com.au",
    role: "Trainee Software Engineer",
    period: "May 2023 — Nov 2025",
    stage: "UAT",
    points: [
      "Completed a six-month Ignite Program — hands-on with React Native, TypeScript, and Ruby on Rails.",
      "Front-End Developer on a real estate project, building and managing white-label mobile applications with React Native.",
      "Owned App Store & Google Play management: client-specific builds, AAB creation, and full deployment processes.",
      "Managed releases across DEV, QA, UAT, and PROD using Fastlane, GitHub Actions, and Firebase App Distribution.",
      "Collaborated with the back-end team implementing and testing new Ruby on Rails features.",
      "Team Lead, SwivelHack 2023 — built a PWA that predicts sports player injuries and helps athletes secure sponsorships.",
    ],
  },
  {
    id: "topra",
    company: "Topra (Private) Limited",
    link: "Colombo 05",
    role: "Early Career",
    period: "Sep 2019 — Feb 2021",
    stage: "DEV",
    points: [
      "Gained experience in customer communication, IT product knowledge, and marketing strategy in a professional corporate environment.",
    ],
  },
] as const;

export const education = [
  {
    id: "westminster",
    institution: "University of Westminster",
    program: "BSc (Hons) Computer Science, Part-Time",
    period: "2022 — 2026",
    note: "Currently completing final year of studies.",
  },
  {
    id: "royal-college",
    institution: "Royal College, Colombo 07",
    program: "G.C.E. Ordinary Level & Advanced Level",
    period: "2006 — 2019",
    note: "Completed G.C.E. O/L and A/L examinations.",
  },
] as const;

export type Project = {
  id: string;
  year: string;
  title: string;
  description: string;
  stack: string[];
  metric: string;
  stage: (typeof pipelineStages)[number];
};

export const projects: Project[] = [
  {
    id: "mental-wellness",
    year: "2025",
    title: "AI-Powered Mental Wellness Assistant",
    description:
      "Research & development on an AI-driven wellness assistant supporting university students in developing countries through intelligent mood tracking and personalized recommendations.",
    stack: ["React Native", "AI/ML", "Mood Tracking", "Personalization"],
    metric: "In active R&D",
    stage: "DEV",
  },
  {
    id: "posture-detection",
    year: "2023",
    title: "Posture Detection System",
    description:
      "A mobile application that scans a user's posture and recommends corrective exercises based on the analysis — built to make physical wellbeing a daily habit.",
    stack: ["React Native", "Computer Vision", "Mobile"],
    metric: "Real-time posture analysis",
    stage: "PROD",
  },
  {
    id: "skin-consultation",
    year: "2023",
    title: "Westminster Skin Consultation System",
    description:
      "A Java-based platform to manage dermatology consultations end to end, letting patients book appointments and securely store consultation history.",
    stack: ["Java", "Relational DB", "Scheduling"],
    metric: "Secure appointment records",
    stage: "PROD",
  },
  {
    id: "estate-agent",
    year: "2022",
    title: "Estate Agent Client-Side Web App",
    description:
      "An estate management web application allowing agents to view, add, and filter property listings, built entirely on the client side.",
    stack: ["HTML", "CSS", "JavaScript", "JSON"],
    metric: "Full listing CRUD in-browser",
    stage: "PROD",
  },
  {
    id: "fuel-queue",
    year: "2022",
    title: "Fuel Queue Management System",
    description:
      "A Java-based system for managing fuel queues — tracking vehicles and optimizing refueling efficiency during a period of national fuel shortages.",
    stack: ["Java", "Systems Design", "Queue Optimization"],
    metric: "Built for real shortage conditions",
    stage: "PROD",
  },
  {
    id: "movie-hub",
    year: "2022",
    title: "Movie Hub",
    description:
      "A Netflix-inspired movie streaming interface showcasing movie details and trailers, focused on clean UI and browsing experience.",
    stack: ["HTML", "CSS", "JavaScript"],
    metric: "Streaming-grade UI",
    stage: "PROD",
  },
];

export const skills = {
  Frontend: ["React Native", "React", "TypeScript", "HTML", "CSS", "JavaScript"],
  Backend: ["Java", "Python"],
  "DevOps & Delivery": ["Fastlane", "GitHub Actions", "Firebase App Distribution"],
  Databases: ["PostgreSQL", "Firebase", "MySQL"],
  Tools: ["Xcode", "Android Studio", "Git", "Jira", "Figma"],
} as const;


export const socials = {
  github: "https://github.com/thinindu007",
  linkedin: "https://www.linkedin.com/in/thinindu-akuranthilake-231110266/",
  email: "mailto:thinindu2000@gmail.com",
};
