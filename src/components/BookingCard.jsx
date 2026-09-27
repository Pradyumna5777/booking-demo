import { motion } from 'framer-motion';
import { FiMapPin, FiCalendar, FiClock, FiUsers } from 'react-icons/fi';
import { BiRupee } from "react-icons/bi";

const BookingCard = ({ booking, index }) => {
  const statusColors = {
    confirmed: 'bg-green-100 text-green-700 border-green-200',
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    cancelled: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="card group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={booking.image}
          alt={booking.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-semibold text-primary-600">
            {booking.service}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border capitalize ${statusColors[booking.status]}`}>
            {booking.status}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold">{booking.title}</h3>
          <div className="flex items-center space-x-1 text-sm">
            <FiMapPin size={14} />
            <span>{booking.location}</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="flex items-center space-x-2 text-gray-600">
            <FiCalendar className="text-primary-500" />
            <span>{new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <FiClock className="text-primary-500" />
            <span>{booking.time}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <FiUsers className="text-primary-500" />
            <span>{booking.guests} Guest{booking.guests > 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <BiRupee className="text-primary-500" />
            <span className="font-semibold">{booking.price}</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <button className="flex-1 btn-primary py-2 text-sm">View Details</button>
          <button className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-600">
            ⋯
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingCard;