'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

const exerciseData: Record<string, Record<number, { title: string; questions: Array<{ question: string; options?: string[]; answer?: string; type: 'fill-blank' | 'multiple-choice' | 'match' }>}>> = {
  'nouns-gender': {
    1: {
      title: 'Exercise 1: Identifying Gender',
      questions: [
        {
          type: 'multiple-choice',
          question: 'What is the feminine gender of "hero"?',
          options: ['Heroine', 'Heroin', 'Heroic', 'Heroess'],
          answer: 'Heroine',
        },
        {
          type: 'multiple-choice',
          question: 'What is the masculine gender of "niece"?',
          options: ['Nephew', 'Cousin', 'Brother', 'Son'],
          answer: 'Nephew',
        },
        {
          type: 'multiple-choice',
          question: 'What gender is the word "book"?',
          options: ['Masculine', 'Feminine', 'Neuter', 'Common'],
          answer: 'Neuter',
        },
        {
          type: 'fill-blank',
          question: 'The feminine gender of "actor" is _______',
          answer: 'actress',
        },
        {
          type: 'fill-blank',
          question: 'The masculine gender of "queen" is _______',
          answer: 'king',
        },
      ],
    },
    2: {
      title: 'Exercise 2: Converting Genders',
      questions: [
        {
          type: 'fill-blank',
          question: 'Convert "waiter" to feminine gender: _______',
          answer: 'waitress',
        },
        {
          type: 'fill-blank',
          question: 'Convert "lioness" to masculine gender: _______',
          answer: 'lion',
        },
        {
          type: 'fill-blank',
          question: 'Convert "peacock" to feminine gender: _______',
          answer: 'peahen',
        },
        {
          type: 'fill-blank',
          question: 'Convert "gelding" to masculine gender: _______',
          answer: 'stallion',
        },
        {
          type: 'fill-blank',
          question: 'Convert "mare" to masculine gender: _______',
          answer: 'stallion',
        },
      ],
    },
    3: {
      title: 'Exercise 3: Gender Classification',
      questions: [
        {
          type: 'multiple-choice',
          question: 'What type of gender does "doctor" belong to?',
          options: ['Masculine only', 'Feminine only', 'Common gender', 'Neuter gender'],
          answer: 'Common gender',
        },
        {
          type: 'multiple-choice',
          question: 'Which of these is a neuter gender noun?',
          options: ['Sister', 'Table', 'Father', 'Girl'],
          answer: 'Table',
        },
        {
          type: 'fill-blank',
          question: 'Nouns that can refer to either masculine or feminine gender are called _______ gender',
          answer: 'common',
        },
        {
          type: 'fill-blank',
          question: 'Objects without life are of _______ gender',
          answer: 'neuter',
        },
        {
          type: 'multiple-choice',
          question: 'What is the feminine of "bachelor"?',
          options: ['Spinster', 'Wife', 'Woman', 'Lady'],
          answer: 'Spinster',
        },
      ],
    },
  },
  'nouns-numbers': {
    1: {
      title: 'Exercise 1: Forming Plurals',
      questions: [
        {
          type: 'fill-blank',
          question: 'Plural of "cat" is _______',
          answer: 'cats',
        },
        {
          type: 'fill-blank',
          question: 'Plural of "box" is _______',
          answer: 'boxes',
        },
        {
          type: 'fill-blank',
          question: 'Plural of "baby" is _______',
          answer: 'babies',
        },
        {
          type: 'fill-blank',
          question: 'Plural of "leaf" is _______',
          answer: 'leaves',
        },
        {
          type: 'fill-blank',
          question: 'Plural of "child" is _______',
          answer: 'children',
        },
        {
          type: 'fill-blank',
          question: 'Plural of "man" is _______',
          answer: 'men',
        },
        {
          type: 'fill-blank',
          question: 'Plural of "tooth" is _______',
          answer: 'teeth',
        },
        {
          type: 'fill-blank',
          question: 'Plural of "person" is _______',
          answer: 'people',
        },
      ],
    },
    2: {
      title: 'Exercise 2: Plural Rules and Exceptions',
      questions: [
        {
          type: 'multiple-choice',
          question: 'What is the correct plural of "church"?',
          options: ['Churchs', 'Churches', 'Churchies', 'Church'],
          answer: 'Churches',
        },
        {
          type: 'multiple-choice',
          question: 'Which word follows the "consonant + y" rule?',
          options: ['Boy → Boys', 'City → Cities', 'Day → Days', 'Key → Keys'],
          answer: 'City → Cities',
        },
        {
          type: 'fill-blank',
          question: 'The plural of "knife" is _______',
          answer: 'knives',
        },
        {
          type: 'fill-blank',
          question: 'The plural of "mouse" is _______',
          answer: 'mice',
        },
        {
          type: 'multiple-choice',
          question: 'What is the plural of "goose"?',
          options: ['Gooses', 'Geese', 'Goose', 'Geeses'],
          answer: 'Geese',
        },
        {
          type: 'fill-blank',
          question: 'The plural of "ox" is _______',
          answer: 'oxen',
        },
      ],
    },
  },
};

