const axios = require("axios");

const data = {
  name: "Ahamed Barhoumi",
  github: "https://www.github.com/banoni-dev/",
  website: "https://www.ahmedbarhoumi.me",
  email: "contact@ahmedbarhoumi.me",
  linkedin: "https://www.linkedin.com/in/ahmed-barhoumi-a58369222/",
  phone: "+216 56 466 935",
  summary: "Full Stack Developer with over 4 years of experience...",
  education: [
    {
      degree: "Bachelor of Computer Science",
      institution: "ISIMM University",
      years: "2022 - Present",
    },
  ],
  skills: [
    "JavaScript separator TypeScript separator C++ separator C separator Rust separator Go separator Python separator React separator NextJS separator Node separator Express separator Redux",
    "Git separator Docker separator Kubernetes separator AWS separator Jest separator CI/CD separator MongoDB separator MySQL separator PostgreSQL separator Redis",
  ],
  experience: [
    {
      role: "Mentor Assistant",
      dates: "Dec 2022 - Present",
      details: [
        "Provided guidance and support to over 15 students...",
        "Received consistent positive feedback from students...",
      ],
    },
    {
      role: "Full Stack Developer (Freelance)",
      dates: "Nov 2022 - Present",
      details: [
        "Delivered 15+ high-quality web development projects...",
        "Achieved a 100% on-time delivery rate and earned positive feedback...",
      ],
    },
  ],
  projects: [
    {
      name: "Shop",
      description: "A platform connecting marketers and sellers...",
      details: [
        {
          title: "Role",
          content: "Spearheaded the design, testing, and deployment...",
        },
        {
          title: "User Service",
          content:
            "Developed with Node.js (Express), utilizing PostgreSQL and Redis...",
        },
      ],
    },
  ],
  personality: [
    {
      title: "Passionate Learner",
      description: "Continuously exploring new technologies...",
    },
    {
      title: "Collaborative Team Player",
      description: "Enjoy working with diverse teams...",
    },
  ],
};

axios
  .post("http://localhost:3000/generate", data)
  .then((response) => {
    console.log("PDF generated:", response.data);
  })
  .catch((error) => {
    console.error("Error generating PDF:", error);
  });
