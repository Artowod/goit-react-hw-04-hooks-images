import axios from 'axios';

//pixabay
function getServerResponse(q = '', page) {
  const sendParam = {
    key: '23763255-79cd913c0d73945049700542d',
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 12,
    page: 1,
  };

  sendParam.q = q;
  sendParam.page = page;

  const response = axios.get('https://pixabay.com/api/', {
    params: sendParam,
  });

  return response.then(({ data }) => data);
}

export default getServerResponse;
