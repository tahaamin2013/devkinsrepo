"use client";
import { useState, useEffect } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

type Row = {
  singular: string;
  pluralForm: string;
  meaning: string;
};

type Category = {
  id: string;
  label: string;
  icon: string;
  words: Row[];
  note: string;
};

const categories: Category[] = [
  {
    id: "abstract",
    label: "Abstract Nouns",
    icon: "💭",
    words: [
      { singular: "hope", pluralForm: "hopes", meaning: "individual hopes/wishes" },
      { singular: "charity", pluralForm: "charities", meaning: "charitable acts/organizations" },
      { singular: "love", pluralForm: "loves", meaning: "things/people loved" },
      { singular: "kindness", pluralForm: "kindnesses", meaning: "acts of kindness" },
    ],
    note: "Abstract nouns are usually uncountable (no plural). When pluralized, they refer to individual acts or instances.",
  },
  {
    id: "material",
    label: "Material Nouns",
    icon: "🧱",
    words: [
      { singular: "copper", pluralForm: "coppers", meaning: "copper coins" },
      { singular: "iron", pluralForm: "irons", meaning: "fetters/chains" },
      { singular: "tin", pluralForm: "tins", meaning: "cans made of tin" },
      { singular: "wood", pluralForm: "woods", meaning: "forests" },
    ],
    note: "Material nouns (names of substances) are usually uncountable. When used in the plural, their meaning changes.",
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LettersPluralPage() {
  const [dark, setDark] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>("abstract");
  const [animKey, setAnimKey] = useState<number>(0);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  const active = categories.find((c) => c.id === activeCategory) as Category;
  const rows = active.words;

  function switchCategory(id: string) {
    setActiveCategory(id);
    setAnimKey((k) => k + 1);
  }

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-[#1C1917] font-sans">

      {/* ── Top bar ── */}
      <header className="sticky top-0 z-20 border-b border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#1C1917]/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">📖</span>
            <h1 className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
              {active.label} — Plural Forms
            </h1>
            <span className="hidden sm:inline text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400">
              English Grammar
            </span>
          </div>
          <button
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle theme"
            className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/8 hover:scale-105 active:scale-95 transition-transform text-sm shadow-sm"
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* ── Tab strip ── */}
        <nav className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => switchCategory(category.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all duration-200
                  ${isActive
                    ? "bg-[#1C1917] dark:bg-white text-white dark:text-[#1C1917] border-transparent shadow-md scale-[1.04]"
                    : "bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/25 hover:text-gray-900 dark:hover:text-white"
                  }`}
              >
                <span className="text-base leading-none">{category.icon}</span>
                <span>{category.label}</span>
              </button>
            );
          })}
        </nav>

        {/* ── Rule banner ── */}
        <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.03] px-5 py-4 flex items-start gap-3">
          <span className="text-2xl leading-none mt-0.5">💡</span>
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-white">
              {active.label}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {active.note}
            </p>
          </div>
        </div>

        {/* ── Table card ── */}
        <div
          key={animKey}
          className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-2xl"
          style={{ animation: "fadeSlideIn 0.22s ease both" }}
        >
          {/* Card header */}
          <div className="bg-[#1C1917] dark:bg-white/8 px-6 py-5 flex items-center gap-4 border-b border-white/10">
            <span className="text-4xl leading-none">{active.icon}</span>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Uncountable — No Plural Form
              </h2>
              <p className="text-gray-400 text-sm mt-0.5">
                {active.id === "abstract"
                  ? "These nouns have no plural in their normal sense — pluralizing them changes the meaning entirely"
                  : "These nouns have no plural in their normal sense — pluralizing them shifts to a specific object"}
              </p>
            </div>
            <span className="text-gray-400 dark:text-gray-500 text-sm font-semibold bg-white/10 dark:bg-white/8 rounded-full px-2.5 py-0.5">
              {rows.length}
            </span>
          </div>

          {/* Column headers */}
          <div className="grid grid-cols-3 bg-gray-50 dark:bg-white/[0.03] border-b border-gray-200 dark:border-white/8">
            <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#1C1917] dark:bg-white flex items-center justify-center text-white dark:text-[#1C1917] text-[9px] font-black">
                S
              </span>
              Singular
            </div>
            <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 border-l border-gray-200 dark:border-white/8 flex items-center gap-1.5">
              Plural
            </div>
            <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 border-l border-gray-200 dark:border-white/8 flex items-center gap-1.5">
              When used in plural, meanings change:
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-100 dark:divide-white/6 bg-white dark:bg-[#1C1917]">
            {rows.map(({ singular, pluralForm, meaning }) => (
              <div
                key={singular}
                className="grid grid-cols-3 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
              >
                {/* Col 1: Singular */}
                <div className="px-4 py-4 flex items-center">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-widest font-mono">
                    {singular}
                  </span>
                </div>

                {/* Col 2: No plural badge */}
                <div className="px-4 py-4 border-l border-gray-100 dark:border-white/6 flex items-center">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/8 text-gray-400 dark:text-gray-500 italic">
                    No plural
                  </span>
                </div>

                {/* Col 3: Meaning if pluralized */}
                <div className="px-4 py-4 border-l border-gray-100 dark:border-white/6 flex items-center gap-2">
                  <span className="text-sm font-mono font-semibold text-gray-700 dark:text-gray-300">
                    {pluralForm}
                  </span>
                  <span className="text-sm text-gray-400 dark:text-gray-500">
                    = {meaning}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-5 py-3.5 bg-gray-50 dark:bg-white/[0.02] border-t border-gray-200 dark:border-white/8">
            <p className="text-xs text-gray-500 leading-relaxed">
              <span className="font-semibold text-gray-700 dark:text-gray-300">💡 Tip:</span>{" "}
              {active.id === "abstract" ? (
                <>
                  Abstract nouns are normally uncountable — pluralizing them shifts the meaning to specific instances, e.g.{" "}
                  <span className="font-semibold text-gray-800 dark:text-gray-200 font-mono">kindnesses</span> = acts of kindness.
                </>
              ) : (
                <>
                  Material nouns are normally uncountable — pluralizing them shifts the meaning to objects made of that substance, e.g.{" "}
                  <span className="font-semibold text-gray-800 dark:text-gray-200 font-mono">irons</span> = chains.
                </>
              )}
            </p>
          </div>
        </div>

      </main>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}