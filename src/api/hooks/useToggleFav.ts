import { useApi } from '../useApi';
import { endpoints } from '../endpoints';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { ApiResponse } from '../types/authTypes';
const useToggleFavorite = (id: number) => {
  const t = useTranslations();
  const { mutateAsync: toggleFavorite, isMutationLoading } = useApi<
    ApiResponse<{
      message: string;
      status_code: number;
    }>
  >(endpoints.toggleFavorite(id), 'POST', {
    onSuccess: (data) => {
      toast.success(t(data?.message));
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
  return { toggleFavorite, isMutationLoading };
};

export default useToggleFavorite;
