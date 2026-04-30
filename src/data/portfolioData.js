export const portfolioData = {
  personal: {
    name: "Krishnendu Sengupta",
    title: "IT Undergrad | Data Science | Business Analytics | AI/ML Enthusiast",
    description: "I'm an IT undergraduate at Techno Main – Salt Lake, Kolkata, driven by an insatiable curiosity for Data Science, Business Analytics, and AI/ML. I believe in the power of data to transform decisions and build intelligent solutions. I leverage cutting-edge AI-assisted development to rapidly turn ideas into reality — constantly learning, building, and pushing boundaries.",
    location: "Kolkata, West Bengal, India",
    email: "hello@example.com", 
    // Add your photo in the public or src/assets folder and path it here, 
    // or provide an external URL. For now, using a cool placeholder.
    photo: "/profile.jpg",
  },
  links: {
    github: "https://github.com/senguptakrishnendu103-dotcom",
    linkedin: "https://www.linkedin.com/in/krishnendu-sengupta-7b0185370",
    resume: "/resume.pdf"
  },
  about: {
    title: "About Me",
    content: "As an IT undergraduate at Techno Main – Salt Lake, I am highly passionate about the intersection of data and intelligent systems. While my foundational strengths lie in Python, AI-assisted development, and analytical problem solving, I am on an active journey to learn and master Data Science, Business Analytics, and Machine Learning. I leverage modern AI tools to rapidly build and ship projects while continuously expanding my knowledge base. My ultimate goal is to evolve into a proficient Data Scientist and AI/ML Engineer who can translate complex data into actionable business strategies.",
    skills: [
      "Python", "AI-Assisted Development", "Prompt Engineering", 
      "Research", "Problem Solving", "Adaptability"
    ],
    learning: [
      "Data Science", "Machine Learning", "Business Analytics", 
      "Financial Analytics", "Data Visualization", "AI/ML"
    ]
  },
  experience: [
    {
      id: 1,
      title: "IT Undergraduate",
      company: "Techno Main – Salt Lake",
      period: "2025 - Present",
      description: "Pursuing B.Tech in Information Technology. Focusing on Data Science, AI/ML fundamentals, algorithms, and building real-world projects that solve meaningful problems.",
    },
    {
      id: 2,
      title: "Self-Employed / Freelance",
      company: "Independent Projects",
      period: "2025 - Present",
      description: "Building data-driven applications and AI-powered tools. Participating in hackathons like Google Solution Challenge. Exploring research in financial analytics and business intelligence.",
    }
  ],
  // Projects are now managed dynamically via Firebase Firestore.
  // Navigate to /admin to add, edit, or delete projects.
  projects: []
};
