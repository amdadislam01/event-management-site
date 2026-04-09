import React from "react";
import { FaSearch, FaRegCreditCard, FaTicketAlt } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearch className="text-3xl text-white" />,
      title: "Discover Events",
      description: "Browse through a variety of upcoming events that match your interests.",
      color: "bg-sky-500",
    },
    {
      icon: <FaRegCreditCard className="text-3xl text-white" />,
      title: "Book Tickets",
      description: "Secure your spot instantly with our fast and secure booking system.",
      color: "bg-cyan-500",
    },
    {
      icon: <FaTicketAlt className="text-3xl text-white" />,
      title: "Attend & Enjoy",
      description: "Receive your ticket and enjoy a seamless experience at the venue.",
      color: "bg-blue-600",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Booking your favorite events has never been easier. Follow these three simple steps to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-sky-100 -translate-y-8 z-0" />
          
          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center text-center">
              <div className={`${step.color} w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg mb-8 transform hover:rotate-12 transition-transform duration-300`}>
                {step.icon}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-white border-4 border-sky-50 rounded-full flex items-center justify-center text-sky-600 font-bold text-sm">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed px-4">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
