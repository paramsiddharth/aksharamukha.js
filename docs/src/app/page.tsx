"use client";

import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExamplesSection from "@/components/ExamplesSection";
import LiveDemoSection from "@/components/LiveDemoSection";
import QuickStartSection from "@/components/QuickStartSection";
import Footer from "@/components/Footer";

export default function AksharamukhaPage() {
	const scrollToDemo = () => {
		document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div>
			<HeroSection onGetStartedClick={scrollToDemo} />
			<AboutSection />
			<ExamplesSection/>
			<LiveDemoSection/>
			<QuickStartSection />
			<Footer />
		</div>
	);
}
