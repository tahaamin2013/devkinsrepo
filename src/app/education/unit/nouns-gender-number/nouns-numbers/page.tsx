'use client';

import Link from 'next/link';

export default function NounsNumbersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 mt-30">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/education/unit/nouns-gender-number"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to unit
        </Link>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Nouns – Numbers</h1>

          <div className="prose prose-lg max-w-none">
            {/* Abstract Nouns */}
            <div className="bg-purple-50 rounded-lg p-5 mb-5">
              <h4 className="text-lg font-bold text-purple-900 mb-3">9. Abstract Nouns</h4>
              <p className="text-gray-700 mb-3">
                Usually have no plural (uncountable).
              </p>
              <p className="text-gray-700 font-semibold mb-2">Examples</p>
              <ul className="text-gray-700 ml-5 mb-3">
                <li>hope</li>
                <li>charity</li>
                <li>love</li>
                <li>kindness</li>
              </ul>
              <div className="bg-white rounded p-3 border-l-4 border-purple-400">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">When pluralized, they refer to individual acts:</span>
                </p>
                <ul className="text-sm text-gray-600 ml-5 mt-2">
                  <li><span className="italic">kindnesses</span> = acts of kindness</li>
                </ul>
              </div>
            </div>

            {/* Material Nouns */}
            <div className="bg-amber-50 rounded-lg p-5 mb-5">
              <h4 className="text-lg font-bold text-amber-900 mb-3">10. Material Nouns (Names of Substances)</h4>
              <p className="text-gray-700 mb-3">
                Usually have no plural (uncountable).
              </p>
              <p className="text-gray-700 font-semibold mb-2">Examples</p>
              <ul className="text-gray-700 ml-5 mb-3">
                <li>copper</li>
                <li>iron</li>
                <li>tin</li>
                <li>wood</li>
              </ul>
              <div className="bg-white rounded p-3 border-l-4 border-amber-400">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">When used in plural, meanings change:</span>
                </p>
                <ul className="text-sm text-gray-600 ml-5 mt-2">
                  <li><span className="italic">coppers</span> = copper coins</li>
                  <li><span className="italic">irons</span> = fetters/chains</li>
                  <li><span className="italic">tins</span> = cans made of tin</li>
                  <li><span className="italic">woods</span> = forests</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Practice Section */}
          <div className="mt-8 p-6 bg-blue-50 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Practice Exercises</h2>
            <p className="text-gray-600 mb-4">Test your understanding with these exercises:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/education/unit/nouns-gender-number/nouns-numbers/exercise-1"
                className="bg-white text-blue-600 rounded-lg p-4 text-center font-semibold hover:bg-blue-100 transition-colors border-2 border-blue-200"
              >
                Exercise 1
              </Link>
              <Link
                href="/education/unit/nouns-gender-number/nouns-numbers/exercise-2"
                className="bg-white text-blue-600 rounded-lg p-4 text-center font-semibold hover:bg-blue-100 transition-colors border-2 border-blue-200"
              >
                Exercise 2
              </Link>
              <Link
                href="/education/unit/nouns-gender-number/nouns-numbers/exercise-3"
                className="bg-white text-blue-600 rounded-lg p-4 text-center font-semibold hover:bg-blue-100 transition-colors border-2 border-blue-200"
              >
                Exercise 3
              </Link>
              <Link
                href="/education/unit/nouns-gender-number/nouns-numbers/exercise-4"
                className="bg-white text-blue-600 rounded-lg p-4 text-center font-semibold hover:bg-blue-100 transition-colors border-2 border-blue-200"
              >
                Exercise 4
              </Link>
              <Link
                href="/education/unit/nouns-gender-number/nouns-numbers/exercise-5"
                className="bg-white text-blue-600 rounded-lg p-4 text-center font-semibold hover:bg-blue-100 transition-colors border-2 border-blue-200"
              >
                Exercise 5
              </Link>
              <Link
                href="/education/unit/nouns-gender-number/nouns-numbers/exercise-6"
                className="bg-white text-blue-600 rounded-lg p-4 text-center font-semibold hover:bg-blue-100 transition-colors border-2 border-blue-200"
              >
                Exercise 6
              </Link>
              <Link
                href="/education/unit/nouns-gender-number/nouns-numbers/exercise-7"
                className="bg-white text-blue-600 rounded-lg p-4 text-center font-semibold hover:bg-blue-100 transition-colors border-2 border-blue-200"
              >
                Exercise 7
              </Link>
              <Link
                href="/education/unit/nouns-gender-number/nouns-numbers/exercise-8"
                className="bg-white text-blue-600 rounded-lg p-4 text-center font-semibold hover:bg-blue-100 transition-colors border-2 border-blue-200"
              >
                Exercise 8
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}