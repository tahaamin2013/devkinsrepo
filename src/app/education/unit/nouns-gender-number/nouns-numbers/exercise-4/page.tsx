"use client";

import React, { useState, useCallback } from "react";

// All 21 entries — exact words, no changes
const ENTRIES: { singular: string; plural: string; wrong: string }[] = [
  { singular: "sheep",        plural: "sheep",                   wrong: "sheeps" },
  { singular: "deer",         plural: "deer",                    wrong: "deers" },
  { singular: "salmon",       plural: "salmon",                  wrong: "salmons" },
  { singular: "fish",         plural: "fish",                    wrong: "fishs" },
  { singular: "fishes",       plural: "different kinds of fish", wrong: "fishes (same kind)" },
  { singular: "swine",        plural: "swine",                   wrong: "swines" },
  { singular: "cod",          plural: "cod",                     wrong: "cods" },
  { singular: "trout",        plural: "trout",                   wrong: "trouts" },
  { singular: "aircraft",     plural: "aircraft",                wrong: "aircrafts" },
  { singular: "spacecraft",   plural: "spacecraft",              wrong: "spacecrafts" },
  { singular: "series",       plural: "series",                  wrong: "serieses" },
  { singular: "species",      plural: "species",                 wrong: "specieses" },
  { singular: "pair",         plural: "pair",                    wrong: "pairs" },
  { singular: "dozen",        plural: "dozen",                   wrong: "dozens" },
  { singular: "score",        plural: "score",                   wrong: "scores" },
  { singular: "gross",        plural: "gross",                   wrong: "grosses" },
  { singular: "hundred",      plural: "hundred",                 wrong: "hundreds" },
  { singular: "thousand",     plural: "thousand",                wrong: "thousands" },
  { singular: "stone",        plural: "stone",                   wrong: "stones" },
  { singular: "hundredweight",plural: "hundredweight",           wrong: "hundredweights" },
  { singular: "ton",          plural: "ton",                     wrong: "tons" },
];

type QuestionResult = "correct" | "wrong" | null;

interface Question {
  singular: string;
  correct: string;
  options: string[];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateQuestions(): Question[] {
  return shuffle(ENTRIES).map((e) => ({
    singular: e.singular,
    correct: e.plural,
    options: shuffle([e.plural, e.wrong]),
  }));
}

export default function Page() {
  const [questions] = useState<Question[]>(generateQuestions);
  const [current, setCurrent] = useState(0);
  const [results, setResults] = useState<QuestionResult[]>(
    Array(ENTRIES.length).fill(null)
  );
  const [chosen, setChosen] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const [showExplainer, setShowExplainer] = useState(false);

  const q = questions[current];
  const result = results[current];
  const total = questions.length;

  const handleAnswer = useCallback(
    (opt: string) => {
      if (chosen) return;
      setChosen(opt);
      const isCorrect = opt === q.correct;
      const next = [...results];
      next[current] = isCorrect ? "correct" : "wrong";
      setResults(next);
      setTimeout(() => setShowExplainer(true), 350);
    },
    [chosen, current, q, results]
  );

  const handleNext = useCallback(() => {
    setShowExplainer(false);
    setChosen(null);
    if (current + 1 >= total) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
    }
  }, [current, total]);

  const handleRestart = useCallback(() => {
    window.location.reload();
  }, []);

  const score = results.filter((r) => r === "correct").length;
  const progressPct = ((current + (chosen ? 1 : 0)) / total) * 100;

  const getScoreLabel = () => {
    if (score === total) return "Perfect score!";
    if (score >= Math.floor(total * 0.8)) return "Well done.";
    if (score >= Math.floor(total * 0.5)) return "Keep practising.";
    return "Keep going.";
  };

  const getScoreMessage = () => {
    if (score === total) return "You know every zero-plural noun perfectly. Impressive!";
    if (score >= Math.floor(total * 0.8)) return "You've got a solid grasp of invariable plurals. A little more practice and you'll have them all.";
    return "Zero-plural nouns are tricky! Review the list and try again — it gets easier every time.";
  };

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-zinc-950 flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden transition-colors duration-300">

