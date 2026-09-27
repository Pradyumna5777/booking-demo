/* ============================================
   SERVICES — with images for card headers
   ============================================ */
export const services = [
  {
    id: 1,
    name: "Hotel Booking",
    icon: "🏨",
    description: "Book premium hotels worldwide",
    price: "From ₹2,999/night",
    color: "from-blue-500 to-blue-600",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    rating: 4.9,
    booked: "12K+",
  },
  {
    id: 2,
    name: "Flight Booking",
    icon: "✈️",
    description: "Find the best flight deals",
    price: "From ₹4,999",
    color: "from-purple-500 to-purple-600",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    rating: 4.8,
    booked: "8.5K+",
  },
  {
    id: 3,
    name: "Car Rental",
    icon: "🚗",
    description: "Rent cars at affordable rates",
    price: "From ₹899/day",
    color: "from-green-500 to-green-600",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    rating: 4.7,
    booked: "5K+",
  },
  {
    id: 4,
    name: "Restaurant",
    icon: "🍽️",
    description: "Reserve tables at top restaurants",
    price: "Free reservation",
    color: "from-orange-500 to-orange-600",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    rating: 4.8,
    booked: "6K+",
  },
  {
    id: 5,
    name: "Event Tickets",
    icon: "🎫",
    description: "Get tickets to events & shows",
    price: "From ₹499",
    color: "from-pink-500 to-pink-600",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    rating: 4.9,
    booked: "10K+",
  },
  {
    id: 6,
    name: "Spa & Wellness",
    icon: "💆",
    description: "Book relaxing spa sessions",
    price: "From ₹799",
    color: "from-teal-500 to-teal-600",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
    rating: 4.9,
    booked: "4K+",
  },
];

/* ============================================
   BOOKINGS — localized + ₹ prices
   ============================================ */
export const bookings = [
  {
    id: "BK001",
    service: "Hotel Booking",
    title: "The Taj Mahal Palace",
    location: "Mumbai, India",
    date: "2024-12-15",
    time: "14:00",
    status: "confirmed",
    price: 12500,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    guests: 2,
  },
  {
    id: "BK002",
    service: "Flight Booking",
    title: "DEL → LHR",
    location: "Indira Gandhi Intl, Delhi",
    date: "2024-12-20",
    time: "09:30",
    status: "pending",
    price: 42800,
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    guests: 1,
  },
  {
    id: "BK003",
    service: "Car Rental",
    title: "Tesla Model 3",
    location: "Bengaluru, India",
    date: "2024-12-18",
    time: "10:00",
    status: "confirmed",
    price: 4500,
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80",
    guests: 4,
  },
  {
    id: "BK004",
    service: "Restaurant",
    title: "Indian Accent",
    location: "New Delhi, India",
    date: "2024-12-22",
    time: "19:00",
    status: "cancelled",
    price: 0,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    guests: 2,
  },
  {
    id: "BK005",
    service: "Spa & Wellness",
    title: "Serenity Spa",
    location: "Goa, India",
    date: "2024-12-25",
    time: "11:00",
    status: "confirmed",
    price: 3200,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
    guests: 1,
  },
  {
    id: "BK006",
    service: "Event Tickets",
    title: "Sunburn Festival",
    location: "Pune, India",
    date: "2024-12-28",
    time: "20:00",
    status: "pending",
    price: 5500,
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&q=80",
    guests: 2,
  },
];

/* ============================================
   TESTIMONIALS
   ============================================ */
export const testimonials = [
  {
    id: 1,
    name: "Abhishek Singh",
    role: "Travel Blogger",
    content: "Amazing platform! Booking was seamless and the UI is incredibly intuitive.",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5,
  },
  {
    id: 2,
    name: "Rohit Sharma",
    role: "Business Traveler",
    content: "I use this for all my business trips. The dashboard keeps everything organized.",
    avatar: "https://i.pravatar.cc/150?img=2",
    rating: 5,
  },
  {
    id: 3,
    name: "Siddharth Roy",
    role: "Event Planner",
    content: "Perfect for managing multiple reservations. Highly recommended!",
    avatar: "https://i.pravatar.cc/150?img=3",
    rating: 4,
  },
];

/* ============================================
   STATS
   ============================================ */
export const stats = [
  { label: "Happy Customers", value: "50K+", icon: "😊" },
  { label: "Bookings Made", value: "150K+", icon: "📅" },
  { label: "Partner Hotels", value: "5K+", icon: "🏨" },
  { label: "Cities Covered", value: "500+", icon: "🌍" },
];

/* ============================================
   DESTINATIONS — for the new Home section
   ============================================ */
export const destinations = [
  {
    id: 1,
    city: "Mumbai",
    country: "India",
    price: "₹8,999",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&q=80",
    tag: "Trending",
  },
  {
    id: 2,
    city: "Goa",
    country: "India",
    price: "₹5,499",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80",
    tag: "Beach",
  },
  {
    id: 3,
    city: "Manali",
    country: "India",
    price: "₹6,999",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80",
    tag: "Mountains",
  },
  {
    id: 4,
    city: "Jaipur",
    country: "India",
    price: "₹4,299",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80",
    tag: "Heritage",
  },
];