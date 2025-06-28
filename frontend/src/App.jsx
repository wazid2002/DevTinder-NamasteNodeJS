import Body from "./Body";
import Login from "./Login";
import Profile from "./profile"
import { BrowserRouter,Route,Routes } from "react-router-dom";

export default function App() {
  return (

    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
        <Route path="login" element={<Login/>}/>
        <Route path="profile" element={<Profile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>

  );
}


