import jobSearchListImage from "../../assets/images/customer-job-requests.jpeg";

const CORS_PROXY = "https://corsproxy.io/?"; // Use a public CORS proxy

const checkImageExists = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: "HEAD" });

    // If request is OK, return true
    if (response.ok) return true;

    // If request fails due to CORS, try proxy
    console.warn(`CORS blocked, retrying via proxy: ${url}`);
    const proxyResponse = await fetch(
      `${CORS_PROXY}${encodeURIComponent(url)}`,
      { method: "HEAD" }
    );

    return proxyResponse.ok;
  } catch (error) {
    console.error("Error fetching image:", error);
    return false;
  }
};

// Function to load and validate image existence
export const getValidImage = async (imageJson?: string): Promise<string> => {
  // console.log("Error imageJson:", imageJson);
  if (!imageJson) return jobSearchListImage;
  // console.log("pass Error imageJson:", imageJson);
  try {
    const imagesArray: string[] = JSON.parse(imageJson);
    console.log("pass imagesArray:", imagesArray);
    if (imagesArray.length > 0) {
      // const isValid = await checkImageExists(imagesArray[0]); Check to seed why it is failing
      const isValid = true;
      console.log("pass isValid:", imagesArray[0]);
      return isValid ? imagesArray[0] : jobSearchListImage;
    }
  } catch (error) {
    console.error("Error parsing images JSON:", error);
  }

  return jobSearchListImage;
};
