'use client';

import Link from 'next/link';

export default function NounsGenderNumberPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 mt-30">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link href="/education" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-8 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all units
        </Link>

        {/* Unit Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Unit 2: Nouns – Cases</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Learn about nouns, their gender classification, and number (singular/plural) forms in English grammar.
          </p>
        </div>

        {/* Sub-Units */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Nominative Case */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Nominative Case</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Learn about the nominative case of nouns and pronouns.
            </p>
            <div className="space-y-3">
              <Link
                href="/education/unit/nouns-case/nominative-case/exercise-1"
                className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg p-4 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Exercise 1</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
        
            </div>
          </div>

          {/* Objective Case/Accusative Case */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Objective Case/Accusative Case</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Learn about the objective (accusative) case of nouns and pronouns.
            </p>
            <div className="space-y-3">
              <Link
                href="/education/unit/nouns-case/objective-case/exercise-1"
                className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg p-4 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Exercise 1</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
              <Link
                href="/education/unit/nouns-case/objective-case/exercise-2"
                className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg p-4 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Exercise 2</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
              <Link
                href="/education/unit/nouns-case/objective-case/exercise-3"
                className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg p-4 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Exercise 3</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
              <Link
                href="/education/unit/nouns-case/objective-case/exercise-4"
                className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg p-4 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Exercise 4</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
              <Link
                href="/education/unit/nouns-case/objective-case/exercise-5"
                className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg p-4 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Exercise 5</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>

          {/* Possessive (Genitive) Case */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Possessive (Genitive) Case</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Learn about the possessive (genitive) case in English grammar.
            </p>
            <div className="space-y-3">
              <Link
                href="/education/unit/nouns-case/possessive-case/exercise-1"
                className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg p-4 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Exercise 1</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
              <Link
                href="/education/unit/nouns-case/possessive-case/exercise-2"
                className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg p-4 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Exercise 2</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
              <Link
                href="/education/unit/nouns-case/possessive-case/exercise-3"
                className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg p-4 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Exercise 3</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
              <Link
                href="/education/unit/nouns-case/possessive-case/exercise-4"
                className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg p-4 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Exercise 4</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
              <Link
                href="/education/unit/nouns-case/possessive-case/exercise-5"
                className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg p-4 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Exercise 5</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}