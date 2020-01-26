import axios from "axios";
import { CONST } from "./const";
const url = CONST.CONST_URL.concat("admin/");

class admin {
  static get_all_user() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}get_all`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static new_user(userObj) {
    alert("new_user");
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}new_user`,
          {
            userObj
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

  static new_admin(userObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}admin_add`,
          {
            userObj
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

  static get_user(userObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}${userObj._id}/get`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static del_user(userObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.delete(`${url}${userObj._id}/del_user`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static upd_tier(userObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}${userObj._id}/upd_tier`,
          {
            userObj
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

  static random_password(userObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}${userObj}/rndpass`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default admin;
