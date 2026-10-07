import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Gamepad2, Heart, Music2 } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import PlaceCard from "@/components/PlaceCard";
import Footer from "@/components/Footer";
import { places } from "@/data/places";
import CountdownPage from "@/pages/CountdownPage";
import wishesBackground from "@/assets/Goa/wishes page background.mp4";

const TARGET_DATE = new Date("2026-04-18T00:00:00+10:00");

const fireConfetti = () => {
  const duration = 2000;
  const end = Date.now() + duration;

  const burst = () => {
    confetti({ particleCount: 40, spread: 80, origin: { x: Math.random(), y: Math.random() * 0.6 }, colors: ["#ff69b4", "#ffd700", "#ff6347", "#7b68ee", "#00ced1"] });
    if (Date.now() < end) requestAnimationFrame(burst);
  };
  burst();

  // Big side cannons
  confetti({ particleCount: 80, angle: 60, spread: 50, origin: { x: 0, y: 0.7 }, colors: ["#ff69b4", "#ffd700", "#ff6347"] });
  confetti({ particleCount: 80, angle: 120, spread: 50, origin: { x: 1, y: 0.7 }, colors: ["#7b68ee", "#00ced1", "#ffd700"] });
};

const Index = () => {
  const [revealed, setRevealed] = useState(() => new Date() >= TARGET_DATE);
  const handleComplete = useCallback(() => {
    setRevealed(true);
    setTimeout(fireConfetti, 300);
  }, []);

  // Initialize audio for wishes page
  useEffect(() => {
    if (revealed) {
      const audio = new Audio("/audio/Iris - The Goo Goo Dolls.mp3");
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
    }
  }, [revealed]);

  return (
    <AnimatePresence mode="wait">
      {!revealed ? (
        <motion.div key="countdown" exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }}>
          <CountdownPage onComplete={handleComplete} />
        </motion.div>
      ) : (
        <motion.main
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen relative"
        >
          {/* Video Background */}
          <div className="fixed inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={wishesBackground} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* Content with blur backdrop */}
          <div className="relative z-10 backdrop-blur-sm">
            <HeroSection />
            <div className="flex items-center justify-center py-12">
              <div className="h-px w-16 bg-white/30" />
              <span className="px-4 font-display text-lg italic text-white/90">
                Our Stops
              </span>
              <div className="h-px w-16 bg-white/30" />
            </div>
            <section className="px-6 pb-20">
              <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {places.map((place, index) => (
                  <PlaceCard key={place.id} place={place} index={index} />
                ))}
              </div>
            </section>
            <section className="px-6 pb-8">
              <Link to="/songs" className="group mx-auto block max-w-5xl overflow-hidden rounded-3xl border border-white/30 bg-gradient-to-br from-purple-400/20 via-pink-100/10 to-violet-200/20 p-8 shadow-2xl backdrop-blur-md transition hover:-translate-y-1 hover:border-white/50 md:p-12">
                <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
                  <div>
                    <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.22em] text-purple-200"><Music2 className="h-4 w-4" /> our playlist</p>
                    <h2 className="font-beach-day text-4xl leading-tight text-white md:text-6xl">Songs that feel<br /><span className="text-purple-200">like you.</span></h2>
                    <p className="mt-4 max-w-xl font-body text-white/75">Every song here means something. Updated whenever I find one that reminds me of you.</p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-purple-200 px-5 py-3 text-sm font-semibold text-slate-900 transition group-hover:bg-white"><Music2 className="h-4 w-4" /> Open playlist</span>
                </div>
              </Link>
            </section>

            <section className="px-6 pb-20">
              <Link to="/games" className="group mx-auto block max-w-5xl overflow-hidden rounded-3xl border border-white/30 bg-gradient-to-br from-rose-200/20 via-orange-100/10 to-sky-200/20 p-8 shadow-2xl backdrop-blur-md transition hover:-translate-y-1 hover:border-white/50 md:p-12">
                <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
                  <div>
                    <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.22em] text-orange-100"><Heart className="h-4 w-4 fill-current" /> A new little place for us</p>
                    <h2 className="font-beach-day text-4xl leading-tight text-white md:text-6xl">Let’s play together,<br /><span className="text-orange-100">even from far away.</span></h2>
                    <p className="mt-4 max-w-xl font-body text-white/75">Our first game is a memory jigsaw — pick a photo, share a table, and put it back together piece by piece.</p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-orange-100 px-5 py-3 text-sm font-semibold text-slate-900 transition group-hover:bg-white"><Gamepad2 className="h-4 w-4" /> Open our games</span>
                </div>
              </Link>
            </section>
            <Footer />
          </div>
        </motion.main>
      )}
    </AnimatePresence>
  );
};

export default Index;
