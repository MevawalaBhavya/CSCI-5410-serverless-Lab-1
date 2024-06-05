import React, { useState, useEffect } from "react";
import {  useNavigate } from 'react-router-dom';
import axios from "axios";

const TextEditor = () => {
  
  const navigate = useNavigate();
  const [note, setNote] = useState('');
  const [file, setFile] = useState('');

  useEffect(() => {
    setFile(JSON.parse(localStorage.getItem('fileId')));
    console.log(file);
  }, [file]);

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleSave = async () => {

    console.log('Saved note:', note);

    const url = 'https://n2n8l1s0d4.execute-api.us-east-1.amazonaws.com/lab-1/save-note';

    try {
      await axios.post(url, {
        fileId: file,
        htmlContentType: note,
      });
      console.log("File saved !!");
      alert("Note saved !!");
    } catch (error) {
      console.error('Error saving note:', error);
      alert(error);
    }
  };

  const handleViewNotes = () => {
    console.log('Saved note:', note);
     navigate('/allnotes');
  };

  const handleHomeClick = () => {
     navigate('/' );
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen flex-col bg-gray-100">
        <h1 className="text-4xl font-bold mb-10 ">Lab Activity 1</h1>
        <textarea
          className="outline-none border border-yellow-300 bg-amber-200 rounded-lg p-4 w-1/2 h-1/2 resize-none text-black"
          placeholder="Type here..."
          onChange={handleNoteChange}
          value={note}
          style={{ color: 'black' }}>
        </textarea>
        <div className="flex justify-between mt-6 w-1/2">
          <button
            className="bg-blue-500 text-white hover:bg-black-600 px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 mx-2 "
            onClick={handleHomeClick}>
            Home
          </button>
          <button
            className="bg-blue-500 text-white hover:bg-black-600 px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 "
            onClick={handleSave}>
            Save
          </button>
          <button
            className="bg-blue-500 text-white hover:bg-black-600 px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 mx-2 "
            onClick={handleViewNotes}>
            View Notes?
          </button>
        </div>
      </div>
    </>

  );

};

export default TextEditor;
