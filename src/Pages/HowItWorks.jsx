import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      title: "Join a Challenge",
      description:
        "Browse and join eco-friendly challenges to start your sustainable journey.",
      icon: "🌱",
    },
    {
      title: "Track Progress",
      description:
        "Monitor your environmental impact with real-time progress updates.",
      icon: "📊",
    },
    {
      title: "Share Tips",
      description:
        "Inspire others by sharing your eco-tips with the community.",
      icon: "💡",
    },
  ];

  return (
    <section className="py-12 bg-base-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="card bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="card-body text-center">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-green-600 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
