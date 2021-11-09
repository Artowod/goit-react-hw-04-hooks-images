import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Modal = ({ ModalCloseClickHandler, ModalCloseKeyHandler, largePic }) => {
  useEffect(() => {
    window.addEventListener('keydown', ModalCloseKeyHandler);
    // требует зависимость ModalCloseKeyHandler  - но она здесь не нужна.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', ModalCloseKeyHandler);
    };
    // требует зависимость ModalCloseKeyHandler  - но она здесь не нужна.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Overlay" onClick={ModalCloseClickHandler}>
      <div className="Modal">
        <img src={largePic} alt="Large pic" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  ModalCloseClickHandler: PropTypes.func.isRequired,
  ModalCloseKeyHandler: PropTypes.func.isRequired,
  largePic: PropTypes.string.isRequired,
};

export default Modal;
