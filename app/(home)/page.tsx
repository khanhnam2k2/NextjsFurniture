import { Hero } from "@/components/hero-main";
import Services from "@/components/services";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="">
        <Services />
      </div>
    </div>
  );
}
