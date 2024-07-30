import axios from "axios";
import { GETSHOPSBYCATEGORY ,GETSERVICES, ADDTOCART, LOGINUSER, SIGNUPUSER, GETCART, DELETECART, CONFIRMBOOKING, GETBOOKINGS, GETPROVIDERS, VERIFYPROVIDER, GET_CONTACTS, ADDCONTACT } from "./Urls";

export const GetShops = async (data) => {
    const res = await axios.get(GETSHOPSBYCATEGORY+data);
    return res;
  };

  export const getServices= async (data) => {const res = await axios.get(GETSERVICES+data);
    return res
  }
  export const getProviders= async (data) => {
    const req = data?data:""
    const res = await axios.get(GETPROVIDERS+req);
    return res
  }
  export const getbookings = async (data) => {
    console.log(data,"dd")
    const res = await axios.get(GETBOOKINGS);
    return res;
  };
  export const getcart= async (data) => {const res = await axios.get(GETCART+data);
    return res
  }
  export const getcontacts= async () => {const res = await axios.get(GET_CONTACTS);
    return res
  }
  export const LoginApi = (data) => {
    return axios.post(LOGINUSER, data).then((res) => {
      console.log(res);
      return res;
    });
  };
  export const addcart= async (data) => {const res = await axios.post(ADDTOCART,data);
    return res
  }
  export const addcontact= async (data) => {const res = await axios.post(ADDCONTACT,data);
    return res
  }
  export const checkout= async (data) => {const res = await axios.post(CONFIRMBOOKING,data);
    return res
  }
  export const signUpApi = (data) => {
    return axios.post(SIGNUPUSER, data).then((res) => {
      console.log(res);
      return res;
    });
  };

  export const deleteCart = async (data) => {const res = await axios.delete(DELETECART+data);
    return res
  }
  export const verifyprovider = (data) => {
    return axios.put(VERIFYPROVIDER, data).then((res) => {
      console.log(res);
      return res;
    });
  };