import { Routes, Route } from "react-router-dom";
import { Home } from "./components/home";
import { Dashboard } from "./components/Dashboard";
import { OTPSECTION } from "./components/OTPSECTION";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
      <Route
        path="/paymentConfirmation"
        element={<OTPSECTION></OTPSECTION>}
      ></Route>
    </Routes>
  );
}

export default App;
