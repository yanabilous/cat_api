const BASE_URL = "https://api.thecatapi.com/";
const TOKEN = "live_DplEv4vIA4jSOEJfCgEPl45FLrfvWac38q1dhPGBBzn3GQjNLHk3kSaZUky39PUl";

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("x-api-key", TOKEN);


export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete
};

function get(url) {
  const requestOptions = {
    method: "GET",
    headers: myHeaders
  };
  return fetch(`${BASE_URL}${url}`, requestOptions).then(handleResponse);
}

function post(url, body) {
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body
  };
  return fetch(`${BASE_URL}${url}`, requestOptions).then(handleResponse);
}

function put(url, body) {
  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body
  };
  return fetch(`${BASE_URL}${url}`, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
  const requestOptions = {
    method: "DELETE",
    headers: myHeaders
  };
  return fetch(`${BASE_URL}${url}`, requestOptions).then(handleResponse);
}

// helper functions

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}