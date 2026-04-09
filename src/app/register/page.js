"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaUser, FaEnvelope, FaLock, FaArrowRight, FaGoogle, FaChevronLeft } from "react-icons/fa";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "You can now log in to your account.",
          confirmButtonColor: "#0069a8",
          background: "#ffffff",
          customClass: {
            popup: "rounded-3xl shadow-2xl",
          },
        }).then(() => {
          router.push("/login");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: data.error || "Something went wrong",
          confirmButtonColor: "#0069a8",
          background: "#ffffff",
          customClass: {
            popup: "rounded-3xl shadow-2xl",
          },
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Could not connect to the server",
      });
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
            className="object-cover opacity-60 mix-blend-overlay rotate-180"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0069a8] via-transparent to-transparent opacity-80" />
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
              Start Your Journey <br />
              <span className="text-cyan-300">Today</span> with Us.
            </h1>
            <p className="text-xl text-blue-100 max-w-md leading-relaxed opacity-90">
              Join our growing community and discover the easiest way to organize and attend events that matter.
            </p>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex -space-x-4">
              {[5, 6, 7, 8].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-[#0069a8] bg-slate-200 overflow-hidden">
                  <Image 
                    src={`https://i.pravatar.cc/150?u=${i + 20}`} 
                    alt="User" 
                    width={48} 
                    height={48} 
                  />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-4 border-[#0069a8] bg-white flex items-center justify-center text-[#0069a8] font-bold text-xs">
                +10k
              </div>
            </div>
            <p className="text-sm font-medium text-blue-100">
              Join <span className="text-white font-bold">10,000+</span> users already registered.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Register Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 lg:p-20 relative bg-white lg:rounded-l-[40px] shadow-[-20px_0_50px_rgba(0,0,0,0.05)] z-20">
        <div className="w-full max-w-md space-y-8">
          <Link href="/" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-[#0069a8] transition-colors mb-4 group">
            <FaChevronLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="space-y-2">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Create account</h2>
            <p className="text-slate-500 font-medium">Join EventFlow and start managing events</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center text-slate-400 group-focus-within:text-[#0069a8] transition-colors">
                  <FaUser />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-[#0069a8] outline-none transition-all font-medium text-slate-900"
                />
              </div>
            </div>

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
              <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
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
              className="w-full h-14 bg-[#0069a8] text-white rounded-2xl font-bold text-lg shadow-[0_10px_30px_-10px_rgba(0,105,168,0.5)] hover:shadow-[0_15px_35px_-10px_rgba(0,105,168,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 group disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer overflow-hidden relative mt-2"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                <>
                  <span>Create Account</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="relative flex items-center gap-4 py-2">
            <div className="h-[1px] flex-1 bg-slate-100"></div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">or sign up with</span>
            <div className="h-[1px] flex-1 bg-slate-100"></div>
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full h-14 flex items-center justify-center gap-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-[0.98] cursor-pointer"
          >
            <FaGoogle className="text-red-500 text-xl" />
            Sign up with Google
          </button>

          <div className="text-center">
            <p className="text-slate-600 font-medium">
              Already have an account?{" "}
              <Link href="/login" className="text-[#0069a8] font-extrabold hover:underline">
                Log In
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

