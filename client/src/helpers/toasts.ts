import { toast } from 'react-hot-toast';

export const toastSuccess = (message: string) => {
    toast.success(message);
};