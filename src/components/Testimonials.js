import Image from "next/image";
import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      name: "MD Amdad Islam",
      role: "Event Organizer",
      feedback:
        "This platform made managing my events incredibly easy and professional!",
      avatar: "https://avatars.githubusercontent.com/u/195456266?v=4",
    },
    {
      name: "MD Zahidul Islam",
      role: "Attendee",
      feedback:
        "Booking tickets was seamless, and I loved the analytics features for events.",
      avatar: "https://avatars.githubusercontent.com/u/92626624?v=4",
    },
    {
      name: "Md Riyaz Akondo",
      role: "Corporate Client",
      feedback:
        "The event scheduling and attendee tracking saved us hours of work.",
      avatar: "https://avatars.githubusercontent.com/u/209346122?v=4",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#0069a8] mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="relative w-14 h-14 mr-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="rounded-full border-2 border-[#0069a8]"
                    fill
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0092b8]">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 relative pl-8">
                <FaQuoteLeft className="absolute left-0 top-0 text-[#0069a8] text-xl" />
                {testimonial.feedback}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
