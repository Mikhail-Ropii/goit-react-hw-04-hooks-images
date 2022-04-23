import { ImageGalleryItem } from 'components/imageGalleryItem/ImageGalleryItem';
import '../styles.css';

export const ImageGallery = ({ resultSearch, onModal }) => {
  return (
    <ul className="ImageGallery">
      {resultSearch.map(({ id, webformatURL, tags, largeImageURL }) => (
        <li key={id} className="ImageGalleryItem">
          <ImageGalleryItem
            imageUrl={webformatURL}
            alt={tags}
            largeImageURL={largeImageURL}
            onModal={onModal}
          />
        </li>
      ))}
    </ul>
  );
};
