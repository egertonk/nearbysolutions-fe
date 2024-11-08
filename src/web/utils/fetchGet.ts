import { handleError } from "./fetchErrors";

const localHostURL = "http://localhost:8080/api";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PATCH,OPTIONS",
};

const accountId = "49";

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

export const getWrapperWthId = async (endpointName: string, userId: number) => {
  try {
    const response = await fetch(`${localHostURL}/${endpointName}/${userId}`, {
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

// export const getWrapper = async (endpointName: string, body: any) => {
//   try {
//     // Construct query parameters
//     const queryParams = new URLSearchParams();
//     if (body) {
//       Object.keys(body).forEach((key) => {
//         queryParams.append(key, body[key]);
//       });
//     }

//     const response = await fetch(
//       `${localHostURL}/${endpointName}?${queryParams.toString()}`,
//       {
//         method: "GET",
//         headers,
//       }
//     );

//     // Check if the response has a JSON content-type
//     const noJSON = !response.headers
//       .get("content-type")
//       ?.includes("application/json");

//     // Check for error status and handle accordingly
//     if (!response.ok) {
//       await handleError(response, noJSON);
//     }

//     // If no error, return parsed JSON or text data
//     return noJSON ? await response.text() : await response.json();
//   } catch (error) {
//     // Return or throw the error to be handled by the calling code
//     return error;
//   }
// };
