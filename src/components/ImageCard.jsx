import PropTypes from 'prop-types';

function ImageCard({ image, onClick }) {
  return (
    <div onClick={() => onClick(image)} style={{ cursor: 'pointer' }}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }}
      />
    </div>
  );
}
ImageCard.propTypes = {
  image: PropTypes.shape({
    urls: PropTypes.shape({
      small: PropTypes.string.isRequired,
    }).isRequired,
    alt_description: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageCard;
