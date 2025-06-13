// utils/docx-parser.js
import mammoth from 'mammoth';

export async function extractTextFromDocx(filePath) {
  try {
    if (!filePath) {
      throw new Error('No file path provided for DOCX file.');
    }

    const result = await mammoth.extractRawText({ path: filePath });

    if (!result.value || result.value.trim() === '') {
      throw new Error('Extracted DOCX content is empty.');
    }

    return result.value; // Clean raw text
  } catch (error) {
    console.error('Error extracting text from DOCX:', error.message);
    throw new Error('Failed to extract text from DOCX file.');
  }
}
