import React from "react";
import { Link } from "react-router-dom";
import "./MyGigs.css";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";

function MyGigs() {
  const currentUser = getCurrentUser();

  const queryClient = useQueryClient();

  // Fetching gigs associated with the current user using React Query
  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],  // Query key for caching
    queryFn: () =>
      newRequest.get(`/gigs?userId= ${currentUser.id}`).then((res)=>{  // Fetching gigs from the server
        return res.data;
      }), 
  });    

  // Mutation for deleting a gig
  const mutation = useMutation({
    mutationFn: (id) =>{
      return newRequest.delete(`/gigs/${id}`);  // Sending a DELETE request to remove the gig
    },  
    onSuccess:()=>{
      queryClient.invalidateQueries(["myGigs"]);  // Invalidating the gigs query to refresh data after deletion
    },
  });

  // Function to handle gig deletion
  const handleDelete = (id) => {
    mutation.mutate(id);  // Triggering the mutation with the gig ID
  };

  return (
    <div className="myGigs">
      {isLoading ? (
        "loading"
       ) : error ? (
        "error" 
        ) : (
      <div className="container">
        <div className="myGigtitle">
        <h1 className="mygigs-title">Gigs</h1>
          {currentUser.isSeller && (
            <Link to="/add">
              <button className="add-new-gig">Add New Gig</button>
            </Link>
          )}
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Action</th>
          </tr>
          {data.map((gig)=>(

            <tr key={gig._id}>
            <td>
              <img
                className="image"
                src={gig.cover}
                alt=""
                />
            </td>
            <td>{gig.title}</td>
            <td>{gig.price}</td>
            <td>{gig.sales}</td>
            <td>
              <img className="delete" src="./img/delete.png" alt="" onClick={()=>handleDelete(gig._id)}/>
            </td>
          </tr>
            ))}
        </table>
      </div>)}
    </div>
  );
}

export default MyGigs;