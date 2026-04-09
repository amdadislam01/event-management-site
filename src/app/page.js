import Features from "@/components/Features";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Newsletter from "@/components/Newsletter";
import RecentEvents from "@/components/RecentEvents";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";


export default function Home() {
  return (
    <>
      <Hero />
      <RecentEvents />
      <HowItWorks />
      <Features />
      <Stats />
      <Testimonials />
      <Newsletter />
    </>
  );
}
