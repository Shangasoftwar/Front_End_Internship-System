const TOKEN = 'token';

function getToken() {
   return localStorage.getItem(TOKEN);
}

function setToken(value: string) {
   localStorage.setItem(TOKEN, value);
}

function destroyToken() {
   localStorage.removeItem(TOKEN);
}

function clearStorage() {
   localStorage.clear();
}

function isValidToken() {
   return getToken() ? true : false;
}

export default { getToken, setToken, destroyToken, clearStorage, isValidToken };
