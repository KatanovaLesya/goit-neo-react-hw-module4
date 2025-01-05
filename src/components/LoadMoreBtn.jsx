import PropTypes from 'prop-types';

function LoadMoreBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 20px',
        marginTop: '20px',
        backgroundColor: '#4A90E2',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      Load more
    </button>
  );
}

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default LoadMoreBtn;
