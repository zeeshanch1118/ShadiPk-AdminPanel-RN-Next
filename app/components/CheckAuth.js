import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

export const CheckAuth = () => {
   // Retrieve the encrypted data from the cookie
   const encryptedData = Cookies.get("Admin_session");

   if (encryptedData) {
      // Decrypt the data
      const decryptedBytes = CryptoJS.AES.decrypt(
         encryptedData,
         "PK8D@9z$Tj^6LfAAdminShadiPk"
      );
      const decryptedData = JSON.parse(
         decryptedBytes.toString(CryptoJS.enc.Utf8)
      );

      // Check if the necessary authentication information is present
      const isAuthenticated = !!decryptedData?.token;

      if (isAuthenticated) {
         // The user is authenticated
         return {
            isAuthenticated: true,
            id: decryptedData.id,
            token: decryptedData.token,
            registerAs: decryptedData.registerAs,
         };
      }
   }

   // The user is not authenticated
   return {
      isAuthenticated: false,
      id: null,
      token: null,
      registerAs: null,
   };
};
