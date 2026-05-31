"use client";
import { useState, useEffect } from "react";

const tabs = [
  {
    id: "instruments",
    label: "Instruments",
    icon: "✂️",
    words: ["scissors", "tongs", "pincers", "spectacles", "binoculars", "Bellows"],
    note: "Instruments with two parts — look plural, act singular",
  },
  {
    id: "clothes",
    label: "Clothes",
    icon: "👖",
    words: ["trousers", "jeans", "shorts", "pyjamas", "tights", "Drawers", "Breeches"],
    note: "Clothing items always used in plural form",
  },
  {
    id: "diseases",
    label: "Diseases",
    icon: "🌡️",
    words: ["measles", "mumps", "rickets"],
    note: "Diseases that look plural but take singular verbs",
  },
  {
    id: "games",
    label: "Games",
    icon: "🎯",
    words: ["billiards", "Draughts", "Darts", "Cards", "Dominoes", "marbles"],
    note: "Games that are grammatically singular",
  },
  {
    id: "subjects",
    label: "Names of Subjects",
    icon: "📐",
    words: ["Mathematics", "Physics", "Electronics"],
    note: "Academic subjects ending in -s but treated as singular",
  },
  {
    id: "news",
    label: 'The word "News"',
    icon: "📰",
    words: ["news"],
    note: '"News" looks plural but is always singular',
  },
  {
    id: "other",
    label: "Other",
    icon: "📚",
    words: ["annals", "thanks", "tidings", "Chattels", "Proceeds (of sale)", "Environs", "Nuptials", "Obsequies", "Assets"],
    note: "Other nouns used only in plural form",
  },
];

