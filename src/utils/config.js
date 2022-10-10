let token = '';
if (localStorage.getItem('user')) {
  token = JSON.parse(localStorage.getItem('user')).token;
}
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export default config;
