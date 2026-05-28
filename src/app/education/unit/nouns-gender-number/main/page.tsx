'use client';

import { useState } from 'react';

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

export default function EducationPage() {
  const [draggedItem, setDraggedItem] = useState<WordItem | null>(null);
  const [placedItems, setPlacedItems] = useState<Record<string, PlacedWordItem>>({});
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [showResults, setShowResults] = useState(false);

  const allWords: WordItem[] = [
    // Masculine Gender
    { id: 'boy', word: 'boy', correctGender: 'masculine', category: 'Person' },
    { id: 'man', word: 'man', correctGender: 'masculine', category: 'Person' },
    { id: 'uncle', word: 'uncle', correctGender: 'masculine', category: 'Person' },
    { id: 'dog', word: 'dog', correctGender: 'masculine', category: 'Animal' },
    { id: 'horse', word: 'horse', correctGender: 'masculine', category: 'Animal' },
    { id: 'bull', word: 'bull', correctGender: 'masculine', category: 'Animal' },

    // Feminine Gender
    { id: 'aiza', word: 'Aiza', correctGender: 'feminine', category: 'Person' },
    { id: 'woman', word: 'woman', correctGender: 'feminine', category: 'Person' },
    { id: 'aunt', word: 'aunt', correctGender: 'feminine', category: 'Person' },
    { id: 'bitch', word: 'bitch', correctGender: 'feminine', category: 'Animal' },
    { id: 'mare', word: 'mare', correctGender: 'feminine', category: 'Animal' },
    { id: 'cow', word: 'cow', correctGender: 'feminine', category: 'Animal' },

    // Common Gender
    { id: 'baby', word: 'baby', correctGender: 'common', category: 'Person' },
    { id: 'child', word: 'child', correctGender: 'common', category: 'Person' },
    { id: 'companion', word: 'companion', correctGender: 'common', category: 'Person' },
    { id: 'teacher', word: 'teacher', correctGender: 'common', category: 'Person' },
    { id: 'servant', word: 'servant', correctGender: 'common', category: 'Person' },
    { id: 'bird', word: 'bird', correctGender: 'common', category: 'Person' },
    { id: 'person', word: 'person', correctGender: 'common', category: 'Person' },
    { id: 'friend', word: 'friend', correctGender: 'common', category: 'Person' },
    { id: 'helper', word: 'helper', correctGender: 'common', category: 'Person' },

    // Neuter Gender - Non-living things
    { id: 'box', word: 'box', correctGender: 'neuter', category: 'Thing' },
    { id: 'tree', word: 'tree', correctGender: 'neuter', category: 'Thing' },
    { id: 'flower', word: 'flower', correctGender: 'neuter', category: 'Thing' },
    { id: 'chair', word: 'chair', correctGender: 'neuter', category: 'Thing' },
    { id: 'desk', word: 'desk', correctGender: 'neuter', category: 'Thing' },
    { id: 'ball', word: 'ball', correctGender: 'neuter', category: 'Thing' },
    { id: 'knife', word: 'knife', correctGender: 'neuter', category: 'Thing' },

    // Neuter Gender - Places
    { id: 'city', word: 'city', correctGender: 'neuter', category: 'Place' },
    { id: 'school', word: 'school', correctGender: 'neuter', category: 'Place' },
    { id: 'pakistan', word: 'Pakistan', correctGender: 'neuter', category: 'Place' },

    // Neuter Gender - Ideas
    { id: 'happiness', word: 'happiness', correctGender: 'neuter', category: 'Idea' },
    { id: 'freedom', word: 'freedom', correctGender: 'neuter', category: 'Idea' },
    { id: 'love', word: 'love', correctGender: 'neuter', category: 'Idea' },

    // Neuter Gender - Collective nouns
    { id: 'team', word: 'team', correctGender: 'neuter', category: 'Collective' },
    { id: 'class', word: 'class', correctGender: 'neuter', category: 'Collective' },
    { id: 'army', word: 'army', correctGender: 'neuter', category: 'Collective' },
    { id: 'crowd', word: 'crowd', correctGender: 'neuter', category: 'Collective' },

    // Neuter Gender - Babies/young animals
    { id: 'puppy', word: 'puppy', correctGender: 'neuter', category: 'Baby' },
    { id: 'kitten', word: 'kitten', correctGender: 'neuter', category: 'Baby' },
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
      description: 'Chotay bachay aur janwar (Non-living things, Collectie Nouns)',
      color: 'bg-gray-50 border-gray-300',
      headerColor: 'bg-gray-500',
      rule: 'Non-living cheezen → Neuter Gender'
    }
  ];

  const unplacedWords = allWords.filter(word => !placedItems[word.id]);

  // Group words by main category
  const categorizedWords = {
    person: {
      title: '👤 Person (Living Beings)',
      subcategories: {
        human: { title: 'Humans', words: ['boy', 'Aiza', 'man', 'woman', 'uncle', 'aunt', 'child', 'baby'] },
        animals: { title: 'Animals', words: ['dog', 'horse', 'bull', 'bitch', 'mare', 'cow'] },
        babies: { title: 'Bachay aur Chotay Janwar', words: ['baby', 'child', 'puppy', 'kitten'] },
        collective: { title: 'Collective Nouns', words: ['team', 'class', 'army', 'crowd'] },
        other: { title: 'Other', words: ['baby', 'companion', 'teacher', 'servant', 'bird', 'helper'] }
      }
    },
    thing: {
      title: '📦 Thing (Non-living)',
      subcategories: {
        objects: { title: 'Objects', words: ['box', 'tree', 'flower', 'chair', 'desk', 'ball', 'knife'] }
      }
    },
    place: {
      title: '🌍 Place (Non-living)',
      subcategories: {
        places: { title: 'Places', words: ['city', 'school', 'pakistan'] }
      }
    },  
    idea: {
      title: '💭 Idea (Non-living)',
      subcategories: {
        ideas: { title: 'Ideas', words: ['happiness', 'freedom', 'love'] }
      }
    }
  };

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

    // Common gender words are correct in ANY box
    const commonGenderWords = ['baby', 'child', 'companion', 'teacher', 'servant', 'bird', 'person', 'friend', 'helper'];
    const isCommonGenderWord = commonGenderWords.includes(draggedItem.id);

    // Baby animals are correct only in common and neuter boxes
    const babyAnimals = ['puppy', 'kitten'];
    const isBabyAnimal = babyAnimals.includes(draggedItem.id);
    const isBabyAnimalCorrect = isBabyAnimal && (genderType === 'common' || genderType === 'neuter');

    const isCorrect = isCommonGenderWord || isBabyAnimalCorrect || draggedItem.correctGender === genderType;

    // Check if item was previously placed and update score accordingly
    const previousPlacement = placedItems[draggedItem.id];
    let scoreAdjustment = { correct: 0, incorrect: 0 };

    if (previousPlacement) {
      // Remove previous score contribution
      scoreAdjustment.correct = previousPlacement.isCorrect ? -1 : 0;
      scoreAdjustment.incorrect = previousPlacement.isCorrect ? 0 : -1;
    }

    // Add new score contribution
    scoreAdjustment.correct += isCorrect ? 1 : 0;
    scoreAdjustment.incorrect += isCorrect ? 0 : 1;

    setPlacedItems(prev => ({
      ...prev,
      [draggedItem.id]: { ...draggedItem, placedGender: genderType, isCorrect }
    }));

    setScore(prev => ({
      correct: prev.correct + scoreAdjustment.correct,
      incorrect: prev.incorrect + scoreAdjustment.incorrect
    }));

    setDraggedItem(null);

    // Check if all items are placed
    if (Object.keys(placedItems).length + 1 === allWords.length) {
      setShowResults(true);
    }
  };

  const handleRemoveWord = (wordId: string) => {
    const placedItem = placedItems[wordId];
    if (!placedItem) return;

    // Update score - remove the contribution
    setScore(prev => ({
      correct: prev.correct - (placedItem.isCorrect ? 1 : 0),
      incorrect: prev.incorrect - (placedItem.isCorrect ? 0 : 1)
    }));

    // Remove from placed items (sends back to word bank)
    setPlacedItems(prev => {
      const newPlaced = { ...prev };
      delete newPlaced[wordId];
      return newPlaced;
    });

    setShowResults(false);
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
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 pb-40">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8 mt-40">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">Noun Gender Classification</h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">Drag words to the correct gender box</p>
          <div className="mt-2 inline-block bg-blue-50 dark:bg-gray-700 border border-blue-200 dark:border-gray-600 rounded-lg px-4 py-2">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              💡 <strong>Tip:</strong> Click on placed words to remove them, or drag them between boxes to change your answer!
            </p>
          </div>
        </div>

        {/* Score and Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex gap-2 md:gap-4 flex-wrap">
            <div className="bg-green-100 dark:bg-green-900 px-3 md:px-4 py-2 rounded-lg">
              <span className="text-green-700 dark:text-green-300 font-semibold">✓ Correct: {score.correct}</span>
            </div>
            <div className="bg-red-100 dark:bg-red-900 px-3 md:px-4 py-2 rounded-lg">
              <span className="text-red-700 dark:text-red-300 font-semibold">✗ Incorrect: {score.incorrect}</span>
            </div>
            {showResults && (
              <div className="bg-blue-100 dark:bg-blue-900 px-3 md:px-4 py-2 rounded-lg">
                <span className="text-blue-700 dark:text-blue-300 font-semibold">
                  Score: {Math.round((score.correct / allWords.length) * 100)}%
                </span>
              </div>
            )}
          </div>
          <button
            onClick={handleReset}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 md:px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Reset Game
          </button>
        </div>

        {/* Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Word Bank with Categories */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-4">📝 Word Bank</h3>

            {Object.entries(categorizedWords).map(([categoryKey, category]) => (
              <div key={categoryKey} className="mb-4 md:mb-6">
                <h4 className="text-base md:text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2 md:mb-3 border-b-2 border-gray-200 dark:border-gray-600 pb-2">
                  {category.title}
                </h4>

                {Object.entries(category.subcategories).map(([subKey, subcategory]) => {
                  const availableWords = subcategory.words
                    .map(wordId => allWords.find(w => w.word.toLowerCase() === wordId.toLowerCase()))
                    .filter(Boolean)
                    .filter(word => word && !placedItems[word.id]);

                  if (availableWords.length === 0) return null;

                  return (
                    <div key={subKey} className="mb-2 md:mb-3 ml-2 md:ml-4">
                      <h5 className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 md:mb-2">{subcategory.title}</h5>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {availableWords.map(word => (
                          <div
                            key={word!.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, word!)}
                            className="bg-blue-50 dark:bg-gray-700 p-2 md:p-3 rounded-lg cursor-move hover:shadow-md transition-shadow text-center border-2 border-transparent hover:border-blue-300 dark:hover:border-blue-500"
                          >
                            <div className="font-semibold text-gray-800 dark:text-gray-200 text-sm md:text-base">{word!.word}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}

            {unplacedWords.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 py-6 md:py-8">All words have been placed! 🎉</p>
            )}
          </div>

          {/* Gender Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {genderBoxes.map(box => {
              const itemsInBox = getItemsInBox(box.type);
              return (
                <div
                  key={box.type}
                  className={`sticky top-4 rounded-lg shadow-lg overflow-hidden ${box.color} border-4 h-125`}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, box.type)}
                >
                  <div className={`${box.headerColor} text-white p-3 md:p-4`}>
                    <h3 className="text-base md:text-xl font-bold">{box.title}</h3>
                    <p className="text-xs md:text-sm opacity-90">{box.description}</p>
                  </div>
                  <div className="p-3 md:p-4 space-y-2 max-h-75 md:max-h-100 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-500 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
                    {itemsInBox.map(item => (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item)}
                        onClick={() => handleRemoveWord(item.id)}
                        className={`p-2 md:p-3 rounded-lg cursor-move hover:shadow-md transition-all ${
                          item.isCorrect
                            ? 'bg-green-200 dark:bg-green-800 border-2 border-green-500 dark:border-green-600'
                            : 'bg-red-200 dark:bg-red-800 border-2 border-red-500 dark:border-red-600'
                        } group relative`}
                        title="Click to remove or drag to another box"
                      >
                        <div className="font-semibold text-gray-800 dark:text-gray-200 text-sm md:text-base">{item.word}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-1">
                          {item.isCorrect ? '✓' : '✗'} {item.category}
                        </div>
                        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-red-600 dark:text-red-400 text-xs bg-white dark:bg-gray-700 px-1 py-0.5 rounded">✕ Remove</span>
                        </div>
                      </div>
                    ))}
                    {itemsInBox.length === 0 && (
                      <div className="text-center text-gray-400 dark:text-gray-500 py-6 md:py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                        Drop words here
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Complete Rules Reference */}
        <div className="mt-6 md:mt-8 mb-48 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4">📚 Complete Rules Reference</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <h3 className="font-bold text-blue-700 dark:text-blue-400 mb-2">Masculine Gender</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2 text-sm md:text-base">Jo noun kisi male insan ya male janwar ka naam ho, usay Masculine Gender kehte hain.</p>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Examples: boy, man, uncle, dog, horse, bull</p>
            </div>
            <div>
              <h3 className="font-bold text-pink-700 dark:text-pink-400 mb-2">Feminine Gender</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2 text-sm md:text-base">Jo noun kisi female insan ya female janwar ka naam ho, usay Feminine Gender kehte hain.</p>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Examples: Aiza, woman, aunt, bitch, mare, cow</p>
            </div>
            <div>
              <h3 className="font-bold text-purple-700 dark:text-purple-400 mb-2">Common Gender</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2 text-sm md:text-base">Jo noun male aur female dono ke liye use ho sakta ho, usay Common Gender kehte hain.</p>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Examples: baby, companion, teacher, person, friend, bird</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-700 dark:text-gray-400 mb-2">Neuter Gender</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2 text-sm md:text-base">Jo noun kisi be-jaan cheez ka naam ho, usay Neuter Gender kehte hain.</p>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Examples: box, tree, flower, team, class, happiness, city</p>
            </div>
          </div>
          <div className="mt-4 p-3 md:p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-400 mb-2 text-sm md:text-base">⚠️ Important Notes</h4>
            <ul className="list-disc list-inside text-xs md:text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>Collective nouns (Team, Class, Army, Crowd) → Neuter Gender</li>
              <li>Chotay bachay aur janwar (Baby, Child, Puppy, Kitten) → Neuter Gender</li>
              <li>Non-living things, places, ideas → Neuter Gender</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Rules Section - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)] p-4 z-50 border-t-2 border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-3">✅ Rules</h2>
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
              <span className="text-gray-700 dark:text-gray-300 text-sm">Chotay bachay aur janwar (Non-living things, Collectie Nouns)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
