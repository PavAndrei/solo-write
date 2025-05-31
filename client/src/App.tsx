import type { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages/HomePage";
import { SignUpPage } from "./pages/SignUpPage";
import { LogIn } from "./pages/LogInPage";
import { Header } from "./components/Header";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/log-in" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
