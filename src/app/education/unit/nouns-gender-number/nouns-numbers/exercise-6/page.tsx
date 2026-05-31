"use client";
import { useState, useEffect } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

type Word = {
  singular: string;
  plural: string;
  alt?: string;
};

type Category = {
  id: string;
  label: string;
  sub: string;
  words: Word[];
};

const categories: Category[] = [
  {
    id: "latin",
    label: "From Latin",
    sub: "Latin origin — classical plurals",
    words: [
      { singular: "erratum",    plural: "errata" },
      { singular: "formula",    plural: "formulae",  alt: "or formulas" },
      { singular: "index",      plural: "indices" },
      { singular: "memorandum", plural: "memoranda" },
      { singular: "radius",     plural: "radii" },
      { singular: "terminus",   plural: "termini",   alt: "or terminuses" },
    ],
  },
  {
    id: "greek",
    label: "From Greek",
    sub: "Greek origin — classical plurals",
    words: [
      { singular: "axis",        plural: "axes" },
      { singular: "parenthesis", plural: "parentheses" },
      { singular: "crisis",      plural: "crises" },
      { singular: "hypothesis",  plural: "hypotheses" },
      { singular: "basis",       plural: "bases" },
      { singular: "phenomenon",  plural: "phenomena" },
      { singular: "analysis",    plural: "analyses" },
      { singular: "criterion",   plural: "criteria" },
    ],
  },
  {
    id: "italian",
    label: "From Italian",
    sub: "Italian origin",
    words: [
      { singular: "bandit", plural: "banditti", alt: "or bandits" },
    ],
  },
  {
    id: "french",
    label: "From French",
    sub: "French origin",
    words: [
      { singular: "madame",   plural: "mesdames",  alt: "madam → mesdames" },
      { singular: "monsieur", plural: "messieurs" },
    ],
  },
  {
    id: "hebrew",
    label: "From Hebrew",
    sub: "Hebrew origin",
    words: [
      { singular: "cherub", plural: "cherubim", alt: "or cherubs" },
      { singular: "seraph", plural: "seraphim", alt: "or seraphs" },
    ],
  },
];

// ─── Emoji map ────────────────────────────────────────────────────────────────

