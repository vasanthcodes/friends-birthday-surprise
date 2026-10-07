import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Place } from "@/data/places";

interface PlaceCardProps {
  place: Place;
  index: number;
}

const PlaceCard = ({ place, index }: PlaceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15, type: "spring", stiffness: 80 }}
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{ y: -6, scale: 1.02 }}
    >
      <Link
        to={`/place/${place.id}`}
        className="group block bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-yellow-300/20 hover:bg-white/15 hover:border-yellow-300/40 transition-all duration-300"
      >
        {/* Section preview image */}
        <div className="aspect-video overflow-hidden">
          <img
            src={place.sectionImage}
            alt={`Preview of ${place.name}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Card content */}
        <div className="p-6">
          <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">
            {place.name}
          </h3>
          <p className="font-body text-white/80 text-sm line-clamp-2 mb-4">
            {place.description}
          </p>
          <span className="inline-flex items-center gap-1 font-body text-sm text-yellow-300 font-medium group-hover:gap-2 group-hover:text-yellow-200 transition-all">
            Explore <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default PlaceCard;
