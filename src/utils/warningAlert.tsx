import Swal from "sweetalert2";

function warningAlert(title: string, successFunction: Function) {
  Swal.fire({
    title: title,
    icon: "warning",
    background: "var(--background-primary)",
    color: "var(--text-primary)",
    iconColor: "var(--text-primary)",
    showCancelButton: true,
    confirmButtonColor: "var(--accent)",
    cancelButtonColor: "var(--background-secondary)",
    confirmButtonText: "Yes, delete",
  }).then((result) => {
    if (result.isConfirmed) {
      successFunction();
    }
  });
}

export default warningAlert;
