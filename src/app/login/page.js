"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaGoogle, FaEnvelope, FaLock, FaArrowRight, FaChevronLeft } from "react-icons/fa";
import Swal from "sweetalert2";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password",
          confirmButtonColor: "#0069a8",
          background: "#ffffff",
          customClass: {
            popup: "rounded-3xl shadow-2xl",
          },
        });
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f8fafc]">
      {/* Left Side: Visual & Branding (Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#0069a8]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/auth-bg.png"
            alt="Authentication Background"
            fill
            className="object-cover opacity-60 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0069a8] via-transparent to-transparent opacity-80" />
        </div>
        
        <div className="relative z-10 w-full flex flex-col justify-between p-12 text-white">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <span className="text-[#0069a8] text-2xl font-black">E</span>
            </div>
            EventFlow
          </Link>

          <div>
            <h1 className="text-5xl font-extrabold leading-tight mb-6">
              Create and Manage <br />
              <span className="text-cyan-300">Unforgettable</span> Events.
            </h1>
            <p className="text-xl text-blue-100 max-w-md leading-relaxed opacity-90">
              Join thousands of organizers who use EventFlow to create, promote, and manage world-class experiences.
            </p>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-[#0069a8] bg-slate-200 overflow-hidden">
                  <Image 
                    src={`https://i.pravatar.cc/150?u=${i + 10}`} 
                    alt="User" 
                    width={48} 
                    height={48} 
                  />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-4 border-[#0069a8] bg-white flex items-center justify-center text-[#0069a8] font-bold text-xs">
                +2k
              </div>
            </div>
            <p className="text-sm font-medium text-blue-100">
              Trusted by <span className="text-white font-bold">2,000+</span> organizers worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 lg:p-20 relative bg-white lg:rounded-l-[40px] shadow-[-20px_0_50px_rgba(0,0,0,0.05)] z-20">
        <div className="w-full max-w-md space-y-8">
          <Link href="/" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-[#0069a8] transition-colors mb-4 group">
            <FaChevronLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="space-y-2">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Welcome back</h2>
            <p className="text-slate-500 font-medium">Log in to your account to continue</p>
          </div>

          <div className="space-y-6">
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="w-full h-14 flex items-center justify-center gap-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-[0.98] cursor-pointer"
            >
              <FaGoogle className="text-red-500 text-xl" />
              Continue with Google
            </button>

            <div className="relative flex items-center gap-4">
              <div className="h-[1px] flex-1 bg-slate-100"></div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">or login with email</span>
              <div className="h-[1px] flex-1 bg-slate-100"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Email address</label>
                <div className="relative group">
                  <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center text-slate-400 group-focus-within:text-[#0069a8] transition-colors">
                    <FaEnvelope />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-[#0069a8] outline-none transition-all font-medium text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-sm font-bold text-slate-700">Password</label>
                  <Link href="#" className="text-xs font-bold text-[#0069a8] hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center text-slate-400 group-focus-within:text-[#0069a8] transition-colors">
                    <FaLock />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-[#0069a8] outline-none transition-all font-medium text-slate-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-[#0069a8] text-white rounded-2xl font-bold text-lg shadow-[0_10px_30px_-10px_rgba(0,105,168,0.5)] hover:shadow-[0_15px_35px_-10px_rgba(0,105,168,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 group disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer overflow-hidden relative"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <>
                    <span>Sign In</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="text-center pt-4">
            <p className="text-slate-600 font-medium">
              Don&apos;t have an account yet?{" "}
              <Link href="/register" className="text-[#0069a8] font-extrabold hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Footer info - Mobile only */}
        <div className="mt-12 text-center lg:hidden">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Powered by EventFlow</p>
        </div>
      </div>
    </div>
  );
}

