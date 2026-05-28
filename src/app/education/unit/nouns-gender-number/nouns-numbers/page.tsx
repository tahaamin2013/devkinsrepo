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
            <p className="text-gray-700 leading-relaxed mb-4">
              Number indicates whether a noun is singular (one) or plural (more than one).
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Singular nouns</strong> refer to one person, place, thing, or idea.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Plural nouns</strong> refer to more than one person, place, thing, or idea.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
              Rules for forming plurals:
            </p>
            <ul className="text-gray-700 leading-relaxed mb-4">
              <li>Most nouns: add -s (cat → cats, dog → dogs)</li>
              <li>Nouns ending in -s, -x, -z, -ch, -sh: add -es (bus → buses, box → boxes)</li>
              <li>Nouns ending in consonant + y: change y to i and add -es (baby → babies)</li>
              <li>Nouns ending in vowel + y: add -s (boy → boys, day → days)</li>
              <li>Nouns ending in -f or -fe: change to -ves (leaf → leaves, knife → knives)</li>
              <li>Irregular plurals: man → men, woman → women, child → children, foot → feet</li>
            </ul>
          </div>

          {/* Practice Section */}
          <div className="mt-8 p-6 bg-blue-50 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Practice Exercises</h2>
            <p className="text-gray-600 mb-4">Test your understanding with these exercises:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}