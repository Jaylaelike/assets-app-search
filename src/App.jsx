import Home from "./components/Home";
import ResponsiveAppBar from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import FetchDetial from "./components/FetchDetail";

function App() {
  return (
    <>
      <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Home />} ></Route>
          <Route path="Home" element={<Home />} ></Route>
          <Route path="Products" element={<Products />}></Route>
          <Route path="Images" element={<Products />}></Route>
          <Route path="/FetchDetial/:id" element={<FetchDetial />}/>
        </Routes>
    </>
  );
}

export default App;
