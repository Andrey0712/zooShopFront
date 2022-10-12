import axios from "axios";

export const urlBackend = 'https://zooshop.stefastudio.click/';

//export const urlBackend = 'http://localhost:5000/';
export default axios.create({
  baseURL: `${urlBackend}`,
  headers: {
    "Content-type": "application/json"
  }
});




