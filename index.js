const Fastify = require("fastify");
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

const fastify = Fastify();
const file_name = "ahmed-barhoumi-cv";
const TEX_FILE_PATH = path.join(__dirname, "templates/sample.tex");
const PDF_FILE_PATH = path.join(__dirname, `${file_name}.pdf`);

// Endpoint to generate the PDF
fastify.post("/generate-pdf", async (request, reply) => {
  const { values } = request.body;

  if (!values || typeof values !== "object") {
    return reply.status(400).send({ error: "Invalid input" });
  }

  try {
    // Read the sample.tex file
    let texContent = fs.readFileSync(TEX_FILE_PATH, "utf8");

    // Replace placeholders with values from JSON
    Object.keys(values).forEach((key) => {
      const placeholder = `{{${key}}}`;
      texContent = texContent.replace(
        new RegExp(placeholder, "g"),
        values[key],
      );
    });

    // Write the modified content to a temporary .tex file
    const tempTexFilePath = path.join(__dirname, `${file_name}.tex`);
    fs.writeFileSync(tempTexFilePath, texContent);
    // Run pdflatex to generate the PDF
    exec(`pdflatex ${file_name}.tex`, (error, stdout, stderr) => {
      if (error) {
        console.log(`Error generating PDF: ${error}`);
        console.error(`Error generating PDF: ${error}`);
        return reply.status(500).send({ error: "Error generating PDF" });
      }

      // Remove temporary .tex file
      fs.unlinkSync(tempTexFilePath);

      reply.send({ message: "PDF generated successfully" });
    });
  } catch (error) {
    reply.status(500).send({ error: "Internal server error" });
  }
});

// Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  // Server is now listening on ${address}
  console.log(`Server is now listening on ${address}`);
});
