import { useNavigate } from 'react-router-dom';

interface ResultCardProps {
  score: number;
  total: number;
  onRetake: () => void;
}

function ResultCard({ score, total, onRetake }: ResultCardProps) {
  const navigate = useNavigate();
  const message = score >= 8 ? "Excellent! 🎊" : score >= 6 ? "Good job! 💪" : "Keep practicing! You can do it! 🤍";

  return (
    <div className="result-card">
      <h1>🎉 Quiz Complete!</h1>
      <p className="score-text">Your Score: {score} / {total}</p>
      <p>{message}</p>
      <div className="rsult-buttons"> 
      {score <7 && ( 
        <button className="restart-btn" onClick={onRetake}>
          🔄 Retake Quiz
        </button>
      )}
        <button className="home-btn" onClick={() => navigate('/')}>
          🏠 Return Home
        </button>
      </div>
      </div>
  );
}

export default ResultCard;