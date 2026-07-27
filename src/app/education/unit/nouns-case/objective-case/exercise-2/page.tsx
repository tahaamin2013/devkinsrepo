"use client";
import { useState, useEffect } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

type Example = {
  original: string;
  direct: string;
  indirect: string;
  rewritten: string;
};

const examples: Example[] = [
  {
    original: "Rama gave Hari a ball.",
    direct: "a ball",
    indirect: "Hari",
    rewritten: "Rama gave a ball to Hari.",
  },
  {
    original: "Will you do me a favour?",
    direct: "a favour",
    indirect: "me",
    rewritten: "Will you do a favour to me?",
  },
];

type PracticeRow = {
  original: string;
  direct: string;
  indirect: string;
  rewritten: string;
};

const practice: PracticeRow[] = [
  { original: "I bought Rama a ball.", direct: "a ball", indirect: "Rama", rewritten: "I bought a ball for Rama." },
  { original: "Fetch the boy a book.", direct: "a book", indirect: "the boy", rewritten: "Fetch a book for the boy." },
  { original: "She made Ruth a new dress.", direct: "a new dress", indirect: "Ruth", rewritten: "She made a new dress for Ruth." },
  { original: "Get me a taxi.", direct: "a taxi", indirect: "me", rewritten: "Get a taxi for me." },
];

const fieldKeys = ["original", "direct", "indirect", "rewritten"] as const;
type FieldKey = (typeof fieldKeys)[number];

const fieldPlaceholders: Record<FieldKey, string> = {
  original: "Type the original sentence…",
  direct: "Type the direct object…",
  indirect: "Type the indirect object…",
  rewritten: "Rewrite with to/for…",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

type AnswerState = "empty" | "correct" | "wrong";

function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ").replace(/[.?!]+$/, "");
}

function getState(input: string, correct: string): AnswerState {
  if (!input.trim()) return "empty";
  return normalize(input) === normalize(correct) ? "correct" : "wrong";
}

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

