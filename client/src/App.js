import "./App.css";
import React from "react";
import "./components/Main.css";
import HomePage from "./components/Home/HomePage.jsx";
import MovieSearch from "./components/movieSearch/MovieSearch.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieDetails from "./components/movieDetails/MovieDetails.jsx";
import MainPage from "./components/login/MainPage.jsx";
import MyWishlist from "./components/wishlist/MyWishlist.jsx";
import ForgotPassword from "./components/login/ForgotPassword";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import LoaderSpinner from "./components/loader/LoaderSpinner";

function App() {
  return (
    <>
      <Router>
        <UserAuthContextProvider>
          <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route exact path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route exact path="/home/search" element={<MovieSearch />} />
            <Route
              exact
              path="/home/movieDetails/:media_type/:id"
              element={<MovieDetails />}
            />
            <Route exact path="/myWishlist/:userEmail" element={<MyWishlist />} />
            <Route exact path="/forgotPassword" element={<ForgotPassword />} />
            <Route
              exact
              path="/home/search/movieDetails/:media_type/:id"
              element={<MovieDetails />}
            />
            <Route
              exact
              path="/loader"
              element={<LoaderSpinner />}
            />
          </Routes>
        </UserAuthContextProvider>
      </Router>
    </>
  );
}

export default App;
