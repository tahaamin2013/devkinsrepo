'use client';

import Link from 'next/link';
import { useState } from 'react';

interface NounAnswer {
  noun: string;
  standFor: 'one' | 'more than one';
}

interface Question {
  id: number;
  sentence: string;
  answers: NounAnswer[];
}

interface UserNounAnswer {
  noun: string;
  standFor: 'one' | 'more than one' | '';
}

const questions: Question[] = [
  {
    id: 1,
    sentence: 'The boys are writing in copybooks.',
    answers: [
      { noun: 'boys', standFor: 'more than one' },
      { noun: 'copybooks', standFor: 'more than one' }
    ]
  },
  {
    id: 2,
    sentence: 'A little girl is playing with her friends.',
    answers: [
      { noun: 'girl', standFor: 'one' },
      { noun: 'friends', standFor: 'more than one' }
    ]
  },
  {
    id: 3,
    sentence: 'Cows give milk.',
    answers: [
      { noun: 'Cows', standFor: 'more than one' }
    ]
  },
  {
    id: 4,
    sentence: 'There are many houses in this street.',
    answers: [
      { noun: 'houses', standFor: 'more than one' },
      { noun: 'street', standFor: 'one' }
    ]
  },
  {
    id: 5,
    sentence: 'There are five cups on the table.',
    answers: [
      { noun: 'cups', standFor: 'more than one' },
      { noun: 'table', standFor: 'one' }
    ]
  },
  {
    id: 6,
    sentence: 'The room has four walls and two doors.',
    answers: [
      { noun: 'Room', standFor: 'one' },
      { noun: 'walls', standFor: 'more than one' },
      { noun: 'doors', standFor: 'more than one' }
    ]
  },
  {
    id: 7,
    sentence: 'All the inkpots are new.',
    answers: [
      { noun: 'inkpots', standFor: 'more than one' }
    ]
  },
  {
    id: 8,
    sentence: 'I have three balls, but only two bats.',
    answers: [
      { noun: 'balls', standFor: 'more than one' },
      { noun: 'bats', standFor: 'more than one' }
    ]
  },
  {
    id: 9,
    sentence: 'There are seven days in a week.',
    answers: [
      { noun: 'days', standFor: 'more than one' },
      { noun: 'week', standFor: 'one' }
    ]
  },
  {
    id: 10,
    sentence: 'This book has sixty-four pages.',
    answers: [
      { noun: 'book', standFor: 'one' },
      { noun: 'pages', standFor: 'more than one' }
    ]
  }
];

