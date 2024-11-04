import React from "react";
import { Link } from "react-router-dom";
import "./Messages.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
import moment from 'moment';

const Messages = () => {
  const currentUser =  JSON.parse(localStorage.getItem("currentUser"));  // Retrieving current user data from local storage

  const queryClient = useQueryClient();  // Creating a query client for managing server state

  // Fetching conversations associated with the current user using React Query
  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"], // Query key for caching
    queryFn: () =>
      newRequest.get(`/conversations`)  // Fetching conversations from the server
        .then((res)=>{
        return res.data;
      }),
  });

  // Mutation for marking a conversation as read
  const mutation = useMutation({
    mutationFn: (id) =>{
      return newRequest.put(`/conversation/${id}`); // Sending a PUT request to update the conversation
    },  
    onSuccess:()=>{
      queryClient.invalidateQueries(["conversations"])  // Invalidating conversations query to refresh data
    }
  });

  // Function to handle the read action for a conversation
  const handleRead = (id)=>{
    mutation.mutate(id);  // Triggering the mutation with the conversation ID
  };

  return (
    <div className="messages">
      {isLoading ? (
        "loading" 
      ): error ? (
        "error" 
      ) : ( 
      <div className="container">
        <div className="title">
          <h1>Messages</h1>
        </div>
        <table>
          <tr>
            <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
            <th>Last Message</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
          {data.map((c)=>(
            <tr className={((currentUser.isSeller && !c.readBySeller)  || 
              (!currentUser.isSeller && !c.readByBuyer)) && "active"
              } 
              key={c.id}>
            <td>{currentUser.isSeller ? c.buyerId : c.sellerId }</td>
            <td>
              <Link to={`/message/${c.id}`  } className="link">
                {c?.lastMessage?.substring(0, 100)}...
              </Link>
            </td>
            <td>{moment(c.updatedAt).fromNow()}</td>
            <td>
              {((currentUser.isSeller && !c.readBySeller)  || 
              (!currentUser.isSeller && !c.readByBuyer)) && (
                <button onClick={()=>handleRead(c.id)}>Mark as Read </button>
              )}
            </td>
          </tr>
          ))}
        </table>
      </div>
    )}
    </div>
  );
};

export default Messages;