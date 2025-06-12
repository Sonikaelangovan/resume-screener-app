// pages/api/parse-resume.js (NEW FILE)
import formidable from 'formidable'; // To parse form-data (file uploads)
import fs from 'fs';
import util from 'util';
import { extractTextFromPdf } from '../../utils/pdf-parser'; // You'll create this utility
import { extractTextFromDocx } from '../../utils/docx-parser'; // You'll create this utility

// Disable Next.js body parser to use formidable
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed', message: 'Only POST requests are allowed.' });
  }

  const form = formidable({ multiples: false }); // Only expect one file for now

  try {
    const [fields, files] = await form.parse(req); // Parse the incoming form data

    const resumeFile = files.resumeFile?.[0]; // Access the first file from the 'resumeFile' field

    if (!resumeFile) {
      return res.status(400).json({ error: 'Bad Request', message: 'No resume file uploaded.' });
    }

    const filePath = resumeFile.filepath;
    const fileExtension = resumeFile.originalFilename.split('.').pop().toLowerCase();
    let resumeText = '';

    // Choose parser based on file extension
    if (fileExtension === 'pdf') {
      resumeText = await extractTextFromPdf(filePath);
    } else if (fileExtension === 'docx') {
      resumeText = await extractTextFromDocx(filePath);
    } else if (fileExtension === 'doc') {
      // .doc files are harder to parse directly without native libraries.
      // You might need a service or a more complex setup.
      // For simplicity, you might want to disallow .doc for now or suggest conversion.
      return res.status(400).json({ error: 'Unsupported File Type', message: '(.doc) files are not currently supported. Please upload PDF or DOCX.' });
    } else {
      return res.status(400).json({ error: 'Unsupported File Type', message: 'Only PDF and DOCX files are supported.' });
    }

    // Clean up the temporary file created by formidable
    await util.promisify(fs.unlink)(filePath);

    if (!resumeText) {
      return res.status(500).json({ error: 'Parsing Error', message: 'Could not extract text from the resume file.' });
    }

    return res.status(200).json({ resumeText });

  } catch (error) {
    console.error('Resume parsing API error:', error);
    return res.status(500).json({ error: 'Server Error', message: 'Failed to process resume file.' });
  }
}
