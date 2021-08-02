
const ip = window.location.hostname;
const url = 'http://' + ip + ':5100/api/';

export const environment = {
  production: true,
  apiUrl: url,
};
