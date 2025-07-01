import React from 'react';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const user = useSelector((store) => store.user);
  console.log("Redux user:", user);

  return (
    <div className="navbar bg-base-300 shadow-sm px-4">
      {/* Left side: Logo */}
      <div className="flex-1">
        <a href="/" className="flex items-center gap-2">
          <img
            src="/code.png"
            alt="DevTinder Logo"
            className="w-10 h-10 rounded"
          />
          <span className="text-xl font-semibold">DevTinder</span>
        </a>
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
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
