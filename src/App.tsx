import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import QuizHeader from './components/QuizHeader';
import QuestionCard from './components/QuestionCard';
import ProgressBar from './components/ProgressBar';
import ResultCard from './components/ResultCard';
import QuestionProgress from './components/QuestionProgress';

interface Question {
  idnum: number;
  qtext: string;
  option: string[];
  answer: string;
}
const Questions: Question[] = [
  { idnum: 1, qtext: "1.What does CPU stand for?", option: ["Central Processing Unit", "Computer Personal Unit", "Central Process Utility", "Computer Processing Unit"], answer: "Central Processing Unit" },
  { idnum: 2, qtext: "2.Which device is used to type letters and numbers?", option: ["Monitor", "Keyboard", "Mouse", "Printer"], answer: "Keyboard" },
  { idnum: 3, qtext: "3.What does HTML stand for?", option: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks Text Mark Language"], answer: "Hyper Text Markup Language" },
  { idnum: 4, qtext: "4.Where do you save your files permanently?", option: ["RAM", "Hard Drive / Storage", "Monitor", "Keyboard"], answer: "Hard Drive / Storage" },
  { idnum: 5, qtext: "5.Which part shows you what you are doing on the computer?", option: ["Keyboard", "Mouse", "Monitor", "System Unit"], answer: "Monitor" },
  { idnum: 6, qtext: "6.What is the shortcut for 'Copy'?", option: ["Ctrl + X", "Ctrl + C", "Ctrl + V", "Ctrl + Z"], answer: "Ctrl + C" },
  { idnum: 7, qtext: "7.Which one is an example of a web browser?", option: ["Microsoft Word", "Google Chrome", "Excel", "Photoshop"], answer: "Google Chrome" },
  { idnum: 8, qtext: "8.What does USB stand for?", option: ["Universal Serial Bus", "Ultra Speed Box", "Unique Storage Block", "Universal System Box"], answer: "Universal Serial Bus" },
  { idnum: 9, qtext: "9.Which key do you press to delete text?", option: ["Shift", "Enter", "Backspace", "Ctrl"], answer: "Backspace" },
  { idnum: 10, qtext: "10.What does WWW stand for?", option: ["World Wide Web", "Wide World Web", "Web World Wide", "Wireless Web World"], answer: "World Wide Web" }
];

function HomePage() {
  const navigate = useNavigate();
  return (
        <div className="app">
        <div className="welcome-card">
        <QuizHeader />
        <button className="start-btn" onClick={() => navigate('/quiz')}>
          Start Quiz
        </button>
        </div>
        </div>
  );
}

function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [answers, setAnswers] = useState<(boolean | null)[]>(Array(Questions.length).fill(null));
  const navigate = useNavigate();
  const currentQuestion = Questions[currentIndex];

  const handleSelect = (answer: string): void => {
    const isCorrect = answer === currentQuestion.answer;
    setSelectedAnswer(answer);
    if (isCorrect) setScore(prev => prev + 1);
    
    const newAnswers = [...answers];
    newAnswers[currentIndex] = isCorrect;
    setAnswers(newAnswers);
  };

  const handleNext = (): void => {
    setSelectedAnswer(null);
    if (currentIndex < Questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      localStorage.setItem('quizScore', score.toString());
      navigate('/result');
    }
  };

  return (
        <div className="app">
        <div className="quiz-box">
        <QuestionProgress total={Questions.length} answers={answers} />
        <ProgressBar current={currentIndex + 1} total={Questions.length} />
        
        {selectedAnswer === null && (
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            showResult={false}
            onSelect={handleSelect}
          />
        )}

        {selectedAnswer !== null && (
          <div className="feedback-section">
            <QuestionCard
              question={currentQuestion}
              selectedAnswer={selectedAnswer}
              showResult={true}
              onSelect={handleSelect}
            />
            <div className="feedback">
              <p>{selectedAnswer === currentQuestion.answer ? "✅ Correct!" : `❌ Wrong! Answer: ${currentQuestion.answer}`}</p>
              <button className="next-btn" onClick={handleNext}>
                {currentIndex < Questions.length - 1 ? "Next Question →" : "Finish Attempt "}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ResultPage() {
  const score = parseInt(localStorage.getItem('quizScore') || '0');
  const navigate = useNavigate();


  const handleRetake = () => {
    localStorage.removeItem('quizScore');
    navigate('/quiz');
  };

  return (
    <div className="app">
      <ResultCard 
        score={score} 
        total={Questions.length} 
        onRetake={ handleRetake}
      />
    </div>
  );
  }

function App() {
  return (
        <Router>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
        </Routes>
        </Router>
  );
}

export default App;
