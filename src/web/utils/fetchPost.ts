import { useMutation, useQueryClient } from "@tanstack/react-query";

const localHostURL = "http://localhost:3000"; // Update with your actual API URL
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PATCH,OPTIONS",
};

export const useAdddMutation = () => {
  const queryClient = useQueryClient();

  const useAddd = useMutation({
    mutationFn: ({
      endpointName,
      body,
    }: {
      endpointName: string;
      body: object;
    }) => addd(endpointName, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fafa"] });
    },
    onError: (error) => {
      console.error("Mutation Error:", error);
    },
  });

  return {
    useAddd,
  };
};

export const addd = async (endpointName: string, body: object) => {
  return await postWrapper(endpointName, body);
};

export const postWrapper = async (endpointName: string, body: object) => {
  try {
    const response = await fetch(`${localHostURL}/${endpointName}`, {
      method: "POST",
      headers,
      mode: "cors",
      body: JSON.stringify(body),
    });

    const noJSON = !response.headers
      .get("content-type")
      ?.includes("application/json");

    if (!response.ok) {
      await handleError(response, noJSON);
    }

    return noJSON ? await response.text() : await response.json();
  } catch (error) {
    console.error("Post Wrapper Error:", error);
    throw error;
  }
};

// Helper function for handling errors
const handleError = async (response: Response, noJSON: boolean) => {
  const errorData = noJSON ? await response.text() : await response.json();
  throw new Error(
    `Error ${response.status}: ${
      response.statusText
    }. Response: ${JSON.stringify(errorData)}`
  );
};
