import PropTypes from 'prop-types';
import { Component } from 'react';
import Modal from '../Modal';
class ImageGalleryItem extends Component {
  state = {
    isModal: false,
  };

  openModal = event => {
    event.preventDefault();
    this.setState({ isModal: true });
  };

  closeModal = event => {
    event.target.tagName === 'DIV' && this.setState({ isModal: false });
  };

  closeModalByEsc = event => {
    event.key === 'Escape' && this.setState({ isModal: false });
  };

  render() {
    return (
      <li className="ImageGalleryItem">
        {this.state.isModal === true && (
          <Modal
            ModalCloseClickHandler={this.closeModal}
            ModalCloseKeyHandler={this.closeModalByEsc}
            largePic={this.props.largeImageURL}
          />
        )}
        <a href={this.props.largeImageURL} onClick={this.openModal}>
          <img
            src={this.props.webformatURL}
            alt=""
            className="ImageGalleryItem-image"
          />
        </a>
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
};
export default ImageGalleryItem;
