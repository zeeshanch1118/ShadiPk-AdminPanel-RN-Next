import { baseURL } from "../BaseURL";
export const adminLogIn = async (email, password) => {
   try {
      const response = await fetch(`${baseURL}/login`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
         },
         body: JSON.stringify({
            email: email,
            password: password,
         }),
      });

      const result = await response.json();
      return result;
   } catch (e) {
      throw e;
   }
};

export const logoutUser = async (accessToken) => {
   try {
      const response = await fetch(`${baseURL}/logout`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer" + " " + accessToken,
         },
      });

      const result = await response.json();
      return result;
   } catch (e) {
      throw e;
   }
};

export const createUser = async (
   firstName,
   lastName,
   password,
   confirmPassword,
   mailID,
   selectedMainProfileFor,
   selectedCountry,
   selectedCity,
   selectedState,
   DBPhoneNumber,
   countryCode,
   flagPhoneNumber
) => {
   try {
      const response = await fetch(`${baseURL}/register`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
         },
         body: JSON.stringify({
            role_id: selectedMainProfileFor?.value,
            first_name: firstName,
            last_name: lastName,
            country_living: selectedCountry?.value,
            state_living: selectedState?.value,
            city_living: selectedCity?.value,
            email: mailID,
            mobile_no: DBPhoneNumber,
            mobile_no_country_code: countryCode,
            password: password,
            password_confirmation: confirmPassword,
            account_mobile_slug: flagPhoneNumber,
         }),
      });

      const result = await response.json();
      return result;
   } catch (e) {
      throw e;
   }
};