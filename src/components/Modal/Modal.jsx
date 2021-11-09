import { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.props.ModalCloseKeyHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.ModalCloseKeyHandler);
  }

  render() {
    return (
      <div className="Overlay" onClick={this.props.ModalCloseClickHandler}>
        <div className="Modal">
          <img src={this.props.largePic} alt="Large pic" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  ModalCloseClickHandler: PropTypes.func.isRequired,
  ModalCloseKeyHandler: PropTypes.func.isRequired,
  largePic: PropTypes.string.isRequired,
};

export default Modal;
