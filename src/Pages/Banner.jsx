import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import {
  FaArrowRightLong,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import FutureForest from "../assets/future-forest-stewardship.png";
import HandWithPlant from "../assets/hand-with-plant.png";
import LeavesFullHand from "../assets/leaves-full-hand.png";

const slides = [
  {
    img: FutureForest,
    title: "Join the Future Forest Challenge",
    subtitle: "Contribute to sustainable reforestation",
  },
  {
    img: HandWithPlant,
    title: "Plant a Tree, Save a Life",
    subtitle: "Track your impact and inspire others",
  },
  {
    img: LeavesFullHand,
    title: "Be an Eco Hero Today",
    subtitle: "Small steps, big change for our planet",
  },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  return (
    <section className="w-full h-[450px] relative rounded-2xl overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          className="absolute inset-0"
        >
          
          <img
            src={slides[currentIndex].img}
            alt={slides[currentIndex].title}
            className="w-full h-full object-cover"
          />

          
          <div className="absolute inset-0 bg-black/40" />

          
          <motion.div
            className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-3"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {slides[currentIndex].title}
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {slides[currentIndex].subtitle}
            </motion.p>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
            >
              <Link to="/login">
                <motion.button
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-white font-semibold shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started <FaArrowRightLong />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <motion.button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm p-3 rounded-full text-white z-10 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaChevronLeft size={20} />
      </motion.button>

      <motion.button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm p-3 rounded-full text-white z-10 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaChevronRight size={20} />
      </motion.button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all ${
              index === currentIndex
                ? "bg-white w-8"
                : "bg-white/50 w-3 hover:bg-white/70"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;