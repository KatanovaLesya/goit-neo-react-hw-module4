import './App.css'
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import { fetchImages } from './api/unsplash';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';



function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');


  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    setIsLoading(true);
    setError('');
    try {
      const data = await fetchImages(searchQuery);
      setImages(data.results);
    } catch (error) {
      console.error('Error fetching images:', error);
      setError('Something went wrong. Please try again later.');

    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setIsLoading(true);
    try {
      const data = await fetchImages(query, nextPage);
      setImages((prevImages) => [...prevImages, ...data.results]);
      setPage(nextPage);
    } catch (error) {
      console.error('Error loading more images:', error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
  <div>
    <SearchBar onSubmit={handleSearch} />
    {error && <ErrorMessage message={error} />}
    <ImageGallery images={images} onSelectImage={(image) => console.log('Selected:', image)} />
    {isLoading && <Loader />}
    {images.length > 0 && !isLoading && (
      <button onClick={handleLoadMore} style={{ padding: '10px 20px', marginTop: '20px' }}>
        Load more
      </button>
    )}
  </div>
  );
}

export default App;
