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
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Exercise 5: Choose the Right Word</h1>
          <p className="text-base md:text-lg text-gray-600">Select the correct gender word to complete each sentence</p>
        </div>

        {/* Description Box */}
        <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="text-orange-600 mt-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-orange-800 mb-1">Exercise Description</h3>
              <p className="text-sm text-orange-700">
                This exercise tests your ability to <strong>choose the correct gender word</strong> based on context clues in each sentence. Read each sentence carefully, look for gender indicators like pronouns (he/she, his/her), relationships, or roles, and select the appropriate word.
              </p>
            </div>
          </div>
        </div>

        {/* Score Display */}
        {submitted ? (
          <div className={`mb-6 p-6 rounded-xl text-center ${
            score === questions.length
              ? 'bg-green-100 border-2 border-green-400'
              : score >= questions.length / 2
              ? 'bg-yellow-100 border-2 border-yellow-400'
              : 'bg-red-100 border-2 border-red-400'
          }`}>
            <h2 className="text-2xl font-bold mb-2">Your Score: {score} / {questions.length}</h2>
            <p className="text-gray-700">
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
              ? 'bg-green-100 border-2 border-green-400'
              : getScore() >= questions.length / 2
              ? 'bg-yellow-100 border-2 border-yellow-400'
              : 'bg-red-100 border-2 border-red-400'
          }`}>
            <h2 className="text-2xl font-bold mb-2">Current Score: {getScore()} / {questions.length}</h2>
            <p className="text-gray-700">
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
          <div className="text-gray-600">
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
        <div className="space-y-6">
          {questions.map((question, index) => {
            const userAnswer = userAnswers[question.id];
            const correct = isCorrect(question.id);

            return (
              <div
                key={question.id}
                className={`bg-white rounded-lg shadow-md p-6 border-2 ${
                  submitted
                    ? correct
                      ? 'border-green-400'
                      : 'border-red-400'
                    : 'border-gray-200'
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
                      <p className="text-lg text-gray-800 font-medium">
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
                                  ? 'bg-green-100 border-green-400 text-green-800'
                                  : isSelected
                                  ? 'bg-red-100 border-red-400 text-red-800'
                                  : 'bg-gray-50 border-gray-200 text-gray-600'
                                : isSelected && isCorrectOption
                                ? 'bg-green-100 border-green-400 text-green-800'
                                : isSelected && !isCorrectOption
                                ? 'bg-red-100 border-red-400 text-red-800'
                                : 'bg-gray-50 border-gray-200 text-gray-800 hover:border-blue-300 hover:bg-blue-50'
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
                          ? 'bg-green-50 border-green-200'
                          : submitted && isCorrect(question.id)
                          ? 'bg-green-50 border-green-200'
                          : 'bg-red-50 border-red-200'
                      }`}>
                        <p className={`text-sm ${
                          userAnswer && !isCorrect(question.id)
                            ? 'text-green-800'
                            : isCorrect(question.id)
                            ? 'text-green-800'
                            : 'text-red-800'
                        }`}>
                          <strong>Correct Answer:</strong> {question.correctAnswer}
                        </p>
                        <p className={`text-sm ${
                          userAnswer && !isCorrect(question.id)
                            ? 'text-green-700'
                            : isCorrect(question.id)
                            ? 'text-green-700'
                            : 'text-red-700'
                        } mt-1`}>
                          <strong>Explanation:</strong> {question.description}
                        </p>
                      </div>
                    )}

                    {userAnswer && isCorrect(question.id) && !submitted && (
                      <div className="mt-2 text-sm text-green-600">
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
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Instructions:</h3>
            <ol className="list-decimal list-inside text-blue-700 space-y-1">
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
              className="inline-block bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Back to Lesson
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}