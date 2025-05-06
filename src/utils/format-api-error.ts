import type { AxiosError } from "axios";

export type ApiRequestError = {
  error: {
    message: string;
  };
};

export const formatAPIError = (error: AxiosError<ApiRequestError>) => {
  /**
   * The request was made and the server responded with a status code
   * that falls out of the range of 2xx
   */
  if (error.response) {
    return error.response.data.error.message;
  }

  /* The request was made but no response was received
   * `error.request` is an instance of XMLHttpRequest in the browser and an instance of
   * http.ClientRequest in node.js
   */
  if (error.request) {
    return "Oops! We couldn’t complete your request. Try again shortly.";
  }

  // Something happened in setting up the request that triggered an Error
  return "Error, check your internet connection or try again.";
};