      {/* Grid overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-40 dark:opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 39px,#a8a29e 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,#a8a29e 40px)",
        }}
      />

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-stone-300 dark:bg-zinc-800 z-20">
        <div
          className="h-full bg-emerald-700 dark:bg-emerald-500 transition-all duration-500 ease-in-out"
          style={{ width: finished ? "100%" : `${progressPct}%` }}
        />
      </div>

      {/* Badge */}
      <div className="fixed top-6 left-6 z-10 font-mono text-[10px] tracking-[0.15em] uppercase text-stone-400 dark:text-zinc-500">
        English · Plurals
      </div>

      {/* Question counter top-right */}
      {!finished && (
        <div className="fixed top-6 right-6 z-10 font-mono text-[10px] tracking-[0.12em] uppercase text-stone-400 dark:text-zinc-500">
          {current + 1} / {total}
        </div>
      )}

      {!finished ? (
        <div
          key={current}
          className="relative z-10 w-full max-w-[560px] bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-700 rounded-sm shadow-[6px_6px_0_#d6d3d1] dark:shadow-[6px_6px_0_#27272a] px-10 py-10 animate-slideUp"
          style={{ animationDuration: "0.4s", animationFillMode: "both" }}
        >
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,400&family=DM+Mono:wght@400;500&display=swap');
            .font-fraunces { font-family: 'Fraunces', serif; }
            .font-dmmono   { font-family: 'DM Mono', monospace; }
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(28px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(6px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            .animate-slideUp { animation-name: slideUp; }
            .animate-fadeIn  { animation: fadeIn 0.3s ease both; }
            .opt-btn-hover::before {
              content: '';
              position: absolute;
              inset: 0;
              background: currentColor;
              transform: translateY(101%);
              transition: transform 0.2s cubic-bezier(0.4,0,0.2,1);
            }
          `}</style>

          {/* Step dots */}
          <div className="flex gap-1 mb-8 flex-wrap">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  i < current
                    ? results[i] === "correct"
                      ? "bg-emerald-600 dark:bg-emerald-500"
                      : "bg-red-600 dark:bg-red-500"
                    : i === current
                    ? "bg-stone-400 dark:bg-zinc-400"
                    : "bg-stone-200 dark:bg-zinc-700"
                }`}
              />
            ))}
          </div>

          {/* Prompt */}
          <p className="font-dmmono text-[11px] tracking-[0.1em] uppercase text-stone-400 dark:text-zinc-500 mb-2">
            What is the plural of
          </p>

          {/* Word */}
          <div className="font-fraunces font-bold italic text-stone-900 dark:text-zinc-50 leading-none mb-3" style={{ fontSize: "clamp(38px,8vw,60px)" }}>
            {q.singular}
          </div>

          <p className="font-fraunces font-light text-stone-500 dark:text-zinc-400 text-[15px] mb-8">
            Choose the correct plural form.
          </p>