export default function ExercisePage() {
  const params = useParams();
  const subSlug = params.subSlug as string;
  const exerciseNum = parseInt((params.exerciseNum as string).replace('exercise-', ''));

  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const exercise = exerciseData[subSlug]?.[exerciseNum];

  if (!exercise) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Exercise Not Found</h1>
          <Link href="/education" className="text-blue-600 hover:text-blue-700">
            ← Back to all units
          </Link>
        </div>
      </div>
    );
  }

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const getScore = () => {
    let correct = 0;
    exercise.questions.forEach((q, index) => {
      if (userAnswers[index]?.toLowerCase().trim() === q.answer?.toLowerCase().trim()) {
        correct++;
      }
    });
    return { correct, total: exercise.questions.length };
  };

  const score = submitted ? getScore() : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href={`/education/unit/${params.slug}/${subSlug}`}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to lesson
        </Link>

        {/* Exercise Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{exercise.title}</h1>
          <p className="text-gray-600">Fill in the blanks or select the correct answer</p>
        </div>

        {/* Score Display */}
        {submitted && score && (
          <div className={`mb-8 p-6 rounded-xl ${
            score.correct === score.total
              ? 'bg-green-100 border-2 border-green-400'
              : score.correct >= score.total / 2
              ? 'bg-yellow-100 border-2 border-yellow-400'
              : 'bg-red-100 border-2 border-red-400'
          }`}>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Your Score: {score.correct} / {score.total}</h2>
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
          {exercise.questions.map((q, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer?.toLowerCase().trim() === q.answer?.toLowerCase().trim();
            const hasAnswered = userAnswer !== undefined;

            return (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-md p-6 ${
                  submitted
                    ? isCorrect
                      ? 'border-2 border-green-400'
                      : 'border-2 border-red-400'
                    : ''
                }`}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Question {index + 1}: {q.question}
                </h3>

                {q.type === 'multiple-choice' && q.options ? (
                  <div className="space-y-3">
                    {q.options.map((option, optIndex) => (
                      <label
                        key={optIndex}
                        className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                          userAnswer === option
                            ? submitted && isCorrect
                              ? 'bg-green-50 border-green-400'
                              : submitted && !isCorrect
                              ? 'bg-red-50 border-red-400'
                              : 'bg-blue-50 border-blue-400'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={option}
                          checked={userAnswer === option}
                          onChange={(e) => handleAnswerChange(index, e.target.value)}
                          disabled={submitted}
                          className="mr-3"
                        />
                        <span className="flex-1">{option}</span>
                        {submitted && userAnswer === option && (
                          <span className="ml-2">
                            {isCorrect ? '✓' : '✗'}
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                ) : (
                  <input
                    type="text"
                    value={userAnswer || ''}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
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
                )}

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
              disabled={Object.keys(userAnswers).length < exercise.questions.length}
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
              href={`/education/unit/${params.slug}/${subSlug}`}
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