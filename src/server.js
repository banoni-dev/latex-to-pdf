const Fastify = require("fastify");
const { generatePdf } = require("./generate"); // Adjust the path as needed

const { userPrompt, systemPrompt } = require("./data");
const OpenAI = require("openai");
const openai = new OpenAI();
const apiKey = process.env.OPENAI_API_KEY;

const server = Fastify();
function correctObjectSyntax(inputObject) {
  // Convert the input object to a JSON string with proper formatting
  try {
    // Attempt to stringify the object using JSON.stringify
    const jsonString = JSON.stringify(inputObject, null, 2);
    // Parse the stringified JSON to ensure it's valid and well-formed
    const parsedObject = JSON.parse(jsonString);
    // Return the parsed object to maintain proper JSON structure
    return parsedObject;
  } catch (error) {
    // If there's an error in stringifying or parsing, log the error and return null
    console.error("Error in correcting object syntax:", error);
    return null;
  }
}
server.post("/generate", async (request, reply) => {
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

    const responseContent = correctObjectSyntax(
      completion.choices[0].message.content,
    );
    const finalData = JSON.parse(responseContent);
    const pdfPath = await generatePdf(finalData);
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
