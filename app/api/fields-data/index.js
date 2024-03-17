import { baseURL } from "../BaseURL";
export const getConfigOpts = async () => {
   try {
      const response = await fetch(`${baseURL}/config-options`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
         },
      });
      const result = await response.json();
      return result;
   } catch (e) {
      throw e;
   }
};

export const getAllStates = async (id) => {
   try {
      const response = await fetch(`${baseURL}/country-states/${id}`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
         },
      });
      const result = await response.json();
      return result;
   } catch (e) {
      throw e;
   }
};

export const getAllCities = async (id) => {
   try {
      const response = await fetch(`${baseURL}/state-cities/${id}`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
         },
      });
      const result = await response.json();
      return result;
   } catch (e) {
      throw e;
   }
};

export const getSectOpts = async (id) => {
   try {
      const response = await fetch(`${baseURL}/sects/${id}`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
         },
      });
      const result = await response.json();
      return result;
   } catch (e) {
      throw e;
   }
};
export const ReportsOptions = async (accessToken) => {
   try {
      const response = await fetch(`${baseURL}/report/report`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer" + " " + accessToken,
         },
      });

      const result = await response.json();
      return result;
   } catch (error) {
      console.log(error);
   }
};
export const ReportsUser = async (
   accessToken,
   value,
   userID,
   reportDescription
) => {
   try {
      // const formData = new FormData();
      // console.log(accessToken, value, userID, reportDescription);
      // formData.append("report_reason", value);
      // formData.append("reportable_id", userID);
      // formData.append("discription", reportDescription);

      // console.log("formData", formData);
      const response = await fetch(`${baseURL}/report/send_report`, {
         method: "POST",
         headers: {
            // "Content-Type": "multipart/form-data",
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer" + " " + accessToken,
         },
         body: JSON.stringify({
            report_reason: value,
            reportable_id: userID,
            discription: reportDescription,
         }),
      });

      const result = await response.json();
      return result;
   } catch (error) {
      console.log(error);
   }
};
export const getStatesByCountryIds = async (ids) => {
   try {
      const response = await fetch(`${baseURL}/get-country-states`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            country_ids: ids,
         }),
      });
      const result = await response.json();
      return result;
   } catch (e) {
      throw e;
   }
};

export const getCitiesByStateIds = async (ids) => {
   try {
      const response = await fetch(`${baseURL}/get-state-cities`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            state_ids: ids,
         }),
      });
      const result = await response.json();
      return result;
   } catch (e) {
      throw e;
   }
};
