import React from "react";
import {
  FaCalendarAlt,
  FaTicketAlt,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaCalendarAlt size={40} className="text-[#0069a8]" />,
      title: "Event Scheduling",
      description:
        "Plan and schedule events easily with our intuitive calendar.",
    },
    {
      icon: <FaTicketAlt size={40} className="text-[#0069a8]" />,
      title: "Ticket Management",
      description:
        "Sell, manage, and track tickets seamlessly for all your events.",
    },
    {
      icon: <FaUsers size={40} className="text-[#0069a8]" />,
      title: "Attendee Tracking",
      description:
        "Keep track of all participants and manage attendance efficiently.",
    },
    {
      icon: <FaChartLine size={40} className="text-[#0069a8]" />,
      title: "Analytics & Reports",
      description:
        "Get detailed reports and analytics for better event insights.",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#0069a8] mb-12">
          Our Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow-md hover:shadow-lg hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-[#0092b8]">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
