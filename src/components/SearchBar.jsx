import PropTypes from 'prop-types'; 
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.error('Please enter a search query!');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <header style={{ padding: '10px', backgroundColor: '#4A90E2' }}>
      <Toaster />
      <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search images and photos"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: '10px',
            width: '300px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginRight: '10px',
          }}
        />
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#fff', borderRadius: '4px' }}>
          Search
        </button>
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired, 
};

export default SearchBar;
