import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from '../utils/userSlice'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';


const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm px-4">
      {/* Left side: Logo */}
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/code.png"
            alt="DevTinder Logo"
            className="w-10 h-10 rounded"
          />
          <span className="text-xl font-semibold">DevTinder</span>
        </Link>
      </div>

      {/* Right side: Welcome + Avatar + Dropdown */}
      <div className="flex items-center gap-4">
        {user && (
          <div className="dropdown dropdown-end flex items-center gap-3">
            <div className="text-sm font-medium">Welcome, {user.firstName}</div>

            {/* Avatar Button */}
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 border border-gray-300">
                <img
                  alt="user photo"
                  src={user?.profilePicURL}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/fallback-user.png";
                  }}
                />
              </div>
            </div>

            {/* Dropdown Menu (automatically toggled by DaisyUI) */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box w-52 p-2 shadow z-50 mt-3"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                    <Link to="/Connections">Connections</Link></li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
