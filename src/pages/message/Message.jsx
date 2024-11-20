import React from 'react'
import { Link, useParams } from 'react-router-dom'
import './Message.css'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'

const Message = () => {
  const {id} = useParams();  // Extracting conversation ID from URL parameters
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));  // Getting current user data from local storage

  const queryClient = useQueryClient();  // Creating query client for managing server state

  // Fetching messages for the specific conversation using React Query
  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`)
        .then((res)=>{
        return res.data;
      }),
  });

  // Mutation for sending a new message
  const mutation = useMutation({
    mutationFn: (message) =>{
      return newRequest.post(`/messages`,message);  // Posting a new message to the server
    },  
    onSuccess:()=>{
      queryClient.invalidateQueries(["messages"])  // Invalidating messages query to refresh data
    }
  });

  const handleSubmit = (e)=>{
    e.preventDefault();
    mutation.mutate({  // Preventing default form submission behavior
      conversationId: id,  // Including conversation ID
      desc: e.target[0].value,  // Message description from input
    });
    e.target[0].value = "";  // Clearing the input field after submission
  };

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> 
        </span>
        {isLoading ? (
        "loading" 
        ) : error ? (
        "error" 
        ): (
        <div className="messages">
          {data.map((m) => (

            <div className={m.userId === currentUser._id ? "owner item" : "item"} key={m._id}>
            <img
              src={m.img || "/img/noavatar.jpg"}
              alt=""
              />
            <p>
              {m.desc}
            </p>
          </div>
        ))}
        </div>
      )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="write a message" />
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  )
}

export default Message
