import { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  state = {
    searchInput: '',
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.searchInput);
  };

  onInputChange = e => {
    const { value } = e.target;
    this.setState({ searchInput: value });
  };

  render() {
    return (
      <header className="SearchBar">
        <form className="SearchForm" onSubmit={this.onSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            name="searchInput"
            value={this.state.searchInput}
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onInputChange}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
