import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import TextEditor from './components/TextEditor';
import AllNotes from './components/AllNotes';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<HomePage />} />
         <Route path="/texteditor" element={<TextEditor />} /> 
         <Route path="/allnotes" element={<AllNotes />} />
       
      </Routes>
    </Router>

  );
}

export default App;
