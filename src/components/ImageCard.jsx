import PropTypes from 'prop-types';

function ImageCard({ image, onClick }) {
  return (
    <div onClick={() => onClick(image)} className="image-card">
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className="image-card-img"
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
