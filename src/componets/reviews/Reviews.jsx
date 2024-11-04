import React from 'react'
import './Reviews.css';
import Review from '../review/Review';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';  // Importing hooks from react-query for data fetching and mutations
import newRequest from '../../utils/newRequest'; // Importing utility for making API requests


const Reviews = ({gigId}) => {  // Reviews component takes gigId as a prop

  const queryClient = useQueryClient()  // Create a query client instance to manage query state
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],  // Unique key for the reviews query
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res)=>{  // Fetch reviews from the API
        return res.data;
      }), 
  });    


  // Mutation for adding a new review
  const mutation = useMutation({
    mutationFn: (review) =>{
      return newRequest.post("/reviews", review)  // Send POST request to add a new review
    },  
    onSuccess:()=>{
      queryClient.invalidateQueries(["reviews"])  // Invalidate the reviews query to refresh the list
    }
  });

  const handleSumbit = (e) =>{
    e.preventDefault();
    const desc = e.target[0].value; // Get the review description from the input
    const star = e.target[1].value;  // Get the star rating from the select dropdown
    mutation.mutate({ gigId, desc, star }); // Trigger the mutation to add the review
  };
  
  return (
    <div className="reviews">
            <h2 className='review-head'>Reviews</h2>
            {isLoading 
            ? "Loading" 
            : error 
            ? "Something went wrong!" 
            : data.map((review)=>  <Review key={review._id} review={review} />)}  
            <div className="add-review">
              <h3>Add a review</h3>
              <form  className="add-form" action="" onSubmit={handleSumbit}>
                <input className='review-input' type="text" placeholder='write your review here' />
                <select name="" id="">
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
                  <button className='review-btn'>Send</button>
              </form>
            </div>
          </div>
  )
}

export default Reviews
