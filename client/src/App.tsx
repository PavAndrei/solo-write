import type { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages/HomePage";
import { SignUpPage } from "./pages/SignUpPage";
import { SignIn } from "./pages/SignInPage";
import { Header } from "./components/Header";
import { Dashboard } from "./pages/Dashboard";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
