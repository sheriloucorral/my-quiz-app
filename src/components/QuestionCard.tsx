import AnswerOption from './AnswerOption';

interface Question {
  idnum: number;
  qtext: string;
  option: string[];
  answer: string;
}

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string | null;
  showResult: boolean;
  onSelect: (answer: string) => void;
}

function QuestionCard({ 
  question, 
  selectedAnswer, 
  showResult, 
  onSelect 
}: QuestionCardProps) {
  return (
    <div className="question-box">
      <h3>Question {question.idnum}</h3>
      <p className="q-text">{question.qtext}</p>
      <div className="options">
        {question.option.map((opt, index) => (
          <AnswerOption
            key={index}
            text={opt}
            isSelected={selectedAnswer === opt}
            isCorrect={opt === question.answer}
            showResult={showResult}
            onSelect={onSelect}
            disabled={selectedAnswer !== null}
          />
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;