import React, { useState, useReducer } from 'react'
import './Add.css'
import { gigReducer, INITIAL_STATE } from '../../reducers/gigReducer';
import upload from '../../utils/upload.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest.js';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);  // State for storing a single cover image file
  const [files, setFiles] = useState([]);  // State for storing multiple image files
  const [uploading, setUploading] = useState(false);  // State to indicate if files are being uploaded


  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);  // Using reducer to manage gig form state
  
  const handleChange = (e)=>{
    dispatch({
      type: "CHANGE_INPUT",  // Action type for input change
      payload: {name: e.target.name, value: e.target.value},  // Payload containing input name and value
    });
  };

  // Handler for adding features to the gig
  const handleFeature = (e)=>{
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",  // Action type for adding a feature
      payload: e.target[0].value,  // Payload containing feature value
    });
    e.target[0].value = ""; // Clearing input field after adding feature
  };

  // Handler for uploading files
  const handleUpload = async ()=>{
    setUploading (true);  // Setting uploading state to true
    try {
      const cover = await upload(singleFile); // Uploading the cover image
      const images = await Promise.all(       // Uploading multiple images
        [...files].map( async (file)=>{
          const url = await upload(file);  // Uploading each file
          return url;  // Returning the URL of uploaded file
      })
      );
      setUploading (false);  // Resetting uploading state
      dispatch({type:"ADD_IMAGES", payload: { cover, images }});  // Dispatching action to add uploaded images to state
    } catch (err) {
        console.log(err);
        
    }
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient() ;    // Getting query client for managing cached queries

  const mutation = useMutation({   // Mutation for submitting the gig data
    mutationFn: (gig) =>{
      return newRequest.post('/gigs', gig);  // Making a POST request to add a new gig
    },  
    onSuccess: ()=>{
      queryClient.invalidateQueries(["myGigs"])  // Invalidating the query to refresh the gigs list
    }
  });

  // Handler for form submission
  const handleSubmit = (e) =>{
    e.preventDefault();
    mutation.mutate(state,);  // Mutating to add the new gig with current state
    navigate('/mygigs')   // Navigating to the My Gigs page after submission
  };

  return (
    <div className="add">
      <div className="container">
        <h1 className='add-heading'>Add New Gig</h1>
        <div className="sections">
          <div className="add-info">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            <label htmlFor="">Category</label>
            <select name="cat" id="cat" onChange={handleChange}>
              <option value="design">design</option>
              <option value="web">web Development</option>
              <option value="animation">animation</option>
              <option value="music">art</option>
              <option value="music">news</option>
              <option value="music">software</option>
              <option value="music">photography</option>
              <option value="music">games</option>
            </select>
            <div className="images">
              <div className="imagesInputs">

            <label htmlFor="">Cover Image</label>
            <input 
              type="file" 
              onChange={(e)=>setSingleFile(e.target.files[0])} 
            />

            <label htmlFor="">Upload Images</label>
            <input 
              type="file" 
              multiple 
              onChange={(e)=>setFiles(e.target.files)}
            />
              </div>
              <button className='add-heading'onClick={handleUpload}>{uploading? "uploading" : "upload" }</button>
            </div>
            
            <label htmlFor="">Description</label>
            <textarea 
            name="desc" 
            id="" 
            placeholder="Brief descriptions to introduce your service to customers" 
            cols="0" 
            rows="16"
            onChange={handleChange}
            ></textarea>

            <button onClick={handleSubmit}>Create</button>
          </div>
          <div className="details">
            <label htmlFor="">Service Title</label>
            <input type="text" name='shortTitle' placeholder="e.g. One-page web design" onChange={handleChange} />

            <label htmlFor="">Short Description</label>
            <textarea 
            name="shortDesc" 
            id="" 
            placeholder="Short description of your service" 
            cols="30" 
            rows="10"
            onChange={handleChange}
            ></textarea>

            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input 
            type="number" 
            name='deliveryTime' 
            onChange={handleChange}
            />
            
            <label htmlFor="">Revision Number</label>
            <input 
            type="number" 
            name='revisionNumber' 
            onChange={handleChange}
            />
            
            <label htmlFor="">Add Features</label>
            <form action="" className='add-form' onSubmit={handleFeature}>
            <input className='add-input' type="text" placeholder="e.g. page design" />
            <button type='submit' className='add-btn'>add</button>
            </form>
            <div className="addedFeatures">
              {state?.features?.map((f) => (
                <div className="addedItem" key={f}>
                <button onClick={()=>dispatch({ type: "REMOVE_FEATURE", payload: f })}>
                  {f}
                  <span>X</span>
                </button>
              </div>
              ))}
            </div>
            <label htmlFor="">Price</label>
            <input type="number" name='price' onChange={handleChange}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
