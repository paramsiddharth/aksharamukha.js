import ScriptShowcase from "./ScriptShowcase";

export default function ExamplesSection() {
	return (
		<section className="min-h-screen flex items-center justify-center border-b border-gray-200/30 dark:border-gray-700/30 bg-gradient-to-b from-background to-teal-50/30 dark:to-teal-950/10 py-8 sm:py-16">
			<div className="container mx-auto px-4 w-full">
				<div className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
					{/* Quick example preview moved from HeroSection */}
					<div className="max-w-3xl mx-auto">
						<div className="text-center mb-4 sm:mb-6">
							<h2 className="text-xl sm:text-2xl font-bold text-teal-700 dark:text-teal-400 font-sans mb-2">
								See It In Action
							</h2>
							<p className="text-sm sm:text-base text-muted-foreground font-sans">
								Watch how text transforms between different
								scripts
							</p>
						</div>
						<div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-teal-200/50 dark:border-teal-800/40 shadow-lg">
							<div className="text-xs sm:text-sm text-muted-foreground mb-3 font-sans font-medium text-center">
								Live Examples:
							</div>
							<div className="font-mono text-xs sm:text-sm bg-teal-50/50 dark:bg-teal-950/50 rounded-lg p-3 sm:p-4 border border-teal-200/30 dark:border-teal-800/30 space-y-2 sm:space-y-3">
								<div className="text-center">
									<div className="text-teal-700 dark:text-teal-400 mb-1 break-all sm:break-normal">
										&ldquo;praNAm&rdquo; →
										&ldquo;प्रणाम्&rdquo;
									</div>
									<div className="text-xs text-muted-foreground">
										Latin → Devanagari
									</div>
								</div>
								<div className="text-center">
									<div className="text-cyan-700 dark:text-cyan-400 mb-1 break-all sm:break-normal">
										&ldquo;namaste&rdquo; →
										&ldquo;নমস্তে&rdquo; →
										&ldquo;నమస్తే&rdquo;
									</div>
									<div className="text-xs text-muted-foreground">
										Latin → Bengali → Telugu
									</div>
								</div>
								<div className="text-center">
									<div className="text-emerald-700 dark:text-emerald-400 mb-1 break-all sm:break-normal">
										&ldquo;vanakkam&rdquo; →
										&ldquo;வணக்கம்&rdquo; →
										&ldquo;ವಣಕ್ಕಮ್&rdquo;
									</div>
									<div className="text-xs text-muted-foreground">
										Latin → Tamil → Kannada
									</div>
								</div>
							</div>
						</div>
					</div>
					<ScriptShowcase isLoaded={true} />
				</div>
			</div>
		</section>
	);
}
