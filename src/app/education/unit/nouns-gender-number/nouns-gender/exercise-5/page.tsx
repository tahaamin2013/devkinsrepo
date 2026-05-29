'use client';

import { useState } from 'react';
import Link from 'next/link';

interface MultipleChoiceQuestion {
  id: string;
  sentence: string;
  options: string[];
  correctAnswer: string;
  description: string;
}

export default function Exercise5Page() {
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const questions: MultipleChoiceQuestion[] = [
    {
      id: '1',
      sentence: 'My aunt/uncle is a widow.',
      options: ['Aunt', 'Uncle'],
      correctAnswer: 'Aunt',
      description: 'A widow is a woman whose husband died, so it must be "aunt"'
    },
    {
      id: '2',
      sentence: 'She is my elder brother/sister.',
      options: ['Brother', 'Sister'],
      correctAnswer: 'Sister',
      description: '"She" indicates female, so it must be "sister"'
    },
    {
      id: '3',
      sentence: 'My granny is an old man/woman.',
      options: ['Man', 'Woman'],
      correctAnswer: 'Woman',
      description: '"Granny" is a grandmother, so she is a "woman"'
    },
    {
      id: '4',
      sentence: 'This gentleman/lady is my husband.',
      options: ['Gentleman', 'Lady'],
      correctAnswer: 'Gentleman',
      description: '"Husband" is male, so it must be "gentleman"'
    },
    {
      id: '5',
      sentence: 'The hen/cock lays eggs every day.',
      options: ['Hen', 'Cock'],
      correctAnswer: 'Hen',
      description: 'Only female chickens (hens) lay eggs'
    },
    {
      id: '6',
      sentence: 'The queen/king lost her diamond necklace.',
      options: ['Queen', 'King'],
      correctAnswer: 'Queen',
      description: '"Her" indicates female, so it must be "queen"'
    },
    {
      id: '7',
      sentence: 'That boy is my nephew/niece.',
      options: ['Nephew', 'Niece'],
      correctAnswer: 'Nephew',
      description: '"Boy" is male, so the relation must be "nephew"'
    },
    {
      id: '8',
      sentence: 'The cow/bull gives us milk.',
      options: ['Cow', 'Bull'],
      correctAnswer: 'Cow',
      description: 'Only female cattle (cows) give milk'
    },
    {
      id: '9',
      sentence: 'The lioness/lion gave birth to two cubs.',
      options: ['Lioness', 'Lion'],
      correctAnswer: 'Lioness',
      description: '"Gave birth" indicates female, so it must be "lioness"'
    },
    {
      id: '10',
      sentence: 'The hostess greeted his/her guest with a smile.',
      options: ['His', 'Her'],
      correctAnswer: 'Her',
      description: '"Hostess" is female, so the pronoun must be "her"'
    },
  ];

  const handleAnswerChange = (questionId: string, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const getScore = () => {
    let correct = 0;
    questions.forEach(question => {
      if (userAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const handleSubmit = () => {
    const correct = getScore();
    setScore(correct);
    setSubmitted(true);
  };

  const handleReset = () => {
    setUserAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const isCorrect = (questionId: string) => {
    return userAnswers[questionId] === questions.find(q => q.id === questionId)?.correctAnswer;
  };

  const areAllQuestionsAnswered = () => {
    return questions.every(question => userAnswers[question.id]);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 p-4 md:p-8 pb-40 mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">Exercise 5: Choose the Right Word</h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">Select the correct gender word to complete each sentence</p>
        </div>

        {/* Description Box */}
        <div className="bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-200 dark:border-orange-700 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="text-orange-600 dark:text-orange-400 mt-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-orange-800 dark:text-orange-400 mb-1">Exercise Description</h3>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                This exercise tests your ability to <strong>choose the correct gender word</strong> based on context clues in each sentence. Read each sentence carefully, look for gender indicators like pronouns (he/she, his/her), relationships, or roles, and select the appropriate word.
              </p>
            </div>
          </div>
        </div>

        {/* Score Display */}
        {submitted ? (
          <div className={`mb-6 p-6 rounded-xl text-center ${
            score === questions.length
              ? 'bg-green-100 dark:bg-green-900 border-2 border-green-400 dark:border-green-600'
              : score >= questions.length / 2
              ? 'bg-yellow-100 dark:bg-yellow-900 border-2 border-yellow-400 dark:border-yellow-600'
              : 'bg-red-100 dark:bg-red-900 border-2 border-red-400 dark:border-red-600'
          }`}>
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Your Score: {score} / {questions.length}</h2>
            <p className="text-gray-700 dark:text-gray-300">
              {score === questions.length
                ? 'Excellent! All answers correct!'
                : score >= questions.length / 2
                ? 'Good job! Keep practicing!'
                : 'Keep trying! Review the lesson and try again.'}
            </p>
          </div>
        ) : Object.keys(userAnswers).length > 0 && (
          <div className={`mb-6 p-6 rounded-xl text-center ${
            getScore() === questions.length
              ? 'bg-green-100 dark:bg-green-900 border-2 border-green-400 dark:border-green-600'
              : getScore() >= questions.length / 2
              ? 'bg-yellow-100 dark:bg-yellow-900 border-2 border-yellow-400 dark:border-yellow-600'
              : 'bg-red-100 dark:bg-red-900 border-2 border-red-400 dark:border-red-600'
          }`}>
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Current Score: {getScore()} / {questions.length}</h2>
            <p className="text-gray-700 dark:text-gray-300">
              {getScore() === questions.length
                ? 'Perfect! Keep it up!'
                : getScore() >= questions.length / 2
                ? 'Good progress! Complete all questions.'
                : 'Keep going! Answer more questions.'}
            </p>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="text-gray-600 dark:text-gray-400">
            Completed: {Object.keys(userAnswers).length} / {questions.length}
            {!submitted && Object.keys(userAnswers).length > 0 && (
              <span className="ml-4">
                Score: {getScore()} / {questions.length}
              </span>
            )}
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
            {!submitted && areAllQuestionsAnswered() && (
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
        <div className="space-y-6 sticky top-4">
          {questions.map((question, index) => {
            const userAnswer = userAnswers[question.id];
            const correct = isCorrect(question.id);

            return (
              <div
                key={question.id}
                className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-2 sticky top-4 ${
                  submitted
                    ? correct
                      ? 'border-green-400 dark:border-green-600'
                      : 'border-red-400 dark:border-red-600'
                    : 'border-gray-200 dark:border-gray-600'
                }`}
              >
                <div className="flex items-start gap-2 mb-4">
                  <span className={`rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    submitted
                      ? correct
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-blue-500 text-white'
                  }`}>
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    {/* Question Sentence */}
                    <div className="mb-4">
                      <p className="text-lg text-gray-800 dark:text-white font-medium">
                        {question.sentence}
                      </p>
                    </div>

                    {/* Multiple Choice Options */}
                    <div className="grid grid-cols-2 gap-3">
                      {question.options.map((option, optIndex) => {
                        const isSelected = userAnswer === option;
                        const isCorrectOption = option === question.correctAnswer;



                        return (
                          <button
                            key={optIndex}
                            onClick={() => !submitted && handleAnswerChange(question.id, option)}
                            disabled={submitted}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              submitted
                                ? isCorrectOption
                                  ? 'bg-green-100 dark:bg-green-900/30 border-green-400 dark:border-green-600 text-green-800 dark:text-green-300'
                                  : isSelected
                                  ? 'bg-red-100 dark:bg-red-900/30 border-red-400 dark:border-red-600 text-red-800 dark:text-red-300'
                                  : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300'
                                : isSelected && isCorrectOption
                                ? 'bg-green-100 dark:bg-green-900/30 border-green-400 dark:border-green-600 text-green-800 dark:text-green-300'
                                : isSelected && !isCorrectOption
                                ? 'bg-red-100 dark:bg-red-900/30 border-red-400 dark:border-red-600 text-red-800 dark:text-red-300'
                                : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                            }`}
                          >
                            <div className="font-semibold text-center">
                              {option}
                            </div>
                            {isSelected && !submitted && (
                              <div className="text-center mt-1">
                                {isCorrectOption ? '✓' : '✗'}
                              </div>
                            )}
                            {submitted && isSelected && (
                              <div className="text-center mt-1">
                                {isCorrectOption ? '✓' : '✗'}
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {(submitted || (userAnswer && !isCorrect(question.id))) && (
                      <div className={`mt-3 rounded-lg p-3 border ${
                        userAnswer && !isCorrect(question.id)
                          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
                          : submitted && isCorrect(question.id)
                          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
                          : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700'
                      }`}>
                        <p className={`text-sm ${
                          userAnswer && !isCorrect(question.id)
                            ? 'text-green-800 dark:text-green-400'
                            : isCorrect(question.id)
                            ? 'text-green-800 dark:text-green-400'
                            : 'text-red-800 dark:text-red-400'
                        }`}>
                          <strong>Correct Answer:</strong> {question.correctAnswer}
                        </p>
                        <p className={`text-sm ${
                          userAnswer && !isCorrect(question.id)
                            ? 'text-green-700 dark:text-green-300'
                            : isCorrect(question.id)
                            ? 'text-green-700 dark:text-green-300'
                            : 'text-red-700 dark:text-red-300'
                        } mt-1`}>
                          <strong>Explanation:</strong> {question.description}
                        </p>
                      </div>
                    )}

                    {userAnswer && isCorrect(question.id) && !submitted && (
                      <div className="mt-2 text-sm text-green-600 dark:text-green-400">
                        ✓ Correct!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Instructions */}
        {!submitted && (
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">Instructions:</h3>
            <ol className="list-decimal list-inside text-blue-700 dark:text-blue-300 space-y-1">
              <li>Read each sentence carefully</li>
              <li>Look for gender clues (pronouns, relationships, roles)</li>
              <li>Click on the correct option to select it</li>
              <li>Complete all questions before submitting</li>
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

      {/* Rules Section - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)] p-4 z-50 border-t-2 border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-3">✅ Choosing the Right Gender Word</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            <div className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">Masculine:</span>
              <span className="text-gray-700 dark:text-gray-300 text-sm">man, boy, father, brother, uncle</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-pink-600 dark:text-pink-400 font-semibold text-sm">Feminine:</span>
              <span className="text-gray-700 dark:text-gray-300 text-sm">woman, girl, mother, sister, aunt</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm">Common:</span>
              <span className="text-gray-700 dark:text-gray-300 text-sm">baby (can also be neuter), parent, child, student</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-600 dark:text-gray-400 font-semibold text-sm">Neuter:</span>
              <span className="text-gray-700 dark:text-gray-300 text-sm">book, table, tree, house (baby can also be neuter)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}