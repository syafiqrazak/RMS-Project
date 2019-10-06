import axios from "axios";

const url = "http://192.168.193.236:3000/leave/"; //for production use localhost:3000

let axiosConfig = {
  cors: "same-origin",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://192.168.193.236:3000/',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
  }
}

class leave {
  static show_all_leave() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}all`, axiosConfig);
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static show_own_leave() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}`);
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static report(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}`, {
          id
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static add_leave(date_from, date_to, reason) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}add_leave`, {
          date_from,
          date_to,
          reason
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static upd_leave(leave_id, date_to, date_from, reason) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}${leave_id}/upd_leave`, {
          date_from,
          date_to,
          reason
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static del_leave(leave_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.delete(`${url}${leave_id}/del_leave`);
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static approve_leave(leave_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}${leave_id}/upd`);
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default leave;
