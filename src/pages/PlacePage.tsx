import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { places } from "@/data/places";
import PhotoCarousel from "@/components/PhotoCarousel";

const PlacePage = () => {
  const { placeId } = useParams<{ placeId: string }>();
  const placeIndex = places.findIndex((p) => p.id === placeId);
  const place = places[placeIndex];

  if (!place) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-display text-3xl text-foreground mb-4">Place not found</h1>
          <Link to="/" className="text-primary font-body hover:underline">
            ← Back to all places
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="relative w-full min-h-screen overflow-y-auto bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
      {/* Back nav - Fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-slate-600">
        <div className="px-6 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors font-body text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            All Places
          </Link>
          <h2 className="font-display text-lg text-slate-200">{place.name}</h2>
          <div className="w-24" />
        </div>
      </div>

      {/* Content with top padding for fixed nav */}
      <div className="pt-16">
        {/* Carousel with proper sizing */}
        {place.slides.length > 0 ? (
          <PhotoCarousel slides={place.slides} placeName={place.name} backgroundImage={place.backgroundImage} leftNote={place.leftNote} rightNote={place.rightNote} />
        ) : (
          <PhotoCarousel slides={place.photos.map(p => ({ image: p }))} placeName={place.name} backgroundImage={place.backgroundImage} leftNote={place.leftNote} rightNote={place.rightNote} />
        )}
      </div>
    </main>
  );
};

export default PlacePage;
