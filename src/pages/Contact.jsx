import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMail, FiPhone, FiMapPin, FiSend, FiUser, FiMessageSquare,
  FiCheckCircle, FiChevronDown, FiClock, FiTwitter, FiInstagram,
  FiLinkedin, FiFacebook, FiZap, FiHeadphones,
} from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: FiMail,
      label: 'Email Us',
      value: 'support@bookease.com',
      subtext: 'We reply within 2 hours',
      color: 'from-blue-500 to-blue-600',
      href: 'mailto:support@bookease.com',
    },
    {
      icon: FiPhone,
      label: 'Call Us',
      value: '+91 7265842647',
      subtext: 'Mon–Sat, 9am–8pm IST',
      color: 'from-green-500 to-green-600',
      href: 'tel:+917265842647',
    },
    {
      icon: FiMapPin,
      label: 'Visit Us',
      value: 'Ease Booking St, Siwan 841236',
      subtext: 'Bihar, India',
      color: 'from-purple-500 to-purple-600',
      href: '#',
    },
  ];

  const faqs = [
    {
      q: 'How quickly do you respond to inquiries?',
      a: 'We typically respond within 2 hours during business hours. For urgent matters, call our support line directly for instant assistance.',
    },
    {
      q: 'Can I cancel or modify my booking?',
      a: 'Yes! Most bookings can be cancelled or modified free of charge up to 24 hours before your reservation. Just visit your Bookings page or contact support.',
    },
    {
      q: 'Do you offer group or corporate discounts?',
      a: 'Absolutely. We offer tailored pricing for groups of 10+ and corporate accounts. Reach out with details and our team will prepare a custom quote.',
    },
    {
      q: 'Which payment methods do you accept?',
      a: 'We accept all major credit/debit cards, UPI, net banking, PayPal, and popular digital wallets including Google Pay and PhonePe.',
    },
  ];

  const socials = [
    { Icon: FiTwitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
    { Icon: FiInstagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-500' },
    { Icon: FiLinkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-600' },
    { Icon: FiFacebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-500' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-20 -left-40 w-96 h-96 bg-primary-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 -right-40 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />

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
            Let's <span className="text-gradient">Talk</span>
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Have questions, feedback, or just want to say hi? We'd love to hear from you.
            Our team is here to help you every step of the way.
          </p>
        </motion.div>

        {/* ============================================
            CONTACT INFO CARDS
            ============================================ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12"
        >
          {contactInfo.map((item) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.label}
                href={item.href}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="group relative bg-white/70 backdrop-blur-xl border border-white/60 
                           rounded-2xl p-5 sm:p-6 overflow-hidden 
                           shadow-lg shadow-primary-100/30 hover:shadow-xl 
                           hover:shadow-primary-200/50 transition-all duration-300"
              >
                {/* Hover glow */}
                <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full 
                                 bg-gradient-to-br ${item.color} opacity-0 
                                 group-hover:opacity-20 blur-2xl transition-opacity duration-500`} />

                <div className="relative z-10 flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} 
                                   flex items-center justify-center text-white flex-shrink-0 
                                   shadow-lg group-hover:scale-110 group-hover:rotate-6 
                                   transition-all duration-300`}>
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                      {item.label}
                    </h3>
                    <p className="text-gray-700 text-sm truncate font-medium">
                      {item.value}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">{item.subtext}</p>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        {/* ============================================
            FORM + SIDEBAR GRID
            ============================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* ============================================
              FORM (LEFT, 3 COLS)
              ============================================ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <div className="relative bg-white/70 backdrop-blur-xl border border-white/60 
                            rounded-3xl p-5 sm:p-8 shadow-xl shadow-primary-100/40 
                            overflow-hidden">
              {/* Decorative corner gradient */}
              <div className="absolute -top-20 -right-20 w-56 h-56 
                              bg-gradient-to-br from-primary-200/50 to-purple-200/50 
                              rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold mb-1">
                    Send us a <span className="text-gradient">message</span>
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Fill out the form and we'll get back to you soon.
                  </p>
                </div>

                {/* Success Alert */}
                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 
                                 border border-green-200 rounded-2xl flex items-start gap-3"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                        className="w-9 h-9 rounded-full bg-green-500 flex items-center 
                                   justify-center text-white flex-shrink-0 shadow-lg"
                      >
                        <FiCheckCircle size={18} />
                      </motion.div>
                      <div>
                        <p className="font-semibold text-green-900 text-sm">
                          Message sent successfully!
                        </p>
                        <p className="text-green-700 text-xs mt-0.5">
                          We'll get back to you within 2 hours.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    <FormField
                      icon={FiUser}
                      label="Your Name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(v) => setFormData({ ...formData, name: v })}
                      focused={focusedField === 'name'}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                    />
                    <FormField
                      icon={FiMail}
                      label="Email Address"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(v) => setFormData({ ...formData, email: v })}
                      focused={focusedField === 'email'}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                    />
                  </div>

                  {/* Subject */}
                  <FormField
                    icon={FiZap}
                    label="Subject"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={(v) => setFormData({ ...formData, subject: v })}
                    focused={focusedField === 'subject'}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />

                  {/* Message */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold mb-2 text-gray-700">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <div
                        className={`absolute left-3.5 top-4 transition-colors duration-300
                                    ${focusedField === 'message' ? 'text-primary-600' : 'text-gray-400'}`}
                      >
                        <FiMessageSquare size={16} />
                      </div>
                      <textarea
                        required
                        rows="6"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Tell us what's on your mind..."
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl 
                                   bg-white/80 border border-gray-200 
                                   focus:bg-white focus:border-primary-500 
                                   focus:ring-4 focus:ring-primary-100
                                   outline-none transition-all duration-300 
                                   resize-none text-sm
                                   placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative flex-1 sm:flex-none inline-flex items-center 
                                 justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-2xl 
                                 bg-gradient-to-r from-primary-600 to-primary-500 
                                 text-white font-semibold text-sm
                                 shadow-lg shadow-primary-500/30 
                                 hover:shadow-xl hover:shadow-primary-500/40 
                                 transition-all duration-300 overflow-hidden"
                    >
                      {/* Shine sweep */}
                      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
                                       -translate-x-full group-hover:translate-x-full 
                                       transition-transform duration-1000 ease-out" />
                      <FiSend size={16} className="relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      <span className="relative z-10">Send Message</span>
                    </motion.button>

                    <p className="text-xs text-gray-500 text-center sm:text-left">
                      We respect your <span className="text-primary-600 font-medium">privacy</span>. 
                      Your data is safe with us.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>

          {/* ============================================
              SIDEBAR (RIGHT, 2 COLS)
              ============================================ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Response Time Card */}
            <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 
                            rounded-3xl p-6 sm:p-7 text-white relative overflow-hidden 
                            shadow-xl shadow-primary-500/30">
              {/* Decorative */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-500/30 rounded-full blur-2xl" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md 
                                border border-white/25 flex items-center justify-center mb-4">
                  <FiHeadphones size={22} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">
                  Need instant help?
                </h3>
                <p className="text-primary-100 text-sm mb-4 leading-relaxed">
                  Our support team is available 24/7 to assist you with bookings,
                  payments, and everything in between.
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-white/15">
                  <div className="flex items-center gap-2">
                    <FiClock size={14} className="text-primary-200" />
                    <span className="text-xs text-primary-100">~2 min wait</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCheckCircle size={14} className="text-green-300" />
                    <span className="text-xs text-primary-100">98% satisfied</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Socials Card */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/60 
                            rounded-3xl p-6 sm:p-7 shadow-xl shadow-primary-100/40">
              <h3 className="text-base sm:text-lg font-bold mb-1">
                Follow us
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm mb-5">
                Get the latest deals and travel tips
              </p>
              <div className="flex flex-wrap gap-2.5">
                {socials.map(({ Icon, href, label, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={label}
                    whileHover={{ y: -4, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-11 h-11 rounded-xl bg-gray-50 border border-gray-100 
                                text-gray-600 flex items-center justify-center 
                                transition-all duration-300 hover:text-white hover:border-transparent 
                                ${color}`}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* FAQ Mini Card */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/60 
                            rounded-3xl p-6 sm:p-7 shadow-xl shadow-primary-100/40">
              <h3 className="text-base sm:text-lg font-bold mb-1">Quick FAQ</h3>
              <p className="text-gray-500 text-xs sm:text-sm mb-5">
                Answers to common questions
              </p>

              <div className="space-y-2">
                {faqs.slice(0, 3).map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden 
                                            bg-white/50 transition-colors hover:bg-white">
                      <button
                        onClick={() => setOpenFaq(isOpen ? -1 : i)}
                        className="w-full flex items-center justify-between gap-3 
                                   p-3.5 text-left"
                      >
                        <span className="text-xs sm:text-sm font-medium text-gray-800 leading-snug">
                          {faq.q}
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-primary-600 flex-shrink-0"
                        >
                          <FiChevronDown size={16} />
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="px-3.5 pb-3.5 text-xs text-gray-500 leading-relaxed">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/* ============================================
   REUSABLE FORM FIELD COMPONENT
   ============================================ */
const FormField = ({
  icon: Icon,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  focused,
  onFocus,
  onBlur,
  required,
}) => {
  return (
    <div>
      <label className="block text-xs sm:text-sm font-semibold mb-2 text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div
          className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-300
                      ${focused ? 'text-primary-600' : 'text-gray-400'}`}
        >
          <Icon size={16} />
        </div>
        <input
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl 
                     bg-white/80 border border-gray-200 
                     focus:bg-white focus:border-primary-500 
                     focus:ring-4 focus:ring-primary-100
                     outline-none transition-all duration-300 
                     text-sm placeholder:text-gray-400"
        />
      </div>
    </div>
  );
};

export default Contact;