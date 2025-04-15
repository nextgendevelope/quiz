import { useState, useEffect } from 'react';
import { Clock, Trophy, User, Award, Check, X } from 'lucide-react';

export default function QuizApp() {
  // App States
  const [screen, setScreen] = useState('start'); // start, quiz, result, leaderboard
  const [username, setUsername] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizFinished, setQuizFinished] = useState(false);
  const [leaderboard, setLeaderboard] = useState([
    { username: 'Alex', score: 580 },
    { username: 'Taylor', score: 520 },
    { username: 'Jordan', score: 490 },
    { username: 'Casey', score: 470 },
    { username: 'Morgan', score: 430 }
  ]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Quiz questions
  const questions = [
    {
      question: "Which programming language is primarily used for styling web pages?",
      options: ["JavaScript", "HTML", "CSS", "Python"],
      correctAnswer: "CSS",
    },
    {
      question: "What does API stand for?",
      options: ["Application Programming Interface", "Automated Program Integration", "Application Process Interaction", "Advanced Programming Interface"],
      correctAnswer: "Application Programming Interface",
    },
    {
      question: "Which of these is NOT a JavaScript framework?",
      options: ["React", "Angular", "Vue", "Django"],
      correctAnswer: "Django",
    },
    {
      question: "What does DOM stand for in web development?",
      options: ["Document Object Model", "Data Object Model", "Digital Ordinance Management", "Document Orientation Module"],
      correctAnswer: "Document Object Model",
    },
    {
      question: "Which CSS property is used to control the space between elements?",
      options: ["spacing", "margin", "padding", "gap"],
      correctAnswer: "margin",
    }
  ];

  // Timer effect
  useEffect(() => {
    let timer;
    if (screen === 'quiz' && timeLeft > 0 && !quizFinished) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && !quizFinished) {
      handleAnswer(null); // Time's up, move to next question
    }
    
    return () => clearTimeout(timer);
  }, [timeLeft, screen, quizFinished]);

  // Start the quiz
  const startQuiz = () => {
    if (username.trim() === '') {
      alert('Please enter a username!');
      return;
    }
    setScreen('quiz');
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(30);
    setQuizFinished(false);
  };

  // Handle answer selection
  const handleOptionSelect = (option) => {
    if (showFeedback) return;
    setSelectedOption(option);
    setIsCorrect(option === questions[currentQuestionIndex].correctAnswer);
    setShowFeedback(true);
    
    setTimeout(() => {
      if (option === questions[currentQuestionIndex].correctAnswer) {
        // Score calculation: max 100 points, reduced by time spent (incentivizes speed)
        const pointsEarned = Math.max(20, 100 - (30 - timeLeft) * 3);
        setScore(score + pointsEarned);
      }
      
      setShowFeedback(false);
      setSelectedOption(null);
      
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimeLeft(30);
      } else {
        finishQuiz();
      }
    }, 1500);
  };

  // Handle timeouts or skips
  const handleAnswer = (option) => {
    if (option !== null) {
      handleOptionSelect(option);
    } else {
      // If time ran out
      setShowFeedback(true);
      setIsCorrect(false);
      
      setTimeout(() => {
        setShowFeedback(false);
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setTimeLeft(30);
        } else {
          finishQuiz();
        }
      }, 1500);
    }
  };

  // Finish quiz and update leaderboard
  const finishQuiz = () => {
    setQuizFinished(true);
    setScreen('result');
    
    // Update leaderboard
    const newLeaderboard = [...leaderboard, { username, score }]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
      
    setLeaderboard(newLeaderboard);
  };

  // Restart quiz
  const restartQuiz = () => {
    setScreen('start');
    setUsername('');
  };

  // View Leaderboard
  const viewLeaderboard = () => {
    setScreen('leaderboard');
  };

  // Progress bar
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Quiz Master</h1>
          {screen === 'quiz' && (
            <div className="flex items-center space-x-2">
              <Clock size={20} />
              <span className={`font-mono ${timeLeft < 10 ? 'text-red-300' : ''}`}>{timeLeft}s</span>
            </div>
          )}
        </div>

        {/* Start Screen */}
        {screen === 'start' && (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">Welcome to Quiz Master!</h2>
            <p className="text-center text-gray-600">Test your knowledge with our timed quiz challenge!</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Enter Your Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Username"
                />
              </div>
              
              <button
                onClick={startQuiz}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-200"
              >
                Start Quiz
              </button>
              
              <button
                onClick={viewLeaderboard}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md flex items-center justify-center space-x-2 transition duration-200"
              >
                <Trophy size={18} />
                <span>View Leaderboard</span>
              </button>
            </div>
          </div>
        )}

        {/* Quiz Screen */}
        {screen === 'quiz' && (
          <div className="p-6 space-y-6">
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Question {currentQuestionIndex + 1}/{questions.length}</span>
              <span>Score: {score}</span>
            </div>
            
            {/* Question */}
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-800">{questions[currentQuestionIndex].question}</h3>
              
              {/* Options */}
              <div className="space-y-3">
                {questions[currentQuestionIndex].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    disabled={showFeedback}
                    className={`w-full p-3 text-left rounded-md border transition-all ${
                      showFeedback && selectedOption === option
                        ? isCorrect
                          ? 'bg-green-100 border-green-500'
                          : 'bg-red-100 border-red-500'
                        : showFeedback && option === questions[currentQuestionIndex].correctAnswer
                        ? 'bg-green-100 border-green-500'
                        : 'border-gray-300 hover:border-blue-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showFeedback && option === selectedOption && (
                        isCorrect ? <Check className="text-green-500" /> : <X className="text-red-500" />
                      )}
                      {showFeedback && option === questions[currentQuestionIndex].correctAnswer && option !== selectedOption && (
                        <Check className="text-green-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Result Screen */}
        {screen === 'result' && (
          <div className="p-6 space-y-6 text-center">
            <div className="flex justify-center">
              <div className="bg-blue-100 rounded-full p-4">
                <Award size={64} className="text-blue-600" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800">Quiz Completed!</h2>
            <p className="text-lg text-gray-600">Your score: <span className="font-bold text-blue-600">{score}</span></p>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <button
                onClick={restartQuiz}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-200"
              >
                Play Again
              </button>
              <button
                onClick={viewLeaderboard}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-md transition duration-200"
              >
                Leaderboard
              </button>
            </div>
          </div>
        )}

        {/* Leaderboard Screen */}
        {screen === 'leaderboard' && (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">Leaderboard</h2>
            
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Username
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leaderboard.map((entry, index) => (
                    <tr key={index} className={username === entry.username ? 'bg-blue-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                        {index < 3 && (
                          <Trophy size={16} className={
                            index === 0 ? 'text-yellow-400' : 
                            index === 1 ? 'text-gray-400' : 'text-amber-600'
                          } />
                        )}
                        <span className="ml-1">{entry.username}</span>
                        {username === entry.username && <span className="ml-2 text-xs text-blue-600">(You)</span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {entry.score}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <button
              onClick={() => setScreen('start')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-200"
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