const wordEmoji: Record<string, string> = {
  erratum:     "✍️",
  formula:     "🧪",
  index:       "📑",
  memorandum:  "📝",
  radius:      "📐",
  terminus:    "🚉",
  axis:        "🔄",
  parenthesis: "🔡",
  crisis:      "⚠️",
  hypothesis:  "🔬",
  basis:       "🏗️",
  phenomenon:  "🌟",
  analysis:    "🔍",
  criterion:   "⚖️",
  bandit:      "🦹",
  madame:      "👒",
  monsieur:    "🎩",
  cherub:      "👼",
  seraph:      "😇",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function cap(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Extract the anglicized plural from the alt string if it follows
 * the pattern "or <word>" — e.g. "or formulas" → "formulas"
 */
function getAltPlural(word: Word): string | null {
  if (!word.alt) return null;
  const match = word.alt.match(/^or\s+(\S+)$/i);
  return match ? match[1].toLowerCase() : null;
}

/**
 * Returns true if the selected dropdown value counts as correct.
 * "correct"     = classical plural (always correct)
 * "alt_correct" = anglicized plural (correct only when alt is "or <word>")
 */
function isCorrectAnswer(value: string, word: Word): boolean {
  if (value === "correct") return true;
  if (value === "alt_correct" && getAltPlural(word) !== null) return true;
  return false;
}

function getDropdownOptions(word: Word): { label: string; value: string }[] {
  const altPlural = getAltPlural(word);
  const options: { label: string; value: string }[] = [];

  // Classical plural — always first and always correct
  options.push({ label: cap(word.plural), value: "correct" });

  // Anglicized plural — correct when alt follows "or <word>" pattern
  if (altPlural) {
    options.push({ label: cap(altPlural), value: "alt_correct" });
  }

  // Plain "-s" form — only add if it isn't already the altPlural
  const addedS = `${word.singular}s`;
  if (!altPlural || altPlural.toLowerCase() !== addedS.toLowerCase()) {
    options.push({ label: cap(addedS), value: "added_s" });
  }

  // No plural option
  options.push({ label: "No plural", value: "no_plural" });

  return options;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ForeignPluralsPage() {
  const [dark, setDark]             = useState<boolean>(false);
  const [activeTab, setActiveTab]   = useState<string>("latin");
  const [animKey, setAnimKey]       = useState<number>(0);
  const [selections, setSelections] = useState<Record<string, string>>({});

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else      document.documentElement.classList.remove("dark");
  }, [dark]);

  const active = categories.find((c) => c.id === activeTab)!;

  function switchTab(id: string) {
    setActiveTab(id);
    setAnimKey((k) => k + 1);
  }

  function rowKey(idx: number) {
    return `${activeTab}:${idx}`;
  }

  function dropdownStatus(idx: number): "empty" | "correct" | "wrong" {
    const val  = selections[rowKey(idx)];
    const word = active.words[idx];
    if (!val) return "empty";
    return isCorrectAnswer(val, word) ? "correct" : "wrong";
  }

  const statusIcon = (s: "empty" | "correct" | "wrong") =>
    s === "correct" ? "✓" : s === "wrong" ? "✕" : "–";

  const statusDot = (s: "empty" | "correct" | "wrong") =>
    s === "correct"
      ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
      : s === "wrong"
      ? "bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400"
      : "bg-gray-100 dark:bg-white/10 text-gray-400 dark:text-white/30";

  const correctCount = active.words.filter((_, i) => dropdownStatus(i) === "correct").length;
  const total        = active.words.length;
  const pct          = total ? Math.round((correctCount / total) * 100) : 0;

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-[#1C1917] font-sans">

      {/* ── Top bar ── */}
      <header className="sticky top-0 z-20 border-b border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#1C1917]/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🌍</span>
            <h1 className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
              Foreign Language Plurals
            </h1>
            <span className="hidden sm:inline text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400">
              Rule 6a
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

        {/* ── Rule banner ── */}
        <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.03] px-5 py-4 flex items-start gap-3">
          <span className="text-2xl leading-none mt-0.5">💡</span>
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-white">Rule 6a</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Many nouns taken from{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-200">foreign languages</span>{" "}
              keep their{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-200">original plural form</span>{" "}
              rather than adding <em className="text-gray-700 dark:text-gray-300">-s</em>.
              Some words accept <span className="font-semibold text-gray-700 dark:text-gray-200">both</span> forms.
            </p>
          </div>
        </div>

        {/* ── Category tabs ── */}
        <nav className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => switchTab(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all duration-200
                  ${isActive
                    ? "bg-[#1C1917] dark:bg-white text-white dark:text-[#1C1917] border-transparent shadow-md scale-[1.04]"
                    : "bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/25 hover:text-gray-900 dark:hover:text-white"
                  }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full
                  ${isActive
                    ? "bg-white/20 text-white dark:bg-black/20 dark:text-[#1C1917]"
                    : "bg-gray-100 dark:bg-white/8 text-gray-400 dark:text-gray-500"
                  }`}>
                  {cat.words.length}
                </span>
              </button>
            );
          })}
        </nav>

        {/* ── Card ── */}
        <div
          key={animKey}
          className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-2xl"
          style={{ animation: "fadeSlideIn 0.22s ease both" }}
        >
          {/* Card header */}
          <div className="bg-[#1C1917] dark:bg-white/8 px-6 py-5 flex items-center gap-4 border-b border-white/10">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-white tracking-tight">{active.label}</h2>
              <p className="text-gray-400 text-sm mt-0.5">{active.sub}</p>
            </div>
            <span className="text-gray-400 dark:text-gray-500 text-sm font-semibold bg-white/10 dark:bg-white/8 rounded-full px-2.5 py-0.5">
              {active.words.length} words
            </span>
          </div>

          {/* Column headers */}
          <div className="grid grid-cols-2 bg-gray-50 dark:bg-white/[0.03] border-b border-gray-200 dark:border-white/8">
            <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#1C1917] dark:bg-white flex items-center justify-center text-white dark:text-[#1C1917] text-[9px] font-black">1</span>
              Singular
            </div>
            <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 border-l border-gray-200 dark:border-white/8 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-gray-300 dark:bg-white/20 flex items-center justify-center text-gray-600 dark:text-white/60 text-[9px] font-black">?</span>
              Choose Plural
            </div>
          </div>

          {/* Word rows */}
          <div className="divide-y divide-gray-100 dark:divide-white/6 bg-white dark:bg-[#1C1917]">
            {active.words.map((word, i) => {
              const key     = rowKey(i);
              const selVal  = selections[key] ?? "";
              const dStatus = dropdownStatus(i);
              const opts    = getDropdownOptions(word);
              const hasAlt  = getAltPlural(word) !== null;

              const dBorder = dStatus === "correct"
                ? "border-green-400 dark:border-green-600 text-green-600 dark:text-green-400"
                : dStatus === "wrong"
                ? "border-red-400 dark:border-red-600 text-red-500 dark:text-red-400"
                : "border-gray-200 dark:border-white/15 text-gray-600 dark:text-gray-400";

              return (
                <div
                  key={`${word.singular}-${i}`}
                  className="grid grid-cols-2 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                >
                  {/* Col 1: Singular */}
                  <div className="px-4 py-4 flex items-center gap-2.5">
                    <span className="text-xl leading-none">
                      {wordEmoji[word.singular] ?? "📖"}
                    </span>
                    <div>
                      <span className="text-base font-semibold text-gray-900 dark:text-white tracking-wide">
                        {cap(word.singular)}
                      </span>
                      {hasAlt && (
                        <p className="text-[11px] text-blue-500 dark:text-blue-400 font-medium mt-0.5">
                          ✦ two correct forms
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Col 2: Dropdown quiz */}
                  <div className="px-4 py-4 flex items-center gap-2 border-l border-gray-100 dark:border-white/6">
                    <span className={`w-5 h-5 shrink-0 rounded-full flex items-center justify-center text-[9px] font-black transition-all duration-200 ${statusDot(dStatus)}`}>
                      {statusIcon(dStatus)}
                    </span>
                    <div className="relative flex-1">
                      <select
                        value={selVal}
                        onChange={(e) =>
                          setSelections((prev) => ({ ...prev, [key]: e.target.value }))
                        }
                        className={`w-full appearance-none text-sm rounded-md px-2.5 py-1.5 pr-7 border outline-none transition-all duration-200 bg-transparent cursor-pointer
                          ${dBorder}
                          ${!selVal ? "text-gray-400 dark:text-white/25" : ""}
                        `}
                      >
                        <option value="" disabled className="bg-white dark:bg-[#1C1917] text-gray-400">
                          Choose plural…
                        </option>
                        {opts.map((o) => (
                          <option
                            key={o.value}
                            value={o.value}
                            className="text-gray-900 dark:text-white bg-white dark:bg-[#1C1917]"
                          >
                            {o.label}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/30 text-xs">▾</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer — progress */}
          <div className="px-5 py-3.5 bg-gray-50 dark:bg-white/[0.02] border-t border-gray-200 dark:border-white/8">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
              <span>{correctCount} of {total} correct</span>
              <span className="font-semibold text-gray-700 dark:text-gray-300">{pct}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-green-600 dark:bg-green-500 transition-all duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>

        {/* ── Bottom quick-jump ── */}
        <div className="flex flex-wrap gap-2 pt-1 pb-8">
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => switchTab(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs transition-all
                  ${isActive
                    ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white font-semibold"
                    : "text-gray-400 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-[#1C1917] dark:bg-white" : "bg-gray-300 dark:bg-white/20"}`} />
                {cat.label}
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold
                  ${isActive
                    ? "bg-[#1C1917] dark:bg-white text-white dark:text-[#1C1917]"
                    : "bg-gray-100 dark:bg-white/8 text-gray-500 dark:text-gray-500"
                  }`}>
                  {cat.words.length}
                </span>
              </button>
            );
          })}
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