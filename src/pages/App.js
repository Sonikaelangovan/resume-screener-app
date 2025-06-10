import ResumeUpload from './components/ResumeUpload';
import ResumeStats from './components/ResumeStats';

export default function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>AI Resume Screener</h1>
      <ResumeUpload />
      <hr />
      <ResumeStats />
    </div>
  );
}
