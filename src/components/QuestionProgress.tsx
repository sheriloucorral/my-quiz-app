interface QuestionProgressProps {
  total: number;
  answers: (boolean | null)[];
}

function QuestionProgress({ total, answers }: QuestionProgressProps) {
  return (
    <div className="progress-dots">
      {Array.from({ length: total }).map((_, index) => {
        const isAnswered = answers[index] !== null;
        const isCorrect = answers[index] === true;
        
        return (
          <span 
            key={index}
            className={`dot ${isAnswered ? 'answered' : ''} ${isCorrect ? 'correct' : isAnswered ? 'wrong' : ''}`}
          >
            {isAnswered ? (isCorrect ? '✓' : '✗') : (index + 1)}
          </span>
        );
      })}
    </div>
  );
}

export default QuestionProgress;