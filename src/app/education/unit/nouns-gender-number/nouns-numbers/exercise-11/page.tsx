"use client";
import { useState, useEffect } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

type NounRow = {
  singular: string;
  singularMeaning: string;
  plural: string;
  pluralMeaning: string;
};

const nouns: NounRow[] = [
  { singular: "Air",     singularMeaning: "atmosphere.",                   plural: "Airs",      pluralMeaning: "affected manners."                  },
  { singular: "Good",    singularMeaning: "benefit, well-being.",          plural: "Goods",     pluralMeaning: "merchandise."                       },
  { singular: "Compass", singularMeaning: "extent, range.",                plural: "Compasses", pluralMeaning: "an instrument for drawing circles." },
  { singular: "Respect", singularMeaning: "regard.",                       plural: "Respects",  pluralMeaning: "compliments."                       },
  { singular: "Physic",  singularMeaning: "medicine.",                     plural: "Physics",   pluralMeaning: "natural science."                   },
  { singular: "Iron",    singularMeaning: "a kind of metal.",              plural: "Irons",     pluralMeaning: "fetters."                           },
  { singular: "Force",   singularMeaning: "strength.",                     plural: "Forces",    pluralMeaning: "troops."                            },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

type AnswerState = "empty" | "correct" | "wrong";

function getSingularOptions(singular: string) {
  const lower = singular.toLowerCase();
  return [
    { label: singular,     value: "singular"  },
    { label: `${lower}s`, value: "plural_s"   },
    { label: "No plural",  value: "no_plural" },
  ];
}

function getPluralOptions(plural: string, singular: string) {
  return [
    { label: plural,        value: "plural"      },
    { label: singular,      value: "singular"    },
    { label: "No singular", value: "no_singular" },
  ];
}

function getSingularState(value: string): AnswerState {
  if (!value) return "empty";
  return value === "no_plural" ? "correct" : "wrong";
}

function getPluralState(value: string): AnswerState {
  if (!value) return "empty";
  return value === "no_singular" ? "correct" : "wrong";
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

// ─── Dropdown Cell ────────────────────────────────────────────────────────────

function DropdownCell({
  value,
  options,
  state,
  onChange,
}: {
  value: string;
  options: { label: string; value: string }[];
  state: AnswerState;
  onChange: (v: string) => void;
}) {
  const border =
    state === "correct" ? "border-green-400 dark:border-green-500"
    : state === "wrong"  ? "border-red-400 dark:border-red-500"
    : "border-gray-200 dark:border-white/15";
  const bg =
    state === "correct" ? "bg-green-50 dark:bg-green-900/20"
    : state === "wrong"  ? "bg-red-50 dark:bg-red-900/20"
    : "bg-white dark:bg-[#1C1917]";
  const text =
    state === "correct" ? "text-green-700 dark:text-green-300"
    : state === "wrong"  ? "text-red-600 dark:text-red-400"
    : "text-gray-700 dark:text-gray-200";
  const icon   = state === "correct" ? "✓" : state === "wrong" ? "✕" : "";
  const iconCl = state === "correct" ? "text-green-500" : state === "wrong" ? "text-red-400" : "";

  return (
    <div className="flex items-center gap-2 w-full">
      <span className={`w-5 h-5 shrink-0 text-sm font-bold flex items-center justify-center transition-all duration-200 ${iconCl} ${state === "empty" ? "opacity-0" : "opacity-100"}`}>
        {icon}
      </span>
      <div className="relative flex-1">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none text-sm rounded-lg px-3 py-2 pr-8 border-2 outline-none transition-all duration-200 cursor-pointer ${border} ${bg} ${text} ${!value ? "text-gray-400 dark:text-white/30" : ""}`}
        >
          <option value="" disabled className="bg-white dark:bg-[#1C1917] text-gray-400">Choose…</option>
          {options.map((o) => (
            <option key={o.value} value={o.value} className="text-gray-900 dark:text-white bg-white dark:bg-[#1C1917]">
              {o.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/30 text-xs">▾</span>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function NounsMergedPage() {
  const [dark, setDark] = useState<boolean>(false);
  const [singularAnswers, setSingularAnswers] = useState<Record<string, string>>(() =>
    Object.fromEntries(nouns.map((n) => [n.singular, ""]))
  );
  const [pluralAnswers, setPluralAnswers] = useState<Record<string, string>>(() =>
    Object.fromEntries(nouns.map((n) => [n.plural, ""]))
  );

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  const totalFields = nouns.length * 2;
  const correctCount = nouns.reduce((acc, n) => {
    if (getSingularState(singularAnswers[n.singular]) === "correct") acc++;
    if (getPluralState(pluralAnswers[n.plural]) === "correct") acc++;
    return acc;
  }, 0);

  const allCorrect = correctCount === totalFields;

  function resetAll() {
    setSingularAnswers(Object.fromEntries(nouns.map((n) => [n.singular, ""])));
    setPluralAnswers(Object.fromEntries(nouns.map((n) => [n.plural, ""])));
  }

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-[#1C1917] font-sans">

      {/* ── Top bar ── */}
      <header className="sticky top-0 z-20 border-b border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#1C1917]/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">📖</span>
            <h1 className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
              Nouns — Singular vs Plural Meanings
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
            <p className="text-sm font-semibold text-gray-800 dark:text-white">Rule — Same Word, Different Meanings</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              These nouns have one meaning in the{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-200">singular</span> and a completely different meaning in the{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-200">plural</span>.
              The singular has <span className="font-semibold text-gray-700 dark:text-gray-200">no plural</span> in that sense,
              and the plural has <span className="font-semibold text-gray-700 dark:text-gray-200">no singular</span> in that sense.
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
              All correct! You have mastered both singular and plural meanings.
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
              <h2 className="text-xl font-bold text-white tracking-tight">Choose the Correct Form</h2>
              <p className="text-gray-400 text-sm mt-0.5">Each pair shows the singular and plural — choose the right option for each</p>
            </div>
            <span className="text-gray-400 dark:text-gray-500 text-sm font-semibold bg-white/10 dark:bg-white/8 rounded-full px-2.5 py-0.5">
              {nouns.length}
            </span>
          </div>

          {/* Column headers */}
          <div className="grid grid-cols-2 sticky top-14 z-10 bg-gray-50 dark:bg-[#1C1917] border-b border-gray-200 dark:border-white/8">
            <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#1C1917] dark:bg-white flex items-center justify-center text-white dark:text-[#1C1917] text-[9px] font-black">W</span>
              Word &amp; Meaning
            </div>
            <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 border-l border-gray-200 dark:border-white/8 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-700 dark:text-indigo-300 text-[9px] font-black">?</span>
              Choose Form
            </div>
          </div>

          {/* Noun groups */}
          <div className="bg-white dark:bg-[#1C1917]">
            {nouns.map(({ singular, singularMeaning, plural, pluralMeaning }, idx) => {
              const sVal = singularAnswers[singular];
              const pVal = pluralAnswers[plural];
              const sState = getSingularState(sVal);
              const pState = getPluralState(pVal);
              const sOpts = getSingularOptions(singular);
              const pOpts = getPluralOptions(plural, singular);

              return (
                <div
                  key={singular}
                  className={idx > 0 ? "border-t-4 border-gray-100 dark:border-white/10" : ""}
                >
                  {/* Singular row */}
                  <div className="grid grid-cols-2 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                    <div className="px-4 py-3 flex flex-col gap-0.5 justify-center">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-semibold text-gray-900 dark:text-white tracking-wide">{singular}</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 uppercase tracking-wide">Singular</span>
                      </div>
                      <span className="text-[12px] italic text-gray-400 dark:text-gray-500 leading-relaxed">{singularMeaning}</span>
                    </div>
                    <div className="px-4 py-3 border-l border-gray-100 dark:border-white/6 flex items-center">
                      <DropdownCell
                        value={sVal}
                        options={sOpts}
                        state={sState}
                        onChange={(v) => setSingularAnswers((prev) => ({ ...prev, [singular]: v }))}
                      />
                    </div>
                  </div>

                  {/* Plural row — flipped: dropdown left, word+meaning right */}
                  <div className="grid grid-cols-2 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors border-t border-dashed border-gray-100 dark:border-white/6">
                    <div className="px-4 py-3 flex items-center">
                      <DropdownCell
                        value={pVal}
                        options={pOpts}
                        state={pState}
                        onChange={(v) => setPluralAnswers((prev) => ({ ...prev, [plural]: v }))}
                      />
                    </div>
                    <div className="px-4 py-3 border-l border-gray-100 dark:border-white/6 flex flex-col gap-0.5 justify-center">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-semibold text-gray-900 dark:text-white tracking-wide">{plural}</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 uppercase tracking-wide">Plural</span>
                      </div>
                      <span className="text-[12px] italic text-gray-400 dark:text-gray-500 leading-relaxed">{pluralMeaning}</span>
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
              Singular → <span className="font-semibold text-gray-800 dark:text-gray-200">No plural</span>.{" "}
              Plural → <span className="font-semibold text-gray-800 dark:text-gray-200">No singular</span>.
            </p>
            <button
              onClick={resetAll}
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