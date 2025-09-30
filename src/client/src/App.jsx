import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BookList from "./pages/BookList";
import BookDetail from "./pages/BookDetail";
import Search from "./pages/Search";
import AddBook from "./pages/AddBook";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar visible on all pages */}
        <Navbar />

        {/* Main content */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<BookList />} />
            <Route path="/explore/:id" element={<BookDetail />} />
            <Route path="/find" element={<Search />} />
            <Route path="/add" element={<AddBook />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
