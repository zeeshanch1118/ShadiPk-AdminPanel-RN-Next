export function RequestDaysCount(request) {
   if (request?.length > 0) {
      const connectItem = request.find((item) => item?.type === "connect");

      if (connectItem?.created_at) {
         const startDate = new Date(connectItem.created_at);
         const currentDate = new Date();
         const timeDifference = currentDate - startDate;
         const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
         return daysPassed;
      } else {
         return null;
      }
   } else {
      return null;
   }
}
