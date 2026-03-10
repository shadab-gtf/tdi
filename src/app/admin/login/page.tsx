"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginAdmin } from "@/features/slices/authSlice";
import { toast } from "react-toastify";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

const Login: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [localError, setLocalError] = useState<string>("");

  const { loading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setLocalError("");

    try {
      await dispatch(
        loginAdmin({ email, password })
      ).unwrap();

      toast.success("Login successful");
      router.replace("/admin");
    } catch {
      setLocalError("Invalid email or password");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex w-1/2 bg-gray-200">
        <img
          src="/images/login.jpg"
          className="w-full h-full object-cover"
          alt="Login"
        />
      </div>

      {/* Right Content */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-8">
        <div className="max-w-md w-full space-y-6">
          <h2 className="text-3xl text-white text-center font-bold">
            Login
          </h2>

          {(localError || error) && (
            <p className="text-red-500 text-center">
              {localError || error}
            </p>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-white block mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 text-white border rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-white block mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 pr-12 text-white border rounded-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--admin-secondary)] text-white py-2 rounded-lg"
            >
              {loading ? "Logging in..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
