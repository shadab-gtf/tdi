export interface RejectPayload {
  status: number | null;
  message: string;
  data?: unknown;
}

interface ErrorHandlerOptions {
  toastMessage?: string;
  onUnauthorized?: () => void;
}

let isUnauthorizedHandled = false;

export function handleApiError(
  error: any,
  options: ErrorHandlerOptions = {},
): RejectPayload {
  const { toastMessage, onUnauthorized } = options;

  if (typeof window !== "undefined") {
    import("react-toastify").then(({ toast }) => {
      if (toastMessage) {
        toast.error(toastMessage);
      }
    });
  }

  if (!error?.response) {
    return {
      status: null,
      message: "Network error. Please check your internet connection.",
    };
  }

  const status: number = error.response.status;

  const backendMessage: string =
    error?.response?.data?.message || error?.message || "Something went wrong";

  switch (status) {
    case 400:
      return {
        status,
        message: backendMessage || "Bad request",
        data: error.response.data,
      };

    case 401:
      if (!isUnauthorizedHandled) {
        isUnauthorizedHandled = true;
        onUnauthorized?.();
        setTimeout(() => {
          isUnauthorizedHandled = false;
        }, 500);
      }
      return {
        status,
        message: "Session expired. Please login again.",
        data: error.response.data,
      };

    case 403:
      return {
        status,
        message: "You are not authorized to perform this action.",
        data: error.response.data,
      };

    case 404:
      return {
        status,
        message: "Requested resource not found.",
        data: error.response.data,
      };

    case 409:
      return {
        status,
        message: backendMessage || "Conflict occurred.",
        data: error.response.data,
      };

    case 422:
      return {
        status,
        message: backendMessage || "Validation error.",
        data: error.response.data,
      };

    case 500:
      return {
        status,
        message: "Internal server error.",
        data: error.response.data,
      };

    default:
      return {
        status,
        message: backendMessage,
        data: error.response.data,
      };
  }
}
