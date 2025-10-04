"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import InstallationTabs from "@/components/InstallationTabs";

export default function QuickStartSection() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	return (
		<section className="min-h-screen flex items-center justify-center border-b border-gray-200/30 dark:border-gray-700/30 bg-gradient-to-b from-background via-teal-50/20 to-teal-100/30 dark:from-background dark:via-teal-950/10 dark:to-teal-950/20 relative overflow-hidden">
			{/* Animated background elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-300/20 dark:bg-teal-600/10 rounded-full blur-3xl animate-pulse" />
				<div
					className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: "2s" }}
				/>
			</div>

			<div className="container mx-auto px-4 py-8 relative z-10">
				<div className="mx-auto max-w-6xl">
					{/* Enhanced Header */}
					<div
						className={`mb-12 text-center transition-all duration-1000 ${
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-10"
						}`}
					>
						<h2 className="mb-4 text-4xl lg:text-5xl font-bold text-teal-700 dark:text-teal-400 font-sans">
							Quick Start
						</h2>
						<p className="text-xl text-muted-foreground font-sans mb-6">
							Get up and running in seconds
						</p>
					</div>

					{/* Enhanced Card */}
					<Card
						className={`border-teal-200/50 dark:border-teal-800/40 bg-white/90 dark:bg-card/90 backdrop-blur-sm shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 ${
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-10"
						}`}
					>
						<InstallationTabs />
					</Card>
				</div>
			</div>
		</section>
	);
}
