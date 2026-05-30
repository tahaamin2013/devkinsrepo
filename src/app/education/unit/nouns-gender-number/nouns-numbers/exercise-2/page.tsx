'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SingularPluralPair {
  id: string;
  singular: string;
  plural: string;
}

export default function Exercise2Page() {
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const singularPluralPairs: SingularPluralPair[] = [
    // Regular plurals (adding -s)
    { id: '1', singular: 'boy', plural: 'boys' },
    { id: '2', singular: 'girl', plural: 'girls' },
    { id: '3', singular: 'room', plural: 'rooms' },
    { id: '4', singular: 'door', plural: 'doors' },
    { id: '5', singular: 'chair', plural: 'chairs' },
    { id: '6', singular: 'desk', plural: 'desks' },
    { id: '7', singular: 'book', plural: 'books' },
    { id: '8', singular: 'pen', plural: 'pens' },
    { id: '9', singular: 'dog', plural: 'dogs' },
    { id: '10', singular: 'cat', plural: 'cats' },
    { id: '11', singular: 'horse', plural: 'horses' },
    { id: '12', singular: 'cow', plural: 'cows' },
    { id: '13', singular: 'goat', plural: 'goats' },
    { id: '14', singular: 'crow', plural: 'crows' },
    { id: '15', singular: 'tree', plural: 'trees' },
    { id: '16', singular: 'rose', plural: 'roses' },

    // Words ending in -sh, -ch, -x, -s (adding -es)
    { id: '17', singular: 'lash', plural: 'lashes' },
    { id: '18', singular: 'brush', plural: 'brushes' },
    { id: '19', singular: 'push', plural: 'pushes' },
    { id: '20', singular: 'dish', plural: 'dishes' },
    { id: '21', singular: 'bush', plural: 'bushes' },
    { id: '22', singular: 'latch', plural: 'latches' },
    { id: '23', singular: 'batch', plural: 'batches' },
    { id: '24', singular: 'branch', plural: 'branches' },
    { id: '25', singular: 'match', plural: 'matches' },
    { id: '26', singular: 'catch', plural: 'catches' },
    { id: '27', singular: 'watch', plural: 'watches' },
    { id: '28', singular: 'church', plural: 'churches' },
    { id: '29', singular: 'witch', plural: 'witches' },
    { id: '30', singular: 'coach', plural: 'coaches' },
    { id: '31', singular: 'trench', plural: 'trenches' },
    { id: '32', singular: 'bunch', plural: 'bunches' },
    { id: '33', singular: 'couch', plural: 'couches' },
    { id: '34', singular: 'peach', plural: 'peaches' },
    { id: '35', singular: 'bench', plural: 'benches' },
    { id: '36', singular: 'gas', plural: 'gases' },
    { id: '37', singular: 'loss', plural: 'losses' },
    { id: '38', singular: 'class', plural: 'classes' },
    { id: '39', singular: 'kiss', plural: 'kisses' },
    { id: '40', singular: 'box', plural: 'boxes' },
    { id: '41', singular: 'fox', plural: 'foxes' },

    // Words ending in consonant + y (y → ies)
    { id: '42', singular: 'lady', plural: 'ladies' },
    { id: '43', singular: 'baby', plural: 'babies' },
    { id: '44', singular: 'family', plural: 'families' },
    { id: '45', singular: 'copy', plural: 'copies' },
    { id: '46', singular: 'pony', plural: 'ponies' },
    { id: '47', singular: 'army', plural: 'armies' },
    { id: '48', singular: 'fairy', plural: 'fairies' },
    { id: '49', singular: 'reply', plural: 'replies' },
    { id: '50', singular: 'city', plural: 'cities' },
    { id: '51', singular: 'body', plural: 'bodies' },
    { id: '52', singular: 'fly', plural: 'flies' },
    { id: '53', singular: 'lily', plural: 'lilies' },
    { id: '54', singular: 'ruby', plural: 'rubies' },
    { id: '55', singular: 'daisy', plural: 'daisies' },
    { id: '56', singular: 'country', plural: 'countries' },
    { id: '57', singular: 'cry', plural: 'cries' },
    { id: '58', singular: 'mercy', plural: 'mercies' },
    { id: '59', singular: 'valley', plural: 'valleys' },
    { id: '60', singular: 'journey', plural: 'journeys' },

    // Words ending in vowel + y (adding -s)
    { id: '61', singular: 'monkey', plural: 'monkeys' },
    { id: '62', singular: 'pulley', plural: 'pulleys' },
    { id: '63', singular: 'chimney', plural: 'chimneys' },
    { id: '64', singular: 'jockey', plural: 'jockeys' },
    { id: '65', singular: 'play', plural: 'plays' },
    { id: '66', singular: 'way', plural: 'ways' },
    { id: '67', singular: 'donkey', plural: 'donkeys' },
    { id: '68', singular: 'key', plural: 'keys' },
    { id: '69', singular: 'toy', plural: 'toys' },
    { id: '70', singular: 'day', plural: 'days' },
    { id: '71', singular: 'ray', plural: 'rays' },
    { id: '72', singular: 'bay', plural: 'bays' },

    // Words ending in -f or -fe (→ ves)
    { id: '73', singular: 'thief', plural: 'thieves' },
    { id: '74', singular: 'shelf', plural: 'shelves' },
    { id: '75', singular: 'leaf', plural: 'leaves' },
    { id: '76', singular: 'calf', plural: 'calves' },
    { id: '77', singular: 'loaf', plural: 'loaves' },
    { id: '78', singular: 'elf', plural: 'elves' },
    { id: '79', singular: 'half', plural: 'halves' },
    { id: '80', singular: 'wolf', plural: 'wolves' },
    { id: '81', singular: 'wife', plural: 'wives' },
    { id: '82', singular: 'knife', plural: 'knives' },
    { id: '83', singular: 'life', plural: 'lives' },

    // Words ending in -f or -fe (adding -s)
    { id: '84', singular: 'roof', plural: 'roofs' },
    { id: '85', singular: 'hoof', plural: 'hoofs' },
    { id: '86', singular: 'chief', plural: 'chiefs' },
    { id: '87', singular: 'dwarf', plural: 'dwarfs' },
    { id: '88', singular: 'cliff', plural: 'cliffs' },
    { id: '89', singular: 'puff', plural: 'puffs' },
    { id: '90', singular: 'cuff', plural: 'cuffs' },
    { id: '91', singular: 'gulf', plural: 'gulfs' },

    // Words ending in -o (adding -es)
    { id: '92', singular: 'hero', plural: 'heroes' },
    { id: '93', singular: 'mango', plural: 'mangoes' },
    { id: '94', singular: 'potato', plural: 'potatoes' },
    { id: '95', singular: 'volcano', plural: 'volcanoes' },
    { id: '96', singular: 'cargo', plural: 'cargoes' },
    { id: '97', singular: 'echo', plural: 'echoes' },
    { id: '98', singular: 'tomato', plural: 'tomatoes' },
    { id: '99', singular: 'mosquito', plural: 'mosquitoes' },

    // Words ending in -o (adding -s)
    { id: '100', singular: 'kilo', plural: 'kilos' },
    { id: '101', singular: 'piano', plural: 'pianos' },
    { id: '102', singular: 'dynamo', plural: 'dynamos' },
    { id: '103', singular: 'photo', plural: 'photos' },
    { id: '104', singular: 'bamboo', plural: 'bamboos' },
    { id: '105', singular: 'canto', plural: 'cantos' },

    // Irregular plurals
    { id: '106', singular: 'ox', plural: 'oxen' },
    { id: '107', singular: 'child', plural: 'children' },
    { id: '108', singular: 'brother', plural: 'brothers' },
    { id: '109', singular: 'man', plural: 'men' },
    { id: '110', singular: 'woman', plural: 'women' },
    { id: '111', singular: 'foot', plural: 'feet' },
    { id: '112', singular: 'mouse', plural: 'mice' },
    { id: '113', singular: 'tooth', plural: 'teeth' },
    { id: '114', singular: 'goose', plural: 'geese' },
    { id: '115', singular: 'louse', plural: 'lice' },

    // Compound nouns
    { id: '116', singular: 'son-in-law', plural: 'sons-in-law' },
    { id: '117', singular: 'daughter-in-law', plural: 'daughters-in-law' },
    { id: '118', singular: 'stepson', plural: 'stepsons' },
    { id: '119', singular: 'stepdaughter', plural: 'stepdaughters' },
    { id: '120', singular: 'maidservant', plural: 'maidservants' },
    { id: '121', singular: 'man-servant', plural: 'men-servants' },
    { id: '122', singular: 'man-of-war', plural: 'men-of-war' },
  ];

  const handleAnswerChange = (id: string, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [id]: answer
    }));
  };

  const handleSubmit = () => {
    let correct = 0;
    singularPluralPairs.forEach(pair => {
      if (userAnswers[pair.id]?.toLowerCase().trim() === pair.plural.toLowerCase()) {
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
    return userAnswers[id]?.toLowerCase().trim() === singularPluralPairs.find(p => p.id === id)?.plural.toLowerCase();
  };

  const isCurrentlyCorrect = (id: string) => {
    const answer = userAnswers[id]?.toLowerCase().trim();
    const correct = singularPluralPairs.find(p => p.id === id)?.plural.toLowerCase();
    return answer === correct && answer.length > 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6 mt-20">
   
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          href="/education/unit/nouns-gender-number/nouns-numbers"
          className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-4 sm:mb-6 transition-all hover:gap-3 font-medium text-sm sm:text-base"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to lesson
        </Link>

        {/* Fun Header */}
        <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-3xl shadow-2xl p-6 sm:p-8 mb-6 sm:mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
              <span className="text-3xl sm:text-4xl">🎯</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Exercise 2: Singular → Plural</h1>
              <p className="text-orange-100 text-sm sm:text-base mt-1">Convert each singular word to its plural form!</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/20 rounded-xl p-3 sm:p-4 mt-4">
            <span className="text-2xl sm:text-3xl">✨</span>
            <p className="text-sm sm:text-base text-white">
              <strong>Fun Challenge:</strong> Type the plural form of each word. Watch them turn green when you get it right!
            </p>
          </div>
        </div>
                {/* Rules Section - Kid-friendly */}
        <div className="mt-6 mb-10 sm:mt-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-2 border-purple-300 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl sm:text-3xl">📚</span>
            <h3 className="text-lg sm:text-xl font-bold text-purple-800">Plural Rules Quick Guide</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="bg-white/80 rounded-lg p-3 border border-purple-200">
              <div className="font-bold text-purple-700 mb-1 flex items-center gap-1">
                <span>➕</span>
                <span>Add -s</span>
              </div>
              <p className="text-gray-600">cat → cats, dog → dogs</p>
            </div>

            <div className="bg-white/80 rounded-lg p-3 border border-purple-200">
              <div className="font-bold text-orange-700 mb-1 flex items-center gap-1">
                <span>➕➕</span>
                <span>Add -es</span>
              </div>
              <p className="text-gray-600">bus → buses, box → boxes</p>
            </div>

            <div className="bg-white/80 rounded-lg p-3 border border-purple-200">
              <div className="font-bold text-pink-700 mb-1 flex items-center gap-1">
                <span>🔄</span>
                <span>y → ies</span>
              </div>
              <p className="text-gray-600">baby → babies, city → cities</p>
            </div>

            <div className="bg-white/80 rounded-lg p-3 border border-purple-200">
              <div className="font-bold text-indigo-700 mb-1 flex items-center gap-1">
                <span>🌟</span>
                <span>Special</span>
              </div>
              <p className="text-gray-600">child → children, foot → feet</p>
            </div>
          </div>
        </div>

        {/* Score Display */}
        {submitted && (
          <div className={`mb-6 sm:mb-8 p-4 sm:p-6 rounded-2xl sm:rounded-3xl text-center ${
            score === singularPluralPairs.length
              ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400 shadow-xl'
              : score >= singularPluralPairs.length / 2
              ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400 shadow-xl'
              : 'bg-gradient-to-r from-red-100 to-pink-100 border-2 border-red-400 shadow-xl'
          }`}>
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-3xl sm:text-4xl">
                {score === singularPluralPairs.length ? '🎉' : score >= singularPluralPairs.length / 2 ? '⭐' : '💪'}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Your Score: {score} / {singularPluralPairs.length}
              </h2>
            </div>
            <p className="text-gray-700 text-sm sm:text-base">
              {score === singularPluralPairs.length
                ? '🌟 Amazing! You\'re a plural word master!'
                : score >= singularPluralPairs.length / 2
                ? '👍 Great job! Keep practicing to get perfect!'
                : '🎯 Keep trying! Practice makes perfect!'}
            </p>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8 bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 border border-white/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📊</span>
              <span className="font-bold text-gray-800 text-sm sm:text-base">Your Progress</span>
            </div>
            <span className="text-sm sm:text-base font-semibold text-orange-600">
              {Object.keys(userAnswers).length} / {singularPluralPairs.length} completed
            </span>
          </div>
          <div className="w-full bg-gradient-to-r from-orange-200 to-pink-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-orange-500 to-pink-500 h-3 rounded-full transition-all duration-500 ease-out shadow-lg"
              style={{ width: `${(Object.keys(userAnswers).length / singularPluralPairs.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
            <span className="text-xl">🎮</span>
            <span>Type the plural forms below</span>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <Link
              href="/education/unit/nouns-gender-number/nouns-numbers"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-xl font-semibold hover:from-gray-200 hover:to-gray-300 transition-all shadow-md text-sm sm:text-base"
            >
              <span>🏠</span>
              <span className="hidden sm:inline">Back</span>
            </Link>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 sm:px-4 py-2 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md text-sm sm:text-base"
            >
              <span>🔄</span>
              <span className="hidden sm:inline">Reset</span>
            </button>
            {!submitted && Object.keys(userAnswers).length === singularPluralPairs.length && (
              <button
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 sm:px-4 py-2 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all shadow-md text-sm sm:text-base"
              >
                <span>✅</span>
                <span className="hidden sm:inline">Submit</span>
              </button>
            )}
          </div>
        </div>

        {/* Exercise Area */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 border border-white/50">
          <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
            <span className="text-3xl sm:text-4xl">✏️</span>
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              Write the Plural Form
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {singularPluralPairs.map(pair => {
              const userAnswer = userAnswers[pair.id];
              const correct = isCorrect(pair.id);
              const currentlyCorrect = isCurrentlyCorrect(pair.id);

              return (
                <div
                  key={pair.id}
                  className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 ${
                    submitted
                      ? correct
                        ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-400 shadow-lg'
                        : 'bg-gradient-to-br from-red-50 to-pink-50 border-red-400 shadow-lg'
                      : currentlyCorrect
                      ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-400 shadow-lg transform scale-105'
                      : 'bg-white border-orange-200 hover:border-orange-300 shadow-md hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg sm:text-xl">
                      {currentlyCorrect || (submitted && correct) ? '✅' : '📝'}
                    </span>
                    <span className="font-bold text-gray-800 text-sm sm:text-base">{pair.singular}</span>
                  </div>

                  <input
                    type="text"
                    value={userAnswer || ''}
                    onChange={(e) => !submitted && handleAnswerChange(pair.id, e.target.value)}
                    disabled={submitted}
                    placeholder="Type plural..."
                    className={`w-full p-2 sm:p-3 rounded-lg sm:rounded-xl border-2 transition-all duration-300 outline-none text-sm sm:text-base ${
                      submitted
                        ? correct
                          ? 'bg-green-50 border-green-400 text-green-800 font-semibold'
                          : 'bg-red-50 border-red-400 text-red-800'
                        : currentlyCorrect
                        ? 'bg-green-50 border-green-400 text-green-800 font-semibold'
                        : 'bg-white border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-200'
                    }`}
                  />

                  {currentlyCorrect && !submitted && (
                    <div className="text-xs sm:text-sm text-green-600 font-semibold mt-2 flex items-center gap-1">
                      <span>🎉</span>
                      <span>Correct!</span>
                    </div>
                  )}

                  {submitted && !correct && (
                    <div className="text-xs sm:text-sm text-purple-600 font-semibold mt-2 flex items-center gap-1">
                      <span>💡</span>
                      <span>{pair.plural}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Fun Instructions */}
        {!submitted && (
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-2 border-blue-200 shadow-xl">
            <div className="flex items-start gap-3">
              <span className="text-2xl sm:text-3xl">🎮</span>
              <div>
                <h3 className="font-bold text-blue-800 mb-2 text-sm sm:text-base">How to Play:</h3>
                <ol className="list-decimal list-inside text-blue-700 space-y-1 text-xs sm:text-sm">
                  <li>Type the plural form of each singular word</li>
                  <li>Watch for instant feedback as you type</li>
                  <li>Complete all words before submitting</li>
                  <li>Try to get all answers correct! 🎯</li>
                </ol>
              </div>
            </div>
          </div>
        )}



        {submitted && (
          <div className="mt-6 sm:mt-8 text-center space-y-3 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all shadow-xl text-sm sm:text-base"
            >
              <span>🔄</span>
              Try Again
            </button>
            <Link
              href="/education/unit/nouns-gender-number/nouns-numbers"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 px-6 sm:px-8 py-3 rounded-xl font-semibold hover:from-gray-300 hover:to-gray-400 transition-all shadow-xl text-sm sm:text-base"
            >
              <span>🏠</span>
              Back to Lesson
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}