          {/* Options */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {q.options.map((opt) => {
              const isChosen = opt === chosen;
              const isCorrect = opt === q.correct;

              let base =
                "relative overflow-hidden font-dmmono text-[14px] font-medium py-5 px-3 rounded-sm border-[1.5px] text-center cursor-pointer transition-all duration-150 select-none";

              if (!chosen) {
                base +=
                  " bg-stone-50 dark:bg-zinc-800 border-stone-300 dark:border-zinc-600 text-stone-800 dark:text-zinc-200 hover:bg-stone-900 dark:hover:bg-zinc-100 hover:text-white dark:hover:text-zinc-900 hover:border-stone-900 dark:hover:border-zinc-100";
              } else if (isCorrect) {
                base +=
                  " bg-emerald-700 dark:bg-emerald-600 border-emerald-700 dark:border-emerald-600 text-white cursor-default";
              } else if (isChosen && !isCorrect) {
                base +=
                  " bg-red-700 dark:bg-red-600 border-red-700 dark:border-red-600 text-white cursor-default";
              } else {
                base +=
                  " bg-stone-50 dark:bg-zinc-800 border-stone-200 dark:border-zinc-700 text-stone-400 dark:text-zinc-600 opacity-50 cursor-default";
              }

              return (
                <button
                  key={opt}
                  className={base}
                  onClick={() => handleAnswer(opt)}
                  disabled={!!chosen}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Explainer */}
          {showExplainer && (
            <div className="animate-fadeIn border-t border-stone-100 dark:border-zinc-700 pt-5">
              <p className="font-fraunces font-light text-stone-500 dark:text-zinc-400 text-[14px] leading-relaxed mb-4">
                {result === "correct" ? (
                  <>
                    Correct!{" "}
                    <em className="font-semibold text-stone-800 dark:text-zinc-200 not-italic">
                      {q.singular}
                    </em>{" "}
                    →{" "}
                    <em className="font-semibold text-emerald-700 dark:text-emerald-400 not-italic">
                      {q.correct}
                    </em>
                    {" "}— singular and plural share the same form.
                  </>
                ) : (
                  <>
                    Not quite. The plural of{" "}
                    <em className="font-semibold text-stone-800 dark:text-zinc-200 not-italic">
                      {q.singular}
                    </em>{" "}
                    is{" "}
                    <em className="font-semibold text-emerald-700 dark:text-emerald-400 not-italic">
                      {q.correct}
                    </em>
                    {" "}— these zero-plural nouns never change their ending.
                  </>
                )}
              </p>
              <button
                className="w-full font-dmmono text-[12px] tracking-[0.12em] uppercase py-3.5 bg-stone-900 dark:bg-zinc-100 text-stone-50 dark:text-zinc-900 rounded-sm hover:bg-emerald-800 dark:hover:bg-emerald-300 transition-colors duration-150"
                onClick={handleNext}
              >
                {current + 1 < total ? "Next question →" : "See results →"}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results screen */
        <div className="relative z-10 w-full max-w-[560px] bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-700 rounded-sm shadow-[6px_6px_0_#d6d3d1] dark:shadow-[6px_6px_0_#27272a] px-10 py-14 text-center animate-slideUp"
          style={{ animationDuration: "0.4s", animationFillMode: "both" }}
        >
          {/* Score ring */}
          <div className="w-28 h-28 rounded-full border-4 border-stone-200 dark:border-zinc-700 bg-stone-50 dark:bg-zinc-800 flex flex-col items-center justify-center mx-auto mb-8">
            <span className="font-fraunces font-bold text-stone-900 dark:text-zinc-50 text-4xl leading-none">
              {score}
            </span>
            <span className="font-dmmono text-[11px] text-stone-400 dark:text-zinc-500 mt-1">
              out of {total}
            </span>
          </div>

          <div className="font-fraunces font-bold italic text-stone-900 dark:text-zinc-50 text-3xl mb-2">
            {getScoreLabel()}
          </div>
          <div className="font-fraunces font-light text-stone-500 dark:text-zinc-400 text-[15px] leading-relaxed mb-10 max-w-sm mx-auto">
            {getScoreMessage()}
          </div>

          {/* Result dots */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {results.map((r, i) => (
              <div
                key={i}
                title={questions[i].singular}
                className={`w-7 h-7 rounded-full font-dmmono text-[10px] font-medium flex items-center justify-center text-white ${
                  r === "correct"
                    ? "bg-emerald-700 dark:bg-emerald-600"
                    : "bg-red-700 dark:bg-red-600"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Word list recap */}
          <div className="text-left border border-stone-100 dark:border-zinc-800 rounded-sm mb-8 overflow-hidden">
            <div className="font-dmmono text-[10px] tracking-[0.12em] uppercase text-stone-400 dark:text-zinc-500 px-4 py-2 border-b border-stone-100 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-800/50">
              Answer key
            </div>
            <div className="divide-y divide-stone-100 dark:divide-zinc-800 max-h-60 overflow-y-auto">
              {questions.map((q, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-2">
                  <span className="font-dmmono text-[13px] text-stone-600 dark:text-zinc-400">
                    {q.singular}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="font-dmmono text-[13px] text-stone-900 dark:text-zinc-200">
                      → {q.correct}
                    </span>
                    <span className={`text-[10px] ${results[i] === "correct" ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                      {results[i] === "correct" ? "✓" : "✗"}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            className="font-dmmono text-[12px] tracking-[0.12em] uppercase px-10 py-4 bg-stone-900 dark:bg-zinc-100 text-stone-50 dark:text-zinc-900 rounded-sm hover:bg-emerald-800 dark:hover:bg-emerald-300 transition-colors duration-150"
            onClick={handleRestart}
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}