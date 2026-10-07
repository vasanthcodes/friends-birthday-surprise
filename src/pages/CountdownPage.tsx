import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TARGET_DATE = new Date("2026-04-18T00:00:00+10:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const getTimeLeft = (): TimeLeft | null => {
  const now = new Date();
  const diff = TARGET_DATE.getTime() - now.getTime();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const Star = ({ delay, duration, left, top, size }: { delay: number; duration: number; left: string; top: string; size: number }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      left,
      top,
      width: size,
      height: size,
      background: `radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)`,
    }}
    animate={{
      opacity: [0, 1, 0.4, 1, 0],
      scale: [0.8, 1.2, 1, 1.3, 0.8],
      y: [0, -30, -15, -50, -80],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const ShootingStar = ({ delay }: { delay: number }) => {
  const top = `${5 + Math.random() * 40}%`;
  const angle = 15 + Math.random() * 20; // degrees
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top, left: "-5%", rotate: `${angle}deg` }}
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: "120vw", opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 1.2 + Math.random() * 0.8,
        delay,
        repeat: Infinity,
        repeatDelay: 6 + Math.random() * 10,
        ease: "easeIn",
      }}
    >
      <div
        className="h-[1px] rounded-full"
        style={{
          width: 60 + Math.random() * 60,
          background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)",
          boxShadow: "0 0 6px 1px rgba(200,200,255,0.4)",
        }}
      />
    </motion.div>
  );
};

const CountdownPage = ({ onComplete }: { onComplete: () => void }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(getTimeLeft);

  const stars = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        delay: Math.random() * 6,
        duration: 4 + Math.random() * 6,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 1 + Math.random() * 3,
      })),
    []
  );

  // Initialize audio for countdown
  useEffect(() => {
    const audio = new Audio("/audio/Teenage Dream - Stephen Dawes.mp3");
    audio.loop = true;
    audio.volume = 0.3;

    const playAudio = () => {
      audio.play().catch(() => { });
      document.removeEventListener('click', playAudio);
      document.removeEventListener('touchstart', playAudio);
    };

    // Try to play automatically
    audio.play().catch(() => {
      // If autoplay fails, play on first user interaction
      document.addEventListener('click', playAudio);
      document.addEventListener('touchstart', playAudio);
    });

    return () => {
      audio.pause();
      document.removeEventListener('click', playAudio);
      document.removeEventListener('touchstart', playAudio);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const t = getTimeLeft();
      if (!t) {
        clearInterval(interval);
        onComplete();
      }
      setTimeLeft(t);
    }, 1000);
    return () => clearInterval(interval);
  }, [onComplete]);

  if (!timeLeft) return null;

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-6"
      style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #111127 40%, #0d0d20 100%)" }}
    >
      {/* Floating stars */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((s) => (
          <Star key={s.id} {...s} />
        ))}
      </div>

      {/* Shooting stars */}
      {[0, 3, 7, 12, 18].map((d, i) => (
        <ShootingStar key={i} delay={d} />
      ))}


      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)" }}
      />

      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-50 text-sm tracking-[0.3em] uppercase mb-2"
        style={{ color: "rgba(165,165,200,0.7)" }}
      >

      </motion.p>

      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 150 }}
        className="relative z-10 font-display text-4xl md:text-6xl font-bold mb-12 text-center"
        style={{ color: "#e8e8f0" }}
      >
        🐳😶‍🌫️😶‍🌫️😶‍🌫️🐳
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 flex gap-4 md:gap-8"
      >
        {units.map((unit, i) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="flex flex-col items-center"
          >
            <div
              className="rounded-2xl w-[72px] h-20 md:w-28 md:h-32 flex items-center justify-center shadow-lg"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
              }}
            >
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={unit.value}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                  className="font-display text-3xl md:text-5xl font-bold"
                  style={{ color: "#e8e8f0" }}
                >
                  {String(unit.value).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
            </div>
            <span
              className="text-xs md:text-sm mt-2 tracking-wider uppercase"
              style={{ color: "rgba(165,165,200,0.5)" }}
            >
              {unit.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 text-sm mt-12"
        style={{ color: "rgba(165,165,200,0.35)" }}
      >
        April 18
      </motion.p>
    </div>
  );
};

export default CountdownPage;
