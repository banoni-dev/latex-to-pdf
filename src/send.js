const axios = require("axios");

const data = {
  name: "Ahmed Barhoumi",
  position: "Full Stack Developer",
  github: "https://www.github.com/banoni-dev",
  website: "https://www.ahmedbarhoumi.me",
  websiteText: "ahmedbarhoumi.me",
  email: "me@ahmedbarhoumi.me",
  linkedin: "https://www.linkedin.com/in/ahmed-barhoumi-a58369222/",
  phone: "+216 56 466 935",
  summary:
    "Full Stack Developer with over 4 years of experience in programming, seeking an internship. Passionate about competitive programming and problem-solving. Adept at architecting, developing, and deploying innovative software solutions while fostering a collaborative work environment.",
  education: [
    {
      degree: "Bachelor of Computer Science",
      institution: "ISIMM University",
      years: "2022 - 2025",
    },
    {
      degree: "Master in Computer Sciencee",
      institution: "ISIMM University",
      years: "2022 - Present",
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "C++",
    "C",
    "Rust",
    "Go",
    "Python",
    "React",
    "NextJS",
    "Node",
    "Express",
    "Redux",
    "Git",
    "Docker",
    "Kubernetes",
    "AWS",
    "Jest",
    "CI/CD",
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "Redis",
  ],
  experience: [
    {
      title: "Mentor Assistant",
      role: "Mentor Assistant",
      dates: "Dec 2022 - Present",
      bullets: [
        "Provided guidance and support to over 15 students across various technology stacks.",
        "Received consistent positive feedback from students for exceptional mentorship quality.",
      ],
    },
    {
      title: "Full Stack Developer (Freelance)",
      role: "Full Stack Developer",
      dates: "Nov 2022 - Present",
      bullets: [
        "Delivered 15+ high-quality web development projects on schedule.",
        "Achieved a 100% on-time delivery rate and earned positive feedback from clients.",
      ],
    },
  ],
  projects: [
    {
      title: "Shop",
      description:
        "A platform connecting marketers and sellers, designed with a polyglot microservices architecture.",
      details: [
        "Role: Spearheaded the design, testing, and deployment of the entire application.",
        "User Service: Developed with Node.js (Express), utilizing PostgreSQL and Redis.",
        "Product Service: Built with Rust (Actix), using MongoDB and Elasticsearch.",
      ],
    },
  ],
  personality: [
    "Passionate Learner: Continuously exploring new technologies and methodologies.",
    "Collaborative Team Player: Enjoy working with diverse teams and contributing to a positive and productive work environment.",
  ],
};

axios
  .post("http://localhost:3000/generate", data, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    console.log("Response:", response.data);
  })
  .catch((error) => {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message,
    );
  });
