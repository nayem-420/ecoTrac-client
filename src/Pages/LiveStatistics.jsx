import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LiveStatistics = () => {
  const [stats, setStats] = useState({
    co2Saved: 0,
    plasticReduced: 0,
    activeMembers: 0,
  });

  useEffect(() => {
    setStats({
      co2Saved: 12500,
      plasticReduced: 3200,
      activeMembers: 1245,
    });
  }, []);

  const Counter = ({ target, suffix = "" }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [target]);

    return (
      <span>
        {count.toLocaleString()}
        {suffix}
      </span>
    );
  };

  const statsData = [
    {
      id: 1,
      value: stats.co2Saved,
      label: "CO₂ Saved",
      suffix: " kg",
      gradient: "from-green-400 to-emerald-600",
      icon: "🌱",
      hoverColor: "hover:shadow-green-400/50",
    },
    {
      id: 2,
      value: stats.plasticReduced,
      label: "Plastic Reduced",
      suffix: " kg",
      gradient: "from-blue-400 to-cyan-600",
      icon: "♻️",
      hoverColor: "hover:shadow-blue-400/50",
    },
    {
      id: 3,
      value: stats.activeMembers,
      label: "Active Members",
      suffix: "+",
      gradient: "from-purple-400 to-pink-600",
      icon: "👥",
      hoverColor: "hover:shadow-purple-400/50",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      className="grid lg:grid-cols-3 gap-6 mt-6 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {statsData.map((stat, index) => (
        <motion.div
          key={stat.id}
          variants={cardVariants}
          whileHover={{
            scale: 1.05,
            y: -10,
            transition: { type: "spring", stiffness: 300 },
          }}
          whileTap={{ scale: 0.95 }}
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${stat.gradient} p-8 text-white shadow-2xl ${stat.hoverColor} hover:shadow-2xl transition-all duration-300`}
        >
          <motion.div
            className="absolute -top-10 -right-10 text-9xl opacity-10"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {stat.icon}
          </motion.div>

          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, -60],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </motion.div>

          {/* Content */}
          <div className="relative z-10">
            <motion.div
              className="text-6xl mb-2"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              {stat.icon}
            </motion.div>

            <motion.h3
              className="text-5xl font-black mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Counter target={stat.value} suffix={stat.suffix} />
            </motion.h3>

            <motion.p
              className="text-lg font-semibold tracking-wide uppercase opacity-90"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              {stat.label}
            </motion.p>

            
            <motion.div
              className="mt-4 h-1 bg-white/30 rounded-full overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
            >
              <motion.div
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{
                  delay: 0.8 + index * 0.1,
                  duration: 1.5,
                  ease: "easeOut",
                }}
              />
            </motion.div>
          </div>

          
          <motion.div
            className="absolute inset-0 bg-white opacity-0"
            whileHover={{
              opacity: [0, 0.1, 0],
              transition: { duration: 0.6 },
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default LiveStatistics;
