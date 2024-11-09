// import axios from "axios";

// // Creating an Axios instance with a custom configuration
// const newRequest = axios.create({
//     baseURL:"https://freelance-capstoneproject-backend.onrender.com/api/", // Setting the base URL for API requests
//     withCredentials: true,  // Enabling the inclusion of credentials (like cookies) in cross-site requests
// });

// export default newRequest;  

import axios from "axios";

const newRequest = axios.create({
    baseURL: "https://freelance-capstoneproject-backend.onrender.com/api/",
});

// Add a request interceptor to include the token
newRequest.interceptors.request.use(
    (config) => {
        // Retrieve the token from localStorage
        const token = localStorage.getItem("accessToken");

        // If token is available, add it to the headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn("No access token found in localStorage.");
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default newRequest;

