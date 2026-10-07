import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, RefreshCw, Star } from "lucide-react";

import goa1 from "@/assets/Goa/goa 1.JPG";
import goa5 from "@/assets/Goa/goa 5.JPG";
import goa9 from "@/assets/Goa/goa 9.jpg";
import goa12 from "@/assets/Goa/goa 12.jpg";
import bangalore3 from "@/assets/bangalore 3.JPG";
import bangalore8 from "@/assets/bangalore 8.JPG";
import bangalore19 from "@/assets/bangalore 19.JPG";
import bangalore22 from "@/assets/bangalore 22.JPG";

interface Memory {
  id: string;
  image: string;
  hint: string;
  answers: string[];
  reveal: string;
}

const memories: Memory[] = [
  {
    id: "goa-beach",
    image: goa1,
    hint: "You looked at something vast and blue that evening 🌊",
    answers: ["ocean", "sea", "beach", "goa", "palolem", "water"],
    reveal: "The ocean at Palolem — your hair, that smile, that evening. I took a mental picture. ❤️",
  },
  {
    id: "goa-stars",
    image: goa5,
    hint: "We stayed up way too late doing this together 🌟",
    answers: ["stars", "stargazing", "sky", "night", "watching stars"],
    reveal: "Watching the stars with you. One of those nights I never wanted to end. 🌌",
  },
  {
    id: "goa-saltwater",
    image: goa9,
    hint: "Something that is good for the soul — and our feet 🧂",
    answers: ["saltwater", "salt water", "swimming", "sea", "waves", "water"],
    reveal: "Soaking in the saltwater. Tired legs, happy hearts. 🌊",
  },
  {
    id: "goa-view",
    image: goa12,
    hint: "The perfect spot we found together 📍",
    answers: ["view", "spot", "cliff", "hilltop", "palolem", "goa", "lookout"],
    reveal: "Finding the perfect spot — worth every step to get there. 🏝️",
  },
  {
    id: "bng-food",
    image: bangalore3,
    hint: "Something I insisted on doing for you 🍽️",
    answers: ["food", "feeding", "eating", "dinner", "lunch", "meal", "restaurant"],
    reveal: "Feeding you in Bangalore. You never had to ask twice. 😊",
  },
  {
    id: "bng-rooftop",
    image: bangalore8,
    hint: "High above the city, just the two of us 🏙️",
    answers: ["rooftop", "terrace", "city", "bangalore", "view", "night"],
    reveal: "Bangalore from above. The city looks different when you're next to someone you care about. 🌃",
  },
  {
    id: "bng-walk",
    image: bangalore19,
    hint: "We did a lot of this around the city, bags and all 🚶",
    answers: ["walk", "walking", "stroll", "bags", "exploring", "street"],
    reveal: "Those walks around Bangalore — carrying bags, talking about everything. I loved every second. 🛍️",
  },
  {
    id: "bng-us",
    image: bangalore22,
    hint: "The simplest thing — just us, in our city 💛",
    answers: ["us", "together", "bangalore", "you", "home", "photo", "friends"],
    reveal: "Just us. Bangalore will never feel the same without you in it. 💛",
  },
];

