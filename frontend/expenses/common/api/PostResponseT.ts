import PostCallT from "@/common/api/PostCallT";

type PostResponse<T> = {
  data: T | undefined;
  postRequest: PostCallT<T>;
  isLoading: boolean;
  error: Error | undefined;
};

export default PostResponse;
