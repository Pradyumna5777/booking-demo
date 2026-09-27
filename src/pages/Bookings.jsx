import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiFilter, FiGrid, FiList, FiSearch, FiX,
  FiCalendar, FiCheckCircle, FiClock, FiXCircle,
} from 'react-icons/fi';
import BookingCard from '../components/BookingCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { bookings as mockBookings } from '../data/mockData';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const searchInputRef = useRef(null);

  // Simulate data fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      setBookings(mockBookings);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter config with icons and colors
  const filterConfig = [
    { id: 'all', label: 'All', icon: FiCalendar, color: 'text-gray-600', bg: 'bg-gray-100' },
    { id: 'confirmed', label: 'Confirmed', icon: FiCheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    { id: 'pending', label: 'Pending', icon: FiClock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { id: 'cancelled', label: 'Cancelled', icon: FiXCircle, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  // Counts per status (memoized)
  const counts = useMemo(() => {
    const result = { all: bookings.length };
    bookings.forEach((b) => {
      result[b.status] = (result[b.status] || 0) + 1;
    });
    return result;
  }, [bookings]);

  // Filtered bookings (memoized)
  const filteredBookings = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return bookings.filter((booking) => {
      const matchesFilter = filter === 'all' || booking.status === filter;
      const matchesSearch =
        !q ||
        booking.title.toLowerCase().includes(q) ||
        booking.location.toLowerCase().includes(q) ||
        booking.service.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [bookings, filter, searchTerm]);

  // Keyboard shortcut: press "/" to focus search
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Decorative background orbs */}
      <div className="absolute top-20 -left-40 w-96 h-96 bg-primary-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -right-40 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ============================================
            HEADER
            ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 sm:mb-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="section-label">Dashboard</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 leading-tight">
                My <span className="text-gradient">Bookings</span>
              </h1>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                Manage all your reservations in one place — search, filter, and organize.
              </p>
            </div>

            {/* Quick stat */}
            {!loading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3 px-4 py-3 bg-white/70 backdrop-blur-xl 
                           border border-white/60 rounded-2xl shadow-lg shadow-primary-100/40 
                           self-start sm:self-auto"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 
                                flex items-center justify-center text-white shadow-lg">
                  <FiCalendar size={20} />
                </div>
                <div>
                  <p className="text-2xl font-bold font-display text-gray-900 leading-none">
                    {bookings.length}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">Total bookings</p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>


        {/* ============================================
            TOOLBAR (Search + View Toggle)
            ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6 sm:mb-8"
        >
          <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl 
                          shadow-lg shadow-primary-100/30 p-3 sm:p-4">
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 md:max-w-md group">
                <FiSearch
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 
                             group-focus-within:text-primary-600 transition-colors"
                  size={18}
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search by title, location or service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-20 py-2.5 rounded-xl border border-gray-200 
                             bg-white/80 focus:bg-white
                             focus:border-primary-500 focus:ring-2 focus:ring-primary-200 
                             outline-none transition-all text-sm"
                />
                {/* Clear button */}
                <AnimatePresence>
                  {searchTerm && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={() => {
                        setSearchTerm('');
                        searchInputRef.current?.focus();
                      }}
                      aria-label="Clear search"
                      className="absolute right-3 top-1/2 -translate-y-1/2 
                                 w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 
                                 flex items-center justify-center transition-colors"
                    >
                      <FiX size={14} />
                    </motion.button>
                  )}
                </AnimatePresence>
                {/* Keyboard hint */}
                {!searchTerm && (
                  <span className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 
                                   items-center gap-1 px-2 py-1 rounded-md bg-gray-100 
                                   text-[10px] text-gray-500 font-mono pointer-events-none">
                    <kbd>/</kbd>
                  </span>
                )}
              </div>

              {/* Result count + View toggle */}
              <div className="flex items-center justify-between md:justify-end gap-3">
                <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                  <span className="font-semibold text-gray-800">
                    {filteredBookings.length}
                  </span>{' '}
                  {filteredBookings.length === 1 ? 'result' : 'results'}
                </span>

                <div className="flex bg-gray-100 rounded-xl p-1">
                  {[
                    { mode: 'grid', Icon: FiGrid, label: 'Grid view' },
                    { mode: 'list', Icon: FiList, label: 'List view' },
                  ].map(({ mode, Icon, label }) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      aria-label={label}
                      className="relative p-2 rounded-lg transition-colors"
                    >
                      {viewMode === mode && (
                        <motion.span
                          layoutId="viewToggleBg"
                          className="absolute inset-0 bg-white shadow-md rounded-lg"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      <Icon
                        size={18}
                        className={`relative z-10 transition-colors ${
                          viewMode === mode ? 'text-primary-600' : 'text-gray-500'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============================================
            ACTIVE FILTER CHIP (when not "all")
            ============================================ */}
        <AnimatePresence>
          {(filter !== 'all' || searchTerm) && !loading && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="flex flex-wrap items-center gap-2 overflow-hidden"
            >
              <span className="text-xs text-gray-500 mr-1">Active filters:</span>

              {filter !== 'all' && (
                <motion.span
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 
                             bg-primary-100 text-primary-700 rounded-full text-xs font-medium"
                >
                  Status: <span className="capitalize">{filter}</span>
                  <button
                    onClick={() => setFilter('all')}
                    aria-label="Remove status filter"
                    className="ml-0.5 hover:bg-primary-200 rounded-full p-0.5 transition-colors"
                  >
                    <FiX size={12} />
                  </button>
                </motion.span>
              )}

              {searchTerm && (
                <motion.span
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 
                             bg-purple-100 text-purple-700 rounded-full text-xs font-medium max-w-[240px]"
                >
                  <span className="truncate">"{searchTerm}"</span>
                  <button
                    onClick={() => setSearchTerm('')}
                    aria-label="Remove search filter"
                    className="ml-0.5 hover:bg-purple-200 rounded-full p-0.5 transition-colors flex-shrink-0"
                  >
                    <FiX size={12} />
                  </button>
                </motion.span>
              )}

              <button
                onClick={() => {
                  setFilter('all');
                  setSearchTerm('');
                }}
                className="text-xs text-gray-500 hover:text-red-500 underline underline-offset-2 transition-colors"
              >
                Clear all
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ============================================
            BOOKINGS
            ============================================ */}
        {loading ? (
          <LoadingSpinner />
        ) : filteredBookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 sm:py-20 bg-white/70 backdrop-blur-xl 
                       border border-white/60 rounded-3xl shadow-lg shadow-primary-100/30"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="text-6xl sm:text-7xl mb-5"
            >
              📭
            </motion.div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2">No bookings found</h3>
            <p className="text-gray-500 text-sm sm:text-base mb-6 max-w-sm mx-auto">
              {searchTerm || filter !== 'all'
                ? "We couldn't find anything matching your filters."
                : "You haven't made any bookings yet."}
            </p>
            {(searchTerm || filter !== 'all') && (
              <button
                onClick={() => {
                  setFilter('all');
                  setSearchTerm('');
                }}
                className="btn-primary inline-flex items-center gap-2"
              >
                <FiX size={16} />
                Clear filters
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            layout
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6'
                : 'flex flex-col gap-4'
            }
          >
            <AnimatePresence mode="popLayout">
              {filteredBookings.map((booking, i) => (
                <motion.div
                  key={booking.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <BookingCard booking={booking} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Bookings;