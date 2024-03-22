import "./App.css";
import Home from "./components/Home";
import Leaves from "./components/Leaves";
import Login from "./components/Login";
import Signup from "./components/Signup";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Tasks from "./components/Tasks";
import EditProfile from "./components/EditProfile";
import Logout from "./components/Logout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login></Login>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/leaves" element={<Leaves></Leaves>}></Route>
          <Route path="/tasks" element={<Tasks></Tasks>}></Route>
          <Route path="/editProfile" element={<EditProfile></EditProfile>}></Route>
          <Route path="/logout" element={<Logout></Logout>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