export default function DirectIndirectObjectPage() {
  const [dark, setDark] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Record<number, Record<FieldKey, string>>>(() =>
    Object.fromEntries(
      practice.map((_, i) => [i, { original: "", direct: "", indirect: "", rewritten: "" }])
    )
  );

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  function setAnswer(i: number, field: FieldKey, value: string) {
    setAnswers((prev) => ({ ...prev, [i]: { ...prev[i], [field]: value } }));
  }

  const totalFields = practice.length * fieldKeys.length;
  const correctCount = practice.reduce((acc, row, i) => {
    fieldKeys.forEach((field) => {
      if (getState(answers[i][field], row[field]) === "correct") acc++;
    });
    return acc;
  }, 0);
  const allCorrect = correctCount === totalFields;

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-[#1C1917] font-sans">

      {/* ── Top bar ── */}
      <header className="sticky top-0 z-20 border-b border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#1C1917]/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">📖</span>
            <h1 className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
              Direct &amp; Indirect Object
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

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">

        {/* ── Rule banner ── */}
        <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.03] px-5 py-4 flex items-start gap-3">
          <span className="text-2xl leading-none mt-0.5">💡</span>
          <div className="space-y-1.5">
            <p className="text-sm font-semibold text-gray-800 dark:text-white">
              Rule
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Some verbs take two objects — a{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-300">Direct Object</span> (the thing given,
              made, or fetched) and an{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-300">Indirect Object</span> (the person who
              receives it). Normally the Indirect Object comes before the Direct Object.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              We can rewrite the sentence by placing the Indirect Object <em>after</em> the Direct Object — using{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-300">to</span> (for verbs like give, do, tell)
              or <span className="font-semibold text-gray-700 dark:text-gray-300">for</span> (for verbs like buy, fetch,
              make, get).
            </p>
          </div>
        </div>

        {/* ── Worked examples ── */}
        <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-2xl">
          <div className="bg-[#1C1917] dark:bg-white/8 px-6 py-5 flex items-center gap-4 border-b border-white/10">
            <span className="text-4xl leading-none">✅</span>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-white tracking-tight">Worked Examples</h2>
              <p className="text-gray-400 text-sm mt-0.5">Indirect Object moves after the Direct Object</p>
            </div>
          </div>

          <div className="grid grid-cols-4 bg-gray-50 dark:bg-white/[0.03] border-b border-gray-200 dark:border-white/8">
            <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Indirect before Direct
            </div>
            <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 border-l border-gray-200 dark:border-white/8">
              Direct Object
            </div>
            <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 border-l border-gray-200 dark:border-white/8">
              Indirect Object
            </div>
            <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 border-l border-gray-200 dark:border-white/8">
              Indirect after Direct
            </div>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-white/6 bg-white dark:bg-[#1C1917]">
            {examples.map((ex, i) => (
              <div key={i} className="grid grid-cols-4 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                <div className="px-4 py-3.5 flex items-center">
                  <span className="text-sm text-gray-800 dark:text-gray-200">{ex.original}</span>
                </div>
                <div className="px-4 py-3.5 border-l border-gray-100 dark:border-white/6 flex items-center">
                  <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">{ex.direct}</span>
                </div>
                <div className="px-4 py-3.5 border-l border-gray-100 dark:border-white/6 flex items-center">
                  <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">{ex.indirect}</span>
                </div>
                <div className="px-4 py-3.5 border-l border-gray-100 dark:border-white/6 flex items-center">
                  <span className="text-sm font-semibold text-green-700 dark:text-green-300">{ex.rewritten}</span>
                </div>
              </div>
            ))}
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
              All correct! You have filled in every field correctly.
            </p>
          </div>
        )}

        {/* ── Practice ── */}
        <div
          className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-2xl"
          style={{ animation: "fadeSlideIn 0.22s ease both" }}
        >
          <div className="bg-[#1C1917] dark:bg-white/8 px-6 py-5 flex items-center gap-4 border-b border-white/10">
            <span className="text-4xl leading-none">✏️</span>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-white tracking-tight">Fill In the Table</h2>
              <p className="text-gray-400 text-sm mt-0.5">
                Fill in all four columns for each sentence
              </p>
            </div>
            <span className="text-gray-400 dark:text-gray-500 text-sm font-semibold bg-white/10 dark:bg-white/8 rounded-full px-2.5 py-0.5">
              {practice.length}
            </span>
          </div>

          <div className="grid grid-cols-4 bg-gray-50 dark:bg-white/[0.03] border-b border-gray-200 dark:border-white/8">
            <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
              Indirect before Direct
            </div>
            <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 border-l border-gray-200 dark:border-white/8">
              Direct Object
            </div>
            <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 border-l border-gray-200 dark:border-white/8">
              Indirect Object
            </div>
            <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 border-l border-gray-200 dark:border-white/8">
              Indirect after Direct
            </div>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-white/6 bg-white dark:bg-[#1C1917]">
            {practice.map((row, i) => {
              return (
                <div
                  key={i}
                  className="grid grid-cols-4 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                >
                  {fieldKeys.map((field) => {
                    const val = answers[i]?.[field] ?? "";
                    const state = getState(val, row[field]);

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

                    const statusIcon = state === "correct" ? "✓" : state === "wrong" ? "✕" : "";
                    const statusColor = state === "correct" ? "text-green-500" : "text-red-400";

                    return (
                      <div
                        key={field}
                        className={`px-4 py-4 flex items-center gap-2 ${
                          field !== "original" ? "border-l border-gray-100 dark:border-white/6" : ""
                        }`}
                      >
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
                          placeholder={fieldPlaceholders[field]}
                          onChange={(e) => setAnswer(i, field, e.target.value)}
                          className={`
                            flex-1 min-w-0 text-sm rounded-lg px-3 py-2
                            border-2 outline-none transition-all duration-200
                            placeholder-gray-300 dark:placeholder-white/20
                            ${inputBorder} ${inputBg} ${inputText}
                          `}
                        />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className="px-5 py-3.5 bg-gray-50 dark:bg-white/[0.02] border-t border-gray-200 dark:border-white/8 flex items-center justify-between gap-4 flex-wrap">
            <p className="text-xs text-gray-500 leading-relaxed">
              <span className="font-semibold text-gray-700 dark:text-gray-300">💡 Tip:</span>{" "}
              Verbs like give, do, tell, and offer use "to"; verbs like buy, fetch, make, and get use "for".
            </p>
            <button
              onClick={() =>
                setAnswers(
                  Object.fromEntries(
                    practice.map((_, i) => [i, { original: "", direct: "", indirect: "", rewritten: "" }])
                  )
                )
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