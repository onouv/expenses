import ApiStateT from "@/common/api/ApiStateT";

export type WriteRequestCallT<T> = (data: T) => Promise<void>;

export type WriteApiT<T> = ApiStateT<T> & {
  requestCall: WriteRequestCallT<T>;
};
