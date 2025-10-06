import { Card } from "@/components/ui/card";
import { Code2, Shield, Star } from "lucide-react";

export default function AboutSection() {
	return (
		<section className="min-h-screen flex items-center justify-center border-b border-gray-200/30 dark:border-gray-700/30 bg-gradient-to-b from-teal-50/30 to-background dark:from-teal-950/10 dark:to-background py-8 sm:py-16">
			<div className="container mx-auto px-4 w-full">
				<div className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
					{/* Main About Card */}
					<Card className="border-teal-200/50 dark:border-teal-800/40 bg-white/80 dark:bg-card/80 p-4 sm:p-6 lg:p-8 backdrop-blur-sm transition-all hover:border-teal-300/70 dark:hover:border-teal-700/60 hover:shadow-xl hover:shadow-teal-500/5">
						<div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
							<div className="rounded-xl bg-teal-100/80 dark:bg-teal-900/30 p-3 sm:p-4 shadow-sm flex-shrink-0">
								<Code2 className="h-6 w-6 sm:h-7 sm:w-7 text-teal-700 dark:text-teal-400" />
							</div>
							<div className="flex-1 min-w-0">
								<h2 className="mb-3 text-xl sm:text-2xl font-bold text-teal-700 dark:text-teal-400 font-sans">
									About Aksharamukha.js
								</h2>
								<p className="text-pretty text-base sm:text-lg leading-relaxed text-muted-foreground font-sans mb-3 sm:mb-4">
									A browser-compatible version of
									Aksharamukha, the world&rsquo;s most
									comprehensive transliteration tool for Indic
									scripts. Convert text between Devanagari,
									Tamil, Telugu, Kannada, Malayalam, Bengali,
									Gujarati, and many more scripts.
								</p>
								<p className="text-pretty text-sm sm:text-base leading-relaxed text-muted-foreground/80 font-sans">
									No server required — everything runs locally
									for privacy and speed. Perfect for
									developers, researchers, and anyone working
									with multiple Indic writing systems.
								</p>
							</div>
						</div>
					</Card>

					{/* Feature highlights moved from HeroSection */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
						<div className="group bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-teal-200/50 dark:border-teal-800/40 hover:border-teal-300/70 dark:hover:border-teal-700/60 transition-all hover:shadow-lg hover:shadow-teal-500/10">
							<div className="mb-3 sm:mb-4 flex items-center justify-center">
								<div className="rounded-xl bg-teal-100/80 dark:bg-teal-900/30 p-2 sm:p-3 group-hover:scale-110 transition-transform">
									<Shield className="h-5 w-5 sm:h-6 sm:w-6 text-teal-700 dark:text-teal-400" />
								</div>
							</div>
							<h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 font-sans">
								Privacy First
							</h3>
							<p className="text-sm text-muted-foreground font-sans leading-relaxed">
								All processing happens in your browser. Your
								text never leaves your device.
							</p>
						</div>

						<div className="group bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-cyan-200/50 dark:border-cyan-800/40 hover:border-cyan-300/70 dark:hover:border-cyan-700/60 transition-all hover:shadow-lg hover:shadow-cyan-500/10">
							<div className="mb-3 sm:mb-4 flex items-center justify-center">
								<div className="rounded-xl bg-cyan-100/80 dark:bg-cyan-900/30 p-2 sm:p-3 group-hover:scale-110 transition-transform">
									<Code2 className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-700 dark:text-cyan-400" />
								</div>
							</div>
							<h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 font-sans">
								Developer Friendly
							</h3>
							<p className="text-sm text-muted-foreground font-sans leading-relaxed">
								Easy to integrate with just a CDN link or npm
								package. TypeScript ready.
							</p>
						</div>

						<div className="group bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-emerald-200/50 dark:border-emerald-800/40 hover:border-emerald-300/70 dark:hover:border-emerald-700/60 transition-all hover:shadow-lg hover:shadow-emerald-500/10">
							<div className="mb-3 sm:mb-4 flex items-center justify-center">
								<div className="rounded-xl bg-emerald-100/80 dark:bg-emerald-900/30 p-2 sm:p-3 group-hover:scale-110 transition-transform">
									<Star className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-700 dark:text-emerald-400" />
								</div>
							</div>
							<h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 font-sans">
								Production Ready
							</h3>
							<p className="text-sm text-muted-foreground font-sans leading-relaxed">
								Based on the proven Aksharamukha engine, trusted
								by thousands of users.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
