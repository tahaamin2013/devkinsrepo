"use client";
import { useState, useEffect } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

type Row = {
  singular: string;
  correctPlural: string;
  alternativePlural?: string;
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
    id: "letters",
    label: "Letters, Figures & Symbols",
    icon: "📖",
    words: [
      { singular: "e", correctPlural: "e's" },
      { singular: "a", correctPlural: "a's" },
      { singular: "i", correctPlural: "i's" },
      { singular: "t", correctPlural: "t's" },
      { singular: "5", correctPlural: "5's" },
      { singular: "2", correctPlural: "2's" },
    ],
    note: "Letters, figures, and symbols form their plural by adding apostrophe + s ('s)",
  },
  {
    id: "compound",
    label: "Compound Nouns",
    icon: "🔗",
    words: [
      { singular: "spoonful", correctPlural: "spoonfuls" },
      { singular: "handful", correctPlural: "handfuls" },
      { singular: "cupful", correctPlural: "cupfuls" },
      { singular: "mouthful", correctPlural: "mouthfuls" },
      { singular: "pocketful", correctPlural: "pocketfuls" },
      { singular: "armful", correctPlural: "armfuls" },
      { singular: "roomful", correctPlural: "roomfuls" },
    ],
    note: "Compound nouns ending in -ful form plurals by adding -s (not -fuls)",
  },
  {
    id: "family",
    label: "Family names",
    icon: "👨‍👩‍👧‍👦",
    words: [
      { singular: "Miss Smith", correctPlural: "The Miss Smiths", alternativePlural: "The Misses Smith" },
    ],
    note: "Family names and titles: add -s (or -es for names ending in s) to refer to the whole family",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

type AnswerState = "empty" | "correct" | "wrong";

function getState(input: string, correct: string, alternative?: string): AnswerState {
  if (!input.trim()) return "empty";
  const isCorrect = input.trim() === correct || (alternative && input.trim() === alternative);
  return isCorrect ? "correct" : "wrong";
}

// ─── Score Badge ──────────────────────────────────────────────────────────────

function ScoreBadge({ correct, total }: { correct: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((correct / total) * 100);
  const color =
    pct === 100
      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
      : pct >= 50
      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
      : "bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400";

  return (
    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full transition-all duration-300 ${color}`}>
      {correct}/{total}
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LettersPluralPage() {
  const [dark, setDark] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>("letters");
  const [animKey, setAnimKey] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>(() =>
    Object.fromEntries(categories.flatMap((c) => c.words.map((r) => [r.singular, ""])))
  );

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

  function setAnswer(singular: string, value: string) {
    setAnswers((prev) => ({ ...prev, [singular]: value }));
  }

  const totalFields = rows.length;
  const correctCount = rows.reduce((acc, r) => {
    if (getState(answers[r.singular], r.correctPlural, r.alternativePlural) === "correct") acc++;
    return acc;
  }, 0);

  const allCorrect = correctCount === totalFields;

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
          <div className="flex items-center gap-2">
            <ScoreBadge correct={correctCount} total={totalFields} />
            <button
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle theme"
              className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/8 hover:scale-105 active:scale-95 transition-transform text-sm shadow-sm"
            >
              {dark ? "☀️" : "🌙"}
            </button>
          </div>
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

        {/* ── All correct celebration ── */}
        {allCorrect && (
          <div
            className="rounded-xl border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 px-5 py-4 flex items-center gap-3"
            style={{ animation: "fadeSlideIn 0.3s ease both" }}
          >
            <span className="text-2xl">🎉</span>
            <p className="text-sm font-semibold text-green-700 dark:text-green-300">
              All correct! You have mastered plural forms for {active.label.toLowerCase()}.
            </p>
          </div>
        )}

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
                Type the Plural Form
              </h2>
              <p className="text-gray-400 text-sm mt-0.5">
                {active.id === "letters" ? "Add apostrophe + s to form the plural (e.g. e → e's)" :
                 active.id === "compound" ? "Add -s to form the plural (e.g. spoonful → spoonfuls)" :
                 active.id === "family" ? "Add 'The' and -s/-es to refer to the whole family" :
                 "Add -s to form the plural"}
              </p>
            </div>
            <span className="text-gray-400 dark:text-gray-500 text-sm font-semibold bg-white/10 dark:bg-white/8 rounded-full px-2.5 py-0.5">
              {rows.length}
            </span>
          </div>

          {/* Column headers */}
          <div className="grid grid-cols-2 bg-gray-50 dark:bg-white/[0.03] border-b border-gray-200 dark:border-white/8">
            <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#1C1917] dark:bg-white flex items-center justify-center text-white dark:text-[#1C1917] text-[9px] font-black">
                S
              </span>
              Singular
            </div>
            <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 border-l border-gray-200 dark:border-white/8 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-700 dark:text-indigo-300 text-[9px] font-black">
                P
              </span>
              Plural (type here)
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-100 dark:divide-white/6 bg-white dark:bg-[#1C1917]">
            {rows.map(({ singular, correctPlural, alternativePlural }) => {
              const val = answers[singular];
              const state = getState(val, correctPlural, alternativePlural);

              const inputBorder =
                state === "correct"
                  ? "border-green-400 dark:border-green-500"
                  : state === "wrong"
                  ? "border-red-400 dark:border-red-500"
                  : "border-gray-200 dark:border-white/15";

              const inputBg =
                state === "correct"
                  ? "bg-green-50 dark:bg-green-900/20"
                  : state === "wrong"
                  ? "bg-red-50 dark:bg-red-900/20"
                  : "bg-white dark:bg-[#1C1917]";

              const inputText =
                state === "correct"
                  ? "text-green-700 dark:text-green-300"
                  : state === "wrong"
                  ? "text-red-600 dark:text-red-400"
                  : "text-gray-700 dark:text-gray-200";

              const statusIcon =
                state === "correct" ? "✓" : state === "wrong" ? "✕" : "";

              const statusColor =
                state === "correct" ? "text-green-500" : "text-red-400";

              return (
                <div
                  key={singular}
                  className="grid grid-cols-2 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                >
                  {/* Col 1: Singular (read-only display) */}
                  <div className="px-4 py-4 flex items-center">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-widest font-mono">
                      {singular}
                    </span>
                  </div>

                  {/* Col 2: Typed plural input */}
                  <div className="px-4 py-4 border-l border-gray-100 dark:border-white/6 flex items-center gap-2">
                    <span
                      className={`w-5 h-5 shrink-0 text-sm font-bold flex items-center justify-center transition-all duration-200 ${statusColor} ${
                        state === "empty" ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      {statusIcon}
                    </span>
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => setAnswer(singular, e.target.value)}
                      // placeholder={`${singular}'s`}
                      className={`
                        flex-1 text-sm rounded-lg px-3 py-2
                        border-2 outline-none transition-all duration-200
                        font-mono tracking-widest
                        placeholder-gray-300 dark:placeholder-white/20
                        ${inputBorder} ${inputBg} ${inputText}
                      `}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-5 py-3.5 bg-gray-50 dark:bg-white/[0.02] border-t border-gray-200 dark:border-white/8 flex items-center justify-between gap-4 flex-wrap">
            <p className="text-xs text-gray-500 leading-relaxed">
              <span className="font-semibold text-gray-700 dark:text-gray-300">💡 Tip:</span>{" "}
              {active.id === "letters" ? (
                <>
                  Use an apostrophe before the s — e.g.{" "}
                  <span className="font-semibold text-gray-800 dark:text-gray-200 font-mono">e's</span>,{" "}
                  <span className="font-semibold text-gray-800 dark:text-gray-200 font-mono">5's</span>.
                </>
              ) : active.id === "compound" ? (
                <>
                  Add -s to the end — e.g.{" "}
                  <span className="font-semibold text-gray-800 dark:text-gray-200 font-mono">spoonfuls</span>,{" "}
                  <span className="font-semibold text-gray-800 dark:text-gray-200 font-mono">handfuls</span>.
                </>
              ) : active.id === "family" ? (
                <>
                  Both forms are accepted — "The Miss Smiths" or "The Misses Smith"
                </>
              ) : (
                <>
                  Add -s to form the plural — e.g.{" "}
                  <span className="font-semibold text-gray-800 dark:text-gray-200 font-mono">Brahmans</span>,{" "}
                  <span className="font-semibold text-gray-800 dark:text-gray-200 font-mono">Mussulmans</span>.
                </>
              )}
            </p>
            <button
              onClick={() =>
                setAnswers(Object.fromEntries(categories.flatMap((c) => c.words.map((r) => [r.singular, ""]))))
              }
              className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors underline underline-offset-2 shrink-0"
            >
              Reset all
            </button>
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
