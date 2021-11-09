import { useState } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ onSubmitHandler }) => {
  const [searchInput, setSearchInput] = useState('');

  const onSubmit = event => {
    event.preventDefault();
    onSubmitHandler(searchInput);
  };

  const onInputChange = e => {
    const { value } = e.target;
    setSearchInput(value);
  };

  return (
    <header className="SearchBar">
      <form className="SearchForm" onSubmit={onSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          name="searchInput"
          value={searchInput}
          autoFocus
          placeholder="Search images and photos"
          onChange={onInputChange}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmitHandler: PropTypes.func.isRequired,
};

export default SearchBar;
