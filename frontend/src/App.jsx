import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";

export default function App() {
  return (

    <BrowserRouter basename="/">
      <Provider store={appStore}>
      <Routes>
        <Route path="/" element={<Body/>}>
        <Route path="/" element={<Feed/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/connections" element={<Connections/>}/>
        <Route path="/requests" element={<Requests/>}/>
        </Route>
      </Routes>
      </Provider>
    </BrowserRouter>

  );
}


