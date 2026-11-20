export const loadXHR = (url, callback) => {
  // set up the connection
  const xhr = new XMLHttpRequest();
  xhr.onerror = () => console.log(`ERROR: network error loading ${url}`);

  // when the data loads, invoke the callback and pass it the `xhr` object
  xhr.onload = () => callback(xhr);

  xhr.open("GET", url);
  xhr.send();
};