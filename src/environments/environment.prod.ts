
const ip = window.location.hostname;
const url = 'http://' + ip + ':5100/api/'; //API Real
const urlt = 'http://' + ip + ':6900/api/'; //API Test

export const environment = {
  production: true,
  apiUrl: url,
};
