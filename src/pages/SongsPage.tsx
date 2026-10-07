import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Music2 } from "lucide-react";

const SongsPage = () => {
  return (
    <main className="min-h-screen overflow-x-hidden text-white"
      style={{ background: "linear-gradient(135deg, #0f0c1a 0%, #1a1030 50%, #0d0d1f 100%)" }}
    >
      <div className="fixed inset-0 -z-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 30% 20%, rgba(139,92,246,0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(236,72,153,0.12) 0%, transparent 50%)" }}
      />

      <header className="flex items-center justify-between px-5 py-5 sm:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white">
          <ArrowLeft className="h-4 w-4" /> back
        </Link>
      </header>

      <section className="mx-auto max-w-2xl px-5 pb-20 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.22em] text-purple-300/80">
            <Music2 className="h-3.5 w-3.5" /> for your ears only
          </p>
          <h1 className="font-beach-day text-5xl leading-tight text-white sm:text-7xl">
            Songs for Rohini
          </h1>
          <p className="mt-4 text-white/60 text-sm max-w-md">
            Every song here means something. Some remind me of you, some you showed me, some I wish I could play for you right now. 🎵
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-900/20"
        >
          <iframe
            data-testid="embed-iframe"
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/playlist/6Aymr0iVZyPzXMyv0LYVta?utm_source=generator&si=2081bd5faaab418e"
            width="100%"
            height="500"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-center text-xs text-white/30"
        >
          playlist updated whenever I find a song that feels like you ♾️
        </motion.p>
      </section>
    </main>
  );
};

export default SongsPage;