export default function NounsNumbersExercise1Page() {
  // Initialize user answers with empty fields for each question based on the number of correct answers
  const initialAnswers: Record<number, UserNounAnswer[]> = {};
  questions.forEach(q => {
    initialAnswers[q.id] = q.answers.map(() => ({ noun: '', standFor: '' as any }));
  });

  const [userAnswers, setUserAnswers] = useState<Record<number, UserNounAnswer[]>>(initialAnswers);

  const updateNounAnswer = (questionId: number, nounIndex: number, field: 'noun' | 'standFor', value: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: prev[questionId]?.map((answer, index) =>
        index === nounIndex ? { ...answer, [field]: value } : answer
      ) || []
    }));
  };

  const checkAnswer = (questionId: number, userNoun: UserNounAnswer) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return null;

    // Check if the user's answer matches any of the correct answers for this question
    const correctAnswer = question.answers.find(
      answer =>
        answer.noun.toLowerCase() === userNoun.noun.toLowerCase().trim() &&
        answer.standFor === userNoun.standFor
    );

    return correctAnswer ? correctAnswer : null;
  };

  const getQuestionScore = (questionId: number) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return { correct: 0, total: 0 };

    const userNouns = userAnswers[questionId] || [];
    const correctNouns = question.answers;

    let correctCount = 0;
    userNouns.forEach((userAnswer, index) => {
      if (userAnswer.noun.trim()) {
        const isCorrect = correctNouns.some(
          correctAnswer =>
            correctAnswer.noun.toLowerCase() === userAnswer.noun.toLowerCase().trim() &&
            correctAnswer.standFor === userAnswer.standFor
        );
        if (isCorrect) correctCount++;
      }
    });

    return { correct: correctCount, total: correctNouns.length };
  };

  const getOverallScore = () => {
    let totalCorrect = 0;
    let totalExpected = 0;

    questions.forEach(q => {
      const score = getQuestionScore(q.id);
      totalCorrect += score.correct;
      totalExpected += score.total;
    });

    return { correct: totalCorrect, total: totalExpected };
  };

  const handleResetAll = () => {
    const resetAnswers: Record<number, UserNounAnswer[]> = {};
    questions.forEach(q => {
      resetAnswers[q.id] = q.answers.map(() => ({ noun: '', standFor: '' as any }));
    });
    setUserAnswers(resetAnswers);
  };

  const overallScore = getOverallScore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6 mt-20">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/education/unit/nouns-gender-number/nouns-numbers"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 sm:mb-6 transition-all hover:gap-3 font-medium text-sm sm:text-base"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to lesson
        </Link>

        {/* Lesson Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-white/50">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Singular and Plural Numbers
            </h1>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 border-l-4 border-indigo-500">
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Any noun standing for <strong className="text-indigo-600">one person or thing</strong> is said to be in the <strong className="text-indigo-600">Singular Number</strong>
              </p>
              <p className="text-gray-600 mt-2 ml-2 sm:ml-4 text-xs sm:text-sm">
                Examples: <span className="font-semibold text-indigo-700">boy, man, donkey, chair, desk</span>
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 border-l-4 border-purple-500">
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Any noun standing for <strong className="text-purple-600">more than one person or thing</strong> is said to be in the <strong className="text-purple-600">Plural Number</strong>
              </p>
              <p className="text-gray-600 mt-2 ml-2 sm:ml-4 text-xs sm:text-sm">
                Examples: <span className="font-semibold text-purple-700">boys, men, donkeys, chairs, desks</span>
              </p>
            </div>
          </div>
        </div>

        {/* Exercise Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 text-white">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">EXERCISE 1</h2>
          </div>
          <p className="text-blue-100 text-sm sm:text-base">
            Point out the Nouns in these sentences. State whether they stand for one thing (or person), or more than one thing (or person).
          </p>
        </div>

        {/* Overall Score */}
        {overallScore.total > 0 && (
          <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl sm:rounded-3xl shadow-xl">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base">Overall Score</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Progress Tracking</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {overallScore.correct} / {overallScore.total}
                </p>
                <p className="text-xs sm:text-sm text-gray-600">nouns found</p>
              </div>
            </div>
            <div className="w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-full h-2 sm:h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 sm:h-3 rounded-full transition-all duration-500 ease-out shadow-lg"
                style={{ width: `${(overallScore.correct / overallScore.total) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Questions */}
        <div className="space-y-4 sm:space-y-5">
          {questions.map((q) => {
            const questionNouns = userAnswers[q.id] || [];
            const questionScore = getQuestionScore(q.id);
            const isPerfect = questionScore.correct === questionScore.total && questionScore.total > 0;

            return (
              <div
                key={q.id}
                className={`bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 border border-white/50 transition-all duration-300 hover:shadow-2xl ${
                  isPerfect ? 'ring-2 ring-green-500' : ''
                }`}
              >
                <div className="flex items-start gap-2 sm:gap-4 mb-3 sm:mb-5">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-base sm:text-lg shrink-0 ${
                    isPerfect
                      ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white'
                      : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
                  }`}>
                    {q.id}
                  </div>
                  <div className="flex-1">
                    <p className="text-base sm:text-lg font-medium text-gray-800 leading-relaxed">{q.sentence}</p>
                  </div>
                  {isPerfect && (
                    <div className="shrink-0">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Input Area - Fixed number of fields */}
                <div className="space-y-2 sm:space-y-3">
                  {questionNouns.map((nounAnswer, index) => {
                    const correctAnswer = checkAnswer(q.id, nounAnswer);
                    const isCorrect = correctAnswer !== null;
                    const hasValue = nounAnswer.noun.trim().length > 0;

                    return (
                      <div
                        key={index}
                        className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 ${
                          hasValue
                            ? isCorrect
                              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-400 shadow-md'
                              : 'bg-gradient-to-r from-red-50 to-pink-50 border-red-400 shadow-md'
                            : 'bg-gray-50 border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-semibold text-xs sm:text-sm shrink-0 ${
                          hasValue
                            ? isCorrect
                              ? 'bg-green-500 text-white'
                              : 'bg-red-500 text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}>
                          {index + 1}
                        </div>

                        <input
                          type="text"
                          value={nounAnswer.noun}
                          onChange={(e) => updateNounAnswer(q.id, index, 'noun', e.target.value)}
                          placeholder="Type the noun..."
                          className={`flex-1 p-2 sm:p-3 rounded-lg sm:rounded-xl border-2 transition-all duration-300 outline-none text-sm sm:text-base ${
                            hasValue
                              ? isCorrect
                                ? 'bg-white border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-200'
                                : 'bg-white border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                              : 'bg-white border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200'
                          }`}
                        />

                        <select
                          value={nounAnswer.standFor}
                          onChange={(e) => updateNounAnswer(q.id, index, 'standFor', e.target.value)}
                          className={`p-2 sm:p-3 rounded-lg sm:rounded-xl border-2 transition-all duration-300 outline-none w-full sm:w-auto text-sm sm:text-base ${
                            hasValue
                              ? isCorrect
                                ? 'bg-white border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-200'
                                : 'bg-white border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                              : 'bg-white border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200'
                          }`}
                        >
                          <option value="">Select...</option>
                          <option value="one">one thing (Singular)</option>
                          <option value="more than one">more than one thing (Plural)</option>
                        </select>

                        {hasValue && (
                          <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 ${
                            isCorrect
                              ? 'bg-green-500'
                              : 'bg-red-500'
                          }`}>
                            {isCorrect ? (
                              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Perfect Score Indicator */}
                {isPerfect && (
                  <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 rounded-xl sm:rounded-2xl">
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-bold text-green-700 text-sm sm:text-base">Perfect! All nouns identified correctly!</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Overall Progress Section */}
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl sm:rounded-3xl shadow-xl">
          <div className="text-center mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Overall Progress</h3>
            <p className="text-gray-600 text-sm sm:text-base">Track your completion</p>
          </div>

          <div className="mb-4 sm:mb-6">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-xs sm:text-sm font-medium text-gray-700">Completion</span>
              <span className="text-xs sm:text-sm font-bold text-blue-600">
                {Math.round((overallScore.correct / overallScore.total) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-full h-3 sm:h-4 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 sm:h-4 rounded-full transition-all duration-700 ease-out shadow-lg"
                style={{ width: `${(overallScore.correct / overallScore.total) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="text-center mb-4 sm:mb-6">
            <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {overallScore.correct} / {overallScore.total}
            </p>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">nouns found</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/education/unit/nouns-gender-number/nouns-numbers"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold hover:from-gray-200 hover:to-gray-300 transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Lesson
            </Link>
            <button
              onClick={handleResetAll}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}