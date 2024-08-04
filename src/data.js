const systemPrompt = `You are a software developer looking for a job. Based on the data I provide, generate an object that will be used to create a resume. Follow these rules:

If you encounter the format [BOLD]{something}, it indicates that "something" should be bold. Feel free to highlight important keywords, especially those similar to the job description, using this format.

For the object structure:

    name: Use the name from the provided data.
    position: This should match the job description (e.g., Software Developer, Software Engineer, Backend Developer, Backend Engineer, Frontend Developer, Frontend Engineer, Full Stack Developer, Full Stack Engineer).
    github: Use the GitHub URL from the provided data.
    website: Use the website URL from the provided data.
    websiteText: Use the websiteText from the provided data.
    email: Use the email from the provided data.
    linkedin: Use the LinkedIn URL from the provided data.
    phone: Use the phone number from the provided data.
    address: Include the address from the data only if the job is in Tunisia; otherwise, set it to tunisia.
    achievements: List of strings based on the data and job description. Include achievements based on the following:
        For an intern position, include some important achievements.
        In general, include achievements if the data doesn't closely match the job description and there's not much content.
        For normal similarity, include 1-2 significant achievements.
        For high similarity, omit achievements if there's plenty of relevant experience and projects. If omitted, set to an empty string.
    summary: A string tailored to the job description. For intern/entry-level positions, include a summary. The summary length depends on the similarity of the data to the job description:
        For low similarity, include a longer summary (30-35 words max).
        For normal similarity, include a shorter summary (20-25 words max).
        For high similarity, omit the summary if there is sufficient relevant content. If omitted, set to an empty string.
    education: A list of objects as provided in the data. If no education data is provided, set to an empty string.
    skills: A list of strings that match the skills in the data with those in the job description. Include relevant skills and related ones even if not directly mentioned in the job description. Ensure each string has a similar length, using the word "separator" between skills for consistency. Example: ["JavaScript separator TypeScript separator C++ separator C separator Rust separator Go separator Python separator React separator NextJS separator Node separator Express separator Redux separator Fastify separator TailwindCSS separator SASS", "Git separator Docker separator Kubernetes separator AWS separator Jest separator CI/CD separator MongoDB separator MySQL separator PostgreSQL separator Redis separator Elasticsearch separator RabbitMQ separator Kafka separator GraphQL separator RESTful APIs"]
    experience: A list of objects based on the provided data. Tailor bullet points to emphasize relevant technologies and languages for the position (e.g., focus on frontend details for frontend positions). For full stack or software engineer positions, cover both frontend and backend aspects. If omitted, set to an empty string.
    projects: Match the provided format but adapt phrases and terminology to align with the job description. If no project data is provided, set to an empty string.
    personality: Include if necessary or beneficial, especially if the resume lacks substantial data. Format according to the data provided and match the job description. If omitted, set to an empty string.
    languages: Use the languages listed in the provided data. If no language data is provided, set to an empty string.

Return an object following these guidelines, ensuring that every key is included in the object. If a section is not included, set its value to an empty string. Do not include any additional text or explanation.`;

const data = {
  name: "Ahmed Barhoumi",
  position: "based on the job description",
  github: "https://www.github.com/banoni-dev",
  website: "https://www.ahmedbarhoumi.me",
  websiteText: "ahmedbarhoumi.me",
  email: "me@ahmedbarhoumi.me",
  linkedin: "https://www.linkedin.com/in/ahmed-barhoumi-a58369222/",
  phone: "+216 56 466 935",
  address: "Monastir",
  achievements: [],
  summary:
    "Full Stack Developer with [BOLD]{over 4 years of experience in programming}, seeking an internship. Passionate about competitive programming and problem-solving. Adept at architecting, developing, and deploying innovative software solutions while fostering a collaborative work environment.",
  education: [
    {
      degree: "Bachelor of Computer Science",
      institution: "ISIMM University",
      years: "2022 - 2025",
    },
  ],
  skills: [
    "JavaScript TypeScript C++ C Rust Go Python React NextJS Node Express Redux Fastify TailwindCSS Bootstrap SASS Git Docker Kubernetes AWS Jest CI/CD MongoDB MySQL PostgreSQL Redis Elasticsearch RabbitMQ Kafka GraphQL RESTful APIs Microservices Design Patterns nginx bash lua",
  ],
  experience: [
    {
      title: "Open Source Contributor",
      role: "Open Source Contributor",
      dates: "Fev 2024 - Present",
      bullets: [
        "Collaborated with a global team of developers, participating in code reviews, bug tracking, and feature enhancements.",
        "Engaged with the open-source community through forums, discussions, and conferences to share knowledge and gather feedback.",
        "Contributed to the creation of educational resources, tutorials, and guides to empower community members and encourage more developers to contribute.",
      ],
    },
    {
      title: "Mentor Assistant",
      role: "Mentor Assistant",
      dates: "Dec 2022 - Present",
      bullets: [
        "Provided guidance and support to over [BOLD]{15 students} across various technology stacks.",
        "Received consistent [BOLD]{positive feedback} from students for exceptional mentorship quality.",
      ],
    },
    {
      title: "Full Stack Developer (Freelance)",
      role: "Full Stack Developer",
      dates: "Nov 2022 - Present",
      bullets: [
        "Delivered [BOLD]{15+ high-quality web development projects} on schedule.",
        "Achieved a [BOLD]{100% on-time delivery rate} and earned positive feedback from clients.",
      ],
    },
  ],
  projects: [
    {
      name: "Shop",
      description:
        "A platform connecting marketers and sellers, designed with a [BOLD]{polyglot microservices architecture}.",
      details: [
        {
          title: "Role",
          description:
            "Spearheaded the design, testing, and deployment of the entire application, resulting in a robust platform with [BOLD]{99.9% uptime} and handling [BOLD]{over 100,000 active users}.",
        },
        {
          title: "Frontend",
          description:
            "Developed with [BOLD]{React.js}, [BOLD]{Redux}, and [BOLD]{Tailwind CSS}.",
        },
        {
          title: "Containerization and Orchestration",
          description: [
            "Containerized using [BOLD]{Docker}, ensuring consistent development environments.",
            "Orchestrated with [BOLD]{Kubernetes} for automated deployment, scaling, and management, reducing deployment time by [BOLD]{50%}.",
            "Managed Kubernetes applications with [BOLD]{Helm}.",
          ],
        },
      ],
    },
  ],
  personality: [
    "Passionate Learner: Continuously exploring new technologies and methodologies.",
    "Collaborative Team Player: Enjoy working with diverse teams and contributing to a positive and productive work environment.",
  ],
  languages: ["English", "French", "Arabic"],
};

