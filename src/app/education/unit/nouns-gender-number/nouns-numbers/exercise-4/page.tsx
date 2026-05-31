"use client";
import { useState, useEffect } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

type Word = {
  word: string;
  note?: string;
};

type Category = {
  id: string;
  label: string;
  icon: string;
  words: Word[];
};

const categories: Category[] = [
  {
    id: "animals",
    label: "Animals",
    icon: "🐾",
    words: [
      { word: "sheep" },
      { word: "deer" },
      { word: "salmon" },
      { word: "fish" },
      { word: "fishes", note: "different kinds of fish" },
      { word: "swine" },
      { word: "cod" },
      { word: "trout" },
    ],
  },
  {
    id: "vehicles",
    label: "Vehicles & Craft",
    icon: "✈️",
    words: [
      { word: "aircraft" },
      { word: "spacecraft" },
    ],
  },
  {
    id: "series",
    label: "Series & Species",
    icon: "🔁",
    words: [
      { word: "series" },
      { word: "species" },
    ],
  },
  {
    id: "numbers",
    label: "Numbers & Quantities",
    icon: "🔢",
    words: [
      { word: "pair" },
      { word: "dozen" },
      { word: "score" },
      { word: "gross" },
      { word: "hundred" },
      { word: "thousand" },
    ],
  },
  {
    id: "weights",
    label: "Weights & Measures",
    icon: "⚖️",
    words: [
      { word: "stone" },
      { word: "hundredweight" },
      { word: "ton" },
    ],
  },
];

// ─── Emoji map ────────────────────────────────────────────────────────────────

const wordEmoji: Record<string, string> = {
  sheep:         "🐑",
  deer:          "🦌",
  salmon:        "🐟",
  fish:          "🐠",
  fishes:        "🐡",
  swine:         "🐷",
  cod:           "🐟",
  trout:         "🎣",
  aircraft:      "✈️",
  spacecraft:    "🚀",
  series:        "📺",
  species:       "🧬",
  pair:          "👯",
  dozen:         "🥚",
  score:         "🏆",
  gross:         "📦",
  hundred:       "💯",
  thousand:      "🔢",
  stone:         "⚖️",
  hundredweight: "🏋️",
  ton:           "🏗️",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function cap(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getDropdownOptions(word: string): { label: string; value: string }[] {
  return [
    { label: cap(word),       value: "same"      },
    { label: `${cap(word)}s`, value: "added_s"   },
    { label: "No plural",     value: "no_plural" },
  ];
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function NounsPage() {
  const [dark, setDark]             = useState<boolean>(false);
  const [activeTab, setActiveTab]   = useState<string>("animals");
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

  function rowKey(word: string, idx: number) {
    return `${activeTab}:${idx}:${word}`;
  }

  function dropdownStatus(word: string, idx: number): "empty" | "correct" | "wrong" {
    const val = selections[rowKey(word, idx)];
    if (!val) return "empty";
    return val === "same" ? "correct" : "wrong";
  }

  const statusIcon = (s: "empty" | "correct" | "wrong") =>
    s === "correct" ? "✓" : s === "wrong" ? "✕" : "–";

  const statusDot = (s: "empty" | "correct" | "wrong") =>
    s === "correct"
      ? "bg-green-100 dark:bg-green-900/30 text-green-500"
      : s === "wrong"
      ? "bg-red-100 dark:bg-red-900/30 text-red-400"
      : "bg-gray-100 dark:bg-white/10 text-gray-400 dark:text-white/30";

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-[#1C1917] font-sans">

      {/* ── Top bar ── */}
      <header className="sticky top-0 z-20 border-b border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#1C1917]/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">📖</span>
            <h1 className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
              Same Singular & Plural
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

        {/* ── Rule banner ── */}
        <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.03] px-5 py-4 flex items-start gap-3">
          <span className="text-2xl leading-none mt-0.5">💡</span>
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-white">Rule 1</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Some nouns have the <span className="font-semibold text-gray-700 dark:text-gray-200">same form</span> for both singular and plural —
              e.g. <em className="text-gray-700 dark:text-gray-300">one sheep, two sheep</em>.
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
                <span className="text-base leading-none">{cat.icon}</span>
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
            <span className="text-4xl leading-none">{active.icon}</span>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-white tracking-tight">{active.label}</h2>
              <p className="text-gray-400 text-sm mt-0.5">Singular = Plural for these words</p>
            </div>
            <span className="text-gray-400 dark:text-gray-500 text-sm font-semibold bg-white/10 dark:bg-white/8 rounded-full px-2.5 py-0.5">
              {active.words.length}
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
            {active.words.map(({ word, note }, i) => {
              const key    = rowKey(word, i);
              const selVal = selections[key] ?? "";
              const dStatus = dropdownStatus(word, i);
              const opts   = getDropdownOptions(word);

              const dBorder = dStatus === "correct"
                ? "border-green-400 dark:border-green-600 text-green-600 dark:text-green-400"
                : dStatus === "wrong"
                ? "border-red-400 dark:border-red-600 text-red-500 dark:text-red-400"
                : "border-gray-200 dark:border-white/15 text-gray-600 dark:text-gray-400";

              return (
                <div
                  key={word}
                  className="grid grid-cols-2 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                >

                  {/* ── Col 1: Singular ── */}
                  <div className="px-4 py-4 flex items-center gap-2.5">
                    <span className="text-xl leading-none">{wordEmoji[word] ?? "📝"}</span>
                    <div>
                      <span className="text-base font-semibold text-gray-900 dark:text-white tracking-wide">
                        {cap(word)}
                      </span>
                      {note && (
                        <p className="text-[11px] text-gray-400 dark:text-gray-500 italic mt-0.5">{note}</p>
                      )}
                    </div>
                  </div>

                  {/* ── Col 2: Dropdown quiz ── */}
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
                          <option key={o.value} value={o.value} className="text-gray-900 dark:text-white bg-white dark:bg-[#1C1917]">
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

          {/* Footer tip */}
          <div className="px-5 py-3.5 bg-gray-50 dark:bg-white/[0.02] border-t border-gray-200 dark:border-white/8">
            <p className="text-xs text-gray-500 leading-relaxed">
              <span className="font-semibold text-gray-700 dark:text-gray-300">💡 Tip:</span>{" "}
              Select <span className="font-semibold text-gray-800 dark:text-gray-200">the word itself</span> — the plural form is identical to the singular for all these nouns.
            </p>
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