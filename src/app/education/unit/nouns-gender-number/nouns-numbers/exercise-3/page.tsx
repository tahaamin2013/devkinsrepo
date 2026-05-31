'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface MCQQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
  category: string;
  explanation: string;
}

const CATEGORY_META: Record<string, { color: string; icon: string }> = {
  'All': { color: '#4F46E5', icon: '🗂️' },
  'Same singular & plural': { color: '#3B82F6', icon: '🐑' },
  'Person & People': { color: '#8B5CF6', icon: '👥' },
  'Instruments with two parts': { color: '#F97316', icon: '✂️' },
  'Clothes': { color: '#10B981', icon: '👖' },
  'Diseases': { color: '#EF4444', icon: '🤒' },
  'Games': { color: '#6366F1', icon: '🎯' },
  'Collective nouns': { color: '#14B8A6', icon: '🐄' },
  'Compound nouns': { color: '#F59E0B', icon: '🥄' },
  'Letters & symbols': { color: '#7C3AED', icon: '🔤' },
  'Family names': { color: '#EC4899', icon: '👨‍👩‍👧' },
  'Material nouns': { color: '#D97706', icon: '🪙' },
  'Abstract nouns': { color: '#06B6D4', icon: '💭' },
  'Singular from Plural': { color: '#64748B', icon: '🔁' },
  'Plural from Singular': { color: '#9333EA', icon: '➕' },
};

