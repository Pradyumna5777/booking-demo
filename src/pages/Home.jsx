import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiStar, FiCheck, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import SearchBar from '../components/SearchBar';
import { services, testimonials, stats } from '../data/mockData';

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [direction, setDirection] = useState(1);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goToTestimonial = (index) => {
    setDirection(index > currentTestimonial ? 1 : -1);
    setCurrentTestimonial(index);
  };

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0, scale: 0.95 }),
  };

  return (
    <div className="pt-20 overflow-x-hidden">
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden">
        {/* Background Image with Parallax feel */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=80"
            alt="Luxury resort"
            className="w-full h-full object-cover"
          />
          {/* Layered gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </motion.div>

        {/* Animated floating orbs (glassmorphism decoration) */}
        <motion.div
          animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-20 w-72 h-72 rounded-full bg-primary-500/20 blur-3xl hidden lg:block"
        />
        <motion.div
          animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl hidden lg:block"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            

            {/* Heading with better text fit */}
            <motion.h1
              variants={itemVariants}
              className="text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] font-bold text-white mb-6 leading-[1.05] tracking-tight"
            >
              <span className="block">Book Your</span>
              <span className="block bg-gradient-to-r from-primary-300 via-primary-400 to-purple-400 bg-clip-text text-transparent">
                Perfect Getaway
              </span>
              <span className="block text-white/90 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-gruppo mt-2">
                in just a few clicks
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-gray-200/90 mb-8 max-w-2xl leading-relaxed"
            >
              Discover, compare, and book hotels, flights, cars, and unforgettable experiences
              — all in one beautifully crafted place.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 sm:gap-4 mb-10"
            >
              <Link
                to="/services"
                className="group relative inline-flex items-center gap-2 bg-white text-primary-700 
                           px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base
                           shadow-2xl shadow-primary-900/30
                           hover:bg-primary-50 transition-all duration-300 
                           hover:scale-[1.03] active:scale-95 overflow-hidden"
              >
                <span className="relative z-10">Explore Services</span>
                <FiArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <span className="absolute inset-0 bg-gradient-to-r from-white via-primary-50 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link
                to="/bookings"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 
                           rounded-xl font-semibold text-sm sm:text-base
                           bg-white/10 backdrop-blur-xl border border-white/25 text-white
                           hover:bg-white/20 transition-all duration-300
                           hover:scale-[1.03] active:scale-95 shadow-xl"
              >
                View My Bookings
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-6 sm:gap-8 flex-wrap"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      alt="User"
                      className="w-9 h-9 rounded-full border-2 border-white/80 shadow-lg"
                    />
                  ))}
                </div>
                <div className="text-white">
                  <p className="font-bold text-sm sm:text-base">50K+</p>
                  <p className="text-xs text-white/70">Happy travelers</p>
                </div>
              </div>

              <div className="h-10 w-px bg-white/20 hidden sm:block" />

              <div className="flex items-center gap-2 text-white">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="fill-yellow-400" size={14} />
                  ))}
                </div>
                <span className="text-sm">
                  <strong>4.9</strong> <span className="text-white/70">rating</span>
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Glass Card (desktop only) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="absolute top-32 right-6 xl:right-16 hidden xl:block"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="bg-white/15 backdrop-blur-2xl border border-white/25 rounded-2xl p-5 shadow-2xl w-72"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 bg-green-400/90 rounded-xl flex items-center justify-center text-white shadow-lg">
                <FiCheck size={22} strokeWidth={3} />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">Booking Confirmed</p>
                <p className="text-xs text-white/70">Just now</p>
              </div>
            </div>
            <div className="h-px bg-white/20 mb-4" />
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100"
                alt="Hotel"
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">Grand Plaza Hotel</p>
                <p className="text-xs text-white/70">New York · 2 nights</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Second floating card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-32 right-32 hidden xl:block"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="bg-white/15 backdrop-blur-2xl border border-white/25 rounded-2xl p-4 shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <div className="text-3xl">✈️</div>
              <div>
                <p className="text-white text-sm font-semibold">Flight Deals</p>
                <p className="text-primary-300 text-lg font-bold font-display">-40% OFF</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ============================================
          SEARCH BAR — Glassmorphism floating
          ============================================ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-24 relative z-20 mb-16 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <SearchBar />
        </motion.div>
      </section>

      {/* ============================================
          STATS
          ============================================ */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true, margin: '-50px' }}
                whileHover={{ y: -6 }}
                className="group text-center p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white
                           border border-gray-100 hover:border-primary-200
                           hover:shadow-xl hover:shadow-primary-100/50
                           transition-all duration-300"
              >
                <div className="text-3xl sm:text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-display bg-gradient-to-br from-primary-600 to-primary-400 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-500 text-xs sm:text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SERVICES
          ============================================ */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-100/40 rounded-full blur-3xl -z-0 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto"
          >
            <span className="section-label">Our Services</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4 leading-tight">
              Everything You Need, <span className="text-gradient">Right Here</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              From luxury hotels to last-minute flights — book it all with one seamless experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: '-50px' }}
                whileHover={{ y: -8 }}
                className="group relative bg-white rounded-2xl p-6 sm:p-7 cursor-pointer
                           border border-gray-100 hover:border-transparent
                           shadow-sm hover:shadow-2xl hover:shadow-primary-200/50
                           transition-all duration-500 overflow-hidden"
              >
                {/* Gradient shine on hover */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`} />

                <div className="relative z-10">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-2xl sm:text-3xl mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    {service.icon}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 group-hover:text-primary-700 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base mb-5 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-primary-600 font-semibold text-sm sm:text-base">
                      {service.price}
                    </span>
                    <span className="w-9 h-9 rounded-full bg-gray-100 group-hover:bg-primary-600 flex items-center justify-center transition-all duration-300">
                      <FiArrowRight className="text-gray-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" size={16} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          TESTIMONIALS
          ============================================ */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto"
          >
            <span className="section-label">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4 leading-tight">
              Loved by <span className="text-gradient">Thousands</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Real stories from real travelers
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            {/* Nav Arrows */}
            <button
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 
                         bg-white shadow-xl rounded-full flex items-center justify-center
                         text-gray-600 hover:text-primary-600 hover:scale-110 
                         transition-all duration-300 border border-gray-100"
            >
              <FiChevronLeft size={22} />
            </button>
            <button
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 
                         bg-white shadow-xl rounded-full flex items-center justify-center
                         text-gray-600 hover:text-primary-600 hover:scale-110 
                         transition-all duration-300 border border-gray-100"
            >
              <FiChevronRight size={22} />
            </button>

            {/* Testimonial Card */}
            <div className="px-10 sm:px-16">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentTestimonial}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative bg-gradient-to-br from-white via-primary-50/50 to-white 
                             rounded-3xl p-8 sm:p-12 
                             border border-primary-100 shadow-xl shadow-primary-100/40"
                >
                  {/* Quote mark */}
                  <div className="absolute -top-6 left-8 sm:left-12 w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center text-white text-3xl font-serif shadow-lg">
                    "
                  </div>

                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-6 pt-4">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        size={20}
                        className={
                          i < testimonials[currentTestimonial].rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-200'
                        }
                      />
                    ))}
                  </div>

                  {/* Quote text */}
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-800 text-center mb-8 leading-relaxed font-comfortaa font-light">
                    "{testimonials[currentTestimonial].content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-center gap-4">
                    <div className="relative">
                      <img
                        src={testimonials[currentTestimonial].avatar}
                        alt={testimonials[currentTestimonial].name}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-white shadow-lg object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                        <FiCheck size={12} className="text-white" strokeWidth={3} />
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-gray-900 text-base sm:text-lg">
                        {testimonials[currentTestimonial].name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonials[currentTestimonial].role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToTestimonial(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === currentTestimonial
                      ? 'bg-primary-600 w-10'
                      : 'bg-gray-300 hover:bg-gray-400 w-2'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          CTA
          ============================================ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="container mx-auto max-w-6xl"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 px-6 sm:px-12 py-14 sm:py-20 text-center shadow-2xl">
            {/* Decorative orbs */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary-400/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Ready to Start Your <span className="font-gruppo">Journey?</span>
              </h2>
              <p className="text-primary-100 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
                Join thousands of happy travelers who book with us every day. It only takes a minute.
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
                <Link
                  to="/services"
                  className="group inline-flex items-center gap-2 bg-white text-primary-700 
                             px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base
                             shadow-2xl shadow-primary-900/30
                             hover:bg-primary-50 transition-all duration-300
                             hover:scale-105 active:scale-95"
                >
                  <span>Get Started Free</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl 
                             font-semibold text-sm sm:text-base
                             bg-white/10 backdrop-blur-xl border border-white/25 text-white
                             hover:bg-white/20 transition-all duration-300
                             hover:scale-105 active:scale-95"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;