import axios from "axios";
import {
  ADDPROVIDERS,
  GETSHOPSBYCATEGORY,
  GETSERVICES,
  ADDSERVICE,
  LOGINUSER,
  UPDATESERVICE,
  GETBOOKINGS,
  SIGNUPUSER,
} from "./Urls";

export const ProviderAdd = (data) => {
  return axios.post(ADDPROVIDERS, data).then((res) => {
    console.log(res);
    return res;
  });
};
export const AddService = (data) => {
  return axios.post(ADDSERVICE, data).then((res) => {
    console.log(res);
    return res;
  });
};

export const LoginApi = (data) => {
  return axios.post(LOGINUSER, data).then((res) => {
    console.log(res);
    return res;
  });
};

export const getServices = async (data) => {
  const res = await axios.get(GETSERVICES + data);
  return res;
};
export const getbookings = async (data) => {
  console.log(data,"dd")
  const res = await axios.get(GETBOOKINGS+"?shopEmail="+ data);
  return res;
};
export const UpdateService = (data) => {
  return axios.put(UPDATESERVICE, data).then((res) => {
    console.log(res);
    return res;
  });
};

export const signUpApi = (data) => {
  return axios.post(SIGNUPUSER, data).then((res) => {
    console.log(res);
    return res;
  });
};