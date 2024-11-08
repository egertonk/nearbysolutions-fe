export const handleError = async (data: Response, noJSON: boolean) => {
  try {
    // Handle different status codes with specific error messages
    switch (data.status) {
      case 400:
        throw new Error("Invalid request: please check your data.");
      case 401:
        throw new Error("Unauthorized: please log in and try again.");
      case 403:
        throw new Error("Forbidden: you don’t have permission to access this.");
      case 404:
        throw new Error("Not found: the resource could not be found.");
      case 500:
        throw new Error("Server error: please try again later.");
      default:
        throw new Error(
          "An unexpected error occurred. Please reach out to support."
        );
    }
  } catch (error) {
    // Check if it's a JSON parse error
    if (error instanceof SyntaxError) {
      throw new Error(
        "Error processing response: please reach out to support."
      );
    } else {
      // For other network errors
      throw error;
    }
  }
};
