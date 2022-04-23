import '../styles.css';

export const Button = ({ onClick }) => {
  return (
    <div className="button-wrap">
      <button className="Button" type="button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
};
