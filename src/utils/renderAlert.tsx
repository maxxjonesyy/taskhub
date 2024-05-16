import Swal, { SweetAlertIcon } from "sweetalert2";

function renderAlert(icon: SweetAlertIcon, message: string) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    background: "#292929",
    color: "#d8d8d8",
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: icon,
    title: message,
  });
}

export default renderAlert;
