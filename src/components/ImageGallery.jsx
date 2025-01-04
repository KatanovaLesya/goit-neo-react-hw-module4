import ImageCard from './ImageCard';
import PropTypes from 'prop-types';


function ImageGallery({ images, onSelectImage }) {
  return (
    <ul
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '10px',
        listStyle: 'none',
        padding: 0,
      }}
    >
      {images.map((image) => (
        <li key={image.id}>
          <ImageCard image={image} onClick={onSelectImage} />
        </li>
      ))}
    </ul>
  );
}
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      urls: PropTypes.shape({
        small: PropTypes.string.isRequired,
      }).isRequired,
      alt_description: PropTypes.string,
    })
  ).isRequired,
  onSelectImage: PropTypes.func.isRequired,
};

export default ImageGallery;
