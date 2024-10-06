import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Dashboard } from "./components/Dashboard";
import { OTPSECTION } from "./components/OTPSECTION";
import { RecoilRoot } from "recoil";
// import Test from "./components/Test";
function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        {/* <Route path="/test" element={<Test></Test>}></Route> */}
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route
          path="/paymentConfirmation"
          element={<OTPSECTION></OTPSECTION>}
        ></Route>
      </Routes>
    </RecoilRoot>
  );
}

export default App;
