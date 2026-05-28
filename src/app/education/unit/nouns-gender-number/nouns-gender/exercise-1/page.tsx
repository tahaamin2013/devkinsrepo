'use client';

import { useState } from 'react';
import Link from 'next/link';

interface WordItem {
  id: string;
  word: string;
  correctGender: 'masculine' | 'feminine' | 'common' | 'neuter';
  category: string;
}

interface PlacedWordItem extends WordItem {
  placedGender: 'masculine' | 'feminine' | 'common' | 'neuter';
  isCorrect: boolean;
}

export default function Exercise1Page() {
  const [draggedItem, setDraggedItem] = useState<WordItem | null>(null);
  const [placedItems, setPlacedItems] = useState<Record<string, PlacedWordItem>>({});
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [showResults, setShowResults] = useState(false);

  const allWords: WordItem[] = [
    { id: 'sister', word: 'Sister', correctGender: 'feminine', category: 'Person' },
    { id: 'dog', word: 'Dog', correctGender: 'masculine', category: 'Animal' },
    { id: 'mother', word: 'Mother', correctGender: 'feminine', category: 'Person' },
    { id: 'actor', word: 'Actor', correctGender: 'masculine', category: 'Person' },
    { id: 'tigress', word: 'Tigress', correctGender: 'feminine', category: 'Animal' },
    { id: 'master', word: 'Master', correctGender: 'masculine', category: 'Person' },
    { id: 'actress', word: 'Actress', correctGender: 'feminine', category: 'Person' },
    { id: 'tree', word: 'Tree', correctGender: 'neuter', category: 'Thing' },
    { id: 'emperor', word: 'Emperor', correctGender: 'masculine', category: 'Person' },
    { id: 'cook', word: 'Cook', correctGender: 'common', category: 'Person' },
    { id: 'mistress', word: 'Mistress', correctGender: 'feminine', category: 'Person' },
    { id: 'servant', word: 'Servant', correctGender: 'common', category: 'Person' },
    { id: 'nephew', word: 'Nephew', correctGender: 'masculine', category: 'Person' },
    { id: 'slave', word: 'Slave', correctGender: 'common', category: 'Person' },
    { id: 'flower', word: 'Flower', correctGender: 'neuter', category: 'Thing' },
    { id: 'baby', word: 'Baby', correctGender: 'common', category: 'Person' },
    { id: 'ox', word: 'Ox', correctGender: 'masculine', category: 'Animal' },
    { id: 'prince', word: 'Prince', correctGender: 'masculine', category: 'Person' },
    { id: 'pupil', word: 'Pupil', correctGender: 'common', category: 'Person' },
    { id: 'chair', word: 'Chair', correctGender: 'neuter', category: 'Thing' },
  ];

  const genderBoxes: Array<{
    type: 'masculine' | 'feminine' | 'common' | 'neuter';
    title: string;
    description: string;
    color: string;
    headerColor: string;
    rule: string;
  }> = [
    {
      type: 'masculine',
      title: 'Masculine Gender',
      description: 'Male (insan ya janwar) ke naam',
      color: 'bg-blue-50 border-blue-300',
      headerColor: 'bg-blue-500',
      rule: 'Male (insan ya janwar) ke naam → Masculine Gender'
    },
    {
      type: 'feminine',
      title: 'Feminine Gender',
      description: 'Female (insan ya janwar) ke naam',
      color: 'bg-pink-50 border-pink-300',
      headerColor: 'bg-pink-500',
      rule: 'Female (insan ya janwar) ke naam → Feminine Gender'
    },
    {
      type: 'common',
      title: 'Common Gender',
      description: 'Dono ke liye common',
      color: 'bg-purple-50 border-purple-300',
      headerColor: 'bg-purple-500',
      rule: 'Dono ke liye common → Common Gender'
    },
    {
      type: 'neuter',
      title: 'Neuter Gender',
      description: 'Non-living cheezen',
      color: 'bg-gray-50 border-gray-300',
      headerColor: 'bg-gray-500',
      rule: 'Non-living cheezen → Neuter Gender'
    }
  ];

  const unplacedWords = allWords.filter(word => !placedItems[word.id]);

  const handleDragStart = (e: React.DragEvent, word: WordItem) => {
    setDraggedItem(word);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, genderType: 'masculine' | 'feminine' | 'common' | 'neuter') => {
    e.preventDefault();
    if (!draggedItem) return;

    const isCorrect = draggedItem.correctGender === genderType;

    setPlacedItems(prev => ({
      ...prev,
      [draggedItem.id]: { ...draggedItem, placedGender: genderType, isCorrect }
    }));

    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1)
    }));

    setDraggedItem(null);

    // Check if all items are placed
    if (Object.keys(placedItems).length + 1 === allWords.length) {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setPlacedItems({});
    setScore({ correct: 0, incorrect: 0 });
    setShowResults(false);
    setDraggedItem(null);
  };

  const getItemsInBox = (genderType: 'masculine' | 'feminine' | 'common' | 'neuter'): PlacedWordItem[] => {
    return Object.values(placedItems).filter(item => item.placedGender === genderType);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Exercise 1: Noun Gender Classification</h1>
          <p className="text-base md:text-lg text-gray-600">State the Gender of each of the following nouns</p>
        </div>

        {/* Description Box */}
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="text-green-600 mt-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-green-800 mb-1">Exercise Description</h3>
              <p className="text-sm text-green-700">
                This exercise tests your ability to <strong>identify the gender of different nouns</strong>. You'll drag and drop words into the correct gender category: Masculine (male), Feminine (female), Common (applies to both), or Neuter (non-living). This helps you recognize gender patterns in English.
              </p>
            </div>
          </div>
        </div>

        {/* Score and Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex gap-2 md:gap-4 flex-wrap">
            <div className="bg-green-100 px-3 md:px-4 py-2 rounded-lg">
              <span className="text-green-700 font-semibold">✓ Correct: {score.correct}</span>
            </div>
            <div className="bg-red-100 px-3 md:px-4 py-2 rounded-lg">
              <span className="text-red-700 font-semibold">✗ Incorrect: {score.incorrect}</span>
            </div>
            {showResults && (
              <div className="bg-blue-100 px-3 md:px-4 py-2 rounded-lg">
                <span className="text-blue-700 font-semibold">
                  Score: {Math.round((score.correct / allWords.length) * 100)}%
                </span>
              </div>
            )}
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
          </div>
        </div>

        {/* Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Word Bank */}
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">📝 Word Bank</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {unplacedWords.map(word => (
                <div
                  key={word.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, word)}
                  className="bg-blue-50 p-2 md:p-3 rounded-lg cursor-move hover:shadow-md transition-shadow text-center border-2 border-transparent hover:border-blue-300"
                >
                  <div className="font-semibold text-gray-800 text-sm md:text-base">{word.word}</div>
                </div>
              ))}
            </div>

            {unplacedWords.length === 0 && (
              <p className="text-center text-gray-500 py-6 md:py-8">All words have been placed! 🎉</p>
            )}
          </div>

          {/* Gender Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {genderBoxes.map(box => {
              const itemsInBox = getItemsInBox(box.type);
              return (
                <div
                  key={box.type}
                  className={`sticky top-4 rounded-lg shadow-lg overflow-hidden ${box.color} border-4 min-h-[250px] md:min-h-[300px]`}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, box.type)}
                >
                  <div className={`${box.headerColor} text-white p-3 md:p-4`}>
                    <h3 className="text-base md:text-xl font-bold">{box.title}</h3>
                    <p className="text-xs md:text-sm opacity-90">{box.description}</p>
                  </div>
                  <div className="p-3 md:p-4 space-y-2">
                    {itemsInBox.map(item => (
                      <div
                        key={item.id}
                        className={`p-2 md:p-3 rounded-lg ${
                          item.isCorrect
                            ? 'bg-green-200 border-2 border-green-500'
                            : 'bg-red-200 border-2 border-red-500'
                        }`}
                      >
                        <div className="font-semibold text-gray-800 text-sm md:text-base">{item.word}</div>
                        <div className="text-xs text-gray-600 flex items-center gap-1">
                          {item.isCorrect ? '✓' : '✗'} {item.category}
                        </div>
                      </div>
                    ))}
                    {itemsInBox.length === 0 && (
                      <div className="text-center text-gray-400 py-6 md:py-8 border-2 border-dashed border-gray-300 rounded-lg">
                        Drop words here
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}