const ejs = require("ejs");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const execAsync = promisify(exec);

async function generatePdf(data) {
  const templatePath = path.join(__dirname, "../templates/temp1.ejs");
  const templateSource = fs.readFileSync(templatePath, "utf8");

  try {
    // Render the template with the provided data
    const output = ejs.render(templateSource, data);
    const outputTexPath = path.join(
      __dirname,
      "../templates/generated_resume.tex",
    );
    fs.writeFileSync(outputTexPath, output);

    const pdfDir = path.join(__dirname, "../pdfs");
    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir);
    }

    // Generate a timestamp for the PDF filename
    const now = new Date();
    const timestamp =
      now.toISOString().split("T")[0] + // Get the date part (YYYY-MM-DD)
      "-" +
      now.getHours().toString().padStart(2, "0") +
      "h" + // Get the hour (HH) and add 'h'
      now.getMinutes().toString().padStart(2, "0") +
      "m"; // Get the minute (MM) and add 'm'
    const pdfName = `ahmed-barhoumi-resume-${timestamp}.pdf`;
    const pdfPath = path.join(pdfDir, pdfName);
    // Run pdflatex to generate the PDF
    await execAsync(`pdflatex -output-directory=${pdfDir} ${outputTexPath}`);

    // Rename the generated PDF to the desired name
    fs.renameSync(path.join(pdfDir, "generated_resume.pdf"), pdfPath);

    // Clean up auxiliary files in the pdfs directory
    ["aux", "log", "out"].forEach((ext) => {
      const auxPath = path.join(pdfDir, `generated_resume.${ext}`);
      if (fs.existsSync(auxPath)) {
        fs.unlinkSync(auxPath);
      }
    });

    // Clean up the .tex file
    fs.unlinkSync(outputTexPath);

    return pdfPath;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
}

module.exports = { generatePdf };