function cap(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const wordEmoji: Record<string, string> = {
  // Instruments
  scissors:    "✂️",
  tongs:       "🥢",
  pincers:     "🦞",
  spectacles:  "👓",
  binoculars:  "🔭",
  bellows:     "💨",
  // Clothes
  trousers:    "👔",
  jeans:       "👖",
  shorts:      "🩳",
  pyjamas:     "🛌",
  tights:      "🩱",
  drawers:     "🗄️",
  breeches:    "🐴",
  // Diseases
  measles:     "🤧",
  mumps:       "😮‍💨",
  rickets:     "🦴",
  // Games
  billiards:   "🎱",
  draughts:    "♟️",
  darts:       "🎯",
  cards:       "🃏",
  dominoes:    "🁣",
  marbles:     "🔮",
  // Subjects
  mathematics: "📐",
  physics:     "⚛️",
  electronics: "💡",
  // News
  news:        "📰",
  // Other
  annals:      "📜",
  thanks:      "🙏",
  tidings:     "📣",
  chattels:    "🏠",
  "proceeds (of sale)": "💰",
  environs:    "🌳",
  nuptials:    "💍",
  obsequies:   "⚰️",
  assets:      "💎",
};

function toSingular(str: string): string {
  const base = str.replace(/\s*\(.*?\)/, "");
  const trimmed = base.trimEnd();
  const lower = trimmed.toLowerCase();
  if (lower.endsWith("ses") || lower.endsWith("xes") || lower.endsWith("zes") || lower.endsWith("ches") || lower.endsWith("shes")) {
    return cap(trimmed.slice(0, -2));
  }
  if (lower.endsWith("ies")) {
    return cap(trimmed.slice(0, -3) + "y");
  }
  if (lower.endsWith("s")) {
    return cap(trimmed.slice(0, -1));
  }
  return cap(trimmed);
}

// Build dropdown options for a word: [singular]s, [singular], no singular
function getDropdownOptions(word: string): { label: string; value: string }[] {
  const singular = toSingular(word);
  const plural = cap(word);
  return [
    { label: `${singular}s`, value: "plural_form" },
    { label: singular,       value: "singular_form" },
    { label: "No singular",  value: "no_singular" },
  ];
}

type Tab = typeof tabs[number];

export default function NounsPage() {
  const [activeTab, setActiveTab]   = useState<string>("instruments");
  const [dark, setDark]             = useState<boolean>(false);
  const [animKey, setAnimKey]       = useState<number>(0);
  // dropdown selections keyed by "tabId:wordIndex"
  const [selections, setSelections] = useState<Record<string, string>>({});

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  const active = tabs.find((t) => t.id === activeTab) as Tab;

  function switchTab(id: string) {
    setActiveTab(id);
    setAnimKey((k) => k + 1);
  }

  function rowKey(word: string, idx: number) {
    return `${activeTab}:${idx}:${word}`;
  }

  // Dropdown: correct answer is "no_singular" because these words have no singular
  function dropdownStatus(word: string, idx: number): "empty" | "correct" | "wrong" {
    const val = selections[rowKey(word, idx)];
    if (!val) return "empty";
    return val === "no_singular" ? "correct" : "wrong";
  }

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-[#1C1917] font-sans">

      {/* ── Top bar ── */}
      <header className="sticky top-0 z-20 border-b border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#1C1917]/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">📖</span>
            <h1 className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
              Plural-Only Nouns
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
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => switchTab(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all duration-200
                  ${isActive
                    ? "bg-[#1C1917] dark:bg-white text-white dark:text-[#1C1917] border-transparent shadow-md scale-[1.04]"
                    : "bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/25 hover:text-gray-900 dark:hover:text-white"
                  }`}
              >
                <span className="text-base leading-none">{tab.icon}</span>
                <span>{tab.label}</span>
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
          <div className="bg-[#1C1917] dark:bg-white/8 px-6 py-5 flex items-start gap-4 border-b border-white/10">
            <span className="text-4xl leading-none mt-0.5">{active.icon}</span>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-white tracking-tight leading-tight">{active.label}</h2>
              <p className="text-gray-400 text-sm mt-1 leading-snug">{active.note}</p>
            </div>
            <span className="shrink-0 self-start mt-1 text-gray-400 dark:text-gray-500 text-sm font-semibold bg-white/10 dark:bg-white/8 rounded-full px-2.5 py-0.5">
              {active.words.length}
            </span>
          </div>

          {/* Column headers */}
          <div className="grid grid-cols-2 bg-gray-50 dark:bg-white/[0.03] border-b border-gray-200 dark:border-white/8">
            <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-gray-300 dark:bg-white/20 flex items-center justify-center text-gray-600 dark:text-white/60 text-[9px] font-black">?</span>
              Choose Singular
            </div>
            <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 border-l border-gray-200 dark:border-white/8 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#1C1917] dark:bg-white flex items-center justify-center text-white dark:text-[#1C1917] text-[9px] font-black">✓</span>
              Plural
            </div>
          </div>

          {/* Word rows */}
          <div className="divide-y divide-gray-100 dark:divide-white/6 bg-white dark:bg-[#1C1917]">
            {active.words.map((word, i) => {
              const key       = rowKey(word, i);
              const selVal    = selections[key] ?? "";
              const dStatus   = dropdownStatus(word, i);
              const opts      = getDropdownOptions(word);

              // border/text color helpers
              const dBorder = dStatus === "correct"
                ? "border-green-400 dark:border-green-600 text-green-600 dark:text-green-400"
                : dStatus === "wrong"
                ? "border-red-400 dark:border-red-600 text-red-500 dark:text-red-400"
                : "border-gray-200 dark:border-white/15 text-gray-600 dark:text-gray-400";

              const statusIcon = (s: "empty"|"correct"|"wrong") =>
                s === "correct" ? "✓" : s === "wrong" ? "✕" : "–";
              const statusDot = (s: "empty"|"correct"|"wrong") =>
                s === "correct"
                  ? "bg-green-100 dark:bg-green-900/30 text-green-500"
                  : s === "wrong"
                  ? "bg-red-100 dark:bg-red-900/30 text-red-400"
                  : "bg-gray-100 dark:bg-white/10 text-gray-400 dark:text-white/30";

              return (
                <div
                  key={word}
                  className="grid grid-cols-2 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                >

                  {/* ── Col 1: Dropdown ── */}
                  <div className="px-4 py-4 flex items-center gap-2">
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
                        <option value="" disabled className="text-gray-400 bg-white dark:bg-[#1C1917]">
                          Choose…
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

                  {/* ── Col 2: Plural (answer) ── */}
                  <div className="px-4 py-4 flex items-center gap-2.5 border-l border-gray-100 dark:border-white/6">
                    <span className="w-6 h-6 shrink-0 rounded-full bg-[#1C1917] dark:bg-white flex items-center justify-center">
                      <span className="text-white dark:text-[#1C1917] text-xs font-black">✓</span>
                    </span>
                    <span className="text-base font-semibold text-gray-900 dark:text-white tracking-wide">
                      {cap(word)}
                    </span>
                    {wordEmoji[word.toLowerCase()] && (
                      <span className="text-xl leading-none">{wordEmoji[word.toLowerCase()]}</span>
                    )}
                    <span className="ml-auto text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-white/8 text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-white/10">
                      plural
                    </span>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Footer tip */}
          <div className="px-5 py-3.5 bg-gray-50 dark:bg-white/[0.02] border-t border-gray-200 dark:border-white/8">
            <p className="text-xs text-gray-500 leading-relaxed">
              <span className="font-semibold text-gray-700 dark:text-gray-300">💡 Tip:</span>{" "}
              Select <span className="font-semibold text-gray-800 dark:text-gray-200">"No singular"</span> — all these words exist only in plural form and have no singular equivalent.
            </p>
          </div>
        </div>

        {/* ── Bottom quick-jump ── */}
        <div className="flex flex-wrap gap-2 pt-1 pb-8">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => switchTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs transition-all
                  ${isActive
                    ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white font-semibold"
                    : "text-gray-400 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-[#1C1917] dark:bg-white" : "bg-gray-300 dark:bg-white/20"}`} />
                {tab.label}
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold
                  ${isActive
                    ? "bg-[#1C1917] dark:bg-white text-white dark:text-[#1C1917]"
                    : "bg-gray-100 dark:bg-white/8 text-gray-500 dark:text-gray-500"
                  }`}>
                  {tab.words.length}
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