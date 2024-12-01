import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { BellRing, ChartNetwork, ListChecks } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </>
  );
};

export default Landing;

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-8">
      <div className="text-xl font-semibold text-primary">submate</div>
      <ModeToggle />
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="py-16 px-8 flex flex-col items-center gap-2">
      <h1 className="w-full text-center text-xl md:text-2xl font-bold mb-4 text-primary">
        Manage Your Subscriptions Seamlessly
      </h1>
      <p className="text-base text-center md:text-lg mb-6">
        Stay on top of your subscriptions with reminders, payment tracking, and
        more.
      </p>
      <Link to="/me">
        <Button>Get Started</Button>
      </Link>
      <img src="images/1.png" className="w-[75vw] border my-5" alt="" />
    </section>
  );
};

const Features = () => {
  const features = [
    {
      title: "Track Subscriptions",
      description: "Keep a detailed log of all your active subscriptions.",
      icon: <ListChecks className="h-20 w-20" />,
    },
    {
      title: "Payment Reminders",
      description: "Never miss a payment with customizable reminders.",
      icon: <BellRing className="h-20 w-20" />,
    },
    {
      title: "Expense Insights",
      description: "Analyze your spending habits across subscriptions.",
      icon: <ChartNetwork className="h-20 w-20" />,
    },
  ];

  return (
    <section id="features" className="py-16 px-8">
      <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 rounded-lg text-center flex flex-col items-center"
          >
            <p className="mb-5">{feature.icon}</p>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-6 text-center">
      <p>&copy; 2024 Submate. All Rights Reserved.</p>
    </footer>
  );
};
