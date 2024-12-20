type ApiStateT<T> = {
  data?: T | null;
  isLoading: boolean;
  isSuccessful?: boolean;
  error: Error | null;
};

export default ApiStateT;
