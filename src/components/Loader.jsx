import { TailSpin } from 'react-loader-spinner';

function Loader() {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <TailSpin height="50" width="50" color="#4A90E2" />
    </div>
  );
}

export default Loader;
