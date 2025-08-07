import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import NavBar from "./components/NavBar.jsx";
import GuestNavBar from "./components/GuestNavBar.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import SigninPage from "./pages/SigninPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import AddPetPage from "./pages/AddPetPage.jsx";
import styles from "./CSSmodules/App.module.css";
import MyPetsPage from "./pages/MyPetsPage.jsx";
import PetPage from "./pages/PetPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleSignin = (userData) => {
    setIsAuthenticated(true);
    localStorage.setItem("authenticated", "yes");
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("authenticated");
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    if (user) {
      console.log("user", user);
    }
  }, []);

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/main" replace />;
  };

  return (
    <Router>
      <div className={styles.container}>
        {isAuthenticated ? (
          <NavBar user={user} onLogout={handleLogout} />
        ) : (
          <GuestNavBar />
        )}
        <div className={styles.pageContainer}>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/main" replace />
                ) : (
                  <AboutPage isAuthenticated={isAuthenticated} />
                )
              }
            />
            <Route
              path="/about-us"
              element={
                <ProtectedRoute>
                  <AboutPage isAuthenticated={isAuthenticated} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signin"
              element={
                isAuthenticated ? (
                  <Navigate to="/main" replace />
                ) : (
                  <SigninPage onLogin={handleSignin} />
                )
              }
            />
            <Route
              path="/signup"
              element={
                isAuthenticated ? (
                  <Navigate to="/main" replace />
                ) : (
                  <SignupPage onLogin={handleSignin} />
                )
              }
            />
            <Route
              path="/main"
              element={<MainPage isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <FavoritesPage user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-pet"
              element={
                <ProtectedRoute>
                  <AddPetPage user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-pets"
              element={
                <ProtectedRoute>
                  <MyPetsPage user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pet/:id"
              element={<PetPage isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <AccountPage user={user} onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={
                <Navigate to={isAuthenticated ? "/main" : "/"} replace />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
