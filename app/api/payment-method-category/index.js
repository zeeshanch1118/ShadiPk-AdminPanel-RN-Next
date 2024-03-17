import { baseURL } from "../BaseURL";
export const getCategories = async (
   accessToken,
   paramPage,
   paramTitle,
   paramDescription,
   paramStatus
) => {
   try {
      const params = {
         page: paramPage === 0 ? 1 : paramPage ?? "",
         title: paramTitle ?? "",
         description: paramDescription ?? "",
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
      const url = `${baseURL}/get-payment-method-categories?${queryString}`;

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

export const addUpdateCategory = async (
   token,
   title,
   description,
   icon,
   categoryStatus,
   order,
   type,
   categoryID
) => {
   try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      // myHeaders.append("Cookie", "PHPSESSID=878957506d38c43e6968a16513b3aa8c");

      var formdata = new FormData();
      var requestUrl = "";
      formdata.append("category", title);
      formdata.append("description", description);
      formdata.append("image_icon", icon);
      formdata.append("status", categoryStatus);
      formdata.append("order", order);
      if (type === "add") {
         requestUrl = "add-payment-method-category";
      } else {
         requestUrl = `update-payment-method-category/${categoryID}`;
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

export const TrashCategory = async (accessToken, id) => {
   try {
      const response = await fetch(
         `${baseURL}/delete-payment-method-category/${id}`,
         {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json",
               Accept: "application/json",
               Authorization: "Bearer" + " " + accessToken,
            },
         }
      );
      const result = await response.json();
      return result;
   } catch (e) {
      throw e;
   }
};
