import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Sales } from "./page/sales";
import Login from "./page/Login";
import CreateAccount from "./page/CreateAccount";
import Layout from "./Layout";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signin" element={<CreateAccount />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Sales />} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
