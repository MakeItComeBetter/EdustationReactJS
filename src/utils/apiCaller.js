import axios from "axios";
import jwt_decode from "jwt-decode";
import { BASE_URL_API, CHECK_TOKEN_EXPIRED, REFRESH_TOKEN_URL, SERVER_TIME_URL } from "../constance/urlApi";
import { REFRESH_TOKEN_PATH, SESSION_PATH } from "../constance/urlPath";

const instance = axios.create({
  baseURL: BASE_URL_API,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  }
});

// this will work before request
instance.interceptors.request.use(async (config) => {

  try {
    //skip check token
    if (config.url.indexOf(SESSION_PATH) >= 0 || config.url.indexOf(REFRESH_TOKEN_PATH) >= 0 || config.url.indexOf(SERVER_TIME_URL) >= 0) {
      return Promise.resolve(config);
    }
    // get local token
    const access_data = getLocalAccessToken();
    if (!access_data) return Promise.reject(new Error('Please login again.'));;

    const { token, timeExpired } = access_data;
    const serverTime = await getServerTime();
    if (serverTime - timeExpired > 0) {

      const checkExpired = await checkTokenExpired();
      if (checkExpired.status === 200) {
        console.error("Access Expired !");
        if (config.url.indexOf(CHECK_TOKEN_EXPIRED) >= 0) {
          return Promise.reject(new Error('Please login again.'));
        }

        const response = await refreshToken();
        const newToken = response.auth_token;
        const exp = jwt_decode(newToken)?.exp;
        const email = jwt_decode(newToken)?.data.email;
        window.localStorage.setItem('access_data', JSON.stringify({ token: newToken, timeExpired: exp, email: email }))
        config.headers["x-access-token"] = newToken;
      } else {
        return Promise.reject(new Error('Please login again.'));
      }
    } else {
      config.headers["x-access-token"] = token;
      return Promise.resolve(config);
    }
    return Promise.resolve(config);

  } catch (e) {
    return Promise.reject(new Error('Please login again.'));
  }
},
  err => {
    return Promise.reject(new Error('Please login again.'));
  }
)

const getServerTime = async () => {
  return (await axios.get(BASE_URL_API + SERVER_TIME_URL)).data.server_time;
}


// this will work after response
instance.interceptors.response.use((config) => {
  return config;
}, err => {
  return Promise.reject(err);
});



const getLocalAccessToken = () => {
  const access_data = window.localStorage.getItem("access_data");
  return JSON.parse(access_data);
}

const refreshToken = async () => {
  const access_data = JSON.parse(window.localStorage.getItem('access_data'));
  const data = { prev_token: access_data.token, email: access_data.email }
  return (await axios.post(BASE_URL_API + REFRESH_TOKEN_URL, data)).data;
}

const checkTokenExpired = async () => {
  const params = { current_token: JSON.parse(window.localStorage.getItem('access_data'))?.token };
  return (await axios.post(BASE_URL_API + CHECK_TOKEN_EXPIRED, params));

}

/**
 * This is instance of axios library.
 * Example:
 * endpoint: '/user'
 * method: 'POST'
 * body: {user: {"email": "email user", "password": "password user"}}
 * 
 */
export const fetchApi = async (endpoint, method = 'GET', body) => {
  return instance({
    url: endpoint,
    method: method,
    data: body
  })
}

