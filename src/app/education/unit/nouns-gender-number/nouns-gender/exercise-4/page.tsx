'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SentenceExercise {
  id: string;
  originalSentence: string;
  targetWords: Array<{ original: string; replacement: string; position: number }>;
  correctSentence: string;
  description: string;
}

export default function Exercise4Page() {
  const [userAnswers, setUserAnswers] = useState<Record<string, Record<number, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const exercises: SentenceExercise[] = [
    {
      id: '1',
      originalSentence: 'My grandfather is the author of many children books.',
      targetWords: [
        { original: 'grandfather', replacement: 'grandmother', position: 0 },
        { original: 'author', replacement: 'authoress', position: 1 }
      ],
      correctSentence: 'My grandmother is the authoress of many children books.',
      description: 'Change grandfather → grandmother and author → authoress'
    },
    {
      id: '2',
      originalSentence: 'The woman asked her daughters to go to school.',
      targetWords: [
        { original: 'woman', replacement: 'man', position: 0 },
        { original: 'daughters', replacement: 'sons', position: 1 },
        { original: 'her', replacement: 'his', position: 2 }
      ],
      correctSentence: 'The man asked his sons to go to school.',
      description: 'Change woman → man, daughters → sons, her → his'
    },
    {
      id: '3',
      originalSentence: 'The bridegroom rode on a mare.',
      targetWords: [
        { original: 'bridegroom', replacement: 'bride', position: 0 },
        { original: 'mare', replacement: 'stallion', position: 1 }
      ],
      correctSentence: 'The bride rode on a stallion.',
      description: 'Change bridegroom → bride and mare → stallion'
    },
    {
      id: '4',
      originalSentence: 'The father called his sons and asked them to go to the king.',
      targetWords: [
        { original: 'father', replacement: 'mother', position: 0 },
        { original: 'his', replacement: 'her', position: 1 },
        { original: 'sons', replacement: 'daughters', position: 2 },
        { original: 'king', replacement: 'queen', position: 3 }
      ],
      correctSentence: 'The mother called her daughters and asked them to go to the queen.',
      description: 'Change father → mother, his → her, sons → daughters, king → queen'
    },
    {
      id: '5',
      originalSentence: 'The boys went for a picnic yesterday.',
      targetWords: [
        { original: 'boys', replacement: 'girls', position: 0 }
      ],
      correctSentence: 'The girls went for a picnic yesterday.',
      description: 'Change boys → girls'
    },
    {
      id: '6',
      originalSentence: 'Two bulls started a big fight.',
      targetWords: [
        { original: 'bulls', replacement: 'cows', position: 0 }
      ],
      correctSentence: 'Two cows started a big fight.',
      description: 'Change bulls → cows'
    },
    {
      id: '7',
      originalSentence: 'The tiger does not look after his cubs.',
      targetWords: [
        { original: 'tiger', replacement: 'tigress', position: 0 },
        { original: 'his', replacement: 'her', position: 1 }
      ],
      correctSentence: 'The tigress does not look after her cubs.',
      description: 'Change tiger → tigress and his → her'
    },
    {
      id: '8',
      originalSentence: 'The queen called the prince and asked him to choose a princess.',
      targetWords: [
        { original: 'queen', replacement: 'king', position: 0 },
        { original: 'prince', replacement: 'princess', position: 1 },
        { original: 'him', replacement: 'her', position: 2 },
        { original: 'princess', replacement: 'prince', position: 3 }
      ],
      correctSentence: 'The king called the princess and asked her to choose a prince.',
      description: 'Change queen → king, prince → princess, him → her, princess → prince'
    },
    {
      id: '9',
      originalSentence: 'He is the son of a rich man.',
      targetWords: [
        { original: 'He', replacement: 'She', position: 0 },
        { original: 'son', replacement: 'daughter', position: 1 },
        { original: 'man', replacement: 'woman', position: 2 }
      ],
      correctSentence: 'She is the daughter of a rich woman.',
      description: 'Change He → She, son → daughter, man → woman'
    },
    {
      id: '10',
      originalSentence: 'A dog saw his own shadow in the water and started barking.',
      targetWords: [
        { original: 'dog', replacement: 'bitch', position: 0 },
        { original: 'his', replacement: 'her', position: 1 }
      ],
      correctSentence: 'A bitch saw her own shadow in the water and started barking.',
      description: 'Change dog → bitch and his → her'
    },
    {
      id: '11',
      originalSentence: 'His uncle and aunt lived in the US.',
      targetWords: [
        { original: 'His', replacement: 'Her', position: 0 },
        { original: 'uncle', replacement: 'aunt', position: 1 },
        { original: 'aunt', replacement: 'uncle', position: 2 }
      ],
      correctSentence: 'Her aunt and uncle lived in the US.',
      description: 'Change His → Her, uncle → aunt, aunt → uncle'
    },
    {
      id: '12',
      originalSentence: 'The shepherd took the cattle in the forest.',
      targetWords: [
        { original: 'shepherd', replacement: 'shepherdess', position: 0 }
      ],
      correctSentence: 'The shepherdess took the cattle in the forest.',
      description: 'Change shepherd → shepherdess'
    },
  ];

  const handleAnswerChange = (exerciseId: string, position: number, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        [position]: answer
      }
    }));
  };

  const handleSubmit = () => {
    let correct = 0;
    exercises.forEach(exercise => {
      const exerciseAnswers = userAnswers[exercise.id] || {};
      const allCorrect = exercise.targetWords.every(targetWord =>
        exerciseAnswers[targetWord.position]?.toLowerCase().trim() === targetWord.replacement.toLowerCase()
      );
      if (allCorrect) {
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

  const createFillInBlanksSentence = (exercise: SentenceExercise) => {
    const words = exercise.originalSentence.split(/\s+/);
    const targetWordPositions = new Set(exercise.targetWords.map(tw => tw.original));

    return words.map((word, index) => {
      const wordWithoutPunctuation = word.replace(/[.,]/g, '');
      const isTarget = targetWordPositions.has(wordWithoutPunctuation);
      const targetWord = exercise.targetWords.find(tw => tw.original === wordWithoutPunctuation);

      if (isTarget && targetWord) {
        const userAnswer = (userAnswers[exercise.id] || {})[targetWord.position] || '';
        const isCorrect = userAnswer.toLowerCase().trim() === targetWord.replacement.toLowerCase();
        const hasAnswer = userAnswer.length > 0;

        return (
          <span key={index} className="inline-block mx-1">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => !submitted && handleAnswerChange(exercise.id, targetWord.position, e.target.value)}
              disabled={submitted}
              className={`w-32 p-2 border-2 rounded-lg text-center ${
                submitted
                  ? isCorrect
                    ? 'bg-green-50 dark:bg-green-900/30 border-green-400 dark:border-green-600 text-green-800 dark:text-green-300'
                    : 'bg-red-50 dark:bg-red-900/30 border-red-400 dark:border-red-600 text-red-800 dark:text-red-300'
                  : hasAnswer && isCorrect
                  ? 'bg-green-50 dark:bg-green-900/30 border-green-400 dark:border-green-600 text-green-800 dark:text-green-300'
                  : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800'
              }`}
              placeholder="_____"
            />
          </span>
        );
      }

      return <span key={index} className="mx-1">{word}</span>;
    });
  };

  const isExerciseComplete = (exercise: SentenceExercise) => {
    const exerciseAnswers = userAnswers[exercise.id] || {};
    return exercise.targetWords.every(targetWord =>
      (exerciseAnswers[targetWord.position] || '').trim().length > 0
    );
  };

  const areAllExercisesComplete = () => {
    return exercises.every(exercise => isExerciseComplete(exercise));
  };

  const isExerciseCorrect = (exercise: SentenceExercise) => {
    const exerciseAnswers = userAnswers[exercise.id] || {};
    return exercise.targetWords.every(targetWord =>
      exerciseAnswers[targetWord.position]?.toLowerCase().trim() === targetWord.replacement.toLowerCase()
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 p-4 md:p-8 pb-40">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">Exercise 4: Change Gender in Sentences</h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">Fill in the blanks with the correct gender forms</p>
        </div>

        {/* Description Box */}
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-200 dark:border-indigo-700 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="text-indigo-600 dark:text-indigo-400 mt-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-indigo-800 dark:text-indigo-400 mb-1">Exercise Description</h3>
              <p className="text-sm text-indigo-700 dark:text-indigo-300">
                Each sentence has <strong>blanks where you need to type the correct gender forms</strong>. Look at the original sentence above, identify which words need to be changed, and type the correct gender form in the blanks below.
              </p>
            </div>
          </div>
        </div>

        {/* Score Display */}
        {submitted && (
          <div className={`mb-6 p-6 rounded-xl text-center ${
            score === exercises.length
              ? 'bg-green-100 dark:bg-green-900 border-2 border-green-400 dark:border-green-600'
              : score >= exercises.length / 2
              ? 'bg-yellow-100 dark:bg-yellow-900 border-2 border-yellow-400 dark:border-yellow-600'
              : 'bg-red-100 dark:bg-red-900 border-2 border-red-400 dark:border-red-600'
          }`}>
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Your Score: {score} / {exercises.length}</h2>
            <p className="text-gray-700 dark:text-gray-300">
              {score === exercises.length
                ? 'Excellent! All answers correct!'
                : score >= exercises.length / 2
                ? 'Good job! Keep practicing!'
                : 'Keep trying! Review the lesson and try again.'}
            </p>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="text-gray-600 dark:text-gray-400">
            Completed: {exercises.filter(e => isExerciseComplete(e)).length} / {exercises.length}
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
            {!submitted && areAllExercisesComplete() && (
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
          {exercises.map((exercise, index) => {
            const exerciseComplete = isExerciseComplete(exercise);
            const exerciseCorrect = isExerciseCorrect(exercise);

            return (
              <div
                key={exercise.id}
                className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-2 ${
                  submitted
                    ? exerciseCorrect
                      ? 'border-green-400 dark:border-green-600'
                      : 'border-red-400 dark:border-red-600'
                    : 'border-gray-200 dark:border-gray-600'
                }`}
              >
                <div className="flex items-start gap-2 mb-4">
                  <span className={`rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    submitted
                      ? exerciseCorrect
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-blue-500 text-white'
                  }`}>
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    {/* Original Sentence */}
                    <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Original:</p>
                      <p className="text-gray-700 dark:text-gray-200 font-medium">
                        {exercise.originalSentence}
                      </p>
                    </div>

                    {/* Fill-in-the-blank Sentence */}
                    <div className="mb-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">Fill in the blanks:</p>
                      <div className="text-lg">
                        {createFillInBlanksSentence(exercise)}
                      </div>
                    </div>

                    {/* Change Instructions */}
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3">
                      <p className="text-sm text-yellow-800 dark:text-yellow-400">
                        <strong>Changes needed:</strong> {exercise.description}
                      </p>
                    </div>

                    {exerciseComplete && !submitted && (
                      <div className="mt-2 text-sm text-green-600 dark:text-green-400">
                        ✓ All blanks filled!
                      </div>
                    )}

                    {submitted && !exerciseCorrect && (
                      <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <p className="text-sm text-green-800 dark:text-green-400">
                          <strong>Correct sentence:</strong> {exercise.correctSentence}
                        </p>
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
              <li>Read the original sentence above</li>
              <li>Identify which words need gender changes</li>
              <li>Type the correct forms in the blanks below</li>
              <li>Press Enter or Tab to move between blanks</li>
              <li>Complete all sentences before submitting</li>
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
          <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-3">✅ Sentence Gender Conversion Rules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            <div className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">Masculine → Feminine:</span>
              <span className="text-gray-700 dark:text-gray-300 text-sm">man → woman, he → she, his → her</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-pink-600 dark:text-pink-400 font-semibold text-sm">Feminine → Masculine:</span>
              <span className="text-gray-700 dark:text-gray-300 text-sm">woman → man, she → he, her → his</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm">Pronouns:</span>
              <span className="text-gray-700 dark:text-gray-300 text-sm">him → her, them → them</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400 font-semibold text-sm">Possessives:</span>
              <span className="text-gray-700 dark:text-gray-300 text-sm">his → her, hers → his</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}