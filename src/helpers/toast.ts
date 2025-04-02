import { toast } from 'react-toastify';

export const showToast = (message: string, type: 'success' | 'error' = 'error') => {
    if (type === 'success') {
        toast.success(message);
    } else {
        toast.error(message);
    }
};