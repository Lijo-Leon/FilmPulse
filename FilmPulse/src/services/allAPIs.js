import commonAPI from "./commonAPI";
import { serverURL } from "./serverURL";

//Register User
export const registerUserAPI = async (reqBody) => {
  return await commonAPI('POST', `${serverURL}/register`, reqBody, {})
}

export const loginUserAPI = async (reqBody) => {
  return await commonAPI('POST', `${serverURL}/login`, reqBody, {})
}

export const GoogleLoginUserAPI = async (reqBody) => {
  return await commonAPI('POST', `${serverURL}/google-login`, reqBody, {})
}

export const addCameraMovementAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST", `${serverURL}/addCameraMovement`, reqBody, reqHeader);
};

export const getCameraMovementAPI = async (searchKey, reqHeader) => {
  return await commonAPI("GET", `${serverURL}/getCameraMovements?search=${searchKey}`, {}, reqHeader);
};


export const getACameraMovementResultAPI = async (id, reqHeader) => {
  return await commonAPI("GET", `${serverURL}/getACameraMovementResult/${id}`, {}, reqHeader);
};

export const addShotTypeAPI = async (reqBody, reqHeader) => {
  return await commonAPI('POST', `${serverURL}/addShotType`, reqBody, reqHeader)
}

export const getShotTypeAPI = async (searchKey, reqHeader) => {
  return await commonAPI("GET", `${serverURL}/getShotType?search=${searchKey}`, {}, reqHeader);
};

export const getAShotTypeResultAPI = async (id, reqHeader) => {
  return await commonAPI("GET", `${serverURL}/getAShotTypeResult/${id}`, {}, reqHeader);
};

export const getUserListAPI = async (reqHeader) => {
  return await commonAPI('GET', `${serverURL}/getUsersList`, {}, reqHeader)
}

export const getAllTechniqueAPI = async (reqHeader) => {
  return await commonAPI("GET", `${serverURL}/getAllTechniques`, {}, reqHeader);
}



// stripe Checkout session
export const createCheckoutSessionAPI = async (reqHeader) => {
  return await commonAPI("POST",`${serverURL}/create-checkout-session`, {}, reqHeader);
};


// Activate Premium (after successful payment)
export const activatePremiumAPI = async (reqHeader) => {
  return await commonAPI("POST", `${serverURL}/activate-premium`, {}, reqHeader);
};

// Update User Profile
export const updateProfileAPI = async (reqBody, reqHeader) => {
  return await commonAPI("PUT", `${serverURL}/update-profile`, reqBody, reqHeader)
};

// Get Pending Requests - CameraMovements
export const getPendingCMListAPI = async (reqHeader) => {
  return await commonAPI("GET", `${serverURL}/pending-camera-movements`, {}, reqHeader)
};

// Get Pending Requests - ShotTypes
export const getPendingSTListAPI = async (reqHeader) => {
  return await commonAPI("GET", `${serverURL}/pending-shot-types`, {}, reqHeader)
};

// Accept Pending Requests - CameraMovements
export const acceptRequestCMAPI = async (id, reqHeader) => {
  return await commonAPI("PUT", `${serverURL}/approve-camera-movement/${id}`, {}, reqHeader)
};

// Accept Pending Requests - ShotTypes
export const acceptRequestSTAPI = async (id, reqHeader) => {
  return await commonAPI("PUT", `${serverURL}/approve-shot-type/${id}`, {}, reqHeader)
};

// Reject Pending Requests - CameraMovements
export const rejectRequestCMAPI = async (id, reqHeader) => {
  return await commonAPI("PUT", `${serverURL}/reject-camera-movement/${id}`, {}, reqHeader)
};

// Reject Pending Requests - ShotTypes
export const rejectRequestSTAPI = async (id, reqHeader) => {
  return await commonAPI("PUT", `${serverURL}/reject-shot-type/${id}`, {}, reqHeader)
};

// Add to Favourite - CameraMovements
export const addFavCMAPI = async (id, reqHeader) => {
  return await commonAPI("PUT", `${serverURL}/add-fav-cm/${id}`, {}, reqHeader)
};

// Remove from Favourite - CameraMovements
export const removefromFavCMAPI = async (id, reqHeader) => {
  return await commonAPI("PUT", `${serverURL}/remove-fav-cm/${id}`, {}, reqHeader)
};

// GET Favourite - CameraMovements
export const getFavCMAPI = async (reqHeader) => {
  return await commonAPI("GET", `${serverURL}/favourite-camera-movements`, {}, reqHeader)
};

// Add to Favourite - ShotTypes
export const addFavSTAPI = async (id, reqHeader) => {
  return await commonAPI("PUT", `${serverURL}/add-fav-st/${id}`, {}, reqHeader)
};

// Remove from Favourite - ShotTypes
export const removefromFavSTAPI = async (id, reqHeader) => {
  return await commonAPI("PUT", `${serverURL}/remove-fav-st/${id}`, {}, reqHeader)
};

// GET Favourite - CameraMovements
export const getFavSTAPI = async (reqHeader) => {
  return await commonAPI("GET", `${serverURL}/favourite-shot-types`, {}, reqHeader)
};

// GET submitted - CameraMovements
export const getsubmittedCMAPI = async (reqHeader) => {
  return await commonAPI("GET", `${serverURL}/getSubmittedCM`, {}, reqHeader)
};

// GET Approved - CameraMovements
export const getApprovedCMAPI = async (reqHeader) => {
  return await commonAPI("GET", `${serverURL}/getApprovedCM`, {}, reqHeader)
};

// GET Rejected - CameraMovements
export const getRejectedCMAPI = async (reqHeader) => {
  return await commonAPI("GET", `${serverURL}/getRejectedCM`, {}, reqHeader)
};

// GET submitted - ShotTypes
export const getsubmittedSTAPI = async (reqHeader) => {
  return await commonAPI("GET", `${serverURL}/getSubmittedST`, {}, reqHeader)
};

// GET Approved - ShotTypes
export const getApprovedSTAPI = async (reqHeader) => {
  return await commonAPI("GET", `${serverURL}/getApprovedST`, {}, reqHeader)
};

// GET Rejected - ShotTypes
export const getRejectedSTAPI = async (reqHeader) => {
  return await commonAPI("GET", `${serverURL}/getRejectedST`, {}, reqHeader)
};
