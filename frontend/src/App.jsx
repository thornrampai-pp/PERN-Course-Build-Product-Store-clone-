import {
  SignInButton,
  SignedOut,
  SignedIn,
  SignOutButton,
} from "@clerk/clerk-react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router";
import ProductPage from "./pages/ProductPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import CreatePage from "./pages/CreatePage";
import EditProuctPage from "./pages/EditProductPage";
import useAuthReq from "./hooks/useAuthReq";
import useUserSync from "./hooks/useUserSync";


function App() {
  const {isClerkLoaded,}= useAuthReq();
  useUserSync()
  if(!isClerkLoaded) return null;



  return (
    <div>
      <div className="min-h-screen bg-base-100">
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 py-8"></main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/edit" element={<EditProuctPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
