import type { AxiosError } from "axios";

export default function extractErrors(obj: AxiosError) : string[]{
  const data = obj.response?.data as ErrorResponse;
  const err = data.errors;
  let messageWithErrors: string[] = [];

  for(const field in err){
    const messageWithFields = err[field].map(errorMessage => `${field}: ${errorMessage}`);
    messageWithErrors = [...messageWithErrors, ...messageWithFields]
  }
  return messageWithErrors;
}

interface ErrorResponse {
  errors: {
    [filed: string]: string[]
  }
}