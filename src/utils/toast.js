import toast from "react-hot-toast";

export const showSuccess = (message = "Success") => {
  toast.success(message);
};

export const showError = (message = "Something went wrong") => {
  toast.error(message);
};