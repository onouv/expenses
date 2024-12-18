import ApiStateT from "@/common/api/ApiStateT";

export type ReadRequestCallT<T> = () => Promise<T>;

export type ReadApiT<T> = ApiStateT<T> & {
  requestCall: ReadRequestCallT<T>;
};
