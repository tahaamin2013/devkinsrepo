"use client";
import { useState, useEffect } from "react";

type PracticeRow = {
  sentence: string;
  question: string;
  answer: string;
};

const practice: PracticeRow[] = [
  { sentence: "The house of my uncle", question: "Whose house?", answer: "My uncle's house" },
  { sentence: "The mother of Shirin", question: "Whose mother?", answer: "Shirin's mother" },
  { sentence: "The mane of the horse", question: "Whose mane?", answer: "The horse's mane" },
  { sentence: "The sting of the bee", question: "Whose sting?", answer: "The bee's sting" },
  { sentence: "The books of many boys", question: "Whose books?", answer: "Many boys' books" },
  { sentence: "The feet of all these horses", question: "Whose feet?", answer: "All these horses' feet" },
  { sentence: "The tents of soldiers", question: "Whose tents?", answer: "soldiers' tents" },
  { sentence: "The lives of men", question: "Whose lives?", answer: "Men's lives" },
  { sentence: "The toys of the children", question: "Whose toys?", answer: "The children's toys" },
  { sentence: "The humps of oxen", question: "Whose humps?", answer: "oxen's humps" },
  { sentence: "The toys of children", question: "Whose toys?", answer: "Children's toys" },
  { sentence: "The feet of horses", question: "Whose feet?", answer: "horses' feet" },
  { sentence: "The book of Mary", question: "Whose book?", answer: "Mary's book" },
  { sentence: "The death of Mahatma Gandhi", question: "Whose death?", answer: "Mahatma Gandhi's death" },
  { sentence: "The plays of Shakespeare", question: "Whose plays?", answer: "Shakespeare's plays" },
  { sentence: "The absence of leader", question: "Whose absence?", answer: "leader's absence" },
  { sentence: "The murderer of the child", question: "Whose murderer?", answer: "The child's murderer" },
  { sentence: "The innocent call of the lamb", question: "Whose innocent call?", answer: "the lamb's innocent call" },
  { sentence: "The words of Rama", question: "Whose words?", answer: "Rama's words" },
  { sentence: "The heart of Sita", question: "Whose heart?", answer: "Sita's heart" },
  { sentence: "The nest of bird", question: "Whose nest?", answer: "bird's nest" },
  { sentence: "The school of boy", question: "Whose school?", answer: "boy's school" },
  { sentence: "The clothes of the children", question: "Whose clothes?", answer: "The children's clothes" },
  { sentence: "The sarees of the ladies", question: "Whose sarees?", answer: "The ladies' sarees" },
  { sentence: "The voice of the girl", question: "Whose voice?", answer: "The girl's voice" },
  { sentence: "The house of a man", question: "Whose house?", answer: "A man's house" },
  { sentence: "The work of the reaper", question: "Whose work?", answer: "The reaper's work" },
  { sentence: "The car of uncle", question: "Whose car?", answer: "uncle's car" },
];

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

export default function PossessiveCaseExercisePage() {
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
      <header className="sticky top-0 z-20 border-b border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#1C1917]/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">📖</span>
            <h1 className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
              Nouns in the Possessive Case
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
        <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.03] px-5 py-4 flex items-start gap-3">
          <span className="text-2xl leading-none mt-0.5">💡</span>
          <div className="space-y-1.5">
            <p className="text-sm font-semibold text-gray-800 dark:text-white">Rule</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              A noun (or pronoun) used to show possession is said to be in the{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-300">Possessive Case</span>. Ask{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-300">Whose?</span> to find it. Add{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-300">'s</span> for singular nouns, and just{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-300">'</span> for plural nouns ending in s.
            </p>
          </div>
        </div>

        {allCorrect && (
          <div
            className="rounded-xl border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 px-5 py-4 flex items-center gap-3"
            style={{ animation: "fadeSlideIn 0.3s ease both" }}
          >
            <span className="text-2xl">🎉</span>
            <p className="text-sm font-semibold text-green-700 dark:text-green-300">
              All correct! You have mastered the Possessive Case.
            </p>
          </div>
        )}

        <div
          className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-2xl"
          style={{ animation: "fadeSlideIn 0.22s ease both" }}
        >
          <div className="bg-[#1C1917] dark:bg-white/8 px-6 py-5 flex items-center gap-4 border-b border-white/10">
            <span className="text-4xl leading-none">✏️</span>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-white tracking-tight">Find the Possessive Case</h2>
              <p className="text-gray-400 text-sm mt-0.5">
                Ask Whose?, then rewrite the phrase using 's or ' correctly
              </p>
            </div>
            <span className="text-gray-400 dark:text-gray-500 text-sm font-semibold bg-white/10 dark:bg-white/8 rounded-full px-2.5 py-0.5">
              {practice.length}
            </span>
          </div>

          <div className="grid grid-cols-[2fr_1.3fr_1.3fr] bg-gray-50 dark:bg-white/[0.03] border-b border-gray-200 dark:border-white/8">
            <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Phrase
            </div>
            <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 border-l border-gray-200 dark:border-white/8">
              Question
            </div>
            <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 border-l border-gray-200 dark:border-white/8">
              Possessive Case (type here)
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
                  className="grid grid-cols-[2fr_1.3fr_1.3fr] hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
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
              Singular nouns take 's (child's), plural nouns ending in s take just ' (boys').
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