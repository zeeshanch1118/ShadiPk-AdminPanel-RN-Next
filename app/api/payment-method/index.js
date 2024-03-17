import { baseURL } from "../BaseURL";
export const getPaymentMethods = async (
   accessToken,
   paramPage,
   paramTitle,
   paramDescription,
   paramCategory,
   paramStatus,
   rows
) => {
   try {
      const params = {
         page: paramPage,
         title: paramTitle ?? "",
         description: paramDescription ?? "",
         category: paramCategory ?? "",
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
      const url = `${baseURL}/get-payment-method?${queryString}`;

      console.log("url", url);
      const response = await fetch(url, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
         },
      });
      const result = await response.json();
      // console.log("res", result);
      return result;
   } catch (e) {
      throw e;
   }
};
export const addUpdatePaymentMethod = async (
   token,
   title,
   description,
   selectedImage,
   categoryStatus,
   orderID,
   type,
   selectedCategory,
   paymentMethodID
) => {
   try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      // myHeaders.append("Cookie", "PHPSESSID=878957506d38c43e6968a16513b3aa8c");

      var formdata = new FormData();
      var requestUrl = "";
      formdata.append("title", title);
      formdata.append("category", selectedCategory);
      formdata.append("description", description);
      formdata.append("image_icon", selectedImage);
      formdata.append("status", categoryStatus);
      formdata.append("order", orderID);
      if (type === "add") {
         requestUrl = "add-payment-method";
      } else {
         requestUrl = `update-payment-method/${paymentMethodID}`;
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
export const TrashPaymentMethod = async (accessToken, id) => {
   try {
      const response = await fetch(`${baseURL}/delete-payment-method/${id}`, {
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
