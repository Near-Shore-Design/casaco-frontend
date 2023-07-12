import axios, { AxiosRequestConfig } from "axios";
import { updateToken, userLogout } from "utilities/reduxSlices/authSlice";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

let store: any;

export const injectStore = (_store: any) => {
  store = _store;
};

function refreshUserToken(data: { refresh: string }, access: string) {
  return axios({
    method: "POST",
    url: `${import.meta.env.VITE_API_URL}users/token/refresh`,
    data: data,
    headers: { Authorization: `Bearer ${access}` },
  });
}

instance.interceptors.request.use((config: any) => {
  const {
    auth: {
      token: { access_token },
    },
  } = store.getState();

  const { noToken } = config.headers;
  delete config.headers.noToken;

  if (!access_token || noToken) return config;
  const newConfig: AxiosRequestConfig = {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${access_token}`,
    },
  };
  return newConfig;
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const {
      auth: { token },
    } = store.getState();
    if (error.response && error.response.status === 401 && token.access_token) {
      try {
        const { refresh_token, access_token } = token;
        const refreshTokenresponse = await refreshUserToken(
          {
            refresh: refresh_token,
          },
          access_token
        );
        const { access } = refreshTokenresponse.data;
        store.dispatch(updateToken(refreshTokenresponse.data));
        const newConfig = {
          ...error.config,
          headers: {
            ...error.config.headers,
            Authorization: `Bearer ${access}`,
          },
        };
        const newResponse = await axios.request(newConfig);
        return newResponse;
      } catch (error) {
        store.dispatch(userLogout({ refresh: token.refresh_token }));
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
