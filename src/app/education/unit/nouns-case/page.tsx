"use client";
import { useState, useEffect } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

type Example = {
  sentence: string;
  question: string;
  nominative: string;
};

const examples: Example[] = [
  { sentence: "The Brahmin bathed.", question: "Who bathed?", nominative: "The Brahmin" },
  { sentence: "Krishna went to Varanasi.", question: "Who went?", nominative: "Krishna" },
  { sentence: "Gandiva was the name of Arjun's bow.", question: "What was the name?", nominative: "Gandiva" },
  { sentence: "He bought a quartz watch.", question: "Who bought?", nominative: "He" },
];

type PracticeRow = {
  sentence: string;
  question: string;
  answer: string;
};

const practice: PracticeRow[] = [
  { sentence: "Lakshmi lost her ring.", question: "Who lost?", answer: "Lakshmi" },
  { sentence: "Gopal wants to go home.", question: "Who wants?", answer: "Gopal" },
  { sentence: "The mosquito causes malaria.", question: "What causes?", answer: "The mosquito" },
  { sentence: "Malaria kills people.", question: "What kills?", answer: "Malaria" },
  { sentence: "Milk is the best food.", question: "What is?", answer: "Milk" },
  { sentence: "Kolkata stands on the bank of Hugli.", question: "What stands?", answer: "Kolkata" },
  { sentence: "The lazy boy was punished.", question: "Who was punished?", answer: "The lazy boy" },
  { sentence: "The Collector often visits this village.", question: "Who visits?", answer: "The Collector" },
  { sentence: "The foolish old crow tried to sing.", question: "What tried?", answer: "The foolish old crow" },
  { sentence: "I have read about Nurjahan.", question: "Who has read?", answer: "I" },
  { sentence: "Few cats like cold water.", question: "What like?", answer: "Few cats" },
  { sentence: "You work hard.", question: "Who works?", answer: "You" },
  { sentence: "I ate some rice.", question: "Who ate?", answer: "I" },
  { sentence: "The tonga fell into the ditch.", question: "What fell?", answer: "The tonga" },
  { sentence: "He died a glorious death.", question: "Who died?", answer: "He" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

type AnswerState = "empty" | "correct" | "wrong";

function getState(input: string, correct: string): AnswerState {
  if (!input.trim()) return "empty";
  return input.trim().toLowerCase() === correct.toLowerCase() ? "correct" : "wrong";
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

export default function NominativeCasePage() {
  const [dark, setDark] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Record<number, string>>(() =>
    Object.fromEntries(practice.map((_, i) => [i, ""]))
  );

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  function setAnswer(i: number, value: string) {
    setAnswers((prev) => ({ ...prev, [i]: value }));
  }

  const totalFields = practice.length;
  const correctCount = practice.reduce((acc, row, i) => {
    if (getState(answers[i], row.answer) === "correct") acc++;
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
              The Nominative Case
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
          <div className="space-y-1.5">
            <p className="text-sm font-semibold text-gray-800 dark:text-white">
              Rule
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              When a noun (or pronoun) is used as the Subject of a verb, it is said to be in the{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-300">Nominative Case</span>.
              To find the Nominative, put <span className="font-semibold text-gray-700 dark:text-gray-300">Who?</span> or{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-300">What?</span> before the verb.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Whenever you are looking for the Nominative case, begin by finding the verb. Then put Who? or What? before
              the verb. The answer will be the nominative.
            </p>
          </div>
        </div>

        {/* ── Worked examples ── */}
        <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-2xl">
          <div className="bg-[#1C1917] dark:bg-white/8 px-6 py-5 flex items-center gap-4 border-b border-white/10">
            <span className="text-4xl leading-none">✅</span>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-white tracking-tight">Worked Examples</h2>
              <p className="text-gray-400 text-sm mt-0.5">See how Who? / What? finds the nominative</p>
            </div>
          </div>

          <div className="grid grid-cols-3 bg-gray-50 dark:bg-white/[0.03] border-b border-gray-200 dark:border-white/8">
            <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Sentence
            </div>
            <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 border-l border-gray-200 dark:border-white/8">
              Question
            </div>
            <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 border-l border-gray-200 dark:border-white/8">
              Nominative
            </div>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-white/6 bg-white dark:bg-[#1C1917]">
            {examples.map((ex, i) => (
              <div key={i} className="grid grid-cols-3 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                <div className="px-4 py-3.5 flex items-center">
                  <span className="text-sm text-gray-800 dark:text-gray-200">{ex.sentence}</span>
                </div>
                <div className="px-4 py-3.5 border-l border-gray-100 dark:border-white/6 flex items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400 italic">{ex.question}</span>
                </div>
                <div className="px-4 py-3.5 border-l border-gray-100 dark:border-white/6 flex items-center">
                  <span className="text-sm font-semibold text-green-700 dark:text-green-300">{ex.nominative}</span>
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
              All correct! You have found the nominative in every sentence.
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
              <h2 className="text-xl font-bold text-white tracking-tight">Find the Nominative</h2>
              <p className="text-gray-400 text-sm mt-0.5">
                Ask Who? or What? before the verb, then type the nominative
              </p>
            </div>
            <span className="text-gray-400 dark:text-gray-500 text-sm font-semibold bg-white/10 dark:bg-white/8 rounded-full px-2.5 py-0.5">
              {practice.length}
            </span>
          </div>

          <div className="grid grid-cols-[2fr_1fr_1.5fr] bg-gray-50 dark:bg-white/[0.03] border-b border-gray-200 dark:border-white/8">
            <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Sentence
            </div>
            <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 border-l border-gray-200 dark:border-white/8">
              Question
            </div>
            <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 border-l border-gray-200 dark:border-white/8">
              Nominative (type here)
            </div>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-white/6 bg-white dark:bg-[#1C1917]">
            {practice.map((row, i) => {
              const val = answers[i] ?? "";
              const state = getState(val, row.answer);

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
                  key={i}
                  className="grid grid-cols-[2fr_1fr_1.5fr] hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                >
                  <div className="px-4 py-4 flex items-center">
                    <span className="text-sm text-gray-800 dark:text-gray-200">{row.sentence}</span>
                  </div>
                  <div className="px-4 py-4 border-l border-gray-100 dark:border-white/6 flex items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400 italic">{row.question}</span>
                  </div>
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
                      onChange={(e) => setAnswer(i, e.target.value)}
                      className={`
                        flex-1 text-sm rounded-lg px-3 py-2
                        border-2 outline-none transition-all duration-200
                        placeholder-gray-300 dark:placeholder-white/20
                        ${inputBorder} ${inputBg} ${inputText}
                      `}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="px-5 py-3.5 bg-gray-50 dark:bg-white/[0.02] border-t border-gray-200 dark:border-white/8 flex items-center justify-between gap-4 flex-wrap">
            <p className="text-xs text-gray-500 leading-relaxed">
              <span className="font-semibold text-gray-700 dark:text-gray-300">💡 Tip:</span>{" "}
              Find the verb first, then ask Who? or What? before it — include any descriptive words that belong with
              the subject (e.g. "The lazy boy", not just "boy").
            </p>
            <button
              onClick={() => setAnswers(Object.fromEntries(practice.map((_, i) => [i, ""])))}
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