// import React, { use, useState } from "react";
// import logo from "../assets/ecoTrac-logo.png";
// import { NavLink } from "react-router";
// import { motion, AnimatePresence } from "framer-motion";
// import icon from "../assets/user.png";
// import { AuthContext } from "../Provider/AuthProvider";
// import Swal from "sweetalert2";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { user, logOut } = use(AuthContext);

//   const handleLogout = () => {
//     logOut()
//       .then(() => {
//         Swal.fire({
//           title: "Logged Out Successfully",
//           icon: "success",
//           timer: 2000,
//           showConfirmButton: false,
//           toast: true,
//           position: "top-end",
//         });
//       })
//       .catch(() => {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "Something went wrong!",
//         });
//       });
//   };

//   const activeRoutes = ({ isActive }) =>
//     isActive
//       ? "bg-gradient-to-r from-green-500 via-emerald-400 to-teal-400 text-white font-semibold rounded-md px-3 py-1 shadow-md transition-all duration-300"
//       : "text-gray-700 hover:text-green-600 hover:bg-gradient-to-r hover:from-green-100 hover:to-teal-100 rounded-md px-3 py-1 transition-all duration-300";

//   return (
//     <motion.nav
//       className="navbar bg-base-100 shadow-sm"
//       initial={{ y: -100, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//     >
//       <div className="navbar-start">
//         <motion.div
//           role="button"
//           className="btn btn-ghost lg:hidden"
//           onClick={() => setIsOpen(!isOpen)}
//           whileTap={{ scale: 0.9 }}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M4 6h16M4 12h8m-8 6h16"
//             />
//           </svg>
//         </motion.div>

//         <motion.div
//           className="btn btn-ghost"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           <motion.img
//             src={logo}
//             className="w-8 rounded-full"
//             alt="EcoTrac Logo"
//             animate={{ rotate: [0, 360] }}
//             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//           />
//           <NavLink to={"/"} className="text-xl font-bold">
//             eco<span className="text-blue-500">Trac</span>
//           </NavLink>
//         </motion.div>
//       </div>

//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1">
//           <motion.li
//             initial={{ y: -20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.2, duration: 0.5 }}
//             whileHover={{ scale: 1.1 }}
//           >
//             <NavLink className={activeRoutes} to={"/"}>
//               Home
//             </NavLink>
//           </motion.li>
//           <motion.li
//             initial={{ y: -20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.5 }}
//             whileHover={{ scale: 1.1 }}
//           >
//             <NavLink className={activeRoutes} to={"/challenges"}>
//               Challenges
//             </NavLink>
//           </motion.li>
//           <motion.li
//             initial={{ y: -20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.4, duration: 0.5 }}
//             whileHover={{ scale: 1.1 }}
//           >
//             <NavLink className={activeRoutes} to={"/my-activities"}>
//               MyActivities
//             </NavLink>
//           </motion.li>
//         </ul>
//       </div>

//       <div className="navbar-end flex items-center gap-3">
//         {user && (
//           <div className="dropdown dropdown-end">
//             <motion.div
//               tabIndex={0}
//               role="button"
//               className="btn btn-ghost btn-circle avatar"
//               initial={{ scale: 0, rotate: -180 }}
//               animate={{ scale: 1, rotate: 0 }}
//               transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
//               whileHover={{ scale: 1.1 }}
//             >
//               <div className="w-10 rounded-full ring-2 ring-green-600 ring-offset-2">
//                 <img
//                   src={user?.photoURL || icon}
//                   alt={user?.displayName || "User"}
//                   referrerPolicy="no-referrer"
//                 />
//               </div>
//             </motion.div>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
//             >
//               <li className="menu-title">
//                 <span className="text-green-700 font-bold">
//                   {user?.displayName || "User"}
//                 </span>
//               </li>
//               <li>
//                 <a className="text-sm text-gray-600">{user?.email}</a>
//               </li>
//               <li>
//                 <NavLink to="/my-activities">My Activities</NavLink>
//               </li>
//               <li>
//                 <a onClick={handleLogout} className="text-red-600">
//                   Logout
//                 </a>
//               </li>
//             </ul>
//           </div>
//         )}

//         <motion.div
//           initial={{ x: 50, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ delay: 0.5, duration: 0.5 }}
//         >
//           {user ? (
//             <motion.button
//               onClick={handleLogout}
//               className="btn bg-red-600 hover:bg-red-700 text-white btn-sm"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Logout
//             </motion.button>
//           ) : (
//             <NavLink to={"/login"}>
//               <motion.button
//                 className="btn bg-green-600 hover:bg-green-700 text-white"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Login
//               </motion.button>
//             </NavLink>
//           )}
//         </motion.div>
//       </div>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             className="absolute top-16 left-0 w-full lg:hidden z-50"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.3 }}
//           >
//             <ul className="menu bg-base-100 rounded-box w-full p-4 shadow-lg">
//               <motion.li
//                 initial={{ x: -20, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ delay: 0.1 }}
//               >
//                 <NavLink
//                   className={activeRoutes}
//                   to={"/"}
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Home
//                 </NavLink>
//               </motion.li>
//               <motion.li
//                 initial={{ x: -20, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 <NavLink
//                   className={activeRoutes}
//                   to={"/challenges"}
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Challenges
//                 </NavLink>
//               </motion.li>
//               <motion.li
//                 initial={{ x: -20, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ delay: 0.3 }}
//               >
//                 <NavLink
//                   className={activeRoutes}
//                   to={"/my-activities"}
//                   onClick={() => setIsOpen(false)}
//                 >
//                   MyActivities
//                 </NavLink>
//               </motion.li>
//             </ul>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.nav>
//   );
// };

// export default Navbar;