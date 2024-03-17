import Swal from "sweetalert2";

export const showAlert = (message, showIcon, cancelBtn, title) => {
   return Swal.fire({
      title: title ? title : false,
      text: message,
      icon: showIcon,
      // timer: 5000,
      confirmButtonColor: "#ca2d2c",
      confirmButtonText: "Ok",
      showCancelButton: cancelBtn ? true : false,
   });
};
export const showToast = (message, showIcon, position) => {
   const Toast = Swal.mixin({
      toast: true,
      width: 500,
      position: position,
      showConfirmButton: false,
      timer: 2500,
      customClass: {
         container: "custom-toast-container",
      },
      timerProgressBar: true,
      didOpen: (toast) => {
         toast.addEventListener("mouseenter", Swal.stopTimer);
         toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
   });

   Toast.fire({
      icon: showIcon,
      title: message,
   });
};
export const showConfirmationAlert = async (
   message,
   showIcon,
   confirmBtnText,
   rejectBtnText,
   rejection
) => {
   return await Swal.fire({
      html: rejection
         ? `<div style="text-align: left;"><b>Reason for rejection:</b> ${message}</div>`
         : message,
      icon: showIcon,
      showCancelButton: true,
      confirmButtonColor: "#ca2d2c",
      cancelButtonColor: "#7e8299",
      cancelButtonText: rejectBtnText ? rejectBtnText : "Cancel",
      confirmButtonText: confirmBtnText ? confirmBtnText : "Yes",
      reverseButtons: true,
      allowOutsideClick: false,
      showClass: {
         popup: "swal2-noanimation",
         backdrop: "swal2-noanimation",
         icon: "swal2-noanimation",
      },
      hideClass: {
         popup: "",
         backdrop: "",
         icon: "",
      },
   });
};
