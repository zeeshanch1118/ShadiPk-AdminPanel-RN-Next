export function timeAgo(timestamp) {
   const currentTime = new Date();
   const targetTime = new Date(timestamp);

   const timeDifference = currentTime - targetTime;
   const seconds = Math.floor(timeDifference / 1000);
   const minutes = Math.floor(seconds / 60);
   const hours = Math.floor(minutes / 60);
   const days = Math.floor(hours / 24);
   const months = Math.floor(days / 30);

   if (months > 0) {
      return months === 1 ? "1 month ago" : `${months} months ago`;
   } else if (days > 0) {
      return days === 1 ? "1 day ago" : `${days} days ago`;
   } else if (hours > 0) {
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
   } else if (minutes > 0) {
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
   } else {
      return seconds <= 5 ? "just now" : `${seconds} seconds ago`;
   }
}

export function formatDate(inputDate) {
   // Create a Date object from the input date string
   const date = new Date(inputDate);

   // Format the date components
   const day = String(date.getDate()).padStart(2, "0");
   const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
   ];
   const month = monthNames[date.getMonth()];
   const year = date.getFullYear();
   const hours = String(date.getHours()).padStart(2, "0");
   const minutes = String(date.getMinutes()).padStart(2, "0");
   const amOrPm = hours >= 12 ? "PM" : "AM";

   // Convert 24-hour time to 12-hour time
   const hours12 = hours % 12 || 12;

   // Create the formatted date string
   const formattedDate = `${day} ${month} ${year} ${hours12}:${minutes} ${amOrPm}`;

   return formattedDate;
}
