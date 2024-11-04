import axios from "axios";

// Function to upload a file to Cloudinary
const upload = async (file)=>{
    const data = new FormData()  // Creating a new FormData object to hold the file data
    data.append("file", file)  // Appending the file to the FormData object
    data.append("upload_preset", "Indeedimg");  // Adding the upload preset for Cloudinary

    try {  // Sending a POST request to Cloudinary to upload the image
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dwpuwodu3/image/upload",
         data
      );
      const {url} = res.data;  // Extracting the URL of the uploaded image from the response
      return url;  // Returning the URL for further use
    } catch (err) {
      console.log(err);  // Logging any errors that occur during the upload process
    }
  };

  export default upload;
 