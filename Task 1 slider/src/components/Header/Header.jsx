import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { BiCartAlt } from "react-icons/bi";

export default function Header({ onShowReview }) {
  const navigate = useNavigate();

  // Login page
  const handleUserClick = () => {
    navigate("/login");
  };

  // Review page
  const handleShowReview = () => {
    onShowReview();
    window.location.hash = '#review';
  };

  return (
    <header className="bg-white sticky z-50 top-0">
      <nav className="lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <div className="text-2xl ml-20 transition-colors duration-100 hover:text-orange-500 text-green-900">
              BEAUTY PLUS
            </div>
          </Link>
          <div className="flex justify-center flex-grow">
            <ul className="flex space-x-8 font-medium">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleShowReview}
                  className="block py-2 pr-4 pl-3 duration-200 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0"
                >
                  Review
                </button>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="flex items-center lg:order-2 gap-3 ml-2 hidden sm:flex">
            <FaRegUser
              size={16}
              className="text-gray-800 hover:text-orange-700 cursor-pointer mr-2"
              onClick={handleUserClick} // Navigate to /login when clicked
            />
            <BiCartAlt
              size={20}
              className="text-gray-800 hover:text-orange-700 cursor-pointer"
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
