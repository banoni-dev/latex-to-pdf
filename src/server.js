const Fastify = require("fastify");
const { generatePdf } = require("./generate"); // Adjust the path as needed

const server = Fastify();

server.post("/generate", async (request, reply) => {
  try {
    const pdfPath = await generatePdf(request.body);
    reply.send({ pdfPath });
  } catch (error) {
    reply.status(500).send({ error: error.message });
  }
});

// Updated listen method with options object
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
