import type { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { SignUp } from "./pages/SignUp";
import { LogIn } from "./pages/LogIn";
import { Header } from "./components/Header";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/log-in" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
