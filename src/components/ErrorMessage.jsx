import PropTypes from 'prop-types';

function ErrorMessage({ message }) {
  return <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{message}</p>;
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
