import propTypes from 'prop-types';

export const ImageGalleryItem = ({ imageUrl, alt, largeImageURL, onModal }) => {
  return (
    <>
      <img
        className="ImageGalleryItem-image"
        onClick={() => onModal(largeImageURL)}
        src={imageUrl}
        alt={alt}
      />
    </>
  );
};

ImageGalleryItem.propTypes = {
  imageUrl: propTypes.string,
  alt: propTypes.string,
  largeImageURL: propTypes.string,
};
