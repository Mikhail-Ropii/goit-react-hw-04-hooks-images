import { Component } from 'react';
import axios from 'axios';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Searchbar } from './searchbar/Searchbar';
import { Button } from './button/Button';
import { Loader } from './loader/Loader';
import { Modal } from 'components/modal/Modal';
import { animateScroll as scroll } from 'react-scroll';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    searchValue: '',
    pictures: [],
    page: 1,
    modalImage: '',
    isLoading: false,
    totalResults: null,
  };

  componentDidUpdate(_, prevState) {
    const { searchValue, page, pictures } = this.state;
    if (prevState.searchValue !== searchValue || prevState.page !== page) {
      this.setState({ isLoading: true });
      axios
        .get(
          `https://pixabay.com/api/?q=${searchValue}&page=${page}&key=25249290-2b9b53acf0b6f227aa978e658&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(res => {
          this.setState({
            pictures: [...pictures, ...res.data.hits],
            totalResults: res.data.totalHits,
            isLoading: false,
          });
          if (res.data.hits.length === 0) {
            toast.warn('No pictures for your request', {
              position: 'bottom-center',
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  handleFormSubmit = searchValue => {
    this.setState({ pictures: [], page: 1 });
    this.setState({ searchValue });
  };

  onLoadButtonClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    scroll.scrollToBottom();
  };

  onModal = modalImage => {
    this.setState({ modalImage });
  };

  onModalClose = () => {
    this.setState({ modalImage: '' });
  };

  render() {
    const { pictures, isLoading, totalResults, modalImage } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery resultSearch={pictures} onModal={this.onModal} />
        {pictures.length !== 0 && totalResults !== pictures.length && (
          <Button onClick={this.onLoadButtonClick} />
        )}
        {isLoading && <Loader />}
        {modalImage !== '' && (
          <Modal onModalClose={this.onModalClose}>
            <img src={modalImage} alt="" />
          </Modal>
        )}

        <ToastContainer />
      </div>
    );
  }
}
