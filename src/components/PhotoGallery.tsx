import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";

interface PhotoGalleryProps {
  photos: string[];
  placeName: string;
}

const PhotoGallery = ({ photos, placeName }: PhotoGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (photos.length === 0) {
    return (
      <div className="aspect-video rounded-xl bg-card border border-border flex flex-col items-center justify-center gap-3">
        <ImageIcon className="w-12 h-12 text-muted-foreground/40" />
        <p className="font-body text-muted-foreground text-sm">
          Add your photos here!
        </p>
      </div>
    );
  }

  const goNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % photos.length);
    }
  };

  const goPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
    }
  };

  return (
    <>
      {/* Grid */}
      <div
        className={`grid gap-3 ${
          photos.length === 1
            ? "grid-cols-1"
            : photos.length === 2
              ? "grid-cols-2"
              : "grid-cols-2 grid-rows-2"
        }`}
      >
        {photos.slice(0, 4).map((photo, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedIndex(i)}
            className={`relative rounded-xl overflow-hidden shadow-md border border-border cursor-pointer ${
              photos.length === 3 && i === 0 ? "row-span-2" : ""
            }`}
          >
            <img
              src={photo}
              alt={`${placeName} photo ${i + 1}`}
              className="w-full h-full object-cover aspect-square"
              loading="lazy"
            />
            {i === 3 && photos.length > 4 && (
              <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
                <span className="text-primary-foreground font-display text-2xl font-bold">
                  +{photos.length - 4}
                </span>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
            onClick={() => setSelectedIndex(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(null);
              }}
              className="absolute top-6 right-6 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <motion.img
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={photos[selectedIndex]}
              alt={`${placeName} photo ${selectedIndex + 1}`}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <div className="absolute bottom-6 text-primary-foreground/60 font-body text-sm">
              {selectedIndex + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PhotoGallery;
