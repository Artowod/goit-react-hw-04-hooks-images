import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import getServerResponse from './shared/services/api.js';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import './App.css';
import React from 'react';

class App extends React.Component {
  state = {
    gallery: [],
    status: 'idle',
    searchQuery: '',
    page: 1,
    loader: false,
  };

  onSubmit = searchQuery => {
    this.setState({ gallery: [], page: 1 });
    if (searchQuery.trim() === '') {
      this.setState({
        status: 'idle',
        searchQuery,
      });
    } else {
      this.setState({ searchQuery });
    }
  };

  pagination = () => {
    this.setState(prevState => ({
      page: prevState['page'] + 1,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.searchQuery.trim() !== '' &&
      (this.state.searchQuery !== prevState.searchQuery ||
        this.state.page !== prevState.page)
    ) {
      this.setState({ status: 'pending' });
      getServerResponse(this.state['searchQuery'], this.state['page'])
        .then(({ hits }) => {
          this.setState(({ gallery: prevGallery }) => ({
            gallery: prevGallery.concat(
              hits.map(({ id, webformatURL, largeImageURL }) => ({
                id,
                webformatURL,
                largeImageURL,
              })),
            ),
            status: 'resolved',
          }));
          if (this.state.page !== prevState.page && this.state.page !== 1)
            window.scrollBy({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
        })
        .catch(err => {
          alert(err.message);
          throw err;
        });
    }
  }

  render() {
    const { status } = this.state;
    if (status === 'idle') {
      return (
        <div className="App">
          <SearchBar onSubmit={this.onSubmit} />
          Please type what you want to find...
        </div>
      );
    }

    return (
      <div className="App">
        <SearchBar onSubmit={this.onSubmit} />
        {(status === 'pending' || status === 'resolved') && (
          <>
            <ImageGallery gallery={this.state['gallery']} />
            <Button onClick={this.pagination} status={status}>
              {() => <Loader color="tomato" height={100} width={100} />}
            </Button>
          </>
        )}
      </div>
    ); /* return */
  } /* render */
} /* root */

export default App;