const ALL_QUESTIONS: MCQQuestion[] = [
  { id: '1', category: 'Same singular & plural', question: 'What is the plural of "sheep"?', options: ['sheeps', 'sheep', 'sheepes', 'sheepen'], answer: 'sheep', explanation: 'Sheep is one of the words that has the same form in singular and plural.' },
  { id: '2', category: 'Same singular & plural', question: 'What is the plural of "deer"?', options: ['deers', 'deeres', 'deer', 'deerens'], answer: 'deer', explanation: 'Deer does not change in its plural form — it stays "deer".' },
  { id: '3', category: 'Same singular & plural', question: 'What is the plural of "salmon"?', options: ['salmons', 'salmonies', 'salmonnes', 'salmon'], answer: 'salmon', explanation: 'Salmon is another word that stays the same in plural form.' },
  { id: '4', category: 'Same singular & plural', question: 'What is the usual plural of "fish"?', options: ['fishies', 'fishs', 'fishes', 'fish'], answer: 'fish', explanation: 'Fish usually stays the same in plural. "Fishes" is only used when referring to different species.' },
  { id: '5', category: 'Same singular & plural', question: 'Which word means "different kinds of fish"?', options: ['fishs', 'fish', 'fishings', 'fishes'], answer: 'fishes', explanation: '"Fishes" is used specifically when referring to different types or species of fish.' },
  { id: '6', category: 'Person & People', question: 'What is the normal (everyday) plural of "person"?', options: ['persons', 'personnes', 'peoples', 'people'], answer: 'people', explanation: '"People" is the common everyday plural of "person".' },
  { id: '7', category: 'Person & People', question: 'What is the formal or official plural of "person"?', options: ['peoples', 'persons', 'people', 'personage'], answer: 'persons', explanation: '"Persons" is used in official or legal documents.' },
  { id: '8', category: 'Instruments with two parts', question: 'What is the plural of "scissors"?', options: ['scissor', 'scissorses', 'scissorens', 'scissors'], answer: 'scissors', explanation: 'Scissors is always used in plural form because it has two blades.' },
  { id: '9', category: 'Instruments with two parts', question: 'What is the plural of "spectacles" (glasses)?', options: ['spectacle', 'spectacless', 'spectaclies', 'spectacles'], answer: 'spectacles', explanation: 'Spectacles always stays plural as it refers to a pair of lenses.' },
  { id: '10', category: 'Instruments with two parts', question: 'What is the plural of "binoculars"?', options: ['binocular', 'binocularses', 'binocularies', 'binoculars'], answer: 'binoculars', explanation: 'Binoculars is always used in its plural form.' },
  { id: '11', category: 'Instruments with two parts', question: 'What is the plural of "tongs"?', options: ['tong', 'tonges', 'tongies', 'tongs'], answer: 'tongs', explanation: 'Tongs is always used in plural form because it has two arms.' },
  { id: '12', category: 'Clothes', question: 'What is the plural of "trousers"?', options: ['trouser', 'trouseries', 'trouserses', 'trousers'], answer: 'trousers', explanation: 'Trousers always takes a plural form in English.' },
  { id: '13', category: 'Clothes', question: 'What is the plural of "jeans"?', options: ['jean', 'jeanies', 'jeanses', 'jeans'], answer: 'jeans', explanation: 'Jeans is always used as a plural noun.' },
  { id: '14', category: 'Clothes', question: 'What is the plural of "pyjamas"?', options: ['pyjama', 'pyjamaes', 'pyjamates', 'pyjamas'], answer: 'pyjamas', explanation: 'Pyjamas is always used in the plural form.' },
  { id: '15', category: 'Clothes', question: 'What is the plural of "shorts"?', options: ['short', 'shorties', 'shortses', 'shorts'], answer: 'shorts', explanation: 'Shorts always stays in plural form.' },
  { id: '16', category: 'Diseases', question: 'What is the plural of "measles"?', options: ['measle', 'measlies', 'measless', 'measles'], answer: 'measles', explanation: 'Measles is always used in the plural form, even when referring to one disease.' },
  { id: '17', category: 'Diseases', question: 'What is the plural of "mumps"?', options: ['mump', 'mumpies', 'mumpses', 'mumps'], answer: 'mumps', explanation: 'Mumps is always used in the plural form.' },
  { id: '18', category: 'Games', question: 'What is the plural of "billiards"?', options: ['billiard', 'billiardes', 'billiardsies', 'billiards'], answer: 'billiards', explanation: 'Billiards is always used in plural form as a game name.' },
  { id: '19', category: 'Games', question: 'What is the plural of "draughts" (the board game)?', options: ['draught', 'draughtses', 'draughties', 'draughts'], answer: 'draughts', explanation: 'Draughts is always used in the plural form when referring to the game.' },
  { id: '20', category: 'Collective nouns', question: 'What is the plural of "poultry"?', options: ['poultrys', 'poultryes', 'poultrens', 'poultry'], answer: 'poultry', explanation: 'Poultry is a collective noun and stays the same in plural.' },
  { id: '21', category: 'Collective nouns', question: 'What is the plural of "cattle"?', options: ['cattles', 'cattlies', 'cattlens', 'cattle'], answer: 'cattle', explanation: 'Cattle is a collective noun and does not change in plural.' },
  { id: '22', category: 'Collective nouns', question: 'What is the plural of "vermin"?', options: ['vermins', 'verminies', 'verminnes', 'vermin'], answer: 'vermin', explanation: 'Vermin is a collective noun and stays the same in plural.' },
  { id: '23', category: 'Collective nouns', question: 'What is the plural of "people" when referring to different nations?', options: ['person', 'peoples', 'peoplens', 'peopless'], answer: 'peoples', explanation: '"Peoples" is used when referring to different groups, nations, or ethnic groups.' },
  { id: '24', category: 'Compound nouns', question: 'What is the plural of "spoonful"?', options: ['spoonsful', 'spoonfulls', 'spoonfulies', 'spoonfuls'], answer: 'spoonfuls', explanation: 'For compound nouns ending in "-ful", add -s to the end: spoonfuls.' },
  { id: '25', category: 'Compound nouns', question: 'What is the plural of "handful"?', options: ['handsful', 'handfulls', 'handfulies', 'handfuls'], answer: 'handfuls', explanation: 'For compound nouns ending in "-ful", add -s to the end: handfuls.' },
  { id: '26', category: 'Letters & symbols', question: 'How do you write the plural of the letter "e"?', options: ['es', 'ees', 'e-s', "e's"], answer: "e's", explanation: "Letters use an apostrophe + s for their plural form: e's." },
  { id: '27', category: 'Letters & symbols', question: 'How do you write the plural of the letter "a"?', options: ['as', 'aas', 'a-s', "a's"], answer: "a's", explanation: "Letters use apostrophe + s: a's." },
  { id: '28', category: 'Letters & symbols', question: 'How do you write the plural of the number "5"?', options: ['5s', '55s', '5-s', "5's"], answer: "5's", explanation: "Numbers also use apostrophe + s for their plural form: 5's." },
  { id: '29', category: 'Family names', question: 'What is the plural of "Miss Smith" (more than one)?', options: ['Misses Smiths', 'Miss Smithes', 'Miss Smithies', 'Miss Smiths'], answer: 'Miss Smiths', explanation: 'One way to pluralize a title + name is to add -s to the surname: Miss Smiths.' },
  { id: '30', category: 'Family names', question: 'What is the other way to say the plural of "Miss Smith"?', options: ['Miss Smithes', 'Misses Smith', 'Missy Smith', 'Missies Smith'], answer: 'Misses Smith', explanation: 'The other way is to change the title to its plural form: Misses Smith.' },
  { id: '31', category: 'Material nouns', question: 'What does "coppers" mean in its plural sense?', options: ['copper wires', 'copper tools', 'copper pots', 'copper coins'], answer: 'copper coins', explanation: '"Coppers" refers to coins made of copper.' },
  { id: '32', category: 'Material nouns', question: 'What does "irons" mean in its plural sense?', options: ['iron rods', 'iron tools', 'iron sheets', 'fetters/chains'], answer: 'fetters/chains', explanation: '"Irons" refers to fetters or chains used for restraining.' },
  { id: '33', category: 'Material nouns', question: 'What does "tins" mean in its plural sense?', options: ['tin roofs', 'tin coins', 'tin wires', 'cans made of tin'], answer: 'cans made of tin', explanation: '"Tins" refers to cans or containers made of tin.' },
  { id: '34', category: 'Material nouns', question: 'What does "woods" mean in its plural sense?', options: ['wooden planks', 'wood types', 'wood fires', 'forests'], answer: 'forests', explanation: '"Woods" refers to forests or groups of trees.' },
  { id: '35', category: 'Abstract nouns', question: 'What does "kindnesses" mean in its plural sense?', options: ['types of people', 'kind animals', 'feelings of joy', 'acts of kindness'], answer: 'acts of kindness', explanation: '"Kindnesses" refers to specific individual acts of kindness.' },
  { id: '36', category: 'Singular from Plural', question: 'What is the singular of "mice"?', options: ['mices', 'mous', 'micen', 'mouse'], answer: 'mouse', explanation: '"Mice" is the irregular plural of "mouse" — a vowel mutation pattern.' },
  { id: '37', category: 'Singular from Plural', question: 'What is the singular of "flies"?', options: ['flyes', 'flis', 'flyen', 'fly'], answer: 'fly', explanation: '"Flies" comes from "fly" — when a word ends in consonant+y, the y changes to ies.' },
  { id: '38', category: 'Singular from Plural', question: 'What is the singular of "watches"?', options: ['watchs', 'watche', 'watchie', 'watch'], answer: 'watch', explanation: '"Watches" comes from "watch" — sibilant endings get -es added.' },
  { id: '39', category: 'Singular from Plural', question: 'What is the singular of "children"?', options: ['childs', 'childen', 'childie', 'child'], answer: 'child', explanation: '"Children" is the irregular plural of "child" — an old English suffix pattern.' },
  { id: '40', category: 'Singular from Plural', question: 'What is the singular of "houses"?', options: ['hous', 'housie', 'housens', 'house'], answer: 'house', explanation: '"Houses" is the regular plural of "house" — just add -s.' },
  { id: '41', category: 'Singular from Plural', question: 'What is the singular of "cities"?', options: ['citys', 'citie', 'cityen', 'city'], answer: 'city', explanation: '"Cities" comes from "city" — consonant+y words change y to ies.' },
  { id: '42', category: 'Plural from Singular', question: 'What is the plural of "baby"?', options: ['babys', 'babieses', 'babynes', 'babies'], answer: 'babies', explanation: 'Words ending in consonant+y change y to ies: baby → babies.' },
  { id: '43', category: 'Plural from Singular', question: 'What is the plural of "branch"?', options: ['branchs', 'branchies', 'branchens', 'branches'], answer: 'branches', explanation: 'Words ending in -ch take -es in the plural: branch → branches.' },
  { id: '44', category: 'Plural from Singular', question: 'What is the plural of "bush"?', options: ['bushs', 'bushies', 'bushens', 'bushes'], answer: 'bushes', explanation: 'Words ending in -sh take -es in the plural: bush → bushes.' },
  { id: '45', category: 'Plural from Singular', question: 'What is the plural of "wolf"?', options: ['wolfs', 'wolfes', 'wolfens', 'wolves'], answer: 'wolves', explanation: 'Words ending in -f or -fe often change to -ves: wolf → wolves.' },
  { id: '46', category: 'Plural from Singular', question: 'What is the plural of "army"?', options: ['armys', 'armyes', 'armieses', 'armies'], answer: 'armies', explanation: 'Consonant+y words change y to ies: army → armies.' },
  { id: '47', category: 'Plural from Singular', question: 'What is the plural of "loaf"?', options: ['loafs', 'loafes', 'loafens', 'loaves'], answer: 'loaves', explanation: '-f words often change to -ves: loaf → loaves.' },
  { id: '48', category: 'Plural from Singular', question: 'What is the plural of "goose"?', options: ['gooses', 'goosies', 'goosens', 'geese'], answer: 'geese', explanation: '"Geese" is an irregular plural of "goose" — a vowel mutation pattern.' },
  { id: '49', category: 'Plural from Singular', question: 'What is the plural of "face"?', options: ['facees', 'facies', 'facens', 'faces'], answer: 'faces', explanation: 'Regular -e words just add -s: face → faces.' },
  { id: '50', category: 'Plural from Singular', question: 'What is the plural of "wife"?', options: ['wifes', 'wifees', 'wifens', 'wives'], answer: 'wives', explanation: '-fe words change to -ves: wife → wives.' },
  { id: '51', category: 'Plural from Singular', question: 'What is the plural of "child"?', options: ['childs', 'childies', 'childes', 'children'], answer: 'children', explanation: '"Children" is the irregular plural of "child".' },
  { id: '52', category: 'Plural from Singular', question: 'What is the plural of "fox"?', options: ['foxs', 'foxies', 'foxens', 'foxes'], answer: 'foxes', explanation: 'Words ending in -x take -es: fox → foxes.' },
  { id: '53', category: 'Plural from Singular', question: 'What is the plural of "buffalo"?', options: ['buffalos', 'buffalies', 'buffalens', 'buffaloes'], answer: 'buffaloes', explanation: 'Words ending in -o often take -oes: buffalo → buffaloes.' },
  { id: '54', category: 'Plural from Singular', question: 'What is the plural of "potato"?', options: ['potatos', 'potatoies', 'potatoens', 'potatoes'], answer: 'potatoes', explanation: 'Words ending in -o take -oes: potato → potatoes.' },
];

