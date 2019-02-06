
const tokenKey = "auth_token";

const userKey = "user";

export function setToken(token) {
 localStorage.setItem(tokenKey, token);
}

export function setUser(user){
 localStorage.setItem( userKey , user )
}

export function getToken() {
 return localStorage.getItem(tokenKey);
}

export function getUser(){
 return JSON.parse(localStorage.getItem(userKey))
} 

export function logout() {
 localStorage.removeItem(tokenKey);
 localStorage.removeItem(userKey);
}

export default {
  setToken,
  logout,
  getUser,
  getToken
};
