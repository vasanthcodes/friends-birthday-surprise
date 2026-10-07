import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import PhotoCarousel from "./PhotoCarousel";
import type { Place } from "@/data/places";


interface PlaceSectionProps {
  place: Place;
  index: number;
}

const PlaceSection = ({ place, index }: PlaceSectionProps) => {
  const isEven = index % 2 === 0;

  return (
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Place header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <MapPin className="w-4 h-4" />
            <span className="font-body text-sm font-medium tracking-wide uppercase">
              Stop #{index + 1}
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
            {place.name}
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            {place.description}
          </p>
        </motion.div>

        {/* Map + Photos layout */}
        <div
          className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8`}
        >
          {/* Google Map embed */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:w-1/2"
          >
            <div className="rounded-xl overflow-hidden shadow-lg border border-border aspect-video">
              <iframe
                title={`Map of ${place.name}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(place.mapQuery)}`}
                allowFullScreen
              />
            </div>
          </motion.div>

          {/* Photo gallery */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:w-1/2"
          >
            {place.slides.length > 0 ? (
              <PhotoCarousel slides={place.slides} placeName={place.name} />
            ) : (
              <PhotoCarousel slides={place.photos.map(p => ({ image: p }))} placeName={place.name} />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PlaceSection;
