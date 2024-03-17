import { baseURL } from "../BaseURL";
export const getPackages = async (accessToken) => {
   try {
      const response = await fetch(`${baseURL}/get_packages`, {
         method: "GET",
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
export const getPromotionTypes = async (accessToken) => {
   try {
      const response = await fetch(`${baseURL}/promotion_types`, {
         method: "GET",
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
export const getPromotionConnects = async (accessToken) => {
   try {
      const response = await fetch(`${baseURL}/get-addon-connects`, {
         method: "GET",
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
export const getPromotions = async (
   accessToken,
   paramPage,
   paramTitle,
   paramDescription,
   paramStatus,
   rows
) => {
   try {
      const params = {
         page: paramPage,
         title: paramTitle ?? "",
         description: paramDescription ?? "",
         no_of_rows: rows,
         status:
            paramStatus === "Deactive"
               ? "inactive"
               : paramStatus
               ? paramStatus.toLowerCase()
               : null,
      };

      // Remove keys with falsy values
      const filteredParams = Object.fromEntries(
         Object.entries(params).filter(
            ([_, value]) =>
               value !== null && value !== undefined && value !== ""
         )
      );

      const queryString = new URLSearchParams(filteredParams).toString();
      const url = `${baseURL}/get-promotions?${queryString}`;
      const response = await fetch(url, {
         method: "GET",
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
export const addUpdatePromotions = async (
   token,
   title,
   description,
   selectedImage,
   categoryStatus,
   type,
   typeID,
   selectedCategory,
   actionType,
   promotionID
) => {
   try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      var formdata = new FormData();
      var requestUrl = "";
      formdata.append("title", title);
      formdata.append("type", type);
      formdata.append("type_id", typeID);
      formdata.append("category", selectedCategory);
      formdata.append("description", description);
      formdata.append("image_icon", selectedImage);
      formdata.append("status", categoryStatus);
      if (actionType == "add") {
         requestUrl = "add-promotion";
      } else {
         requestUrl = `update-promotion/${promotionID}`;
      }
      var requestOptions = {
         method: "POST",
         headers: myHeaders,
         body: formdata,
         redirect: "follow",
      };

      return fetch(`${baseURL}/${requestUrl}`, requestOptions)
         .then((response) => response.text())
         .then((result) => result)
         .catch((error) => console.log("error", error));
   } catch (e) {
      throw e;
   }
};
export const TrashPromotions = async (accessToken, id) => {
   try {
      const response = await fetch(`${baseURL}/delete-promotion/${id}`, {
         method: "DELETE",
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
