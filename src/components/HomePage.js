import React from "react";
import {  useNavigate } from 'react-router-dom';
import axios from "axios";

export const HomePage = () => {
  

  const navigate = useNavigate();

   const handleClick = async (e) => {

      console.log("Home ");
      const url = 'https://n2n8l1s0d4.execute-api.us-east-1.amazonaws.com/lab-1/create-note'; 

      try {
        await axios.post(url).then( (res) => {
          const fileId = res.data.fileId;
          if (fileId) {
  
            console.log(fileId);
            localStorage.setItem('fileId', JSON.stringify(fileId));
            navigate('/texteditor', {state: {file: fileId }});
          } else {
            console.error("File ID is undefined");
          }
        });
      } catch (error) {
       
        console.log(error);
      }

      navigate('/texteditor');
    };

    const handleViewClick = async (e) => {
      const token = "";
      navigate('/allnotes', { state: { token: token } });
    };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-300 min-h-screen flex flex-col justify-center items-center px-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-6">Lab Activity 1</h1>
        <p className="text-xl mb-8"></p>
        <div className="mr-4 bg-white rounded-full py-2 px-4 inline-flex items-center hover:bg-black-600 hover:text-white hover:shadow-lg 
              transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
          <button className="bg-white rounded-full text-black font-bold py-2 px-4 rounded " 
          onClick={handleClick}>Create Note</button>
        </div>
        <div className="ml-4 bg-white rounded-full py-2 px-4 inline-flex items-center hover:bg-black-600 hover:text-white hover:shadow-lg 
              transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
          <button className=" bg-white rounded-full text-black font-bold py-2 px-4 rounded " 
          onClick={handleViewClick}>View Notes</button>
        </div>
      </div>
    </div>
  );
};