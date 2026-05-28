'use client';

import { useState } from 'react';
import Link from 'next/link';

interface GenderPair {
  id: string;
  masculine: string;
  feminine: string;
}

export default function Exercise3Page() {
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const genderPairs: GenderPair[] = [
    { id: '1', masculine: 'bachelor', feminine: 'spinster' },
    { id: '2', masculine: 'husband', feminine: 'wife' },
    { id: '3', masculine: 'king', feminine: 'queen' },
    { id: '4', masculine: 'boy', feminine: 'girl' },
    { id: '5', masculine: 'lord', feminine: 'lady' },
    { id: '6', masculine: 'brother', feminine: 'sister' },
    { id: '7', masculine: 'man', feminine: 'woman' },
    { id: '8', masculine: 'bull', feminine: 'cow' },
    { id: '9', masculine: 'nephew', feminine: 'niece' },
    { id: '10', masculine: 'cock', feminine: 'hen' },
    { id: '11', masculine: 'papa', feminine: 'mamma' },
    { id: '12', masculine: 'earl', feminine: 'countess' },
    { id: '13', masculine: 'sir', feminine: 'madam' },
    { id: '14', masculine: 'father', feminine: 'mother' },
    { id: '15', masculine: 'son', feminine: 'daughter' },
    { id: '16', masculine: 'gentleman', feminine: 'lady' },
    { id: '17', masculine: 'uncle', feminine: 'aunt' },
    { id: '18', masculine: 'horse', feminine: 'mare' },
    { id: '19', masculine: 'dog', feminine: 'bitch' },
    { id: '20', masculine: 'hero', feminine: 'heroine' },
    { id: '21', masculine: 'sultan', feminine: 'sultana' },
    { id: '22', masculine: 'author', feminine: 'authoress' },
    { id: '23', masculine: 'administrator', feminine: 'administratrix' },
    { id: '24', masculine: 'actor', feminine: 'actress' },
    { id: '25', masculine: 'prince', feminine: 'princess' },
    { id: '26', masculine: 'enchanter', feminine: 'enchantress' },
    { id: '27', masculine: 'tiger', feminine: 'tigress' },
    { id: '28', masculine: 'instructor', feminine: 'instructress' },
    { id: '29', masculine: 'waiter', feminine: 'waitress' },
    { id: '30', masculine: 'negro', feminine: 'negress' },
    { id: '31', masculine: 'master', feminine: 'mistress' },
    { id: '32', masculine: 'duke', feminine: 'duchess' },
    { id: '33', masculine: 'emperor', feminine: 'empress' },
    { id: '34', masculine: 'heir', feminine: 'heiress' },
    { id: '35', masculine: 'host', feminine: 'hostess' },
  ];

  const handleAnswerChange = (id: string, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [id]: answer
    }));
  };

  const handleSubmit = () => {
    let correct = 0;
    genderPairs.forEach(pair => {
      if (userAnswers[pair.id]?.toLowerCase().trim() === pair.masculine.toLowerCase()) {
        correct++;
      }
    });
    setScore(correct);
    setSubmitted(true);
  };

  const handleReset = () => {
    setUserAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const isCorrect = (id: string) => {
    return userAnswers[id]?.toLowerCase().trim() === genderPairs.find(p => p.id === id)?.masculine.toLowerCase();
  };

  const isCurrentlyCorrect = (id: string) => {
    const answer = userAnswers[id]?.toLowerCase().trim();
    const correct = genderPairs.find(p => p.id === id)?.masculine.toLowerCase();
    return answer === correct && answer.length > 0;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 p-4 md:p-8 mt-40">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">Exercise 3: Feminine to Masculine Conversion</h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">Convert each feminine noun to its masculine form</p>
        </div>

        {/* Description Box */}
        <div className="bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-700 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="text-purple-600 dark:text-purple-400 mt-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-purple-800 dark:text-purple-400 mb-1">Exercise Description</h3>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                This exercise is the <strong>opposite</strong> of Exercise 2. Here you will convert <strong>feminine nouns to masculine nouns</strong>. It includes the same gender pairs as Exercise 2 but tests your knowledge in the reverse direction. For example, if you see "actress", you should type "actor".
              </p>
            </div>
          </div>
        </div>

        {/* Score Display */}
        {submitted && (
          <div className={`mb-6 p-6 rounded-xl text-center ${
            score === genderPairs.length
              ? 'bg-green-100 dark:bg-green-900 border-2 border-green-400 dark:border-green-600'
              : score >= genderPairs.length / 2
              ? 'bg-yellow-100 dark:bg-yellow-900 border-2 border-yellow-400 dark:border-yellow-600'
              : 'bg-red-100 dark:bg-red-900 border-2 border-red-400 dark:border-red-600'
          }`}>
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Your Score: {score} / {genderPairs.length}</h2>
            <p className="text-gray-700 dark:text-gray-300">
              {score === genderPairs.length
                ? 'Excellent! All answers correct!'
                : score >= genderPairs.length / 2
                ? 'Good job! Keep practicing!'
                : 'Keep trying! Review the lesson and try again.'}
            </p>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="text-gray-600 dark:text-gray-400">
            Completed: {Object.keys(userAnswers).length} / {genderPairs.length}
          </div>
          <div className="flex gap-2">
            <Link
              href="/education/unit/nouns-gender-number/nouns-gender"
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 md:px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Back to Lesson
            </Link>
            <button
              onClick={handleReset}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 md:px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Reset Exercise
            </button>
            {!submitted && Object.keys(userAnswers).length === genderPairs.length && (
              <button
                onClick={handleSubmit}
                className="bg-green-500 hover:bg-green-600 text-white px-4 md:px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Submit Answers
              </button>
            )}
          </div>
        </div>

        {/* Exercise Area */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
            Convert Feminine to Masculine
          </h3>
          <div className="space-y-3">
            {genderPairs.map(pair => {
              const userAnswer = userAnswers[pair.id];
              const correct = isCorrect(pair.id);
              const currentlyCorrect = isCurrentlyCorrect(pair.id);

              return (
                <div
                  key={pair.id}
                  className={`p-4 rounded-lg border-2 ${
                    submitted
                      ? correct
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-400 dark:border-green-600'
                        : 'bg-red-50 dark:bg-red-900/20 border-red-400 dark:border-red-600'
                      : currentlyCorrect
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-400 dark:border-green-600'
                      : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 dark:text-white mb-1">{pair.feminine}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">→ Masculine form</div>
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={userAnswer || ''}
                        onChange={(e) => !submitted && handleAnswerChange(pair.id, e.target.value)}
                        disabled={submitted}
                        placeholder="Type masculine form..."
                        className={`w-full p-2 border-2 rounded-lg ${
                          submitted
                            ? correct
                              ? 'bg-green-50 dark:bg-green-900/30 border-green-400 dark:border-green-600'
                              : 'bg-red-50 dark:bg-red-900/30 border-red-400 dark:border-red-600'
                            : currentlyCorrect
                            ? 'bg-green-50 dark:bg-green-900/30 border-green-400 dark:border-green-600'
                            : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800'
                        }`}
                      />
                      {currentlyCorrect && !submitted && (
                        <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                          ✓ Correct!
                        </div>
                      )}
                      {submitted && !correct && (
                        <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                          Correct: {pair.masculine}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Instructions */}
        {!submitted && (
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">Instructions:</h3>
            <ol className="list-decimal list-inside text-blue-700 dark:text-blue-300 space-y-1">
              <li>Type the masculine form of each feminine noun</li>
              <li>Press Enter or Tab to move to the next field</li>
              <li>Complete all fields before submitting</li>
              <li>Check your answers after submission</li>
            </ol>
          </div>
        )}

        {submitted && (
          <div className="mt-6 text-center space-x-4">
            <button
              onClick={handleReset}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
            <Link
              href="/education/unit/nouns-gender-number/nouns-gender"
              className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Back to Lesson
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}