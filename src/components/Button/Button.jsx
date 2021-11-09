import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ onClick, children, status }) => {
  return (
    <div className={s.loader_wrapper}>
      <div className={s.loader}>{status === 'pending' && children()}</div>
      {status === 'resolved' && (
        <button className={s.Button} type="button" onClick={onClick}>
          Load more
        </button>
      )}
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

export default Button;
