import { Button } from "@/components/ui/button";
import {
	Github,
	ArrowRight,
	Languages,
	Globe,
	Zap,
	Shield,
	Users,
} from "lucide-react";

interface HeroSectionProps {
	onGetStartedClick: () => void;
}

export default function HeroSection({ onGetStartedClick }: HeroSectionProps) {
	return (
		<section className="relative overflow-hidden h-screen flex items-center justify-center border-b border-gray-200/30 dark:border-gray-700/30 bg-gradient-to-br from-background via-teal-50/20 to-cyan-50/20 dark:from-background dark:via-teal-950/10 dark:to-cyan-950/10">
			{/* Background elements */}
			<div className="absolute inset-0 bg-grid-pattern opacity-40" />

			{/* Floating script characters */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				<div className="absolute top-1/4 left-1/4 text-6xl text-teal-200/30 dark:text-teal-800/20 animate-pulse font-serif">
					प्र
				</div>
				<div className="absolute top-3/4 right-1/4 text-5xl text-cyan-200/30 dark:text-cyan-800/20 animate-pulse delay-1000 font-serif">
					நம
				</div>
				<div className="absolute top-1/2 left-1/6 text-4xl text-emerald-200/30 dark:text-emerald-800/20 animate-pulse delay-2000 font-serif">
					ನಮ್
				</div>
				<div className="absolute bottom-1/4 right-1/6 text-5xl text-purple-200/30 dark:text-purple-800/20 animate-pulse delay-1500 font-serif">
					নম
				</div>
				<div className="absolute top-1/3 right-1/3 text-4xl text-orange-200/30 dark:text-orange-800/20 animate-pulse delay-500 font-serif">
					కార
				</div>
			</div>
			<div className="container relative mx-auto px-4">
				<div className="mx-auto max-w-6xl">
					{/* Top badges */}
					<div className="flex flex-wrap items-center justify-center gap-3 mb-8">
						<div className="inline-flex items-center gap-2 rounded-full border border-teal-300/50 dark:border-teal-700/50 bg-teal-100/60 dark:bg-teal-900/30 px-4 py-2 text-sm font-medium text-teal-700 dark:text-teal-300 shadow-sm font-sans">
							<Languages className="h-4 w-4" />
							Open Source
						</div>
						<div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/50 dark:border-cyan-700/50 bg-cyan-100/60 dark:bg-cyan-900/30 px-4 py-2 text-sm font-medium text-cyan-700 dark:text-cyan-300 shadow-sm font-sans">
							<Globe className="h-4 w-4" />
							100+ Scripts Supported
						</div>
						<div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/50 dark:border-emerald-700/50 bg-emerald-100/60 dark:bg-emerald-900/30 px-4 py-2 text-sm font-medium text-emerald-700 dark:text-emerald-300 shadow-sm font-sans">
							<Zap className="h-4 w-4" />
							Robust
						</div>
					</div>

					{/* Main content */}
					<div className="text-center">
						<h1 className="mb-6 text-balance bg-gradient-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-7xl leading-tight font-sans">
							Aksharamukha.js
						</h1>
						<p className="mb-4 text-pretty text-xl text-muted-foreground sm:text-2xl leading-relaxed font-normal font-sans max-w-4xl mx-auto">
							Transliterate text between 40+ Indic scripts — instantly,
							accurately, and completely offline in your browser.
						</p>

						{/* Enhanced description */}
						<p className="mb-8 text-base text-muted-foreground/80 font-sans max-w-3xl mx-auto leading-relaxed">
							Convert text between Devanagari, Tamil, Telugu,
							Kannada, Malayalam, Bengali, Gujarati, and many more
							scripts. No server required — everything runs
							locally for privacy and speed.
						</p>

						{/* Action buttons */}
						<div className="flex flex-wrap items-center justify-center gap-4 mb-12">
							<Button
								size="lg"
								onClick={onGetStartedClick}
								className="group bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 shadow-md hover:shadow-lg transition-all font-sans"
							>
								Try Live Demo
								<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="border-teal-300/60 dark:border-teal-700/60 hover:border-teal-400 dark:hover:border-teal-600 hover:bg-teal-50 dark:hover:bg-teal-950/30 bg-transparent shadow-sm font-sans"
								asChild
							>
								<a
									href="https://github.com/paramsiddharth/aksharamukha.js"
									target="_blank"
								>
									<Github className="mr-2 h-4 w-4" />
									View on GitHub
								</a>
							</Button>
						</div>

						{/* Stats */}
						<div className="mt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground font-sans">
							<div className="flex items-center gap-2">
								<Users className="h-4 w-4" />
								<span>Trusted by developers</span>
							</div>
							<div className="flex items-center gap-2">
								<Globe className="h-4 w-4" />
								<span>100+ scripts supported</span>
							</div>
							<div className="flex items-center gap-2">
								<Shield className="h-4 w-4" />
								<span>100% offline capable</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
