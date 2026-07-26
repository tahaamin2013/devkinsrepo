'use client';

import Link from 'next/link';

const grammarUnits = [
  { id: 1, title: 'Nouns – Gender and Number', slug: 'nouns-gender-number', hasContent: true },
  { id: 2, title: 'Nouns – Case', slug: 'nouns-case', hasContent: true },
  { id: 3, title: 'Pronouns', slug: 'pronouns', hasContent: false },
  { id: 4, title: 'Adjectives', slug: 'adjectives', hasContent: false },
  { id: 5, title: 'Articles', slug: 'articles', hasContent: false },
  { id: 6, title: 'Verbs', slug: 'verbs', hasContent: false },
  { id: 7, title: 'Infinitives', slug: 'infinitives', hasContent: false },
  { id: 8, title: 'Gerunds', slug: 'gerunds', hasContent: false },
  { id: 9, title: 'Participles', slug: 'participles', hasContent: false },
  { id: 10, title: 'Tenses', slug: 'tenses', hasContent: false },
  { id: 11, title: 'Adverbs', slug: 'adverbs', hasContent: false },
  { id: 12, title: 'Prepositions', slug: 'prepositions', hasContent: false },
  { id: 13, title: 'Conjunctions', slug: 'conjunctions', hasContent: false },
  { id: 14, title: 'Interjections', slug: 'interjections', hasContent: false },
  { id: 15, title: 'Sentences', slug: 'sentences', hasContent: false },
  { id: 16, title: 'Phrases and Clauses', slug: 'phrases-clauses', hasContent: false },
  { id: 17, title: 'Concord', slug: 'concord', hasContent: false },
  { id: 18, title: 'Voice', slug: 'voice', hasContent: false },
  { id: 19, title: 'Types of Sentences', slug: 'types-of-sentences', hasContent: false },
  { id: 20, title: 'Analysis of Sentences', slug: 'analysis-of-sentences', hasContent: false },
  { id: 21, title: 'Synthesis of Sentences', slug: 'synthesis-of-sentences', hasContent: false },
  { id: 22, title: 'Transformation of Sentences', slug: 'transformation-of-sentences', hasContent: false },
  { id: 23, title: 'Speech', slug: 'speech', hasContent: false },
  { id: 24, title: 'Parts of Speech', slug: 'parts-of-speech', hasContent: false },
  { id: 25, title: 'Punctuation', slug: 'punctuation', hasContent: false },
  { id: 26, title: 'Comprehension', slug: 'comprehension', hasContent: false },
  { id: 27, title: 'Composition', slug: 'composition', hasContent: false },
];

export default function EducationPage() {
  return (
    <div className="min-h-screen mt-30 bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            English Grammar for Juniors
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Master English grammar step by step with our comprehensive lessons covering all essential topics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {grammarUnits.map((unit) => (
            <Link
              key={unit.id}
              href={unit.hasContent ? `/education/unit/${unit.slug}` : '#'}
              className={`group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 p-6 border-2 ${
                unit.hasContent ? 'border-transparent hover:border-blue-400 cursor-pointer' : 'border-gray-300 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-colors ${
                      unit.hasContent ? 'bg-blue-500 text-white group-hover:bg-blue-600' : 'bg-gray-400 text-gray-200'
                    }`}>
                      {unit.id}
                    </span>
                    <h2 className={`text-lg font-semibold transition-colors line-clamp-2 ${
                      unit.hasContent ? 'text-gray-800 group-hover:text-blue-600' : 'text-gray-500'
                    }`}>
                      {unit.title}
                    </h2>
                  </div>
                  <p className={`text-sm transition-colors ${
                    unit.hasContent ? 'text-gray-500 group-hover:text-gray-600' : 'text-gray-400'
                  }`}>
                    {unit.hasContent ? 'Click to explore this unit' : 'Coming soon'}
                  </p>
                </div>
                {unit.hasContent && (
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-gray-600">
              Start with any unit and learn at your own pace
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}