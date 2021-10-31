import axios from "axios";

const BASE_URL = "https://ecommerce-api-bookstore.herokuapp.com/api/";
let TOKEN = "";

if (JSON.parse(localStorage.getItem("persist:root"))?.user){
  let userdetails = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)

  if (userdetails?.currentUser?.accessToken){
    TOKEN = userdetails.currentUser.accessToken
  }
}
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});