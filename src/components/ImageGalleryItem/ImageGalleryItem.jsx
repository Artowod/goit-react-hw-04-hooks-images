import PropTypes from 'prop-types';
import Modal from '../Modal';
import { useState } from 'react';

const ImageGalleryItem = ({ largeImageURL, webformatURL }) => {
  const [isModal, setIsModal] = useState(false);

  const openModal = event => {
    event.preventDefault();
    setIsModal(true);
  };

  const closeModal = event => {
    event.target.tagName === 'DIV' && setIsModal(false);
  };

  const closeModalByEsc = event => {
    event.key === 'Escape' && setIsModal(false);
  };

  return (
    <li className="ImageGalleryItem">
      {isModal === true && (
        <Modal
          ModalCloseClickHandler={closeModal}
          ModalCloseKeyHandler={closeModalByEsc}
          largePic={largeImageURL}
        />
      )}
      <a href={largeImageURL} onClick={openModal}>
        <img src={webformatURL} alt="" className="ImageGalleryItem-image" />
      </a>
    </li>
  );
};

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
};
export default ImageGalleryItem;
