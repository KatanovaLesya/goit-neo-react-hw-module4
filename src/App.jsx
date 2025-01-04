import './App.css';
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import { fetchImages } from './api/unsplash';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Оновлений метод для пошуку
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

  // Оновлений метод для завантаження
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

  // Метод для відкриття модального вікна
  const openModal = (index) => {
    if (!isModalOpen) { // Перевірка, чи вікно вже відкрите
      setCurrentIndex(index);
      setIsModalOpen(true);
    }
  };

  // Метод для закриття модального вікна
  const closeModal = () => {
    if (isModalOpen) { // Перевірка, чи вікно відкрите
      setIsModalOpen(false);
    }
  };

  // Обробка попереднього зображення
  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // Обробка наступного зображення
  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="container">
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onSelectImage={(image, index) => openModal(index)} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && (
        <button onClick={handleLoadMore} style={{ padding: '10px 20px', marginTop: '20px' }}>
          Load more
        </button>
      )}
      {isModalOpen && (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <button className="modal-close-button" onClick={closeModal}>
            &times;
          </button>
          <img
            src={images[currentIndex].urls.regular}
            alt={images[currentIndex].alt_description}
            className="modal-image"
          />
          <div className="modal-info">
            <p>{images[currentIndex].alt_description || 'No description available'}</p>
            <p>By: {images[currentIndex].user.name || 'Unknown author'}</p>
            <p>Likes: {images[currentIndex].likes || '0'}</p>
          </div>
          <button className="modal-prev-button" onClick={handlePrevImage}>
            &lsaquo;
          </button>
          <button className="modal-next-button" onClick={handleNextImage}>
            &rsaquo;
          </button>
        </ReactModal>
      )}
    </div>
  );
}

export default App;
