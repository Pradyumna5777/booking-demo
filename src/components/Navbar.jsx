import { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMenu, FiX, FiUser, FiBell, FiSearch, FiHome, FiGrid,
  FiCalendar, FiMail, FiLogOut, FiSettings, FiHeart, FiStar,
  FiChevronDown, FiSun, FiMoon, FiCommand, FiArrowRight,
  FiMapPin, FiClock, FiTrendingUp, FiZap, FiAward, FiCreditCard,
  FiHelpCircle, FiGlobe, FiBookmark, FiCheckCircle,
} from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showServicesMenu, setShowServicesMenu] = useState(false);
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  const [notifications, setNotifications] = useState([
    { id: 1, icon: '🏨', title: 'Booking confirmed', desc: 'Grand Plaza Hotel', time: '2m ago', unread: true, type: 'booking' },
    { id: 2, icon: '⭐', title: 'New review posted', desc: 'Le Bernardin', time: '1h ago', unread: true, type: 'review' },
    { id: 3, icon: '🎫', title: 'Event reminder', desc: 'Broadway Show tomorrow', time: '3h ago', unread: false, type: 'reminder' },
    { id: 4, icon: '💳', title: 'Payment processed', desc: '$450 · Grand Plaza', time: '5h ago', unread: false, type: 'payment' },
  ]);

  const location = useLocation();
  const navigate = useNavigate();

  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const servicesRef = useRef(null);
  const searchInputRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // ============================================
  // CONFIG DATA
  // ============================================
  const navLinks = [
    { name: 'Home', path: '/', icon: FiHome },
    { name: 'Services', path: '/services', icon: FiGrid, hasMegaMenu: true },
    { name: 'Bookings', path: '/bookings', icon: FiCalendar },
    { name: 'Profile', path: '/profile', icon: FiUser },
    { name: 'Contact', path: '/contact', icon: FiMail },
  ];

  const servicesMegaMenu = [
    { icon: '🏨', name: 'Hotels', desc: '5,000+ worldwide', color: 'from-blue-500 to-blue-600' },
    { icon: '✈️', name: 'Flights', desc: 'Best price guarantee', color: 'from-purple-500 to-purple-600' },
    { icon: '🚗', name: 'Car Rental', desc: 'From ₹899/day', color: 'from-green-500 to-green-600' },
    { icon: '🍽️', name: 'Restaurants', desc: 'Free reservations', color: 'from-orange-500 to-orange-600' },
    { icon: '🎫', name: 'Events', desc: 'Concerts & shows', color: 'from-pink-500 to-pink-600' },
    { icon: '💆', name: 'Wellness', desc: 'Spa & massage', color: 'from-teal-500 to-teal-600' },
  ];

  const profileMenu = [
    { icon: FiUser, label: 'My Profile', path: '/profile', shortcut: null },
    { icon: FiCalendar, label: 'My Bookings', path: '/bookings', badge: '24' },
    { icon: FiHeart, label: 'Favorites', path: '#', badge: '12' },
    { icon: FiCreditCard, label: 'Payment Methods', path: '#', shortcut: null },
    { icon: FiAward, label: 'Rewards & Points', path: '#', badge: '2.4K' },
    { icon: FiSettings, label: 'Settings', path: '#', shortcut: '⌘,' },
    { icon: FiHelpCircle, label: 'Help Center', path: '/contact', shortcut: null },
  ];

  const searchSuggestions = [
    { icon: '🏨', text: 'Hotels in New Delhi', type: 'location' },
    { icon: '✈️', text: 'Flights to Bangaluru', type: 'route' },
    { icon: '🚗', text: 'Car rental in Bihar', type: 'car' },
    { icon: '🎫', text: 'Broadway shows tonight', type: 'event' },
  ];

  const trendingSearches = ['Bali Resorts', 'Bangaluru Flights', 'Dubai Hotels', 'New Delhi Events'];

  const unreadCount = useMemo(
    () => notifications.filter((n) => n.unread).length,
    [notifications]
  );

  // ============================================
  // EFFECTS
  // ============================================

  // Scroll detection (rAF throttled for perf)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setIsOpen(false);
    setShowNotifications(false);
    setShowProfile(false);
    setShowSearch(false);
    setShowServicesMenu(false);
  }, [location]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
      if (servicesRef.current && !servicesRef.current.contains(e.target)) setShowServicesMenu(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
      if (e.key === 'Escape') {
        setShowSearch(false);
        setShowNotifications(false);
        setShowProfile(false);
        setShowServicesMenu(false);
      }
      if (e.key === '/' && !showSearch && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setShowSearch(true);
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [showSearch]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = showSearch || isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showSearch, isOpen]);

  // Online/offline
  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    setIsOnline(navigator.onLine);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  // Sync theme class to <html> for Tailwind dark: variants
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // ============================================
  // HANDLERS
  // ============================================
  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <>
      {/* ============================================
          OFFLINE BANNER
          ============================================ */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r 
                       from-amber-500 to-orange-500 text-white text-center 
                       text-xs sm:text-sm font-medium py-2 px-4"
          >
            ⚠️ You're offline. Some features may be unavailable.
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/85 backdrop-blur-xl border-b border-white/60 shadow-lg shadow-primary-100/20 py-2.5'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* ============================================
                LOGO
                ============================================ */}
            <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.05 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-primary-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 via-primary-500 to-primary-700" />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0" />
                <span className="relative z-10 flex items-center justify-center w-full h-full text-white text-lg font-bold">
                  B
                </span>
              </motion.div>
              <span className="text-xl font-bold text-gray-900 hidden sm:inline">
                Book<span className="text-primary-600">Ease</span>
              </span>
            </Link>

            {/* ============================================
                DESKTOP NAV
                ============================================ */}
            <div className="hidden md:flex items-center gap-1 p-1 rounded-2xl 
                            bg-white/40 backdrop-blur-md border border-white/60">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                const hasMega = link.hasMegaMenu;

                return (
                  <div
                    key={link.path}
                    className="relative"
                    ref={hasMega ? servicesRef : null}
                    onMouseEnter={() => hasMega && setShowServicesMenu(true)}
                    onMouseLeave={() => hasMega && setShowServicesMenu(false)}
                  >
                    <Link
                      to={link.path}
                      className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl 
                                 text-sm font-medium transition-colors duration-300 ${
                                   isActive ? 'text-white' : 'text-gray-600 hover:text-primary-600'
                                 }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 
                                     rounded-xl shadow-lg shadow-primary-500/30"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <Icon size={15} className="relative z-10" />
                      <span className="relative z-10">{link.name}</span>
                      {hasMega && (
                        <FiChevronDown
                          size={12}
                          className={`relative z-10 transition-transform duration-300 ${
                            showServicesMenu ? 'rotate-180' : ''
                          }`}
                        />
                      )}
                    </Link>

                    {/* ============================================
                        SERVICES MEGA MENU
                        ============================================ */}
                    {hasMega && (
                      <AnimatePresence>
                        {showServicesMenu && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-1/2 -translate-x-1/2 top-full mt-3 
                                       w-[640px] bg-white/95 backdrop-blur-2xl 
                                       border border-white/60 rounded-3xl 
                                       shadow-2xl shadow-primary-200/40 
                                       overflow-hidden p-2"
                          >
                            <div className="grid grid-cols-2 gap-1 p-2">
                              {servicesMegaMenu.map((item, i) => (
                                <motion.div
                                  key={item.name}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.04 }}
                                >
                                  <Link
                                    to="/services"
                                    className="group flex items-start gap-3 p-3 rounded-2xl 
                                               hover:bg-primary-50 transition-colors"
                                  >
                                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} 
                                                     flex items-center justify-center text-xl 
                                                     flex-shrink-0 shadow-lg 
                                                     group-hover:scale-110 group-hover:rotate-6 
                                                     transition-transform`}>
                                      {item.icon}
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-sm font-semibold text-gray-900 
                                                    group-hover:text-primary-600 transition-colors">
                                        {item.name}
                                      </p>
                                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                                    </div>
                                  </Link>
                                </motion.div>
                              ))}
                            </div>

                            {/* Mega footer */}
                            <div className="mx-2 mt-1 p-3 bg-gradient-to-r from-primary-50 
                                            to-purple-50 rounded-2xl flex items-center 
                                            justify-between gap-3">
                              <div className="flex items-center gap-2">
                                <FiZap size={14} className="text-primary-600" />
                                <p className="text-xs font-medium text-gray-700">
                                  Get 10% off your first booking
                                </p>
                              </div>
                              <Link
                                to="/services"
                                className="text-xs font-semibold text-primary-600 
                                           hover:text-primary-700 inline-flex items-center gap-1 
                                           group"
                              >
                                Explore all
                                <FiArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ============================================
                RIGHT ACTIONS
                ============================================ */}
            <div className="hidden md:flex items-center gap-2 flex-shrink-0">
              {/* Search */}
              <button
                onClick={() => {
                  setShowSearch(true);
                  setTimeout(() => searchInputRef.current?.focus(), 100);
                }}
                aria-label="Search"
                className="group flex items-center gap-2 px-3 py-2 rounded-xl 
                           bg-white/50 backdrop-blur-md border border-white/60 
                           text-gray-500 hover:text-primary-600 hover:bg-white/80 
                           transition-all duration-300"
              >
                <FiSearch size={16} />
                <span className="text-xs hidden lg:inline">Search</span>
                <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 
                                rounded-md bg-gray-100 text-[10px] text-gray-500 font-mono">
                  ⌘K
                </kbd>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="relative w-10 h-10 rounded-xl 
                           bg-white/50 backdrop-blur-md border border-white/60 
                           text-gray-600 hover:text-primary-600 hover:bg-white/80 
                           flex items-center justify-center transition-all duration-300 
                           overflow-hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.25 }}
                  >
                    {theme === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}
                  </motion.span>
                </AnimatePresence>
              </button>

              {/* Notifications */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setShowNotifications((v) => !v)}
                  aria-label="Notifications"
                  className="relative w-10 h-10 rounded-xl 
                             bg-white/50 backdrop-blur-md border border-white/60 
                             text-gray-600 hover:text-primary-600 hover:bg-white/80 
                             flex items-center justify-center transition-all duration-300"
                >
                  <FiBell size={18} />
                  {unreadCount > 0 && (
                    <>
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full 
                                       ring-2 ring-white animate-pulse" />
                      <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 
                                       bg-red-500 text-white text-[10px] font-bold rounded-full 
                                       flex items-center justify-center shadow-lg">
                        {unreadCount}
                      </span>
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-[360px] bg-white/95 backdrop-blur-2xl 
                                 border border-white/60 rounded-3xl shadow-2xl 
                                 shadow-primary-200/40 overflow-hidden"
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between px-4 py-3 
                                      border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm">Notifications</h3>
                          {unreadCount > 0 && (
                            <span className="px-2 py-0.5 bg-primary-100 text-primary-700 
                                             text-[10px] font-bold rounded-full">
                              {unreadCount} new
                            </span>
                          )}
                        </div>
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllRead}
                            className="text-xs text-primary-600 font-medium 
                                       hover:text-primary-700 transition-colors 
                                       flex items-center gap-1"
                          >
                            <FiCheckCircle size={12} />
                            Mark all read
                          </button>
                        )}
                      </div>

                      {/* List */}
                      <div className="max-h-[400px] overflow-y-auto">
                        {notifications.map((n) => (
                          <motion.button
                            key={n.id}
                            whileHover={{ x: 4 }}
                            onClick={() => {
                              setNotifications((prev) =>
                                prev.map((item) =>
                                  item.id === n.id ? { ...item, unread: false } : item
                                )
                              );
                            }}
                            className={`w-full flex items-start gap-3 px-4 py-3 text-left 
                                       hover:bg-primary-50/60 transition-colors 
                                       ${n.unread ? 'bg-primary-50/40' : ''}`}
                          >
                            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center 
                                            justify-center text-lg flex-shrink-0 relative">
                              {n.icon}
                              {n.unread && (
                                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 
                                                 bg-primary-500 rounded-full ring-2 ring-white" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {n.title}
                              </p>
                              <p className="text-xs text-gray-500 truncate">{n.desc}</p>
                              <p className="text-[10px] text-gray-400 mt-0.5">{n.time}</p>
                            </div>
                          </motion.button>
                        ))}

                        {/* Empty state (kept ready) */}
                        {notifications.length === 0 && (
                          <div className="py-10 text-center">
                            <div className="text-4xl mb-2">🔔</div>
                            <p className="text-sm text-gray-500">No notifications</p>
                          </div>
                        )}
                      </div>

                      {/* Footer */}
                      <Link
                        to="/bookings"
                        className="flex items-center justify-center gap-1.5 
                                   text-xs font-semibold text-primary-600 
                                   py-3 border-t border-gray-100 
                                   hover:bg-primary-50 transition-colors group"
                      >
                        View all notifications
                        <FiArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setShowProfile((v) => !v)}
                  className="flex items-center gap-2 p-1 pr-3 rounded-xl 
                             bg-white/50 backdrop-blur-md border border-white/60 
                             hover:bg-white/80 transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src="/images/satyam.png"
                      alt="Profile"
                      className="w-8 h-8 rounded-lg object-cover ring-2 ring-primary-100"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 
                                     bg-green-500 border-2 border-white rounded-full" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden lg:inline">
                    Satyam
                  </span>
                  <FiChevronDown
                    size={14}
                    className={`text-gray-400 transition-transform duration-300 ${
                      showProfile ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {showProfile && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-[280px] bg-white/95 backdrop-blur-2xl 
                                 border border-white/60 rounded-3xl shadow-2xl 
                                 shadow-primary-200/40 overflow-hidden"
                    >
                      {/* User Header */}
                      <div className="p-4 bg-gradient-to-br from-primary-500 via-primary-600 
                                      to-purple-600 text-white relative overflow-hidden">
                        <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                        <div className="relative flex items-center gap-3">
                          <div className="relative flex-shrink-0">
                            <img
                              src="/images/satyam.png"
                              alt="Profile"
                              className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/50"
                            />
                            <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 
                                             bg-green-400 border-2 border-white rounded-full" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-sm truncate">Satyam Anand</p>
                            <p className="text-xs text-primary-100 truncate">
                              satyamkr.16364@gmail.com
                            </p>
                          </div>
                        </div>
                        <div className="relative flex items-center gap-2 mt-3 pt-3 
                                        border-t border-white/20">
                          <div className="flex items-center gap-1 px-2 py-1 
                                          bg-white/15 backdrop-blur-md border border-white/25 
                                          rounded-lg">
                            <FiStar size={11} className="text-yellow-300 fill-yellow-300" />
                            <span className="text-[10px] font-bold">GOLD</span>
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 
                                          bg-white/15 backdrop-blur-md border border-white/25 
                                          rounded-lg">
                            <FiTrendingUp size={11} />
                            <span className="text-[10px] font-bold">2.4K pts</span>
                          </div>
                        </div>
                      </div>

                      {/* Menu */}
                      <div className="py-2">
                        {profileMenu.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.label}
                              to={item.path}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm 
                                         text-gray-700 hover:bg-primary-50 
                                         hover:text-primary-600 transition-colors group"
                            >
                              <Icon size={16} className="text-gray-400 
                                                          group-hover:text-primary-600 
                                                          transition-colors flex-shrink-0" />
                              <span className="flex-1 truncate">{item.label}</span>
                              {item.badge && (
                                <span className="px-1.5 py-0.5 rounded-md bg-primary-100 
                                                 text-primary-700 text-[10px] font-bold">
                                  {item.badge}
                                </span>
                              )}
                              {item.shortcut && (
                                <kbd className="px-1.5 py-0.5 rounded-md bg-gray-100 
                                                text-[10px] text-gray-500 font-mono">
                                  {item.shortcut}
                                </kbd>
                              )}
                            </Link>
                          );
                        })}
                      </div>

                      {/* Sign out */}
                      <div className="border-t border-gray-100 py-2">
                        <button
                          onClick={() => navigate('/')}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm 
                                     text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <FiLogOut size={16} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* ============================================
                MOBILE: SEARCH + MENU BUTTONS
                ============================================ */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => {
                  setShowSearch(true);
                  setTimeout(() => searchInputRef.current?.focus(), 100);
                }}
                aria-label="Search"
                className="w-10 h-10 rounded-xl bg-white/60 backdrop-blur-md 
                           border border-white/60 text-gray-700 
                           flex items-center justify-center hover:bg-white/90 
                           transition-colors"
              >
                <FiSearch size={18} />
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                className="relative w-10 h-10 rounded-xl 
                           bg-white/60 backdrop-blur-md border border-white/60 
                           text-gray-700 flex items-center justify-center 
                           hover:bg-white/90 transition-colors"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isOpen ? 'close' : 'open'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* ============================================
            MOBILE MENU (FULL-SCREEN SHEET)
            ============================================ */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="md:hidden fixed inset-0 top-16 bg-black/30 backdrop-blur-sm z-[-1]"
              />

              <motion.div
                ref={mobileMenuRef}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="md:hidden mt-3 mx-4 sm:mx-6"
              >
                <div className="bg-white/95 backdrop-blur-2xl border border-white/60 
                                rounded-3xl shadow-2xl overflow-hidden">
                  {/* Nav Links */}
                  <div className="p-3 space-y-1">
                    {navLinks.map((link, i) => {
                      const Icon = link.icon;
                      const isActive = location.pathname === link.path;
                      return (
                        <motion.div
                          key={link.path}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <Link
                            to={link.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl 
                                       font-medium text-sm transition-all duration-300 ${
                                         isActive
                                           ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/30'
                                           : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                                       }`}
                          >
                            <Icon size={18} />
                            <span className="flex-1">{link.name}</span>
                            {isActive && (
                              <span className="w-1.5 h-1.5 rounded-full bg-white" />
                            )}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Quick Stats */}
                  <div className="px-3 pb-3">
                    <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl 
                                    bg-gradient-to-r from-primary-50 to-purple-50">
                      {[
                        { label: 'Bookings', value: '24', icon: FiCalendar },
                        { label: 'Points', value: '2.4K', icon: FiAward },
                        { label: 'Reviews', value: '18', icon: FiStar },
                      ].map((s) => {
                        const Icon = s.icon;
                        return (
                          <div key={s.label} className="text-center">
                            <Icon size={14} className="text-primary-600 mx-auto mb-1" />
                            <p className="text-sm font-bold text-gray-900 font-display">
                              {s.value}
                            </p>
                            <p className="text-[10px] text-gray-500">{s.label}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-3 border-t border-gray-100 flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 
                                       py-3 rounded-xl bg-gray-100 text-gray-700 
                                       font-medium text-sm hover:bg-gray-200 transition-colors">
                      <FiUser size={16} />
                      Sign In
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 
                                       py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 
                                       text-white font-medium text-sm shadow-lg shadow-primary-500/30
                                       hover:shadow-xl transition-all">
                      Sign Up
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ============================================
          SEARCH OVERLAY
          ============================================ */}
      <AnimatePresence>
        {showSearch && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSearch(false)}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-20 sm:top-24 left-1/2 -translate-x-1/2 z-[70] 
                         w-[92%] max-w-2xl"
            >
              <div className="bg-white/95 backdrop-blur-2xl border border-white/60 
                              rounded-3xl shadow-2xl shadow-primary-500/20 overflow-hidden">
                {/* Search input */}
                <div className="flex items-center gap-3 px-4 sm:px-5 py-4 
                                border-b border-gray-100">
                  <FiSearch className="text-primary-600 flex-shrink-0" size={20} />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search hotels, flights, cities..."
                    className="flex-1 bg-transparent outline-none text-sm sm:text-base 
                               placeholder:text-gray-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 
                                 flex items-center justify-center transition-colors"
                      aria-label="Clear search"
                    >
                      <FiX size={14} />
                    </button>
                  )}
                  <kbd className="hidden sm:inline-block px-2 py-1 rounded-md bg-gray-100 
                                  text-[10px] text-gray-500 font-mono">
                    ESC
                  </kbd>
                </div>

                {/* Body */}
                <div className="max-h-[60vh] overflow-y-auto p-3">
                  {/* Recent */}
                  <p className="text-[10px] font-bold text-gray-400 px-2 mb-2 
                                uppercase tracking-wider">
                    Recent Searches
                  </p>
                  {searchSuggestions.map((item, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl 
                                 hover:bg-primary-50 transition-colors text-left group"
                    >
                      <span className="w-9 h-9 rounded-lg bg-primary-50 flex items-center 
                                       justify-center text-base flex-shrink-0">
                        {item.icon}
                      </span>
                      <span className="text-sm text-gray-700 flex-1 truncate">
                        {item.text}
                      </span>
                      <FiArrowRight
                        size={14}
                        className="text-gray-300 group-hover:text-primary-600 
                                   group-hover:translate-x-1 transition-all flex-shrink-0"
                      />
                    </motion.button>
                  ))}

                  {/* Trending */}
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 px-2 mb-2">
                      <FiTrendingUp size={12} className="text-primary-600" />
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Trending
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 px-2 pb-2">
                      {trendingSearches.map((term, i) => (
                        <motion.button
                          key={term}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          onClick={() => setSearchQuery(term)}
                          className="px-3 py-1.5 rounded-full bg-gray-100 
                                     text-xs font-medium text-gray-600 
                                     hover:bg-primary-100 hover:text-primary-700 
                                     transition-colors"
                        >
                          {term}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100 
                                flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 text-[10px] text-gray-500">
                    <span className="hidden sm:flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 rounded bg-white border border-gray-200 font-mono">
                        ↑
                      </kbd>
                      <kbd className="px-1.5 py-0.5 rounded bg-white border border-gray-200 font-mono">
                        ↓
                      </kbd>
                      navigate
                    </span>
                    <span className="hidden sm:flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 rounded bg-white border border-gray-200 font-mono">
                        ↵
                      </kbd>
                      select
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 rounded bg-white border border-gray-200 font-mono">
                        esc
                      </kbd>
                      close
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium">
                    Powered by <span className="text-primary-600">BookEase</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;