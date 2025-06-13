// utils/pdf-parser.js
import pdf from 'pdf-parse';
import fs from 'fs/promises'; // Modern, promise-based fs

export async function extractTextFromPdf(filePath) {
  try {
    if (!filePath) {
      throw new Error('No file path provided.');
    }

    const dataBuffer = await fs.readFile(filePath); // Async read
    const data = await pdf(dataBuffer);

    if (!data.text || data.text.trim() === '') {
      throw new Error('PDF content is empty.');
    }

    return data.text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error.message);
    throw new Error('Failed to extract text from PDF file.');
  }
}
