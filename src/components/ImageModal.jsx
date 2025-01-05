import PropTypes from 'prop-types';
import { Modal } from '@arco-design/web-react';

function ImageModal({ isOpen, onClose, image, onPrev, onNext}) { 
  if (!image) return null;

  return (
    <Modal
      visible={isOpen}
      onCancel={onClose}
      footer={null}
      centered="true" // Використовується значення пропса
      maskClosable={true}
      className="modal-content"
      wrapClassName="modal-overlay"
      closable={false}
    >
      <button className="modal-close-button" onClick={onClose}>
        &times;
      </button>
      <img
        src={image.urls.regular}
        alt={image.alt_description || 'Image'}
        className="modal-image"
      />
      <div className="modal-info">
        <p>{image.alt_description || 'No description available'}</p>
        <p>By: {image.user.name || 'Unknown author'}</p>
        <p>Likes: {image.likes || '0'}</p>
      </div>
      <div className="modal-navigation">
        <button className="modal-prev-button" onClick={onPrev}>
          &lsaquo; Prev
        </button>
        <button className="modal-next-button" onClick={onNext}>
          Next &rsaquo;
        </button>
      </div>
    </Modal>
  );
}

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  image: PropTypes.shape({
    urls: PropTypes.shape({
      regular: PropTypes.string.isRequired,
    }).isRequired,
    alt_description: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
    likes: PropTypes.number,
  }),
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default ImageModal;
