'use client';

import Link from 'next/link';
import { useState } from 'react';

const questions = [
  {
    id: 1,
    type: 'fill-blank',
    question: 'Plural of "cat" is _______',
    answer: 'cats',
  },
  {
    id: 2,
    type: 'fill-blank',
    question: 'Plural of "box" is _______',
    answer: 'boxes',
  },
  {
    id: 3,
    type: 'fill-blank',
    question: 'Plural of "baby" is _______',
    answer: 'babies',
  },
  {
    id: 4,
    type: 'fill-blank',
    question: 'Plural of "leaf" is _______',
    answer: 'leaves',
  },
  {
    id: 5,
    type: 'fill-blank',
    question: 'Plural of "child" is _______',
    answer: 'children',
  },
  {
    id: 6,
    type: 'fill-blank',
    question: 'Plural of "man" is _______',
    answer: 'men',
  },
  {
    id: 7,
    type: 'fill-blank',
    question: 'Plural of "tooth" is _______',
    answer: 'teeth',
  },
  {
    id: 8,
    type: 'fill-blank',
    question: 'Plural of "person" is _______',
    answer: 'people',
  },
];

export default function NounsNumbersExercise1Page() {
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (questionId: number, answer: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const getScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id]?.toLowerCase().trim() === q.answer.toLowerCase().trim()) {
        correct++;
      }
    });
    return { correct, total: questions.length };
  };

  const score = submitted ? getScore() : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 mt-30 pb-40">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/education/unit/nouns-gender-number/nouns-numbers"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to lesson
        </Link>

        {/* Exercise Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Exercise 1: Forming Plurals</h1>
          <p className="text-gray-600">Fill in the blanks with the correct plural form</p>
        </div>

        {/* Score Display */}
        {submitted && score && (
          <div
            className={`mb-8 p-6 rounded-xl ${
              score.correct === score.total
                ? 'bg-green-100 border-2 border-green-400'
                : score.correct >= score.total / 2
                ? 'bg-yellow-100 border-2 border-yellow-400'
                : 'bg-red-100 border-2 border-red-400'
            }`}
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">
                Your Score: {score.correct} / {score.total}
              </h2>
              <p className="text-gray-700">
                {score.correct === score.total
                  ? 'Excellent! All answers correct!'
                  : score.correct >= score.total / 2
                  ? 'Good job! Keep practicing!'
                  : 'Keep trying! Review the lesson and try again.'}
              </p>
            </div>
          </div>
        )}

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((q) => {
            const userAnswer = userAnswers[q.id];
            const isCorrect = userAnswer?.toLowerCase().trim() === q.answer.toLowerCase().trim();

            return (
              <div
                key={q.id}
                className={`bg-white rounded-xl shadow-md p-6 ${
                  submitted
                    ? isCorrect
                      ? 'border-2 border-green-400'
                      : 'border-2 border-red-400'
                    : ''
                }`}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Question {q.id}: {q.question}
                </h3>

                <input
                  type="text"
                  value={userAnswer || ''}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  disabled={submitted}
                  placeholder="Type your answer here..."
                  className={`w-full p-3 border-2 rounded-lg ${
                    submitted
                      ? isCorrect
                        ? 'bg-green-50 border-green-400'
                        : 'bg-red-50 border-red-400'
                      : 'border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200'
                  }`}
                />

                {submitted && !isCorrect && (
                  <p className="mt-3 text-sm text-red-600">
                    Correct answer: <strong>{q.answer}</strong>
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        {!submitted && (
          <div className="mt-8 text-center">
            <button
              onClick={handleSubmit}
              disabled={Object.keys(userAnswers).length < questions.length}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Submit Answers
            </button>
          </div>
        )}

        {submitted && (
          <div className="mt-8 text-center space-x-4">
            <button
              onClick={() => {
                setUserAnswers({});
                setSubmitted(false);
              }}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
            <Link
              href="/education/unit/nouns-gender-number/nouns-numbers"
              className="inline-block bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Back to Lesson
            </Link>
          </div>
        )}
      </div>

      {/* Rules Section - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)] p-4 z-50 border-t-2 border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-3">✅ Singular & Plural Rules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            <div className="flex items-start gap-2">
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">General:</span>
              <span className="text-gray-700 dark:text-gray-300 text-sm">Add -s: cat → cats</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm">-es Ending:</span>
              <span className="text-gray-700 dark:text-gray-300 text-sm">-s, -sh, -ch, -x: bus → buses</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">-ies Ending:</span>
              <span className="text-gray-700 dark:text-gray-300 text-sm">Consonant + y: baby → babies</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-pink-600 dark:text-pink-400 font-semibold text-sm">Irregular:</span>
              <span className="text-gray-700 dark:text-gray-300 text-sm">man → men, child → children</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}