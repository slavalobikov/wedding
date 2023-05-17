import { toast, Flip, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const toastDefaultConfig = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
}

const toastPendingConfig = {
  ...toastDefaultConfig,
  autoClose: false,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: false,
}
const toastSuccessConfig = {
  ...toastDefaultConfig,
  transition: Flip,
  delay: 1000,
}
const toastErrorConfig = {
  ...toastDefaultConfig,
  transition: Flip,
  type: 'error',
  delay: 1000,
}

export const createToast = (promise, pendingText, successText) => {
  toast.promise(
    promise,
    {
      pending: { ...toastPendingConfig, render: `👀 ${pendingText}` },
      success: { ...toastSuccessConfig, render: `🥳 ${successText}` },
      error: { ...toastErrorConfig, render: 'Something wents wrong 🤯' },
    }
  )
}