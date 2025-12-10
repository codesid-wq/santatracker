import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  answer: boolean;
  category: string;
}

interface NaughtyListQuizProps {
  onClose: () => void;
}

export default function NaughtyListQuiz({ onClose }: NaughtyListQuizProps) {
  const questions: Question[] = [
    { id: 1, text: 'Sharing your toys', answer: true, category: 'nice' },
    { id: 2, text: 'Pulling a prank on your friend', answer: false, category: 'naughty' },
    { id: 3, text: 'Helping with homework', answer: true, category: 'nice' },
    { id: 4, text: 'Stealing cookies', answer: false, category: 'naughty' },
    { id: 5, text: 'Being kind to animals', answer: true, category: 'nice' },
    { id: 6, text: 'Talking back to parents', answer: false, category: 'naughty' },
    { id: 7, text: 'Cleaning your room', answer: true, category: 'nice' },
    { id: 8, text: 'Breaking something on purpose', answer: false, category: 'naughty' },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);

  const handleAnswer = (answer: boolean) => {
    if (answered) return;

    const isCorrect = answer === questions[currentQuestion].answer;
    setCorrect(isCorrect);
    setAnswered(true);

    if (isCorrect) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((c) => c + 1);
      setAnswered(false);
    }
  };

  const isComplete = currentQuestion === questions.length - 1 && answered;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 max-w-2xl w-full border-2 border-white/20 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">Naughty List Quiz</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-black/40 rounded-2xl p-6 mb-6">
          <div className="mb-4">
            <p className="text-gray-300 text-sm">
              Question {currentQuestion + 1} of {questions.length}
            </p>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            {questions[currentQuestion].text}
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleAnswer(true)}
              disabled={answered}
              className={`py-4 px-6 rounded-xl font-bold text-white transition-all ${
                answered && correct && questions[currentQuestion].answer
                  ? 'bg-green-600'
                  : answered &&
                    !correct &&
                    questions[currentQuestion].answer
                  ? 'bg-green-600 opacity-50'
                  : answered && questions[currentQuestion].answer === false
                  ? 'bg-red-600 opacity-50'
                  : 'bg-green-500 hover:bg-green-400'
              }`}
            >
              ✓ Nice
            </button>
            <button
              onClick={() => handleAnswer(false)}
              disabled={answered}
              className={`py-4 px-6 rounded-xl font-bold text-white transition-all ${
                answered && correct && !questions[currentQuestion].answer
                  ? 'bg-red-600'
                  : answered &&
                    !correct &&
                    !questions[currentQuestion].answer
                  ? 'bg-red-600 opacity-50'
                  : answered && questions[currentQuestion].answer === true
                  ? 'bg-green-600 opacity-50'
                  : 'bg-red-500 hover:bg-red-400'
              }`}
            >
              ✗ Naughty
            </button>
          </div>

          {answered && (
            <p
              className={`text-center mt-4 font-bold ${
                correct ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {correct ? 'Correct!' : 'Incorrect!'}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <p className="text-gray-300 text-sm">Score</p>
            <p className="text-3xl font-bold text-green-400">{score}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <p className="text-gray-300 text-sm">Progress</p>
            <p className="text-3xl font-bold text-blue-400">
              {currentQuestion + 1}/{questions.length}
            </p>
          </div>
        </div>

        {!isComplete && answered && (
          <button
            onClick={handleNext}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors"
          >
            Next Question
          </button>
        )}

        {isComplete && (
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors"
          >
            Back to Games (Final Score: {score}/{questions.length})
          </button>
        )}
      </div>
    </div>
  );
}
