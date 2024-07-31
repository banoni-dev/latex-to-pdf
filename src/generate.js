const ejs = require("ejs");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const execAsync = promisify(exec);

async function generatePdf(data) {
  const templatePath = path.join(__dirname, "../templates/temp1.ejs");
  const templateSource = fs.readFileSync(templatePath, "utf8");

  // Log the data and template for debugging
  console.log("Template Source:", templateSource);
  console.log("Data:", data);

  try {
    // Ensure data is defined and has the expected fields
    if (!data || typeof data !== "object") {
      throw new Error("Invalid data format");
    }

    const output = ejs.render(templateSource, data);
    const outputTexPath = path.join(__dirname, "../generated_resume.tex");
    fs.writeFileSync(outputTexPath, output);

    const pdfDir = path.join(__dirname, "../pdfs");
    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir);
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const pdfName = `ahmed-barhoumi-resume-${timestamp}.pdf`;
    const pdfPath = path.join(pdfDir, pdfName);

    await execAsync(`pdflatex -output-directory=${pdfDir} ${outputTexPath}`);

    fs.renameSync(path.join(pdfDir, "generated_resume.pdf"), pdfPath);

    // Clean up auxiliary files
    ["aux", "log", "out"].forEach((ext) => {
      const auxPath = outputTexPath.replace(".tex", `.${ext}`);
      if (fs.existsSync(auxPath)) {
        fs.unlinkSync(auxPath);
      }
    });

    return pdfPath;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
}

module.exports = { generatePdf };