const CATEGORIES = ['All', ...Array.from(new Set(ALL_QUESTIONS.map(q => q.category)))];

export default function Exercise3MCQPage() {
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');

  const questionsPerPage = 5;

  const filteredQuestions = useMemo(() =>
    activeCategory === 'All'
      ? ALL_QUESTIONS
      : ALL_QUESTIONS.filter(q => q.category === activeCategory),
    [activeCategory]
  );

  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
  const currentQuestions = filteredQuestions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );

  const handleSelect = (id: string, option: string) => {
    if (submitted) return;
    const existing = userAnswers[id];
    // If already answered correctly, lock it
    const q = ALL_QUESTIONS.find(q => q.id === id);
    if (existing && existing === q?.answer) return;
    setUserAnswers(prev => ({ ...prev, [id]: option }));
  };

  const handleSubmit = () => {
    let correct = 0;
    ALL_QUESTIONS.forEach(q => { if (userAnswers[q.id] === q.answer) correct++; });
    setScore(correct);
    setSubmitted(true);
    setCurrentPage(0);
  };

  const handleReset = () => {
    setUserAnswers({});
    setSubmitted(false);
    setScore(0);
    setCurrentPage(0);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(0);
  };

  const answeredCount = ALL_QUESTIONS.filter(q => userAnswers[q.id] === q.answer).length;
  const allAnswered = answeredCount === ALL_QUESTIONS.length;

  // Per-category stats
  const getCatStats = (cat: string) => {
    const qs = cat === 'All' ? ALL_QUESTIONS : ALL_QUESTIONS.filter(q => q.category === cat);
    const correct = qs.filter(q => userAnswers[q.id] === q.answer).length;
    return { total: qs.length, answered: correct, correct };
  };

  const getScoreGrade = () => {
    const pct = score / ALL_QUESTIONS.length;
    if (pct >= 0.9) return { emoji: '🏆', label: "Exceptional! You've mastered advanced plurals!", color: '#059669' };
    if (pct >= 0.7) return { emoji: '⭐', label: 'Strong performance! Review your mistakes.', color: '#D97706' };
    if (pct >= 0.5) return { emoji: '💪', label: 'Passing score, but more practice helps.', color: '#EA580C' };
    return { emoji: '📚', label: 'Requires significant review and practice.', color: '#DC2626' };
  };

  const getCategoryColor = (category: string) => CATEGORY_META[category]?.color || '#6B7280';
  const getCategoryIcon = (category: string) => CATEGORY_META[category]?.icon || '📌';

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 50%, #FDF2F8 100%)', padding: '2rem 1rem', marginTop: '5rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        {/* Back */}
        <Link href="/education/unit/nouns-gender-number/nouns-numbers" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#4F46E5', textDecoration: 'none', marginBottom: '1.25rem', fontWeight: 600, fontSize: '0.9rem' }}>
          ← Back to lesson
        </Link>

        {/* ── CATEGORY TABS ── */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            display: 'flex', gap: '8px', flexWrap: 'wrap',
            background: 'white', borderRadius: '16px', padding: '10px',
            boxShadow: '0 2px 16px rgba(0,0,0,0.07)', border: '1px solid #E5E7EB',
          }}>
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat;
              const color = getCategoryColor(cat);
              const icon = getCategoryIcon(cat);
              const stats = getCatStats(cat);
              const allDone = stats.answered === stats.total;
              const allCorrect = stats.correct === stats.total && allDone;

              // Dot indicator color
              let dotColor = '#D1D5DB'; // unanswered
              if (allDone && allCorrect) dotColor = '#10B981';
              else if (allDone && !allCorrect) dotColor = '#EF4444';
              else if (stats.answered > 0) dotColor = '#F59E0B';

              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '7px 13px', borderRadius: '10px', border: '1.5px solid',
                    borderColor: isActive ? color : '#E5E7EB',
                    background: isActive ? color : '#F9FAFB',
                    color: isActive ? 'white' : '#374151',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.8rem', cursor: 'pointer',
                    transition: 'all 0.18s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span style={{ fontSize: '0.9rem' }}>{icon}</span>
                  <span>{cat}</span>
                  {/* Progress dot */}
                  <span style={{
                    width: '7px', height: '7px', borderRadius: '50%',
                    background: isActive ? 'rgba(255,255,255,0.7)' : dotColor,
                    flexShrink: 0,
                    border: isActive ? '1px solid rgba(255,255,255,0.4)' : 'none',
                  }} />
                  {/* Count badge */}
                  <span style={{
                    background: isActive ? 'rgba(255,255,255,0.25)' : '#E5E7EB',
                    color: isActive ? 'white' : '#6B7280',
                    borderRadius: '999px', padding: '1px 7px',
                    fontSize: '0.7rem', fontWeight: 700,
                  }}>
                    {stats.total}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Category subtitle bar */}
          {activeCategory !== 'All' && (
            <div style={{
              marginTop: '8px', padding: '8px 14px',
              background: getCategoryColor(activeCategory) + '15',
              border: `1px solid ${getCategoryColor(activeCategory)}30`,
              borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: getCategoryColor(activeCategory) }}>
                {getCategoryIcon(activeCategory)} Showing: {activeCategory}
              </span>
              <span style={{ fontSize: '0.78rem', color: '#6B7280' }}>
                {getCatStats(activeCategory).answered} / {getCatStats(activeCategory).total} answered
                {getCatStats(activeCategory).answered > 0 && (
                  <> &nbsp;·&nbsp; {getCatStats(activeCategory).correct} correct</>
                )}
              </span>
            </div>
          )}
        </div>

        {/* ── HEADER ── */}
        <div style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)', borderRadius: '20px', padding: '1.75rem 2rem', marginBottom: '1.5rem', color: 'white', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '150px', height: '150px', background: 'rgba(255,255,255,0.07)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-30px', left: '-30px', width: '100px', height: '100px', background: 'rgba(255,255,255,0.07)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', position: 'relative' }}>
            <div style={{ width: '52px', height: '52px', background: 'rgba(255,255,255,0.15)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>📋</div>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.45rem', fontWeight: 700 }}>Exercise 3: Advanced Plural MCQ</h1>
              <p style={{ margin: '3px 0 0', color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem' }}>
                {activeCategory === 'All' ? '54 questions across 14 categories' : `${getCatStats(activeCategory).total} questions · ${activeCategory}`}
              </p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', position: 'relative' }}>
            {[
              ['Questions', String(activeCategory === 'All' ? 54 : getCatStats(activeCategory).total), 'in this view'],
              ['Passing', '70%', '38+ correct'],
              ['Format', 'MCQ', '4 options each'],
            ].map(([label, value, sub]) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 12px', border: '1px solid rgba(255,255,255,0.15)' }}>
                <div style={{ fontWeight: 700, fontSize: '1rem' }}>{value}</div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', marginTop: '2px' }}>{label} · {sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SCORE ── */}
        {submitted && (() => {
          const grade = getScoreGrade();
          return (
            <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', border: `2px solid ${grade.color}`, textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.4rem' }}>{grade.emoji}</div>
              <h2 style={{ margin: '0 0 0.4rem', fontSize: '1.5rem', fontWeight: 700, color: '#1F2937' }}>
                {score} / {ALL_QUESTIONS.length} Correct
              </h2>
              <p style={{ margin: 0, color: grade.color, fontWeight: 600 }}>{grade.label}</p>
              <p style={{ margin: '8px 0 0', fontSize: '0.78rem', color: '#6B7280' }}>Passing: 38+ &nbsp;|&nbsp; Excellent: 49+</p>
            </div>
          );
        })()}

        {/* ── PROGRESS ── */}
        <div style={{ background: 'white', borderRadius: '14px', padding: '1rem 1.25rem', marginBottom: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontWeight: 600, color: '#374151', fontSize: '0.88rem' }}>
              📊 {activeCategory === 'All' ? 'Overall Progress' : `${activeCategory} Progress`}
            </span>
            <span style={{ fontWeight: 600, color: getCategoryColor(activeCategory), fontSize: '0.88rem' }}>
              {getCatStats(activeCategory).answered} / {getCatStats(activeCategory).total} answered
            </span>
          </div>
          <div style={{ background: '#E0E7FF', borderRadius: '999px', height: '9px', overflow: 'hidden' }}>
            <div style={{
              background: `linear-gradient(90deg, ${getCategoryColor(activeCategory)}, ${getCategoryColor(activeCategory)}99)`,
              height: '100%', borderRadius: '999px',
              width: `${(getCatStats(activeCategory).answered / getCatStats(activeCategory).total) * 100}%`,
              transition: 'width 0.4s ease',
            }} />
          </div>
        </div>

        {/* ── QUESTIONS ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          {currentQuestions.map((q, idx) => {
            const globalIdx = currentPage * questionsPerPage + idx;
            const selected = userAnswers[q.id];
            const isAnswered = !!selected;
            const isCorrect = selected === q.answer;
            const catColor = getCategoryColor(q.category);

            return (
              <div key={q.id} style={{
                background: isAnswered && isCorrect ? '#F0FDF4' : 'white',
                borderRadius: '16px', padding: '1.25rem',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                border: isAnswered && isCorrect ? '2px solid #10B981' : '2px solid #E5E7EB',
                transition: 'all 0.25s ease',
              }}>
                {/* Category badge */}
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  background: catColor + '18', color: catColor,
                  border: `1px solid ${catColor}35`,
                  borderRadius: '999px', padding: '2px 10px',
                  fontSize: '0.7rem', fontWeight: 700, marginBottom: '10px',
                }}>
                  {getCategoryIcon(q.category)} {q.category}
                </span>

                {/* Question */}
                <p style={{ margin: '0 0 1rem', fontWeight: 600, color: '#1F2937', fontSize: '0.95rem', lineHeight: 1.55 }}>
                  <span style={{ color: '#9CA3AF', fontWeight: 700, marginRight: '6px', fontSize: '0.85rem' }}>Q{globalIdx + 1}.</span>
                  {q.question}
                </p>

                {/* Options */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {q.options.map((opt, oi) => {
                    const labels = ['A', 'B', 'C', 'D'];
                    const isSelected = selected === opt;
                    const isRight = opt === q.answer;

                    let bg = '#F9FAFB', border = '#E5E7EB', color = '#374151';
                    let labelBg = '#E5E7EB', labelColor = '#6B7280';

                    if (isAnswered) {
                      if (isCorrect && isRight) {
                        // Only go green when user picked the correct one
                        bg = '#ECFDF5'; border = '#10B981'; color = '#065F46';
                        labelBg = '#10B981'; labelColor = 'white';
                      } else if (isSelected && !isCorrect) {
                        // Red only on the wrong option the user picked
                        bg = '#FEF2F2'; border = '#EF4444'; color = '#7F1D1D';
                        labelBg = '#EF4444'; labelColor = 'white';
                      }
                    }

                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelect(q.id, opt)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '8px',
                          background: bg, border: `1.5px solid ${border}`, borderRadius: '10px',
                          padding: '10px 12px',
                          cursor: (submitted || isCorrect) ? 'default' : 'pointer',
                          color, fontWeight: (isSelected || (isCorrect && isRight)) ? 600 : 400,
                          fontSize: '0.88rem', textAlign: 'left', transition: 'all 0.2s',
                        }}
                      >
                        <span style={{
                          minWidth: '24px', height: '24px', background: labelBg, color: labelColor,
                          borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '0.72rem', fontWeight: 700, flexShrink: 0,
                        }}>
                          {labels[oi]}
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {/* Realtime feedback — correct only */}
                {isAnswered && isCorrect && (
                  <div style={{
                    marginTop: '12px', padding: '10px 14px',
                    background: '#ECFDF5', borderRadius: '8px',
                    borderLeft: '3px solid #10B981',
                  }}>
                    <span style={{ fontSize: '0.8rem', color: '#065F46', lineHeight: 1.5 }}>
                      ✓ Correct! {q.explanation}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── PAGINATION ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '10px' }}>
          <button
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            style={{ padding: '9px 20px', borderRadius: '10px', border: '1.5px solid #C7D2FE', background: currentPage === 0 ? '#F3F4F6' : 'white', color: currentPage === 0 ? '#9CA3AF' : '#4F46E5', fontWeight: 600, cursor: currentPage === 0 ? 'default' : 'pointer', fontSize: '0.88rem' }}
          >
            ← Previous
          </button>

          <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                style={{
                  width: '32px', height: '32px', borderRadius: '8px', border: '1.5px solid',
                  borderColor: i === currentPage ? getCategoryColor(activeCategory) : '#E5E7EB',
                  background: i === currentPage ? getCategoryColor(activeCategory) : 'white',
                  color: i === currentPage ? 'white' : '#374151',
                  fontWeight: 600, cursor: 'pointer', fontSize: '0.78rem',
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage === totalPages - 1}
            style={{ padding: '9px 20px', borderRadius: '10px', border: '1.5px solid #C7D2FE', background: currentPage === totalPages - 1 ? '#F3F4F6' : 'white', color: currentPage === totalPages - 1 ? '#9CA3AF' : '#4F46E5', fontWeight: 600, cursor: currentPage === totalPages - 1 ? 'default' : 'pointer', fontSize: '0.88rem' }}
          >
            Next →
          </button>
        </div>

        {/* ── ACTIONS ── */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={handleReset}
            style={{ padding: '12px 28px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #3B82F6, #4F46E5)', color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            🔄 Reset
          </button>

          {!submitted && allAnswered && (
            <button
              onClick={handleSubmit}
              style={{ padding: '12px 28px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #10B981, #059669)', color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              ✅ Submit All Answers
            </button>
          )}

          {!submitted && !allAnswered && (
            <div style={{ padding: '11px 18px', borderRadius: '12px', background: '#F3F4F6', color: '#6B7280', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              ⚠️ Answer all {ALL_QUESTIONS.length} questions to submit
            </div>
          )}

          {submitted && (
            <Link href="/education/unit/nouns-gender-number/nouns-numbers" style={{ padding: '12px 28px', borderRadius: '12px', background: '#F3F4F6', color: '#374151', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem' }}>
              📚 Return to Lesson
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}