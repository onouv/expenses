type ApiStateT<T> = {
  response?: T | null;
  isLoading: boolean;
  isSuccessful?: boolean;
  error: Error | null;
};

export default ApiStateT;
