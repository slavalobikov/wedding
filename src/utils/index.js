import { toast, Flip, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastDefaultConfig = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
  transition: Bounce,
};

const toastPendingConfig = {
  ...toastDefaultConfig,
  autoClose: false,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: false,
};
const toastSuccessConfig = {
  ...toastDefaultConfig,
  transition: Flip,
  delay: 1000,
};
const toastErrorConfig = {
  ...toastDefaultConfig,
  transition: Flip,
  type: 'error',
  delay: 1000,
};

export const createToast = (promise, pendingText, successText, onPending, onSuccess) => {
  toast.promise(promise, {
    pending: { ...toastPendingConfig, render: `👀 ${pendingText}` },
    success: { ...toastSuccessConfig, render: `🥳 ${successText}` },
    error: { ...toastErrorConfig, render: 'Something wents wrong 🤯' },
  });

  const unsubscribe = toast.onChange((payload) => {
    switch (payload.status) {
      case 'added':
        onPending && onPending();
        break;
      case 'updated':
        onSuccess && onSuccess();
        break;
      case 'removed':
        unsubscribe();
        break;
    }
  });
};

const deepEqual = (objA, objB, map = new WeakMap()) => {
  // P1
  if (Object.is(objA, objB)) return true;

  // P2
  if (objA instanceof Date && objB instanceof Date) {
    return objA.getTime() === objB.getTime();
  }
  if (objA instanceof RegExp && objB instanceof RegExp) {
    return objA.toString() === objB.toString();
  }

  // P3
  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  // P4
  if (map.get(objA) === objB) return true;
  map.set(objA, objB);

  // P5
  const keysA = Reflect.ownKeys(objA);
  const keysB = Reflect.ownKeys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i++) {
    if (!Reflect.has(objB, keysA[i]) || !deepEqual(objA[keysA[i]], objB[keysA[i]], map)) {
      return false;
    }
  }

  return true;
};

export const arrayEquals = (a, b) => {
  return (
    Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => deepEqual(val, b[index]))
  );
};
