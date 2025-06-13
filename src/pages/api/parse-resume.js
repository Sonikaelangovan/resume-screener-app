// /pages/api/parse-resume.js
import formidable from 'formidable';
import fs from 'fs/promises'; // Promisified fs
import path from 'path';
import { extractTextFromPdf } from '../../utils/pdf-parser';
import { extractTextFromDocx } from '../../utils/docx-parser';

export const config = {
  api: {
    bodyParser: false,
  },
};

function parseForm(req) {
  const form = formidable({ multiples: false, keepExtensions: true });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed', message: 'Only POST requests allowed.' });
  }

  try {
    const { files } = await parseForm(req);
    const resumeFile = files.resumeFile;

    if (!resumeFile) {
      return res.status(400).json({ error: 'No File', message: 'No resume file uploaded.' });
    }

    const filePath = resumeFile.filepath || resumeFile.path;
    const ext = path.extname(resumeFile.originalFilename || '').toLowerCase();

    let resumeText = '';

    if (ext === '.pdf') {
      resumeText = await extractTextFromPdf(filePath);
    } else if (ext === '.docx') {
      resumeText = await extractTextFromDocx(filePath);
    } else if (ext === '.doc') {
      return res.status(400).json({ error: 'Unsupported File Type', message: 'DOC files are not supported. Please upload PDF or DOCX.' });
    } else {
      return res.status(400).json({ error: 'Unsupported File Type', message: 'Only PDF and DOCX files are supported.' });
    }

    // Clean up uploaded file
    await fs.unlink(filePath);

    if (!resumeText || resumeText.trim() === '') {
      return res.status(500).json({ error: 'Parsing Error', message: 'Could not extract text from resume file.' });
    }

    return res.status(200).json({ resumeText });

  } catch (error) {
    console.error('Resume parsing failed:', error);
    return res.status(500).json({ error: 'Server Error', message: 'Failed to parse resume file.' });
  }
}
