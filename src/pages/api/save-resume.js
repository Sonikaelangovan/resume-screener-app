import { db } from '@/firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { fileName, extractedText } = req.body;
  try {
    const docRef = await addDoc(collection(db, 'resumes'), { fileName, extractedText, createdAt: new Date() });
    res.status(200).json({ id: docRef.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save to Firestore' });
  }
}
