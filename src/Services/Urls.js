//const host ="http://localhost:5000/";
const host="http://3.25.237.189:5000/";
export const SIGNUPUSER = host+"auth/signUp";
export const LOGINUSER = host+"auth/login";
export const GETSHOPSBYCATEGORY =host+"api/getshops?category="
export const GETSERVICES = host+"api/getshopServices?";
export const ADDTOCART=host+"api/provider/addToCart";
export const ADDCONTACT = host+"api/provider/contact"
;export const GETCART = host+"api/getcart?userEmail=";
export const DELETECART = host+"api/provider/removeCart?cartId=";
export const CONFIRMBOOKING=host+"api/provider/checkout";
export const GETBOOKINGS = host+"api/bookings";
export const GETPROVIDERS = host+"api/getProviders";
export const VERIFYPROVIDER = host+"api/provider/profileVerify";export const GET_CONTACTS = host+"api/getcontacts"