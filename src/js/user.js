import axios from "axios";
import { CONST } from "./const";
const url = CONST.CONST_URL;

class user {
  static login(username, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}login`,
          {
            username,
            password
          },
          {
            withCredentials: true
          }
        );
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static check_logged() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}check_logged`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static logout() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}logout`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static notifications() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}count`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default user;
