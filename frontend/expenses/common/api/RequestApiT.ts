import RequestCallT from "@/common/api/RequestCallT";
import ApiStateT from "@/common/api/ApiStateT";

type RequestApiT<T> = ApiStateT<T> & {
  requestCall: RequestCallT<T>;
};

export default RequestApiT;
