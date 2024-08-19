const Fastify = require("fastify");
const cors = require("@fastify/cors");
const { generatePdf } = require("./generate");
const path = require("path");
const fs = require("fs"); // Standard fs module for streaming
const { data, systemPrompt } = require("./data");
const OpenAI = require("openai");
const openai = new OpenAI();
const apiKey = process.env.OPENAI_API_KEY;

const server = Fastify();

server.register(cors, {
  origin: "*",
});

server.get("/download-pdf/:filename", (request, reply) => {
  const { filename } = request.params;
  const filePath = path.join(__dirname, "../pdfs", filename);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      reply.status(500).send("Error reading file.");
      return;
    }

    reply
      .header("Content-Disposition", `attachment; filename=${filename}`)
      .send(data);
  });
});

server.post("/generate", async (request, reply) => {
  const { jobDescription } = request.body;
  const userPrompt = `this is the data object
  ${JSON.stringify(data, null, 2)}

  and this is the job description

  ${jobDescription} `;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      model: "gpt-4o-mini",
    });

    const responseContent = completion.choices[0].message.content;
    const finalData = JSON.parse(responseContent);
    const pdfPath = await generatePdf(finalData);

    // Extract the file name from the full path
    const pdfFilename = path.basename(pdfPath);

    // Respond with the correct URL path
    reply.send({ pdfPath: `${pdfFilename}` });
  } catch (error) {
    reply.status(500).send({ error: error.message });
    console.error("Error generating PDF: 2", error);
  }
});

server.listen(
  {
    port: 3000,
    host: "0.0.0.0",
  },
  (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log("Server listening on http://localhost:3000");
  },
);
