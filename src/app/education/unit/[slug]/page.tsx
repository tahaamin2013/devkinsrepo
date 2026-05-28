'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

const unitData: Record<string, { title: string; description: string; subUnits?: Array<{ title: string; slug: string; exerciseCount: number }> }> = {
  'nouns-gender-number': {
    title: 'Unit 1: Nouns – Gender and Number',
    description: 'Learn about nouns, their gender classification, and number (singular/plural) forms in English grammar.',
    subUnits: [
      { title: 'Nouns – Gender', slug: 'nouns-gender', exerciseCount: 3 },
      { title: 'Nouns – Gender (Main)', slug: 'nouns-gender', exerciseCount: 1 },
      { title: 'Nouns – Numbers', slug: 'nouns-numbers', exerciseCount: 2 },
    ],
  },
  'nouns-case': {
    title: 'Unit 2: Nouns – Case',
    description: 'Understand the different cases of nouns and how they function in sentences.',
  },
  'pronouns': {
    title: 'Unit 3: Pronouns',
    description: 'Learn about pronouns and their usage in place of nouns.',
  },
  'adjectives': {
    title: 'Unit 4: Adjectives',
    description: 'Discover descriptive words that modify nouns and pronouns.',
  },
  'articles': {
    title: 'Unit 5: Articles',
    description: 'Master the use of definite and indefinite articles (a, an, the).',
  },
  'verbs': {
    title: 'Unit 6: Verbs',
    description: 'Understand verbs as action words and their role in sentences.',
  },
  'infinitives': {
    title: 'Unit 7: Infinitives',
    description: 'Learn about infinitive verbs and their functions.',
  },
  'gerunds': {
    title: 'Unit 8: Gerunds',
    description: 'Explore gerunds as verb forms ending in -ing that function as nouns.',
  },
  'participles': {
    title: 'Unit 9: Participles',
    description: 'Study present and past participles and their usage.',
  },
  'tenses': {
    title: 'Unit 10: Tenses',
    description: 'Master all twelve English verb tenses for precise communication.',
  },
  'adverbs': {
    title: 'Unit 11: Adverbs',
    description: 'Learn how adverbs modify verbs, adjectives, and other adverbs.',
  },
  'prepositions': {
    title: 'Unit 12: Prepositions',
    description: 'Understand prepositions and their role in showing relationships.',
  },
  'conjunctions': {
    title: 'Unit 13: Conjunctions',
    description: 'Discover connecting words that join words, phrases, and clauses.',
  },
  'interjections': {
    title: 'Unit 14: Interjections',
    description: 'Explore words that express strong emotions or sudden feelings.',
  },
  'sentences': {
    title: 'Unit 15: Sentences',
    description: 'Learn what makes a complete sentence and sentence structure.',
  },
  'phrases-clauses': {
    title: 'Unit 16: Phrases and Clauses',
    description: 'Distinguish between phrases and clauses and their functions.',
  },
  'concord': {
    title: 'Unit 17: Concord',
    description: 'Master subject-verb agreement and grammatical harmony.',
  },
  'voice': {
    title: 'Unit 18: Voice',
    description: 'Understand active and passive voice in English sentences.',
  },
  'types-of-sentences': {
    title: 'Unit 19: Types of Sentences',
    description: 'Learn about declarative, interrogative, imperative, and exclamatory sentences.',
  },
  'analysis-of-sentences': {
    title: 'Unit 20: Analysis of Sentences',
    description: 'Break down sentences into their component parts for better understanding.',
  },
  'synthesis-of-sentences': {
    title: 'Unit 21: Synthesis of Sentences',
    description: 'Combine multiple simple sentences into complex ones.',
  },
  'transformation-of-sentences': {
    title: 'Unit 22: Transformation of Sentences',
    description: 'Transform sentences while maintaining their meaning.',
  },
  'speech': {
    title: 'Unit 23: Speech',
    description: 'Master direct and indirect speech in English.',
  },
  'parts-of-speech': {
    title: 'Unit 24: Parts of Speech',
    description: 'Comprehensive overview of all eight parts of speech.',
  },
  'punctuation': {
    title: 'Unit 25: Punctuation',
    description: 'Learn proper punctuation marks and their usage.',
  },
  'comprehension': {
    title: 'Unit 26: Comprehension',
    description: 'Develop reading comprehension skills and strategies.',
  },
  'composition': {
    title: 'Unit 27: Composition',
    description: 'Learn to write effective compositions and essays.',
  },
};

export default function UnitPage() {
  const params = useParams();
  const slug = params.slug as string;
  const unit = unitData[slug];

  if (!unit) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Unit Not Found</h1>
          <Link href="/education" className="text-blue-600 hover:text-blue-700">
            ← Back to all units
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link href="/education" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all units
        </Link>

        {/* Unit Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{unit.title}</h1>
          <p className="text-lg text-gray-600">{unit.description}</p>
        </div>

        {/* Sub-Units or Content */}
        {unit.subUnits ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {unit.subUnits.map((subUnit) => (
              <div key={subUnit.slug} className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{subUnit.title}</h2>
                <div className="space-y-3">
                  {Array.from({ length: subUnit.exerciseCount }, (_, i) => i + 1).map((exerciseNum) => (
                    <Link
                      key={exerciseNum}
                      href={`/education/unit/${slug}/${subUnit.slug}/exercise-${exerciseNum}`}
                      className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-4 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Exercise {exerciseNum}</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800">Content Coming Soon</h3>
            </div>
            <p className="text-gray-600">
              This unit is currently being developed. Check back soon for lessons, exercises, and activities!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}