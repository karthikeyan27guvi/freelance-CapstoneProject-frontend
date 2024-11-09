// import axios from "axios";

// // Creating an Axios instance with a custom configuration
// const newRequest = axios.create({
//     baseURL:"https://freelance-capstoneproject-backend.onrender.com/api/", // Setting the base URL for API requests
//     withCredentials: true,  // Enabling the inclusion of credentials (like cookies) in cross-site requests
// });

// export default newRequest;  

import axios from "axios";

// Retrieve the token from localStorage (or another secure storage location)
const token = localStorage.getItem("accessToken");

// Creating an Axios instance with a custom configuration
const newRequest = axios.create({
    baseURL: "https://freelance-capstoneproject-backend.onrender.com/api/", // Setting the base URL for API requests
    headers: {
        Authorization: `Bearer ${token}` // Adding the Bearer token to the Authorization header
    }
});

export default newRequest;
