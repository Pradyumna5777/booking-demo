import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCheck, FiStar, FiFilter } from 'react-icons/fi';
import { services } from '../data/mockData';

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Services', icon: '✨' },
    { id: 'Hotel Booking', label: 'Hotels', icon: '🏨' },
    { id: 'Flight Booking', label: 'Flights', icon: '✈️' },
    { id: 'Car Rental', label: 'Cars', icon: '🚗' },
    { id: 'Restaurant', label: 'Dining', icon: '🍽️' },
    { id: 'Event Tickets', label: 'Events', icon: '🎫' },
    { id: 'Spa & Wellness', label: 'Wellness', icon: '💆' },
  ];

  const filteredServices =
    activeCategory === 'all'
      ? services
      : services.filter((s) => s.name === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Decorative background orbs */}
      <div className="absolute top-20 -left-40 w-96 h-96 bg-primary-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ============================================
            HEADER
            ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-[1.1] tracking-tight">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-purple-500 bg-clip-text text-transparent">
              Perfect Service
            </span>
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Select from our wide range of curated services and start booking in seconds —
            every experience tailored to make your journey unforgettable.
          </p>
        </motion.div>

        {/* ============================================
            FILTER PILLS
            ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-10 sm:mb-14"
        >
          <div className="flex items-center gap-2 mb-4 justify-center">
            <FiFilter className="text-gray-400" size={16} />
            <span className="text-sm text-gray-500 font-medium">Filter by category</span>
          </div>

          <div className="flex md:flex-wrap md:justify-center gap-2 overflow-x-auto pb-2 md:pb-0 
                          scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full 
                           text-sm font-medium transition-all duration-300 whitespace-nowrap
                           ${
                             activeCategory === cat.id
                               ? 'text-white shadow-lg shadow-primary-500/30'
                               : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                           }`}
              >
                {activeCategory === cat.id && (
                  <motion.span
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.icon}</span>
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ============================================
            SERVICES GRID — now with real images
            ============================================ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, i) => (
              <motion.div
                key={service.id}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer
                           border border-gray-100 hover:border-transparent
                           shadow-sm hover:shadow-2xl hover:shadow-primary-200/50
                           transition-all duration-500"
              >
                {/* Popular badge */}
                {i === 0 && activeCategory === 'all' && (
                  <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 
                                  text-white text-xs font-semibold rounded-full shadow-lg flex items-center gap-1">
                    <FiStar size={12} className="fill-white" />
                    Popular
                  </div>
                )}

                {/* ============================================
                    IMAGE HEADER
                    ============================================ */}
                <div className="relative h-48 sm:h-52 overflow-hidden">
                  {/* Photo */}
                  <img
                    src={service.image}
                    alt={service.name}
                    loading="lazy"
                    className="w-full h-full object-cover 
                               group-hover:scale-110 transition-transform duration-700 ease-out"
                  />

                  {/* Colored gradient overlay (uses service.color) */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} 
                                opacity-70 mix-blend-multiply`}
                  />

                  {/* Dark gradient at bottom for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Shine sweep on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/25 to-white/0 
                                  -translate-x-full group-hover:translate-x-full 
                                  transition-transform duration-1000 ease-out" />

                  {/* Icon badge — top left */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 6 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="absolute top-4 left-4 w-12 h-12 rounded-2xl 
                               bg-white/25 backdrop-blur-xl border border-white/30 
                               flex items-center justify-center text-2xl shadow-lg"
                  >
                    {service.icon}
                  </motion.div>

                  {/* Rating chip — top right (below popular badge if present) */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 
                                  bg-white/90 backdrop-blur-md rounded-full px-2.5 py-1 shadow-lg">
                    <FiStar size={12} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-bold text-gray-800">
                      {service.rating}
                    </span>
                  </div>

                  {/* Service name over image (bottom) */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg sm:text-xl leading-tight drop-shadow-lg">
                      {service.name}
                    </h3>
                    <p className="text-white/80 text-xs mt-0.5 flex items-center gap-1">
                      <span>{service.booked} booked</span>
                    </p>
                  </div>
                </div>

                {/* ============================================
                    CONTENT
                    ============================================ */}
                <div className="p-5 sm:p-6">
                  <p className="text-gray-500 text-sm sm:text-base mb-5 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {['24/7 Support', 'Best Price', 'Free Cancel'].map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-xs sm:text-sm text-gray-600"
                      >
                        <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <FiCheck className="text-green-600" size={12} strokeWidth={3} />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Starting at</p>
                      <span className="text-base sm:text-lg font-bold font-display text-primary-600">
                        {service.price}
                      </span>
                    </div>

                    <button
                      className="group/btn flex items-center gap-2 px-4 py-2.5 rounded-xl 
                                 bg-primary-50 text-primary-700 font-semibold text-sm
                                 hover:bg-primary-600 hover:text-white
                                 transition-all duration-300 hover:scale-105 active:scale-95
                                 shadow-sm hover:shadow-lg hover:shadow-primary-500/30"
                    >
                      <span>Book</span>
                      <FiArrowRight
                        size={16}
                        className="group-hover/btn:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ============================================
            EMPTY STATE
            ============================================ */}
        {filteredServices.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No services found</h3>
            <p className="text-gray-500 mb-6">
              Try selecting a different category
            </p>
            <button
              onClick={() => setActiveCategory('all')}
              className="btn-primary"
            >
              Show All Services
            </button>
          </motion.div>
        )}

        {/* ============================================
            BOTTOM CTA BANNER
            ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 sm:mt-20 relative overflow-hidden rounded-3xl 
                     bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 
                     px-6 sm:px-12 py-10 sm:py-14"
        >
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary-400/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="max-w-xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                Can't decide? <span className="font-gruppo">We'll help you.</span>
              </h3>
              <p className="text-primary-100 text-sm sm:text-base leading-relaxed">
                Talk to our travel experts and get a personalized booking recommendation in minutes.
              </p>
            </div>
            <button className="group inline-flex items-center gap-2 bg-white text-primary-700 
                               px-7 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base
                               shadow-2xl shadow-primary-900/30 whitespace-nowrap
                               hover:bg-primary-50 transition-all duration-300
                               hover:scale-105 active:scale-95">
              <span>Talk to Expert</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Services;