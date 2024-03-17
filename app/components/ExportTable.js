import React from "react";
import Image from "next/image";
const Export = ({data}) => {
    return(
    <Image
      src="/fonts/feather-icons/icons/download.svg"
      alt="icon"
      width={20}
      height={20}
      onClick={() => downloadCSV(data)}
      className="cursor-pointer me-7"
    />
  )};
  export default Export

function convertArrayOfObjectsToCSV(array) {
  let result;
  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = Object.keys(array[0]);

  result = "";
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach((item) => {
    let ctr = 0;
    keys.forEach((key) => {
      if (ctr > 0) result += columnDelimiter;
      result += item[key];
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}

function downloadCSV(array) {
  const csv = convertArrayOfObjectsToCSV(array);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", "export.csv");
  link.click();
}