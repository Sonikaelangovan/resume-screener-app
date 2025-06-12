// utils/docx-parser.js
import mammoth from 'mammoth';
import fs from 'fs';

export async function extractTextFromDocx(filePath) {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value; // The raw text
  } catch (error) {
    console.error('Error extracting text from DOCX:', error);
    throw new Error('Failed to extract text from DOCX.');
  }
}