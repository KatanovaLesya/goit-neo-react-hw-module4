import './App.css';
import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import { fetchImages } from './api/unsplash';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn';
import ImageModal from './components/ImageModal';

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Виконання запиту на API
  useEffect(() => {
    const fetchData = async () => {
      if (!query) return; // Не виконуємо запит, якщо немає пошукового запиту

      setIsLoading(true);
      setError('');
      try {
        const data = await fetchImages(query, page);
        setImages((prevImages) => (page === 1 ? data.results : [...prevImages, ...data.results]));
      } catch (error) {
        console.error('Error fetching images:', error);
        setError('Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, page]); // Викликаємо useEffect при зміні query або page

  // Оновлюємо пошуковий запит
  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1); // Перезавантажуємо з першої сторінки
  };

  // Завантажуємо більше зображень
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Відкриваємо модальне вікно
  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  // Закриваємо модальне вікно
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Навігація по модальному вікну
  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="container">
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onSelectImage={(image, index) => openModal(index)} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <LoadMoreBtn onClick={handleLoadMore} />}
      {isModalOpen && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          image={images[currentIndex]}
          onPrev={handlePrevImage}
          onNext={handleNextImage}
        />
      )}
    </div>
  );
}

export default App;
