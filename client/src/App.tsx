// import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound/NotFound";
import Admin from "./pages/Admin/Admin";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import RequireAdmin from "./components/auth/requiresAdmin";
import Shop from "./pages/Shop/Shop";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={ <Layout />}>
          <Route path="/" element={<Home />}/>
          <Route element={<RequireAdmin />}>
            <Route path="/admin" element={<Admin />}/>
          </Route>
          <Route path="/shop/:category" element={<Shop />}/>
          <Route path="*" element={<NotFound />}/>
        </Route>
        <Route path="/login" element={<Login />}/>
        <Route path = "/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
