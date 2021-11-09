import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import getServerResponse from './shared/services/api.js';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { useState, useEffect } from 'react';

import './App.css';
import React from 'react';

const App = () => {
  const [gallery, setGallery] = useState([]);
  const [status, setStatus] = useState('idle');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const onSubmit = searchQuery => {
    setGallery([]);
    setPage(1);

    if (searchQuery.trim() === '') {
      setStatus('idle');
      setSearchQuery(searchQuery);
    } else {
      setSearchQuery(searchQuery);
    }
  };

  const pagination = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      setStatus('pending');
      getServerResponse(searchQuery, page)
        .then(({ hits }) => {
          setGallery(prevGallery => {
            return prevGallery.concat(
              hits.map(({ id, webformatURL, largeImageURL }) => ({
                id,
                webformatURL,
                largeImageURL,
              })),
            );
          });
          setStatus('resolved');
          if (page > 1) {
            window.scrollBy({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
          }
        })
        .catch(err => {
          alert(err.message);
          throw err;
        });
    }
    // требует зависимость gallery  - но она здесь не нужна.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, page]);

  if (status === 'idle') {
    return (
      <div className="App">
        <SearchBar onSubmitHandler={onSubmit} />
        Please type what you want to find...
      </div>
    );
  }

  return (
    <div className="App">
      <SearchBar onSubmitHandler={onSubmit} />
      {(status === 'pending' || status === 'resolved') && (
        <>
          <ImageGallery gallery={gallery} />
          <Button onClick={pagination} status={status}>
            {() => <Loader color="tomato" height={100} width={100} />}
          </Button>
        </>
      )}
    </div>
  );
};

export default App;
