'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

const subUnitContent: Record<string, { title: string; content: string[]; exerciseCount: number }> = {
  'nouns-gender': {
    title: 'Nouns – Gender',
    content: [
      'Gender is a grammatical category that indicates whether a noun is masculine, feminine, or neuter.',
      'In English, gender is mostly natural, meaning it reflects the actual gender of living beings.',
      'Examples of Masculine Gender: man, father, brother, uncle, king, lion, bull',
      'Examples of Feminine Gender: woman, mother, sister, aunt, queen, lioness, cow',
      'Examples of Neuter Gender: book, table, car, tree, house, city',
      'Some nouns have different forms for different genders:',
      '- Masculine → Feminine: hero → heroine, actor → actress, waiter → waitress',
      '- Feminine → Masculine: niece → nephew, mare → stallion, doe → buck',
    ],
    exerciseCount: 3,
  },
  'nouns-numbers': {
    title: 'Nouns – Numbers',
    content: [
      'Number indicates whether a noun is singular (one) or plural (more than one).',
      'Singular nouns refer to one person, place, thing, or idea.',
      'Plural nouns refer to more than one person, place, thing, or idea.',
      'Rules for forming plurals:',
      '- Most nouns: add -s (cat → cats, dog → dogs)',
      '- Nouns ending in -s, -x, -z, -ch, -sh: add -es (bus → buses, box → boxes)',
      '- Nouns ending in consonant + y: change y to i and add -es (baby → babies)',
      '- Nouns ending in vowel + y: add -s (boy → boys, day → days)',
      '- Nouns ending in -f or -fe: change to -ves (leaf → leaves, knife → knives)',
      '- Irregular plurals: man → men, woman → women, child → children, foot → feet',
    ],
    exerciseCount: 2,
  },
};

export default function SubUnitPage() {
  const params = useParams();
  const subSlug = params.subSlug as string;
  const subUnit = subUnitContent[subSlug];

  if (!subUnit) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Content Not Found</h1>
          <Link href="/education" className="text-blue-600 hover:text-blue-700">
            ← Back to all units
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href={`/education/unit/${params.slug}`}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to unit
        </Link>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{subUnit.title}</h1>

          <div className="prose prose-lg max-w-none">
            {subUnit.content.map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Practice Section */}
          <div className="mt-8 p-6 bg-blue-50 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Practice Exercises</h2>
            <p className="text-gray-600 mb-4">Test your understanding with these exercises:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Array.from({ length: subUnit.exerciseCount }, (_, i) => i + 1).map((num) => (
                <Link
                  key={num}
                  href={`/education/unit/${params.slug}/${subSlug}/exercise-${num}`}
                  className="bg-white text-blue-600 rounded-lg p-4 text-center font-semibold hover:bg-blue-100 transition-colors border-2 border-blue-200"
                >
                  Exercise {num}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}