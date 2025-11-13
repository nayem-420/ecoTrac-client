import React from "react";
import { motion } from "framer-motion";

const ForgetPassword = () => {
  return (
    <motion.div
      className="hero min-h-screen bg-gradient-to-br from-green-100 to-green-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="card bg-white shadow-2xl w-full max-w-sm mx-auto p-6 rounded-2xl"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
      >
        <motion.h1
          className="text-3xl font-bold text-center mb-4 text-green-700"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          Forgot Password?
        </motion.h1>

        <p className="text-gray-500 text-center mb-6 text-sm">
          Enter your email to reset your password.
        </p>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full focus:border-green-500"
            required
          />
          <motion.button
            type="submit"
            className="btn btn-success w-full text-white font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Reset Link
          </motion.button>
        </motion.form>

        <motion.div
          className="text-center mt-4 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p>
            Remember your password?{" "}
            <a href="/login" className="text-green-700 font-semibold">
              Login
            </a>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ForgetPassword;