import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Routes, Route, Link } from "react-router-dom";

const App = () => {

  return (
    <div>
    <nav>
      <Link to="/authors"> Authors </Link> /
      <Link to="/books"> Books </Link> /
      <Link to="/add"> Add Book </Link> 
    </nav>

    <Routes>
      <Route path="/authors" element={<Authors />} />
      <Route path="/books" element={<Books />} />
      <Route path="/add" element={<NewBook />} />
      <Route path="/" element={<Authors />} />
    </Routes>
  </div>
  );
};

export default App;
