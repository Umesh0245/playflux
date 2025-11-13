import { motion } from "framer-motion";
import Prism from "@/components/Prism";
import { BackButton } from "@/components/BackButton";
import { Zap, Target, Users, Rocket } from "lucide-react";

const About = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Prism Background */}
      <div className="fixed inset-0 z-0">
        <Prism
          animationType="3drotate"
          timeScale={0.3}
          height={4.0}
          baseWidth={6.0}
          scale={2.8}
          hueShift={3.8}
          colorFrequency={0.8}
          noise={0.2}
          glow={1.5}
          bloom={1.2}
          transparent={true}
        />
      </div>

      {/* Gradient overlay for better readability */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20 max-w-6xl">
        <BackButton />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 mt-8"
        >
          <h1 className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-2xl">
            About PlayFlux
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light">
            Pioneering the future of gaming retail with cutting-edge technology and immersive experiences
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-12 border border-white/20 shadow-2xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 flex items-center gap-3">
            <Rocket className="h-10 w-10 text-blue-400 drop-shadow-lg" />
            Our Mission
          </h2>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            At PlayFlux, we're not just selling gaming gear—we're crafting experiences. Our mission is to empower gamers worldwide with premium, performance-driven equipment that transforms gameplay into art. We believe in the convergence of technology, design, and passion.
          </p>
        </motion.div>

        {/* Core Values Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: Zap,
              title: "Innovation First",
              description: "We push boundaries with the latest gaming technology and futuristic interfaces.",
              color: "from-yellow-400 to-orange-500"
            },
            {
              icon: Target,
              title: "Precision & Quality",
              description: "Every product is curated for peak performance and unmatched reliability.",
              color: "from-blue-400 to-cyan-500"
            },
            {
              icon: Users,
              title: "Community Driven",
              description: "Built by gamers, for gamers. Your feedback shapes our evolution.",
              color: "from-purple-400 to-pink-500"
            }
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-2xl p-8 border border-white/20 hover:border-white/40 hover:from-white/15 hover:to-white/10 transition-all duration-300 group shadow-xl"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <value.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
              <p className="text-white/70 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-2xl rounded-3xl p-12 border border-white/20 shadow-2xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Story</h2>
          <div className="space-y-6 text-white/80 text-lg leading-relaxed">
            <p>
              Founded in 2025, PlayFlux emerged from a simple question: What if shopping for gaming gear felt as exciting as gaming itself? We envisioned a platform where technology meets artistry, where every interaction is smooth, every design choice deliberate.
            </p>
            <p>
              From our futuristic UI animations to our carefully curated product catalog, every pixel of PlayFlux is designed to ignite your passion for gaming. We're constantly evolving, integrating cutting-edge web technologies and 3D visualizations to create an unparalleled shopping experience.
            </p>
            <p className="font-semibold text-blue-300 text-xl">
              Welcome to the future of gaming retail. Welcome to PlayFlux.
            </p>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "10K+", label: "Happy Gamers" },
            { value: "500+", label: "Premium Products" },
            { value: "50+", label: "Top Brands" },
            { value: "24/7", label: "Support" }
          ].map((stat, index) => (
            <div key={index} className="text-center bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 shadow-xl hover:border-white/40 transition-all duration-300">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 drop-shadow-lg">
                {stat.value}
              </div>
              <div className="text-white/60 text-sm uppercase tracking-wider font-semibold">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default About;
