"use client";
import { useState, useEffect } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

type NounRow = {
  singular: string;
  meaning: string;
};

const nouns: NounRow[] = [
  { singular: "Air",     meaning: "atmosphere." },
  { singular: "Good",    meaning: "benefit, well-being." },
  { singular: "Compass", meaning: "extent, range." },
  { singular: "Respect", meaning: "regard." },
  { singular: "Physic",  meaning: "medicine." },
  { singular: "Iron",    meaning: "a kind of metal." },
  { singular: "Force",   meaning: "strength." },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

type AnswerState = "empty" | "correct" | "wrong";

function getState(value: string): AnswerState {
  if (!value) return "empty";
  return value === "no_plural" ? "correct" : "wrong";
}

function getDropdownOptions(word: string) {
  const lower = word.toLowerCase();
  return [
    { label: word,         value: "singular"  },
    { label: `${lower}s`, value: "plural_s"   },
    { label: "No plural",  value: "no_plural" },
  ];
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
    <span
      className={`text-xs font-bold px-2.5 py-0.5 rounded-full transition-all duration-300 ${color}`}
    >
      {correct}/{total}
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function NounsNoPluralPage2() {
  const [dark, setDark] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Record<string, string>>(() =>
    Object.fromEntries(nouns.map((n) => [n.singular, ""]))
  );

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  function setAnswer(singular: string, value: string) {
    setAnswers((prev) => ({ ...prev, [singular]: value }));
  }

  const totalFields = nouns.length;
  const correctCount = nouns.reduce((acc, n) => {
    if (getState(answers[n.singular]) === "correct") acc++;
    return acc;
  }, 0);

  const allCorrect = correctCount === totalFields;

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-[#1C1917] font-sans">



      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* ── Rule banner ── */}
   

        {/* ── All correct celebration ── */}
        {allCorrect && (
          <div
            className="rounded-xl border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 px-5 py-4 flex items-center gap-3"
            style={{ animation: "fadeSlideIn 0.3s ease both" }}
          >
            <span className="text-2xl">🎉</span>
            <p className="text-sm font-semibold text-green-700 dark:text-green-300">
              All correct! You have mastered all no-plural nouns.
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
              <h2 className="text-xl font-bold text-white tracking-tight">
                Select the Correct Plural Form
              </h2>
              <p className="text-gray-400 text-sm mt-0.5">
                The meaning is shown below each word — choose the right option
              </p>
            </div>
            <span className="text-gray-400 dark:text-gray-500 text-sm font-semibold bg-white/10 dark:bg-white/8 rounded-full px-2.5 py-0.5">
              {nouns.length}
            </span>
          </div>

          {/* Column headers */}
          <div className="grid grid-cols-2 bg-gray-50 dark:bg-white/[0.03] border-b border-gray-200 dark:border-white/8">
            <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#1C1917] dark:bg-white flex items-center justify-center text-white dark:text-[#1C1917] text-[9px] font-black">
                S
              </span>
              Singular &amp; Meaning
            </div>
            <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 border-l border-gray-200 dark:border-white/8 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-700 dark:text-indigo-300 text-[9px] font-black">
                ?
              </span>
              Choose Plural
            </div>
          </div>

          {/* Noun rows */}
          <div className="divide-y divide-gray-100 dark:divide-white/6 bg-white dark:bg-[#1C1917]">
            {nouns.map(({ singular, meaning }) => {
              const val = answers[singular];
              const state = getState(val);
              const opts = getDropdownOptions(singular);

              const selectBorder =
                state === "correct"
                  ? "border-green-400 dark:border-green-500"
                  : state === "wrong"
                  ? "border-red-400 dark:border-red-500"
                  : "border-gray-200 dark:border-white/15";

              const selectBg =
                state === "correct"
                  ? "bg-green-50 dark:bg-green-900/20"
                  : state === "wrong"
                  ? "bg-red-50 dark:bg-red-900/20"
                  : "bg-white dark:bg-[#1C1917]";

              const selectText =
                state === "correct"
                  ? "text-green-700 dark:text-green-300"
                  : state === "wrong"
                  ? "text-red-600 dark:text-red-400"
                  : "text-gray-700 dark:text-gray-200";

              const statusIcon =
                state === "correct" ? "✓" : state === "wrong" ? "✕" : "";

              const statusColor =
                state === "correct"
                  ? "text-green-500"
                  : state === "wrong"
                  ? "text-red-400"
                  : "";

              return (
                <div
                  key={singular}
                  className="grid grid-cols-2 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                >
                  {/* Col 1: Singular + Meaning */}
                  <div className="px-4 py-4 flex flex-col gap-1 justify-center">
                    <span className="text-base font-semibold text-gray-900 dark:text-white tracking-wide">
                      {singular}
                    </span>
                    <span className="text-[12px] italic text-gray-400 dark:text-gray-500 leading-relaxed">
                      {meaning}
                    </span>
                  </div>

                  {/* Col 2: Dropdown */}
                  <div className="px-4 py-4 border-l border-gray-100 dark:border-white/6 flex items-center gap-2">
                    <span
                      className={`w-5 h-5 shrink-0 text-sm font-bold flex items-center justify-center transition-all duration-200 ${statusColor} ${
                        state === "empty" ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      {statusIcon}
                    </span>
                    <div className="relative flex-1">
                      <select
                        value={val}
                        onChange={(e) => setAnswer(singular, e.target.value)}
                        className={`
                          w-full appearance-none text-sm rounded-lg px-3 py-2 pr-8
                          border-2 outline-none transition-all duration-200 cursor-pointer
                          ${selectBorder} ${selectBg} ${selectText}
                          ${!val ? "text-gray-400 dark:text-white/30" : ""}
                        `}
                      >
                        <option value="" disabled className="bg-white dark:bg-[#1C1917] text-gray-400">
                          Choose…
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
                      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/30 text-xs">
                        ▾
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-5 py-3.5 bg-gray-50 dark:bg-white/[0.02] border-t border-gray-200 dark:border-white/8 flex items-center justify-between gap-4 flex-wrap">
            <p className="text-xs text-gray-500 leading-relaxed">
              <span className="font-semibold text-gray-700 dark:text-gray-300">💡 Tip:</span>{" "}
              All these nouns have{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-200">no plural</span>{" "}
              in this sense.
            </p>
            <button
              onClick={() =>
                setAnswers(Object.fromEntries(nouns.map((n) => [n.singular, ""])))
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