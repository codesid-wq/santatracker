import { useState } from 'react';
import { RotateCcw, CheckCircle, XCircle } from 'lucide-react';

interface NaughtyOrNiceProps {
  onClose: () => void;
}

interface Question {
  id: number;
  text: string;
  answer: 'naughty' | 'nice';
  emoji: string;
}

const questions: Question[] = [
  { id: 1, text: 'Sharing toys with a friend', answer: 'nice', emoji: '🎮' },
  { id: 2, text: 'Pulling someone\'s hair', answer: 'naughty', emoji: '😠' },
  { id: 3, text: 'Helping clean the house', answer: 'nice', emoji: '🧹' },
  { id: 4, text: 'Telling a lie', answer: 'naughty', emoji: '🤥' },
  { id: 5, text: 'Saying thank you', answer: 'nice', emoji: '🙏' },
  { id: 6, text: 'Taking someone\'s snack without asking', answer: 'naughty', emoji: '🍪' },
  { id: 7, text: 'Complimenting someone', answer: 'nice', emoji: '😊' },
  { id: 8, text: 'Calling someone names', answer: 'naughty', emoji: '😡' },
  { id: 9, text: 'Helping elderly people cross the street', answer: 'nice', emoji: '🚶' },
  { id: 10, text: 'Cheating on a test', answer: 'naughty', emoji: '✏️' }
];

export default function NaughtyOrNice({ onClose }: NaughtyOrNiceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const currentQuestion = questions[currentIndex];
  const isComplete = currentIndex >= questions.length;

  const handleAnswer = (answer: 'naughty' | 'nice') => {
    if (answer === currentQuestion.answer) {
      setScore((s) => s + 10);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      setCurrentIndex((i) => i + 1);
    }, 1000);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl overflow-hidden max-w-2xl w-full border-2 border-white/20 shadow-2xl">
        <div className="bg-white/10 backdrop-blur-lg p-6 border-b border-white/20 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">Naughty or Nice?</h2>
            <p className="text-gray-300">Decide if each action is naughty or nice</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm">Score</p>
            <p className="text-4xl font-bold text-yellow-400">{score}</p>
          </div>
        </div>

        <div className="p-8">
          {!isComplete ? (
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
                <p className="text-6xl mb-4">{currentQuestion.emoji}</p>
                <p className="text-2xl text-white font-semibold mb-2">{currentQuestion.text}</p>
                <p className="text-gray-400">Question {currentIndex + 1} of {questions.length}</p>
              </div>

              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="h-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>

              {feedback && (
                <div className={`flex items-center gap-3 p-4 rounded-xl ${feedback === 'correct' ? 'bg-green-500/20 border border-green-500/50' : 'bg-red-500/20 border border-red-500/50'}`}>
                  {feedback === 'correct' ? (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-400" />
                  )}
                  <span className={feedback === 'correct' ? 'text-green-300' : 'text-red-300'}>
                    {feedback === 'correct' ? 'Correct!' : `Wrong! It's ${currentQuestion.answer}`}
                  </span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleAnswer('nice')}
                  disabled={feedback !== null}
                  className="px-6 py-4 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50 text-white font-bold rounded-xl transition-all text-lg"
                >
                  Nice 😇
                </button>
                <button
                  onClick={() => handleAnswer('naughty')}
                  disabled={feedback !== null}
                  className="px-6 py-4 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:opacity-50 text-white font-bold rounded-xl transition-all text-lg"
                >
                  Naughty 😈
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className="text-8xl mb-4">🎉</div>
              <h3 className="text-3xl font-bold text-white">Quiz Complete!</h3>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <p className="text-gray-400 mb-2">Final Score</p>
                <p className="text-6xl font-bold text-yellow-400">{score}</p>
                <p className="text-gray-300 mt-2">out of {questions.length * 10}</p>
              </div>
              <p className="text-xl text-gray-300">
                {score === questions.length * 10 ? '🌟 Perfect score! You\'re on the nice list!' : '✨ Great job! Keep being nice!'}
              </p>
            </div>
          )}
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-6 border-t border-white/20 flex gap-4">
          {isComplete && (
            <button
              onClick={handleReset}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              Play Again
            </button>
          )}
          <button
            onClick={onClose}
            className={`${isComplete ? 'flex-1' : 'w-full'} px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-colors`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
