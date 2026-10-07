import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import type { PhotoSlide } from "@/data/places";

interface PhotoCarouselProps {
  slides: PhotoSlide[];
  placeName: string;
  backgroundImage?: string;
  leftNote?: string;
  rightNote?: string;
}

const PhotoCarousel = ({ slides, placeName, backgroundImage, leftNote, rightNote }: PhotoCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const slide = slides[current];

  // Initialize audio once on mount - don't change with each slide
  useEffect(() => {
    if (!audioRef.current && slides[0]?.audio) {
      const audio = new Audio(slides[0].audio);
      audio.loop = true;
      audio.muted = muted;
      audio.volume = 0.5;
      audioRef.current = audio;

      // Fade in
      audio.volume = 0;
      audio.play().catch(() => { });
      const fadeIn = setInterval(() => {
        if (audio.volume < 0.5) {
          audio.volume = Math.min(audio.volume + 0.05, 0.5);
        } else {
          clearInterval(fadeIn);
        }
      }, 50);

      // Cleanup function
      return () => {
        clearInterval(fadeIn);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    }
  }, []);

  // Sync mute state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted;
    }
  }, [muted]);

  const goTo = useCallback((next: number) => {
    setDirection(next > current ? 1 : -1);
    setCurrent(next);
  }, [current]);

  const goNext = () => goTo((current + 1) % slides.length);
  const goPrev = () => goTo((current - 1 + slides.length) % slides.length);

  // Generate random stars for background
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.5 + 0.5,
    duration: Math.random() * 3 + 2,
  }));

  if (slides.length === 0) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
        <div className="w-12 h-12 text-slate-400">📸</div>
        <p className="font-body text-slate-400 text-sm">Add your photos here!</p>
      </div>
    );
  }

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center overflow-visible">
      {/* Background - Image or Night sky with stars */}
      {backgroundImage ? (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 z-0">
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: star.size,
                height: star.size,
              }}
              animate={{
                opacity: [star.opacity, star.opacity * 0.5, star.opacity],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Main carousel container with side notes sections */}
      <div className="relative flex flex-col lg:flex-row gap-2 items-center justify-center w-full min-h-screen px-4 lg:px-0 z-10 py-8">
        {/* Left note section - only on desktop */}
        <div className="hidden lg:flex w-80 flex-shrink-0 h-[500px] flex-col">
          <div className="h-full border-3 border-dashed border-slate-300 rounded-xl p-6 bg-white/8 backdrop-blur-sm flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors">
            <p className="text-sm text-slate-200 font-body leading-relaxed">{leftNote || "No note available for this place."}</p>
          </div>
        </div>

        {/* Center carousel */}
        <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-slate-800 border-2 border-slate-600 flex-shrink-0">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.img
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              src={slide.image}
              alt={`${placeName} photo ${current + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Mute button */}
          <button
            onClick={() => setMuted(!muted)}
            className="absolute bottom-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors text-white/80 hover:text-white z-20"
          >
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          {/* Nav arrows */}
          <button
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors text-white/80 hover:text-white z-20"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors text-white/80 hover:text-white z-20"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>

        {/* Right note section - only on desktop */}
        <div className="hidden lg:flex w-80 flex-shrink-0 h-[500px] flex-col">
          <div className="h-full border-3 border-dashed border-slate-300 rounded-xl p-6 bg-white/8 backdrop-blur-sm flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors">
            <p className="text-sm text-slate-200 font-body leading-relaxed">{rightNote || "No note available for this place."}</p>
          </div>
        </div>

        {/* Mobile notes - below carousel */}
        <div className="lg:hidden flex flex-col gap-4 w-full mt-4">
          {(leftNote || rightNote) && (
            <>
              {leftNote && (
                <div className="w-full border-3 border-dashed border-slate-300 rounded-xl p-4 bg-white/8 backdrop-blur-sm">
                  <p className="text-xs text-slate-200 font-body leading-relaxed text-center">{leftNote}</p>
                </div>
              )}
              {rightNote && (
                <div className="w-full border-3 border-dashed border-slate-300 rounded-xl p-4 bg-white/8 backdrop-blur-sm">
                  <p className="text-xs text-slate-200 font-body leading-relaxed text-center">{rightNote}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Dots - positioned at bottom */}
      <div className="relative z-20 pb-8">
        <div className="flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === current
                ? "bg-blue-400 scale-125"
                : "bg-slate-400/40 hover:bg-slate-400/60"
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoCarousel;
