import { db } from '@/firebase/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Only POST requests allowed' });

  const { fileName, extractedText } = req.body;
  if (!fileName || !extractedText) return res.status(400).json({ message: 'Missing data' });

  try {
    const docRef = await addDoc(collection(db, 'resumes'), {
      fileName,
      extractedText,
      uploadedAt: Timestamp.now()
    });
    res.status(200).json({ message: 'Saved', id: docRef.id });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save resume', error: err.message });
  }
}
