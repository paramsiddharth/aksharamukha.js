"use client";

import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExamplesSection from "@/components/ExamplesSection";
import LiveDemoSection from "@/components/LiveDemoSection";
import QuickStartSection from "@/components/QuickStartSection";
import Footer from "@/components/Footer";

export default function AksharamukhaPage() {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const script = document.createElement("script");
		script.src =
			"https://cdn.jsdelivr.net/npm/aksharamukha@latest/dist/index.global.js";
		script.async = true;
		script.onload = () => setIsLoaded(true);
		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);

	const scrollToDemo = () => {
		document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div>
			<HeroSection onGetStartedClick={scrollToDemo} />
			<AboutSection />
			<ExamplesSection />
			<LiveDemoSection isLoaded={isLoaded} />
			<QuickStartSection />
			<Footer />
		</div>
	);
}
