import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiAward, FiTrendingUp,
  FiCalendar, FiCamera, FiSettings, FiShare2, FiHeart, FiStar,
  FiCheckCircle, FiClock, FiXCircle, FiChevronRight, FiLogOut, FiCreditCard,
} from 'react-icons/fi';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('activity');

  const userStats = [
    {
      label: 'Total Bookings',
      value: '24',
      icon: FiCalendar,
      color: 'from-blue-500 to-blue-600',
      trend: '+3 this month',
    },
    {
      label: 'Reviews',
      value: '18',
      icon: FiAward,
      color: 'from-purple-500 to-purple-600',
      trend: '+2 this month',
    },
    {
      label: 'Member Since',
      value: '2022',
      icon: FiTrendingUp,
      color: 'from-green-500 to-green-600',
      trend: '3 years',
    },
  ];

  const recentActivity = [
    { id: 1, action: 'Booked Hotel Grand Plaza', time: '2 hours ago', icon: '🏨', status: 'confirmed' },
    { id: 2, action: 'Reviewed Le Bernardin', time: '1 day ago', icon: '⭐', status: 'review' },
    { id: 3, action: 'Cancelled Car Rental', time: '3 days ago', icon: '🚗', status: 'cancelled' },
    { id: 4, action: 'Booked Spa Session', time: '1 week ago', icon: '💆', status: 'confirmed' },
    { id: 5, action: 'Completed Flight to London', time: '2 weeks ago', icon: '✈️', status: 'completed' },
  ];

  const achievements = [
    { id: 1, name: 'First Booking', icon: '🎯', unlocked: true, color: 'from-blue-400 to-blue-600' },
    { id: 2, name: 'Explorer', icon: '🌍', unlocked: true, color: 'from-green-400 to-green-600' },
    { id: 3, name: 'Reviewer', icon: '✍️', unlocked: true, color: 'from-purple-400 to-purple-600' },
    { id: 4, name: 'Globetrotter', icon: '✈️', unlocked: false, color: 'from-gray-300 to-gray-400' },
    { id: 5, name: 'Gold Member', icon: '🏆', unlocked: true, color: 'from-yellow-400 to-orange-500' },
  ];

  const tabs = [
    { id: 'activity', label: 'Activity', icon: FiClock },
    { id: 'achievements', label: 'Achievements', icon: FiAward },
    { id: 'settings', label: 'Settings', icon: FiSettings },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  const statusColors = {
    confirmed: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    cancelled: 'bg-red-100 text-red-700',
    completed: 'bg-blue-100 text-blue-700',
    review: 'bg-purple-100 text-purple-700',
  };

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-32 -left-40 w-96 h-96 bg-primary-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -right-40 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ============================================
            PAGE HEADER
            ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="section-label">My Account</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 leading-tight">
            Profile <span className="text-gradient">& Dashboard</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ============================================
              PROFILE CARD (LEFT)
              ============================================ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-1"
          >
            <div className="relative bg-white/70 backdrop-blur-xl border border-white/60 
                            rounded-3xl overflow-hidden shadow-xl shadow-primary-100/40">
              {/* Cover Banner */}
              <div className="relative h-28 sm:h-32 bg-gradient-to-br from-primary-500 via-primary-600 to-purple-600 overflow-hidden">
                {/* Decorative orbs in banner */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 left-8 w-24 h-24 bg-purple-400/30 rounded-full blur-2xl" />

                {/* Camera / Edit cover button */}
                <button
                  aria-label="Change cover"
                  className="absolute top-3 right-3 w-9 h-9 rounded-full 
                             bg-white/20 backdrop-blur-md border border-white/30 
                             flex items-center justify-center text-white 
                             hover:bg-white/30 transition-colors"
                >
                  <FiCamera size={15} />
                </button>

                {/* Share button */}
                <button
                  aria-label="Share profile"
                  className="absolute top-3 left-3 w-9 h-9 rounded-full 
                             bg-white/20 backdrop-blur-md border border-white/30 
                             flex items-center justify-center text-white 
                             hover:bg-white/30 transition-colors"
                >
                  <FiShare2 size={15} />
                </button>
              </div>

              {/* Avatar */}
              <div className="relative px-6 -mt-16">
                <div className="relative inline-block">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 3 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="relative"
                  >
                    <img
                      src="/images/satyam.png"
                      alt="Profile"
                      className="w-32 h-32 rounded-full border-4 border-white shadow-2xl mx-auto object-cover"
                    />
                    {/* Online dot */}
                    <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 
                                     border-4 border-white rounded-full shadow-lg" />
                    {/* Verified check */}
                    <span className="absolute top-1 right-1 w-7 h-7 bg-primary-600 
                                     border-4 border-white rounded-full flex items-center justify-center">
                      <FiCheckCircle size={14} className="text-white" strokeWidth={3} />
                    </span>
                  </motion.div>

                  <button
                    aria-label="Edit avatar"
                    className="absolute bottom-2 right-2 -translate-x-14 translate-y-2
                               w-9 h-9 bg-primary-600 text-white rounded-full 
                               flex items-center justify-center shadow-lg 
                               hover:bg-primary-700 hover:scale-110 transition-all"
                  >
                    <FiEdit2 size={14} />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="px-6 pb-6 text-center">
                <h2 className="text-2xl font-bold mt-4 text-gray-900">Satyam Anand</h2>
                <p className="text-gray-500 text-sm mb-3">Full Stack Developer</p>

                {/* Gold badge */}
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 
                                 bg-gradient-to-r from-yellow-400 to-orange-500 
                                 text-white text-xs font-bold rounded-full shadow-lg shadow-yellow-400/40">
                  <FiStar size={12} className="fill-white" />
                  GOLD MEMBER
                </span>

                {/* Contact info */}
                <div className="mt-6 space-y-3 text-left">
                  {[
                    { icon: FiMail, text: 'satyamkr.16364@gmail.com' },
                    { icon: FiPhone, text: '+91 7667571530' },
                    { icon: FiMapPin, text: 'Hasanpura, Siwan - Bihar' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="group flex items-center gap-3 p-2 rounded-xl 
                                 hover:bg-primary-50 transition-colors cursor-pointer"
                    >
                      <span className="w-9 h-9 rounded-lg bg-primary-50 text-primary-600 
                                       flex items-center justify-center flex-shrink-0
                                       group-hover:bg-primary-100 transition-colors">
                        <item.icon size={15} />
                      </span>
                      <span className="text-sm text-gray-600 truncate">{item.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-6">
                  <button className="flex-1 btn-primary flex items-center justify-center gap-2 py-3 text-sm">
                    <FiEdit2 size={14} />
                    Edit Profile
                  </button>
                  <button
                    aria-label="Logout"
                    className="w-12 h-12 rounded-xl border border-gray-200 
                               text-gray-500 hover:text-red-500 hover:border-red-200 
                               hover:bg-red-50 flex items-center justify-center transition-colors"
                  >
                    <FiLogOut size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ============================================
              RIGHT SIDE
              ============================================ */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {userStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    whileHover={{ y: -6 }}
                    className="group relative bg-white/70 backdrop-blur-xl border border-white/60 
                               rounded-2xl p-5 overflow-hidden
                               shadow-lg shadow-primary-100/30 hover:shadow-xl 
                               hover:shadow-primary-200/50 transition-all duration-300"
                  >
                    {/* Hover glow */}
                    <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full 
                                     bg-gradient-to-br ${stat.color} opacity-0 
                                     group-hover:opacity-20 blur-2xl transition-opacity duration-500`} />

                    <div className="relative z-10">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} 
                                       flex items-center justify-center text-white mb-3 
                                       shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={20} />
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold font-display text-gray-900">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-500 mt-0.5">{stat.label}</div>
                      <div className="mt-2 text-xs text-primary-600 font-medium">
                        {stat.trend}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Tabs Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white/70 backdrop-blur-xl border border-white/60 
                         rounded-3xl overflow-hidden shadow-xl shadow-primary-100/40"
            >
              {/* Tabs */}
              <div className="flex border-b border-gray-100 overflow-x-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="relative flex-1 min-w-[110px] flex items-center justify-center gap-2 
                                 px-4 py-4 text-sm font-medium transition-colors whitespace-nowrap"
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeProfileTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 
                                     bg-gradient-to-r from-primary-500 to-purple-500"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <Icon
                        size={16}
                        className={`transition-colors ${
                          isActive ? 'text-primary-600' : 'text-gray-400'
                        }`}
                      />
                      <span
                        className={`transition-colors ${
                          isActive ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div className="p-5 sm:p-6">
                <AnimatePresence mode="wait">
                  {/* === ACTIVITY === */}
                  {activeTab === 'activity' && (
                    <motion.div
                      key="activity"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.35 }}
                      className="space-y-2"
                    >
                      {recentActivity.map((activity, i) => (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                          className="group flex items-center gap-3 sm:gap-4 p-3 rounded-xl 
                                     hover:bg-white transition-colors cursor-pointer"
                        >
                          <div className="w-11 h-11 bg-primary-50 rounded-xl flex items-center 
                                          justify-center text-xl flex-shrink-0 
                                          group-hover:scale-110 group-hover:bg-primary-100 
                                          transition-all duration-300">
                            {activity.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-gray-900 truncate">
                              {activity.action}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {activity.time}
                            </p>
                          </div>
                          <span
                            className={`hidden sm:inline-block px-2.5 py-1 rounded-full 
                                       text-[10px] font-semibold uppercase tracking-wide
                                       ${statusColors[activity.status]}`}
                          >
                            {activity.status}
                          </span>
                          <FiChevronRight
                            className="text-gray-300 group-hover:text-primary-600 
                                       group-hover:translate-x-1 transition-all flex-shrink-0"
                            size={16}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {/* === ACHIEVEMENTS === */}
                  {activeTab === 'achievements' && (
                    <motion.div
                      key="achievements"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                        {achievements.map((ach, i) => (
                          <motion.div
                            key={ach.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.08 }}
                            whileHover={{ y: -6, scale: 1.05 }}
                            className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl 
                                        transition-all duration-300 cursor-pointer
                                        ${
                                          ach.unlocked
                                            ? 'bg-white shadow-md hover:shadow-xl'
                                            : 'bg-gray-50 opacity-60'
                                        }`}
                          >
                            <div
                              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${ach.color} 
                                         flex items-center justify-center text-2xl shadow-lg
                                         ${!ach.unlocked ? 'grayscale' : ''}`}
                            >
                              {ach.icon}
                            </div>
                            <p className="text-xs font-semibold text-gray-700 text-center leading-tight">
                              {ach.name}
                            </p>
                            {!ach.unlocked && (
                              <span className="text-[10px] text-gray-400">🔒 Locked</span>
                            )}
                            {ach.unlocked && (
                              <span className="text-[10px] text-green-600 font-medium">
                                Unlocked
                              </span>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* === SETTINGS === */}
                  {activeTab === 'settings' && (
                    <motion.div
                      key="settings"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.35 }}
                      className="space-y-2"
                    >
                      {[
                        { icon: FiUser, label: 'Account Information', desc: 'Name, email, phone' },
                        { icon: FiCreditCard, label: 'Payment Methods', desc: 'Cards, wallets, UPI' },
                        { icon: FiSettings, label: 'Preferences', desc: 'Language, currency, theme' },
                        { icon: FiShare2, label: 'Refer & Earn', desc: 'Invite friends, get rewards' },
                      ].map((item, i) => {
                        const Icon = item.icon;
                        return (
                          <motion.button
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.06 }}
                            className="w-full flex items-center gap-4 p-3.5 rounded-xl 
                                       hover:bg-white transition-all text-left group"
                          >
                            <div className="w-11 h-11 rounded-xl bg-primary-50 text-primary-600 
                                            flex items-center justify-center flex-shrink-0 
                                            group-hover:bg-primary-600 group-hover:text-white 
                                            transition-all duration-300">
                              <Icon size={18} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm text-gray-900">
                                {item.label}
                              </p>
                              <p className="text-xs text-gray-500 truncate">{item.desc}</p>
                            </div>
                            <FiChevronRight
                              className="text-gray-300 group-hover:text-primary-600 
                                         group-hover:translate-x-1 transition-all flex-shrink-0"
                              size={16}
                            />
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Travel Stats Mini-Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
            >
              {[
                { icon: '🏙️', value: '12', label: 'Cities' },
                { icon: '🌍', value: '5', label: 'Countries' },
                { icon: '❤️', value: '32', label: 'Favorites' },
                { icon: '⭐', value: '4.9', label: 'Avg Rating' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className="bg-white/70 backdrop-blur-xl border border-white/60 
                             rounded-2xl p-4 text-center 
                             hover:shadow-lg hover:shadow-primary-200/40 transition-all"
                >
                  <div className="text-2xl sm:text-3xl mb-1">{item.icon}</div>
                  <div className="text-lg sm:text-xl font-bold font-display text-gray-900">
                    {item.value}
                  </div>
                  <div className="text-xs text-gray-500">{item.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;