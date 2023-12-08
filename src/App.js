// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Fix import statement

import Login from './Login';
import Signup from './Signup';
const App = () => {
  return (
    // <Main/>
    // <Login/>
    // <Signup/>
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* Other routes go here */}
      </Routes>
    </Router>
  );
};

export default App;
