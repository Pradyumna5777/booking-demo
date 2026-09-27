import { useState } from 'react';
import { FiSearch, FiCalendar, FiMapPin } from 'react-icons/fi';

const SearchBar = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    destination: '',
    date: '',
    guests: '2',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 grid grid-cols-1 md:grid-cols-4 gap-4"
    >
      <div className="relative">
        <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Where to?"
          value={formData.destination}
          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
          className="input-field pl-12"
        />
      </div>

      <div className="relative">
        <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="input-field pl-12"
        />
      </div>

      <div>
        <select
          value={formData.guests}
          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
          className="input-field"
        >
          <option value="1">1 Guest</option>
          <option value="2">2 Guests</option>
          <option value="3">3 Guests</option>
          <option value="4">4 Guests</option>
          <option value="5+">5+ Guests</option>
        </select>
      </div>

      <button type="submit" className="btn-primary flex items-center justify-center space-x-2">
        <FiSearch />
        <span>Search</span>
      </button>
    </form>
  );
};

export default SearchBar;