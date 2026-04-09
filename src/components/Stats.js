import React from "react";
import { FaCalendarCheck, FaRegSmile, FaUserTie, FaGlobeAmericas } from "react-icons/fa";

const Stats = () => {
  const stats = [
    {
      icon: <FaCalendarCheck className="text-4xl text-sky-500 mb-4" />,
      value: "1,200+",
      label: "Events Hosted",
    },
    {
      icon: <FaRegSmile className="text-4xl text-sky-500 mb-4" />,
      value: "50k+",
      label: "Happy Attendees",
    },
    {
      icon: <FaUserTie className="text-4xl text-sky-500 mb-4" />,
      value: "300+",
      label: "Professional Organizers",
    },
    {
      icon: <FaGlobeAmericas className="text-4xl text-sky-500 mb-4" />,
      value: "25+",
      label: "Countries Reached",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="p-3 bg-sky-50 rounded-full mb-2">
                {stat.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
