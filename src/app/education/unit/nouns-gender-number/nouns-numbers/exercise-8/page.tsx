"use client";
import { useState, useEffect } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

type NounRow = {
  singular: string;
  plural1Word: string;
  plural1Def: string;
  plural2Word: string;
  plural2Def: string;
};

const nouns: NounRow[] = [
  {
    singular: "Brother",
    plural1Word: "brothers",
    plural1Def: "sons of the same parent.",
    plural2Word: "brethren",
    plural2Def: "members of a society or a community.",
  },
  {
    singular: "Cloth",
    plural1Word: "cloths",
    plural1Def: "kinds or pieces of cloth.",
    plural2Word: "clothes",
    plural2Def: "garments.",
  },
  {
    singular: "Die",
    plural1Word: "dies",
    plural1Def: "stamps for coining.",
    plural2Word: "dice",
    plural2Def: "small cubes used in games.",
  },
  {
    singular: "Index",
    plural1Word: "indexes",
    plural1Def: "tables of contents to books.",
    plural2Word: "indices",
    plural2Def: "signs used in algebra.",
  },
  {
    singular: "Penny",
    plural1Word: "pennies",
    plural1Def: "number of coins.",
    plural2Word: "pence",
    plural2Def: "amount in value.",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

type AnswerState = "empty" | "correct" | "wrong";

function getState(input: string, answer: string): AnswerState {
  if (!input) return "empty";
  return input.trim().toLowerCase() === answer.toLowerCase() ? "correct" : "wrong";
}

// ─── Quiz Input Cell ──────────────────────────────────────────────────────────

type QuizCellProps = {
  answer: string;
  definition: string;
  accentClass: "blue" | "green";
  value: string;
  onChange: (v: string) => void;
};

function QuizCell({ answer, definition, accentClass, value, onChange }: QuizCellProps) {
  const state = getState(value, answer);

  const borderClass =
    state === "correct"
      ? "border-green-400 dark:border-green-500"
      : state === "wrong"
      ? "border-red-400 dark:border-red-500"
      : accentClass === "blue"
      ? "border-blue-200 dark:border-blue-800"
      : "border-green-200 dark:border-green-800";

  const bgClass =
    state === "correct"
      ? "bg-green-50 dark:bg-green-900/20"
      : state === "wrong"
      ? "bg-red-50 dark:bg-red-900/20"
      : "bg-white dark:bg-transparent";

  const textClass =
    state === "correct"
      ? "text-green-700 dark:text-green-300"
      : state === "wrong"
      ? "text-red-600 dark:text-red-400"
      : "text-gray-700 dark:text-gray-200";

  const defColor =
    accentClass === "blue"
      ? "text-blue-600 dark:text-blue-300"
      : "text-green-600 dark:text-green-400";

  return (
    <div className="flex flex-col gap-2">
      {/* Definition — always visible */}
      <p className={`text-[12px] italic leading-relaxed ${defColor}`}>
        {definition}
      </p>

      {/* Input */}
      <div className="relative flex items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={accentClass === "blue" ? "Type plural 1…" : "Type plural 2…"}
          spellCheck={false}
          autoComplete="off"
          className={`
            w-full text-sm rounded-lg px-3 py-2 pr-8
            border-2 outline-none transition-all duration-200
            placeholder:text-gray-300 dark:placeholder:text-white/20
            ${borderClass} ${bgClass} ${textClass}
          `}
        />
        {/* Status icon */}
        <span
          className={`
            absolute right-2.5 text-sm font-bold transition-all duration-200
            ${state === "correct"
              ? "opacity-100 text-green-500"
              : state === "wrong"
              ? "opacity-100 text-red-400"
              : "opacity-0"}
          `}
        >
          {state === "correct" ? "✓" : "✕"}
        </span>
      </div>
    </div>
  );
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

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function NounsPage() {
  const [dark, setDark] = useState<boolean>(false);

  const [answers, setAnswers] = useState<Record<string, { p1: string; p2: string }>>(() =>
    Object.fromEntries(nouns.map((n) => [n.singular, { p1: "", p2: "" }]))
  );

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  function setAnswer(singular: string, field: "p1" | "p2", value: string) {
    setAnswers((prev) => ({
      ...prev,
      [singular]: { ...prev[singular], [field]: value },
    }));
  }

  const totalFields = nouns.length * 2;
  const correctCount = nouns.reduce((acc, n) => {
    const a = answers[n.singular];
    if (getState(a.p1, n.plural1Word) === "correct") acc++;
    if (getState(a.p2, n.plural2Word) === "correct") acc++;
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
              Two Plural Forms
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

        {/* ── Rule banner ── */}
        <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.03] px-5 py-4 flex items-start gap-3">
          <span className="text-2xl leading-none mt-0.5">💡</span>
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-white">Rule 6b</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Some nouns have{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-200">two forms for the plural</span>,
              each with a somewhat different meaning. Read the definition and type the matching plural.
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
              All correct! You've mastered all two-plural nouns.
            </p>
          </div>
        )}

        {/* ── Table card ── */}
        <div
          className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-2xl"
          style={{ animation: "fadeSlideIn 0.22s ease both" }}
        >
          {/* Card header */}
          <div className="bg-[#1C1917] dark:bg-white/8 px-6 py-5 flex items-center gap-4 border-b border-white/10">
            <span className="text-4xl leading-none">📝</span>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-white tracking-tight">Nouns with Two Plurals</h2>
              <p className="text-gray-400 text-sm mt-0.5">Read the meaning and type the correct plural word</p>
            </div>
            <span className="text-gray-400 dark:text-gray-500 text-sm font-semibold bg-white/10 dark:bg-white/8 rounded-full px-2.5 py-0.5">
              {nouns.length}
            </span>
          </div>

          {/* Column headers */}
          <div className="grid grid-cols-3 bg-gray-50 dark:bg-white/[0.03] border-b border-gray-200 dark:border-white/8">
            <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#1C1917] dark:bg-white flex items-center justify-center text-white dark:text-[#1C1917] text-[9px] font-black">S</span>
              Singular
            </div>
            <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-blue-500 dark:text-blue-400 border-l border-gray-200 dark:border-white/8 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-300 text-[9px] font-black">1</span>
              Plural 1
            </div>
            <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-green-600 dark:text-green-400 border-l border-gray-200 dark:border-white/8 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-700 dark:text-green-300 text-[9px] font-black">2</span>
              Plural 2
            </div>
          </div>

          {/* Noun rows */}
          <div className="divide-y divide-gray-100 dark:divide-white/6 bg-white dark:bg-[#1C1917]">
            {nouns.map(({ singular, plural1Word, plural1Def, plural2Word, plural2Def }) => {
              const a = answers[singular];
              return (
                <div
                  key={singular}
                  className="grid grid-cols-3 transition-colors"
                >
                  {/* Col 1: Singular */}
                  <div className="px-4 py-4 flex items-center">
                    <span className="text-base font-semibold text-gray-900 dark:text-white tracking-wide">
                      {singular}
                    </span>
                  </div>

                  {/* Col 2: Plural 1 */}
                  <div className="px-4 py-4 border-l border-gray-100 dark:border-white/6">
                    <QuizCell
                      answer={plural1Word}
                      definition={plural1Def}
                      accentClass="blue"
                      value={a.p1}
                      onChange={(v) => setAnswer(singular, "p1", v)}
                    />
                  </div>

                  {/* Col 3: Plural 2 */}
                  <div className="px-4 py-4 border-l border-gray-100 dark:border-white/6">
                    <QuizCell
                      answer={plural2Word}
                      definition={plural2Def}
                      accentClass="green"
                      value={a.p2}
                      onChange={(v) => setAnswer(singular, "p2", v)}
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
              Input turns{" "}
              <span className="text-green-600 dark:text-green-400 font-medium">green ✓</span> when correct,{" "}
              <span className="text-red-500 dark:text-red-400 font-medium">red ✕</span> when wrong.
            </p>
            <button
              onClick={() =>
                setAnswers(Object.fromEntries(nouns.map((n) => [n.singular, { p1: "", p2: "" }])))
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