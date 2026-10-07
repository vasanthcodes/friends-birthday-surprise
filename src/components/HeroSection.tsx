import { motion } from "framer-motion";
import { useMemo } from "react";

const SPARKLE_COUNT = 18;

const Sparkle = ({ x, y, delay, size }: { x: string; y: string; delay: number; size: number }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: x, top: y }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0], rotate: [0, 180, 360] }}
    transition={{ duration: 2.5, delay, repeat: Infinity, repeatDelay: 3 + Math.random() * 4, ease: "easeInOut" }}
  >
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" fill="rgba(255,220,150,0.85)" />
    </svg>
  </motion.div>
);

const HeroSection = () => {
  const sparkles = useMemo(
    () =>
      Array.from({ length: SPARKLE_COUNT }, (_, i) => ({
        id: i,
        x: `${5 + Math.random() * 90}%`,
        y: `${5 + Math.random() * 90}%`,
        delay: Math.random() * 6,
        size: 10 + Math.random() * 16,
      })),
    []
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Floating sparkles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {sparkles.map((s) => (
          <Sparkle key={s.id} x={s.x} y={s.y} delay={s.delay} size={s.size} />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mt-32">
        <motion.p
          initial={{ opacity: 0, scale: 0.3, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 200, damping: 12 }}
          className="font-beach-day text-white font-normal text-6xl md:text-8xl tracking-wider uppercase mb-4"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="inline-block"
          >
            {"Happy Bornday Rohini".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
                className="inline-block"
              >
                {char === " " ? " " : char}
              </motion.span>
            ))}
          </motion.span>
        </motion.p>

        {/* Pulsing hearts accent */}
        <motion.div
          className="flex justify-center gap-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          {["❤️", "🧡", "💛"].map((heart, i) => (
            <motion.span
              key={i}
              className="text-2xl"
              animate={{ scale: [1, 1.3, 1], y: [0, -4, 0] }}
              transition={{ duration: 1.2, delay: 1.6 + i * 0.2, repeat: Infinity, repeatDelay: 2 }}
            >
              {heart}
            </motion.span>
          ))}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-beach-day text-orange-300 text-4xl md:text-5xl font-bold leading-tight mb-6"
        >
          Our Journey
          <br />
          <span className="italic font-normal">and the memories we shared</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-beach-day text-black text-xl md:text-2xl max-w-xl mx-auto mb-10"
        >
          Edho naaku vachinantha try chesa bro. I hope it makes your day a little brighter 😊❤️
        </motion.p>

        {/* Animated scroll arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <motion.svg
            className="w-8 h-8 mx-auto text-white/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </motion.svg>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
