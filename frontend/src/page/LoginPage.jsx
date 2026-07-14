import React , {useState} from 'react'
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { Link } from 'react-router-dom'
import {
  Code,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";

import {z} from "zod";
import AuthImagePattern from '../components/AuthImagePattern';
import { useAuthStore } from '../store/useAuthStore';


const LoginSchema = z.object({
  email:z.string().email("Enter a valid email"),
  password:z.string().min(6 , "Password must be atleast of 6 characters"),

})

const LoginPage = () => {

  const {isLoggingIn , login} = useAuthStore()
  const [showPassword , setShowPassword] = useState(false);

  const {
    register ,
    handleSubmit,
    formState:{errors},
  } = useForm({
    resolver:zodResolver(LoginSchema)
  })

  const onSubmit = async (data)=>{
    try {
      await login(data)
      
    } catch (error) {
      console.error("Signup failed" , error)
    }
  }


  return (
    <div className='min-h-[calc(100vh-64px)] grid lg:grid-cols-2 bg-gray-950 text-gray-100 overflow-hidden relative'>
        <div className="flex flex-col justify-center items-center p-6 sm:p-12 relative z-10">
          {/* Subtle glowing gradient blob behind card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-600/15 rounded-full blur-[90px] pointer-events-none -z-10 animate-pulse duration-[8000ms]" />
          <div className="w-full max-w-md bg-gray-900/60 backdrop-blur-xl border border-gray-800/80 p-8 sm:p-10 rounded-2xl shadow-2xl space-y-8">
            {/* Logo */}
            <div className="text-center mb-6">
              <div className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-all duration-200">
                  <Code className="w-6 h-6 text-indigo-400" />
                </div>
                <h1 className="text-3xl font-extrabold mt-3 text-white tracking-tight">Welcome Back</h1>
                <p className="text-gray-400 text-sm">Login to your workspace</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-300">Email</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="email"
                    {...register("email")}
                    className={`input input-bordered w-full pl-10 bg-gray-800/60 border-gray-700 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-200 rounded-xl ${
                      errors.email ? "input-error border-red-500" : ""
                    }`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-300">Password</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className={`input input-bordered w-full pl-10 bg-gray-800/60 border-gray-700 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-200 rounded-xl ${
                      errors.password ? "input-error border-red-500" : ""
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1.5">{errors.password.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn bg-indigo-600 hover:bg-indigo-500 text-white font-bold border-none w-full py-3 rounded-xl transition-all duration-200 hover:scale-[1.01] shadow-lg shadow-indigo-600/10"
                disabled={isLoggingIn}
              >
                 {isLoggingIn ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="text-center pt-2">
              <p className="text-gray-400 text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="text-indigo-400 font-bold hover:underline transition-all duration-150">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

       {/* Right Side - Image/Pattern */}
     {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={"Welcome back!"}
        subtitle={
          "Sign in to continue your journey with us. Don't have an account? Create one now."
        }
      />
    </div>
  )
}

export default LoginPage