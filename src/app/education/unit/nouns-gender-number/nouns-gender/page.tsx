'use client';

import Link from 'next/link';

export default function NounsGenderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 mt-30 pb-40">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/education/unit/nouns-gender-number"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-8 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to unit
        </Link>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Nouns – Gender</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Gender is a grammatical category that indicates whether a noun is masculine, feminine, or neuter.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              In English, gender is mostly natural, meaning it reflects the actual gender of living beings.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              <strong>Examples of Masculine Gender:</strong> man, father, brother, uncle, king, lion, bull
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              <strong>Examples of Feminine Gender:</strong> woman, mother, sister, aunt, queen, lioness, cow
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              <strong>Examples of Neuter Gender:</strong> book, table, car, tree, house, city
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Some nouns have different forms for different genders:
            </p>
            <ul className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              <li>Masculine → Feminine: hero → heroine, actor → actress, waiter → waitress</li>
              <li>Feminine → Masculine: niece → nephew, mare → stallion, doe → buck</li>
            </ul>
          </div>

          {/* Practice Section */}
          <div className="mt-8 p-6 bg-blue-50 dark:bg-gray-700 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Practice Exercises</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Test your understanding with these exercises:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                href="/education/unit/nouns-gender-number/nouns-gender/exercise-1"
                className="bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-300 rounded-lg p-4 text-center font-semibold hover:bg-blue-100 dark:hover:bg-gray-500 transition-colors border-2 border-blue-200 dark:border-gray-500"
              >
                Exercise 1: Identify Gender
              </Link>
              <Link
                href="/education/unit/nouns-gender-number/nouns-gender/exercise-2"
                className="bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-300 rounded-lg p-4 text-center font-semibold hover:bg-blue-100 dark:hover:bg-gray-500 transition-colors border-2 border-blue-200 dark:border-gray-500"
              >
                Exercise 2: Masculine → Feminine
              </Link>
              <Link
                href="/education/unit/nouns-gender-number/nouns-gender/exercise-3"
                className="bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-300 rounded-lg p-4 text-center font-semibold hover:bg-blue-100 dark:hover:bg-gray-500 transition-colors border-2 border-blue-200 dark:border-gray-500"
              >
                Exercise 3: Feminine → Masculine
              </Link>
              <Link
                href="/education/unit/nouns-gender-number/nouns-gender/exercise-4"
                className="bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-300 rounded-lg p-4 text-center font-semibold hover:bg-blue-100 dark:hover:bg-gray-500 transition-colors border-2 border-blue-200 dark:border-gray-500"
              >
                Exercise 4: Fill-in-the-Blanks
              </Link>
              <Link
                href="/education/unit/nouns-gender-number/nouns-gender/exercise-5"
                className="bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-300 rounded-lg p-4 text-center font-semibold hover:bg-blue-100 dark:hover:bg-gray-500 transition-colors border-2 border-blue-200 dark:border-gray-500"
              >
                Exercise 5: Choose the Right Word
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Rules Section - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)] p-4 z-50 border-t-2 border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-3">✅ Gender Rules</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            <div className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">Masculine:</span>
              <span className="text-gray-700 dark:text-gray-300 text-sm">Male (insan ya janwar) ke naam</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-pink-600 dark:text-pink-400 font-semibold text-sm">Feminine:</span>
              <span className="text-gray-700 dark:text-gray-300 text-sm">Female (insan ya janwar) ke naam</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm">Common:</span>
              <span className="text-gray-700 dark:text-gray-300 text-sm">Dono ke liye common</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-600 dark:text-gray-400 font-semibold text-sm">Neuter:</span>
              <span className="text-gray-700 dark:text-gray-300 text-sm">Chotay bachay aur janwar, Non-living things, Collectie Nouns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}