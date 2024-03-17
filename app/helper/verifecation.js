export function removeCountryAndAreaCode(
   inputPhoneNumber,
   countryCode,
   areaCode
) {
   if (inputPhoneNumber && countryCode) {
      var cleanedPhoneNumber = inputPhoneNumber.replace(/^\+/, ""); // Remove any leading '+'

      // Remove the selected country code
      while (cleanedPhoneNumber.startsWith(countryCode)) {
         cleanedPhoneNumber = cleanedPhoneNumber.substring(countryCode.length);
      }

      if (cleanedPhoneNumber.startsWith(areaCode)) {
         cleanedPhoneNumber = cleanedPhoneNumber.replace(areaCode, "");
      }

      return cleanedPhoneNumber;
   } else {
      return "";
   }
}
