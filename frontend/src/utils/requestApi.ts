import { IResponse } from "./types";
import { user, token, teams } from "./mockData";

const API_URL = "https://norma.nomoreparties.space/api";
const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const requestApi = <T extends IResponse>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  return fetch(API_URL + url, options)
    .then((res) => {
      return checkResponse<T>(res);
    })
    .then((data) => {
      if (!data.success) {
        return Promise.reject(`${data.message}`);
      }
      return data;
    });
};

let promise = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
});

export const requestApiTemplate = (url: string, options?: RequestInit) => {
  console.log("requestApiTemplate", url, options);
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
          token: token,
        };
      case "/teams":
        return {
          success: true,
          data: teams
        };

      default:
        break;
    }
    return "error";
  });
};
