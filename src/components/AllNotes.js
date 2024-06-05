import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export const AllNotes = () => {
  
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
   
    
    useEffect(() => {
  
      const fetchFileID = async () => {
        setIsLoading(true);

        const url = 'https://n2n8l1s0d4.execute-api.us-east-1.amazonaws.com/lab-1/get-all-notes';
  
        try {
          const response = await axios.get(url);
          console.log('Data Received successfully:', response.data);
          setData(response.data);
        } catch (error) {
          console.error('Error sending data:', error);
          throw error; 
        } finally {
          setIsLoading(false); 
        }
      };
      fetchFileID();
    }, []);

    const handleDelete = async (noteId) => {

      const noteIdset = noteId.slice(0, -5);
      console.log(`Deleting note with ID: ${noteIdset}`);
      const url = 'https://n2n8l1s0d4.execute-api.us-east-1.amazonaws.com/lab-1/delete-note' ;
      try {
          await axios.delete(url,{
            data: { fileId: noteIdset }
          });
      console.log("Note Deleted !!");
          setData(data.filter(note => note.Id !== noteIdset));
          alert("File delete. Please Refresh for an update!!");
      } catch (error) {
          console.error('Error deleting note:', error);
      }
  };
  
    const handleHomeClick = () => {
      navigate('/');
    }
  
    if (isLoading) {
      return <div className="flex justify-center items-center h-screen">
        <div>Loading...</div>
      </div>;
    }
    return (
      <>
        <div className="flex justify-center items-center h-screen flex-col bg-gray-100">
          <h1 className="text-4xl font-bold mb-6">All saved notes</h1>
          <div className="mt-4 grid grid-cols-3 gap-12">
            {data.map((item, index) => (
              item.Body &&
              <div key={index} className="bg-white p-6 rounded shadow w-64 h-32">
                <p>{item.Body}</p>
                <button 
                  className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                  onClick={() => handleDelete(item.Key)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
          <div className="mt-10 flex">
            <button
              className="bg-blue-500 text-white hover:bg-black-600 px-4 py-2 rounded-md transition duration-300 
                        ease-in-out transform hover:-translate-y-1 hover:scale-110 mx-2"
              onClick={handleHomeClick}>
              Home
            </button>
          </div>
        </div>
      </>
    );
  };

export default AllNotes;