import PostCallT from "@/common/api/PostCallT";

type PostResponse<T> = {
  data: T | null;
  postRequest: PostCallT<T>;
  isLoading: boolean;
  error: Error | null;
};

export default PostResponse;
