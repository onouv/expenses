type ApiStateT<T> = {
  data?: T | null;
  isSaving: boolean;
  isSuccessful?: boolean;
  error: Error | null;
};

export default ApiStateT;
