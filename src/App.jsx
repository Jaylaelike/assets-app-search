import Home from "./components/Home";
import ResponsiveAppBar from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import Products from "./components/Products";

function App() {
  return (
    <>
      <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Home />} ></Route>
          <Route path="Products" element={<Products />}></Route>
          <Route path="Images" element={<Products />}></Route>
        </Routes>
   
    </>
  );
}

export default App;