const FloatingHeart = ({ x, y }: { x: number; y: number }) => (
  <motion.div
    className="pointer-events-none fixed z-50 text-2xl"
    style={{ left: x, top: y }}
    initial={{ opacity: 1, y: 0, scale: 0.5 }}
    animate={{ opacity: 0, y: -120, scale: 1.4 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
  >
    ❤️
  </motion.div>
);

const isClose = (guess: string, answers: string[]) => {
  const g = guess.toLowerCase().trim();
  return answers.some((a) => g.includes(a) || a.includes(g));
};

const GuessMemoryPage = () => {
  const [index, setIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [phase, setPhase] = useState<"guessing" | "correct" | "done">("guessing");
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [score, setScore] = useState(0);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const heartId = useRef(0);

  const current = memories[index];

  const spawnHearts = () => {
    const newHearts = Array.from({ length: 8 }, (_, i) => ({
      id: heartId.current++,
      x: 100 + Math.random() * (window.innerWidth - 200),
      y: 200 + Math.random() * (window.innerHeight - 400),
    }));
    setHearts((h) => [...h, ...newHearts]);
    setTimeout(() => setHearts((h) => h.filter((hh) => !newHearts.find((n) => n.id === hh.id))), 1400);
  };

  const handleGuess = () => {
    if (!guess.trim()) return;
    if (isClose(guess, current.answers)) {
      setPhase("correct");
      setScore((s) => s + 1);
      spawnHearts();
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const next = () => {
    if (index + 1 >= memories.length) {
      setPhase("done");
    } else {
      setIndex((i) => i + 1);
      setGuess("");
      setPhase("guessing");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const restart = () => {
    setIndex(0);
    setGuess("");
    setPhase("guessing");
    setScore(0);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#101526] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(244,151,105,.24),transparent_30%),radial-gradient(circle_at_80%_75%,rgba(88,156,177,.25),transparent_34%),linear-gradient(145deg,#12182b,#20354b_54%,#14182d)]" />

      {/* Floating hearts */}
      {hearts.map((h) => <FloatingHeart key={h.id} x={h.x} y={h.y} />)}

      <header className="flex items-center justify-between px-5 py-5 sm:px-8">
        <Link to="/games" className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white">
          <ArrowLeft className="h-4 w-4" /> back to games
        </Link>
        <div className="flex items-center gap-2 text-sm text-orange-200/80">
          <Star className="h-4 w-4 fill-current" />
          {score} / {memories.length}
        </div>
      </header>

      <section className="mx-auto max-w-2xl px-5 pb-20 sm:px-8">
        <div className="mb-8">
          <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.22em] text-orange-200/80">
            <Heart className="h-3.5 w-3.5 fill-current" /> guess the memory
          </p>
          <h1 className="font-beach-day text-5xl leading-[.95] text-white sm:text-6xl">
            What moment is this?
          </h1>
          <p className="mt-3 text-sm text-white/60">
            {index + 1} of {memories.length} memories
          </p>
        </div>

        <AnimatePresence mode="wait">
          {phase === "done" ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl border border-white/15 bg-white/[.07] p-10 text-center backdrop-blur-md"
            >
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="font-beach-day text-4xl text-white mb-2">You got {score} out of {memories.length}!</h2>
              <p className="text-white/60 mb-8">
                {score === memories.length
                  ? "You remember everything. Of course you do. ❤️"
                  : score >= memories.length / 2
                  ? "You remember the important ones. That's all that matters. 💛"
                  : "Some moments are better felt than named. 🌊"}
              </p>
              <button
                onClick={restart}
                className="inline-flex items-center gap-2 rounded-full bg-orange-200 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-orange-100"
              >
                <RefreshCw className="h-4 w-4" /> Play again
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-white/15 bg-white/[.07] overflow-hidden backdrop-blur-md"
            >
              {/* Photo */}
              <div className="relative aspect-video overflow-hidden">
                <motion.img
                  src={current.image}
                  alt="Blurred memory"
                  className="w-full h-full object-cover"
                  animate={{ filter: phase === "correct" ? "blur(0px) brightness(1)" : "blur(18px) brightness(0.7)" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
                {phase === "correct" && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  >
                    <div className="rounded-full bg-black/40 backdrop-blur-sm px-6 py-3 text-3xl">❤️</div>
                  </motion.div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-white/80 text-base mb-5">{current.hint}</p>

                <AnimatePresence mode="wait">
                  {phase === "correct" ? (
                    <motion.div
                      key="reveal"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-2xl border border-orange-200/30 bg-orange-200/10 p-4 mb-5"
                    >
                      <p className="text-orange-100 text-sm leading-relaxed">{current.reveal}</p>
                    </motion.div>
                  ) : (
                    <motion.div key="input" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <motion.div
                        animate={shake ? { x: [-8, 8, -6, 6, -4, 4, 0] } : {}}
                        transition={{ duration: 0.4 }}
                        className="flex gap-3 mb-2"
                      >
                        <input
                          ref={inputRef}
                          value={guess}
                          onChange={(e) => setGuess(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleGuess()}
                          placeholder="Type what you remember…"
                          className="flex-1 rounded-full bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-orange-200/60 focus:ring-2 focus:ring-orange-200/20 transition"
                          autoFocus
                        />
                        <button
                          onClick={handleGuess}
                          className="rounded-full bg-orange-200 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-orange-100"
                        >
                          Guess
                        </button>
                      </motion.div>
                      <p className="text-xs text-white/30 pl-2">press Enter or click Guess</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {phase === "correct" && (
                  <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    onClick={next}
                    className="w-full rounded-full bg-orange-200 py-3 text-sm font-semibold text-slate-900 transition hover:bg-orange-100"
                  >
                    {index + 1 >= memories.length ? "See your score ✨" : "Next memory →"}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress dots */}
        {phase !== "done" && (
          <div className="flex justify-center gap-2 mt-6">
            {memories.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i < index ? "bg-orange-200 w-2 h-2" :
                  i === index ? "bg-white w-3 h-3" :
                  "bg-white/20 w-2 h-2"
                }`}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default GuessMemoryPage;
