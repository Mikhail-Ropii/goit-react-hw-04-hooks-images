import { useEffect, useState } from 'react';
import axios from 'axios';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Searchbar } from './searchbar/Searchbar';
import { Button } from './button/Button';
import { Loader } from './loader/Loader';
import { Modal } from 'components/modal/Modal';
import { animateScroll as scroll } from 'react-scroll';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const [searchValue, setSearchValue] = useState('');
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [modalImage, setModalImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(null);

  useEffect(() => {
    if (searchValue === '') {
      return;
    }
    setIsLoading(true);
    axios
      .get(
        `https://pixabay.com/api/?q=${searchValue}&page=${page}&key=25249290-2b9b53acf0b6f227aa978e658&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(res => {
        setPictures(state => [...state, ...res.data.hits]);
        setTotalResults(res.data.totalHits);
        setIsLoading(false);
        if (res.data.hits.length === 0) {
          toast.warn('No pictures for your request', {
            position: 'bottom-center',
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [searchValue, page]);

  const handleFormSubmit = searchValue => {
    setPictures([]);
    setPage(1);
    setSearchValue(searchValue);
  };

  const onLoadButtonClick = () => {
    setPage(state => state + 1);
    scroll.scrollToBottom();
  };

  const onModal = modalImage => {
    setModalImage(modalImage);
  };

  const onModalClose = () => {
    setModalImage('');
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery resultSearch={pictures} onModal={onModal} />
      {pictures.length !== 0 && totalResults !== pictures.length && (
        <Button onClick={onLoadButtonClick} />
      )}
      {isLoading && <Loader />}
      {modalImage !== '' && (
        <Modal onModalClose={onModalClose}>
          <img src={modalImage} alt="" />
        </Modal>
      )}

      <ToastContainer />
    </div>
  );
}