const jobDescription = `
Location(s)
Boston, Massachusetts, USA;
Work arrangement(s)
Fully Remote (works exclusively from home)
Your opportunity
The PLG Experiences (PLGX) team builds apps and components that drive customer adoption and product-led growth on the New Relic platform.
We are looking for a Software Engineer to join us! We primarily build front-end web applications and deal with modern frameworks and libraries such as ReactJS and GraphQL. We also build out APIs that stitch together our platform’s data for the front-end.

This position is an excellent match for someone who loves to create polished user experiences, both in front-end services and occasionally the back-end. It is particularly well suited for a growth-minded engineer who is excited to learn new technologies and practices. There will be an on-call rotation with a focus on sustainability, and, when issues arise, we prioritize getting them fixed right away.

What you'll do

    Maintain a work-life balance that enables you to thrive by using unlimited flex time-off, twelve weeks of paid parental leave, and our DataNerds4Good volunteer time off program!
    Participate in a one-week on-call rotation to support our services. We bake stability into everything we do to ensure a healthy work-life balance.
    Ship incrementally and often, helping the team to maintain a constant flow of feedback on its work.
    Collaborate with designers and other UI engineers across the company to learn from others and to ensure you stay up to date on the company’s UI best practices.
    Build thoughtful, high-quality code that is easy to read and maintain.
    Produce highly performant and flexible user interfaces.
    Be a voice in deciding how to improve our users’ daily workflows
    Actively drive continuous engineering excellence within your team and across the organization.


This role requires

    Familiarity with Node.
    Comfortable and willing to give and receive feedback.
    Collaborative working style and excellent communication skills.
    Experience reviewing PRs and applying best methodologies to reviews.
    Familiarity with modern development and build tools such as Git, NPM, Babel, and Webpack.
    Experience integrating UIs with data from service endpoints.
    Strong React fundamentals with proven experience writing performant and reusable components.
    Deep familiarity with modern Javascript (ES6+), HTML, CSS.
    2+ years of professional experience, or proven exceptional ability, building production front-end web applications.

Bonus points if you have

    Exposure to TypeScript or another strongly typed language.
    Experience working within the constraints of a design framework.
    Experience with front-end JS testing tools.
    Exposure to PostgreSQL.
    Exposure to back-end development, particularly designing and integrating APIs.

Fostering a diverse, welcoming and inclusive environment is important to us. We work hard to make everyone feel comfortable bringing their best, most authentic selves to work every day. We celebrate our talented Relics’ different backgrounds and abilities, and recognize the different paths they took to reach us – including nontraditional ones. Their experiences and perspectives inspire us to make our products and company the best they can be. We’re looking for people who feel connected to our mission and values, not just candidates who check off all the boxes. 

If you require a reasonable accommodation to complete any part of the application or recruiting process, please visit https://newrelic.avature.net/accommodations to submit your request.

We believe in empowering all Relics to achieve professional and business success through a flexible workforce model. This model allows us to work in a variety of workplaces that best support our success, including fully office-based, fully remote, or hybrid.
`;

const userPrompt = `this is the data object
${JSON.stringify(data, null, 2)}

and this is the job description

${jobDescription}
`;

module.exports = {
  systemPrompt,
  userPrompt,
};
