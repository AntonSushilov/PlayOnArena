import { IResponse } from "./types";
import { user, teams } from "./mockData";

const API_URL = "http://127.0.0.1:8000/api/v1";
const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

// export const requestApi = <T extends any>(
//   url: string,
//   options?: RequestInit
// ): Promise<T> => {
//   return fetch(API_URL + url, options).then((res) => {
//     return res.json();
//   });
// };

export const requestApi = <T extends any>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  return fetch(API_URL + url, options)
    .then((res) => {
      console.log("requestApi", res);
      return checkResponse<T>(res);
    })
    .then((data) => {
      console.log("requestApi data", data);

      // if (!data.success) {
      //   return Promise.reject(`${data.message}`);
      // }
      return data;
    });
};

export const fetchWithRefresh = async <T extends any>(
  url: string,
  options: RequestInit
): Promise<T> => {
  try {
    const responce = await requestApi<T>(url, options);
    console.log("responce_tyt", responce);
    return responce;
  } catch (err) {
    // if ((err as { message: string }).message === "jwt expired") {
    //   const refreshData = await refreshToken(); //обновляем токен
    //   if (!refreshData.success) {
    //     return Promise.reject(refreshData);
    //   }
    //   localStorage.setItem("refreshToken", refreshData.refreshToken);
    //   localStorage.setItem("accessToken", refreshData.accessToken);

    //   if (options.headers) {
    //     (options.headers as { [key: string]: string }).authorization =
    //       refreshData.accessToken;
    //   }

    //   return await requestApi<T>(url, options); //повторяем запрос
    // } else {
    return Promise.reject(err);
    // }
  }
};

let promise = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
});

export const requestApiTemplate = (url: string, options?: RequestInit) => {
  return promise.then((res) => {
    switch (url) {
      case "/auth/register":
        return {
          success: true,
          user: user,
        };
      case "/auth/login":
        return {
          success: true,
          user: user,
          // token: token,
        };
      case "/teams":
        return {
          success: true,
          data: teams,
        };

      default:
        break;
    }
    return "error";
  });
};
