import { handleError } from "./fetchErrors";

export const localHostURL = "http://localhost:8080/api";

export const headers = {
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

export const getHomePageWrapper = async (endpointName: string) => {
  try {
    const response = await fetch(`${localHostURL}/${endpointName}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) throw new Error("Failed to fetch data");

    const data = await response.json();
    return data.content;
  } catch (error) {
    return error;
  }
};

export const getWrapperSearchTerm = async (
  endpointName: string,
  searchTerm: string
) => {
  try {
    const response = await fetch(
      `${localHostURL}/${endpointName}/search?name=${searchTerm}`,
      {
        method: "GET",
        headers,
      }
    );

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

// export const getWrapperWithPayload = async (
//   endpointName: string,
//   id: number,
//   userId: number,
//   posterId: number
// ) => {
//   try {
//     const response = await fetch(`${localHostURL}/${endpointName}`, {
//       method: "GET",
//       headers,
//       body: JSON.stringify({
//         orderId: id,
//         userId,
//         posterId,
//       }),
//     });
//     console.log("Response:", response);
//     const noJSON = !response.headers
//       .get("content-type")
//       ?.includes("application/json");

//     if (!response.ok) {
//       await handleError(response, noJSON);
//     }

//     return noJSON ? await response.text() : await response.json();
//   } catch (error) {
//     return error;
//   }
// };
export const getWrapperWithPayload = async (endpointName: string) => {
  const url = `${localHostURL}/${endpointName}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return error;
  }
};

export const getWrapperDataWithIds = async (
  endpointName: string,
  solutionistId: number,
  skillId: number
) => {
  try {
    const response = await fetch(
      `${localHostURL}/${endpointName}/${solutionistId}/${skillId}`,
      {
        method: "GET",
        headers,
      }
    );

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

export const getWrapperWthIds = async (
  endpointName: string,
  userId: number,
  toolId: number
) => {
  const url = `${localHostURL}/${endpointName}/${toolId}/${userId}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data fetched:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
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
