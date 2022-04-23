import { SpinningCircles } from 'react-loading-icons';
import '../styles.css';

export const Loader = () => {
  return (
    <div className="loader-wrap">
      <SpinningCircles
        className="loader"
        height="10em"
        width="10em"
        stroke="#000000"
        fill="#0a9be4"
      />
      <p>Loading</p>
    </div>
  );
};
