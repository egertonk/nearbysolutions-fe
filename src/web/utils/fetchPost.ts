import { handleError } from "./fetchErrors";

const localHostURL = "http://localhost:8080/api/";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PATCH,OPTIONS",
};

export const getWrapper = async (endpointName: string) => {
  try {
    const response = await fetch(`${localHostURL}/${endpointName}`, {
      method: "GET",
      headers,
    });

    // Check if the response has a JSON content-type
    const noJSON = !response.headers
      .get("content-type")
      ?.includes("application/json");

    // Check for error status and handle accordingly
    if (!response.ok) {
      await handleError(response, noJSON);
    }

    // If no error, return parsed JSON or text data
    return noJSON ? await response.text() : await response.json();
  } catch (error) {
    // Return or throw the error to be handled by the calling code
    return error;
  }
};
