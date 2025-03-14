import { Outlet } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Footer from "./components/globals/Footer";
import Header from "./components/globals/Header";

function App() {
  return (
    <>
      <Header />
      <ToastContainer />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
