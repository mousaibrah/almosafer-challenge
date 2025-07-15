import { endpoints } from '../endpoints';
import { useApi } from '../useApi';

type UploadImageResponse = {
  id: number;
  url: string;
  blur_hashed_url: string;
};

const useUploadImage = (onSuccess?: (data: UploadImageResponse) => void) => {
  const { mutateAsync: uploadImage, isMutationLoading } = useApi(endpoints.uploadImage, 'POST', {
    isMultipart: true,
    onSuccess,
  });

  return { uploadImage, isMutationLoading };
};

export default useUploadImage;
