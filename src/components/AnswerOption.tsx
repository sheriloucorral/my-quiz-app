interface AnswerOptionProps {
  text: string;
  isSelected: boolean;
  isCorrect: boolean;
  showResult: boolean;
  onSelect: (answer: string) => void;
  disabled: boolean;
}

function AnswerOption({ 
  text, 
  isSelected, 
  isCorrect, 
  showResult, 
  onSelect, 
  disabled 
}: AnswerOptionProps) {
  let btnClass = "option-btn";
  if (showResult || isSelected) {
    if (isCorrect) btnClass += " correct";
    else if (isSelected) btnClass += " wrong";
  }

  return (
    <button
      className={btnClass}
      onClick={() => onSelect(text)}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default AnswerOption;