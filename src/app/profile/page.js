"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaUser, FaEnvelope, FaPhone, FaLink, FaCamera, FaSave, FaArrowLeft, FaUpload } from "react-icons/fa";
import Swal from "sweetalert2";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, update, status } = useSession();
  const router = useRouter();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    phone: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }

    if (session?.user?.email) {
      fetchUser();
    }
  }, [session, status]);

  const fetchUser = async () => {
    try {
      const res = await fetch(`/api/users/${session.user.email}`);
      const data = await res.json();
      if (res.ok) {
        setFormData({
          name: data.name || "",
          image: data.image || "",
          phone: data.phone || "",
          bio: data.bio || "",
        });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (e.g., 5MB)
    if (file.size > 5 * 1024 * 1024) {
      Swal.fire("Error", "File size too large (max 5MB)", "error");
      return;
    }

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append("image", file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=d6c227b1e41a30da3e5478bc7f08f57d`, {
        method: "POST",
        body: formDataUpload,
      });

      const data = await response.json();
      if (data.success) {
        const imageUrl = data.data.display_url;
        setFormData((prev) => ({ ...prev, image: imageUrl }));
        
        Swal.fire({
          icon: "success",
          title: "Image Uploaded",
          text: "Click 'Save Changes' to permanently update your profile photo.",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.error("Upload error:", error);
      Swal.fire("Upload Failed", "Could not upload image to server", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/users/${session.user.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // Update session immediately
        await update({
          name: formData.name,
          image: formData.image,
        });

        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your changes have been saved successfully.",
          confirmButtonColor: "#0069a8",
          background: "#ffffff",
          customClass: {
            popup: "rounded-3xl shadow-2xl",
          },
        });
      } else {
        const data = await res.json();
        throw new Error(data.error || "Failed to update profile");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message,
        confirmButtonColor: "#0069a8",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#0069a8]/30 border-t-[#0069a8] rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold animate-pulse">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-[#0069a8] transition-colors mb-2 group">
              <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Account Settings</h1>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar/Avatar Section */}
            <div className="md:w-1/3 bg-slate-50 p-8 flex flex-col items-center border-b md:border-b-0 md:border-r border-slate-100">
              <div className="relative group mb-6">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  className="hidden" 
                  accept="image/*"
                />
                <div 
                  onClick={() => fileInputRef.current.click()}
                  className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg relative bg-slate-200 cursor-pointer"
                >
                  <Image
                    src={formData.image || "https://www.gravatar.com/avatar/?d=mp"}
                    alt="Profile"
                    fill
                    className={`object-cover transition-opacity ${uploading ? 'opacity-30' : 'group-hover:opacity-100'}`}
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaCamera className="text-white text-2xl mb-1" />
                    <span className="text-white text-[10px] font-bold uppercase tracking-tighter">Change Photo</span>
                  </div>

                  {/* Uploading Spinner */}
                  {uploading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                
                <button 
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="absolute -right-2 -bottom-2 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-sky-600 border border-slate-100 hover:scale-110 transition-transform active:scale-95"
                >
                  <FaUpload className="text-sm" />
                </button>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 text-center">{formData.name || "User"}</h3>
              <p className="text-slate-500 font-medium mb-6">{session.user.email}</p>
              
              <div className="w-full space-y-2 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-3 text-slate-600 font-bold p-3 bg-white rounded-2xl shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Active Account
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="flex-1 p-8 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                    <div className="relative group">
                      <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center text-slate-400 group-focus-within:text-[#0069a8] transition-colors">
                        <FaUser />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-[#0069a8] outline-none transition-all font-medium text-slate-900"
                      />
                    </div>
                  </div>

                  {/* Email (Readonly) */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 ml-1">Email Address (Primary)</label>
                    <div className="relative">
                      <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center text-slate-300">
                        <FaEnvelope />
                      </div>
                      <input
                        type="email"
                        value={session.user.email}
                        disabled
                        className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl cursor-not-allowed opacity-60 font-medium text-slate-400"
                      />
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email cannot be changed</p>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                    <div className="relative group">
                      <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center text-slate-400 group-focus-within:text-[#0069a8] transition-colors">
                        <FaPhone />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+880 1XXX-XXXXXX"
                        className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-[#0069a8] outline-none transition-all font-medium text-slate-900"
                      />
                    </div>
                  </div>

                  {/* Image URL */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Profile Image URL</label>
                    <div className="relative group">
                      <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center text-slate-400 group-focus-within:text-[#0069a8] transition-colors">
                        <FaLink />
                      </div>
                      <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/avatar.jpg"
                        className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-[#0069a8] outline-none transition-all font-medium text-slate-900"
                      />
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Short Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us a little about yourself..."
                      rows="3"
                      className="w-full p-4 pl-5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-[#0069a8] outline-none transition-all font-medium text-slate-900 resize-none"
                    ></textarea>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full h-14 bg-[#0069a8] text-white rounded-2xl font-bold text-lg shadow-[0_10px_30px_-10px_rgba(0,105,168,0.5)] hover:shadow-[0_15px_35px_-10px_rgba(0,105,168,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 group disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer"
                  >
                    {saving ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Saving Changes...</span>
                      </div>
                    ) : (
                      <>
                        <FaSave />
                        <span>Save Profile Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Footnote */}
        <p className="text-center mt-8 text-slate-400 text-sm font-bold uppercase tracking-widest">
          EventFlow Secure Account Management
        </p>
      </div>
    </div>
  );
}
