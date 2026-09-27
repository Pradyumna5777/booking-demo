import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMail, FiPhone,
  FiMapPin, FiSend, FiCheckCircle, FiArrowUpRight, FiHeart,
  FiYoutube, FiGithub, FiGlobe, FiShield, FiAward, FiZap,
} from 'react-icons/fi';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  const footerLinks = {
    Company: [
      { label: 'About Us', path: '#' },
      { label: 'Careers', path: '#', badge: 'Hiring' },
      { label: 'Press', path: '#' },
      { label: 'Blog', path: '#' },
    ],
    Support: [
      { label: 'Help Center', path: '#' },
      { label: 'Contact Us', path: '/contact' },
      { label: 'Privacy Policy', path: '#' },
      { label: 'Terms of Service', path: '#' },
    ],
    Services: [
      { label: 'Hotels', path: '/services' },
      { label: 'Flights', path: '/services' },
      { label: 'Cars', path: '/services' },
      { label: 'Events', path: '/services' },
    ],
  };

  const socials = [
    { Icon: FiFacebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600 hover:shadow-blue-500/40' },
    { Icon: FiTwitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500 hover:shadow-sky-500/40' },
    { Icon: FiInstagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-500 hover:shadow-pink-500/40' },
    { Icon: FiLinkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-700 hover:shadow-blue-700/40' },
    { Icon: FiYoutube, href: '#', label: 'YouTube', color: 'hover:bg-red-600 hover:shadow-red-600/40' },
    { Icon: FiGithub, href: '#', label: 'GitHub', color: 'hover:bg-gray-700 hover:shadow-gray-700/40' },
  ];

  const trustBadges = [
    { icon: FiShield, label: 'Secure Payments', sub: 'SSL Encrypted' },
    { icon: FiAward, label: 'Best Price', sub: 'Guaranteed' },
    { icon: FiZap, label: 'Instant Booking', sub: 'Real-time' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-900 to-black 
                       text-gray-300 overflow-hidden mt-0">
      {/* ============================================
          DECORATIVE BACKGROUND
          ============================================ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Top border glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 sm:pt-20">
        {/* ============================================
            NEWSLETTER CARD
            ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-16 sm:mb-20 rounded-3xl overflow-hidden"
        >
          <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-purple-700 
                          rounded-3xl p-6 sm:p-10 shadow-2xl shadow-primary-500/20">
            {/* Decorative orbs */}
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
                                bg-white/15 backdrop-blur-md border border-white/25 
                                text-white text-xs font-medium mb-4">
                  <FiZap size={12} />
                  <span>Limited time offer</span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                  Get <span className="font-gruppo">10% off</span> your first booking
                </h3>
                <p className="text-primary-100 text-sm sm:text-base leading-relaxed max-w-md">
                  Subscribe to our newsletter for exclusive deals, travel tips, and updates —
                  no spam, ever.
                </p>
              </div>

              {/* Subscription form */}
              <div>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1 group">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 
                                       group-focus-within:text-primary-600 transition-colors" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl 
                                 bg-white/95 backdrop-blur-xl border border-white/40
                                 text-gray-900 placeholder:text-gray-400
                                 focus:bg-white focus:border-white focus:ring-4 
                                 focus:ring-white/30 outline-none transition-all text-sm"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="group inline-flex items-center justify-center gap-2 
                               px-6 py-3.5 rounded-xl bg-white text-primary-700 
                               font-semibold text-sm shadow-xl 
                               hover:bg-primary-50 transition-colors 
                               whitespace-nowrap"
                  >
                    {subscribed ? (
                      <>
                        <FiCheckCircle size={16} className="text-green-600" />
                        <span>Subscribed!</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <FiSend
                          size={14}
                          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        />
                      </>
                    )}
                  </motion.button>
                </form>
                <p className="text-xs text-primary-100 mt-3 flex items-center gap-1.5">
                  <FiShield size={12} />
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============================================
            MAIN FOOTER CONTENT
            ============================================ */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-8 sm:gap-10 mb-12 sm:mb-16">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-2 lg:col-span-2"
          >
            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-2.5 mb-5 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="relative w-11 h-11 rounded-xl overflow-hidden shadow-lg shadow-primary-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 via-primary-500 to-primary-700" />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0" />
                <span className="relative z-10 flex items-center justify-center w-full h-full 
                                 text-white text-xl font-bold">
                  B
                </span>
              </motion.div>
              <span className="text-xl font-bold text-white">
                Book<span className="text-primary-400">Ease</span>
              </span>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Your one-stop solution for all booking needs. Book hotels, flights,
              cars, and unforgettable experiences — all in one beautifully crafted place.
            </p>

            {/* Socials */}
            <div className="flex flex-wrap gap-2.5 mb-6">
              {socials.map(({ Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -4, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 
                              backdrop-blur-md flex items-center justify-center 
                              text-gray-300 transition-all duration-300 
                              hover:text-white hover:border-transparent 
                              shadow-lg shadow-transparent ${color}`}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {trustBadges.map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl 
                             bg-white/5 border border-white/10 backdrop-blur-md"
                >
                  <Icon size={14} className="text-primary-400" />
                  <div className="leading-tight">
                    <p className="text-[11px] font-semibold text-white">{label}</p>
                    <p className="text-[10px] text-gray-400">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links], idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + idx * 0.1 }}
              className="col-span-1"
            >
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="group inline-flex items-center gap-2 text-sm 
                                 text-gray-400 hover:text-primary-400 
                                 transition-colors duration-300"
                    >
                      <span className="relative">
                        {link.label}
                        {/* Underline animation */}
                        <span className="absolute left-0 -bottom-0.5 w-0 h-px 
                                         bg-primary-400 group-hover:w-full 
                                         transition-all duration-300" />
                      </span>
                      {link.badge && (
                        <span className="px-1.5 py-0.5 rounded-md bg-green-500/15 
                                         text-green-400 text-[9px] font-semibold 
                                         border border-green-500/20">
                          {link.badge}
                        </span>
                      )}
                      <FiArrowUpRight
                        size={12}
                        className="opacity-0 -translate-x-1 group-hover:opacity-100 
                                   group-hover:translate-x-0 transition-all duration-300"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* ============================================
            CONTACT INFO STRIP
            ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-8 
                     border-b border-white/10"
        >
          {[
            { Icon: FiMail, label: 'Email', value: 'support@bookease.com', href: 'mailto:support@bookease.com' },
            { Icon: FiPhone, label: 'Phone', value: '+91 7265842647', href: 'tel:+917265842647' },
            { Icon: FiMapPin, label: 'Address', value: 'Ease Booking St, Siwan 841236', href: '#' },
          ].map(({ Icon, label, value, href }) => (
            <motion.a
              key={label}
              href={href}
              whileHover={{ y: -3 }}
              className="group flex items-center gap-3 p-3 rounded-2xl 
                         bg-white/[0.03] border border-white/10 backdrop-blur-md 
                         hover:bg-white/[0.06] hover:border-primary-500/30 
                         transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20 
                              flex items-center justify-center text-primary-400 flex-shrink-0 
                              group-hover:scale-110 group-hover:bg-primary-500/20 transition-all">
                <Icon size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                  {label}
                </p>
                <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                  {value}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* ============================================
            BOTTOM BAR
            ============================================ */}
        <div className="pt-6 pb-2">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
              © {new Date().getFullYear()} BookEase. All rights reserved.
            </p>

            {/* Legal links */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {['Privacy', 'Terms', 'Cookies', 'Sitemap'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-xs sm:text-sm text-gray-500 hover:text-primary-400 
                             transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Made with love + language */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500">
                <span>Made with</span>
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="text-red-500"
                >
                  <FiHeart size={12} className="fill-red-500" />
                </motion.span>
                <span>in India</span>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg 
                                 bg-white/5 border border-white/10 text-xs 
                                 text-gray-400 hover:text-white hover:bg-white/10 
                                 transition-colors">
                <FiGlobe size={12} />
                <span>EN</span>
              </button>
            </div>
          </div>

          {/* Big watermark brand */}
          <div className="mt-10 sm:mt-12 text-center overflow-hidden pointer-events-none select-none">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.04 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-[15vw] sm:text-[13vw] lg:text-[10rem] font-bold 
                         text-white leading-none tracking-tighter"
            >
              BookEase
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;