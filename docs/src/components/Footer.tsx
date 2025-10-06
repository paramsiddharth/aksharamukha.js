import { Github, Heart, BookOpen, Globe, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Footer() {
	return (
		<footer className="border-t border-gray-200/30 dark:border-gray-700/30 bg-gradient-to-b from-teal-50/30 to-teal-100/20 dark:from-teal-950/10 dark:to-teal-950/20 py-16">
			<div className="container mx-auto px-4">
				<div className="mx-auto max-w-7xl">
					{/* Main Footer Content */}
					<div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2">
						{/* About Section */}
						<div className="lg:col-span-2">
							<h3 className="text-xl font-bold text-teal-700 dark:text-teal-400 font-sans mb-4">
								Aksharamukha.js
							</h3>
							<p className="text-muted-foreground font-sans leading-relaxed mb-6">
								A powerful, browser-compatible transliteration
								library for Indic scripts. Convert text between
								100+ writing systems instantly, with complete
								privacy and offline capability.
							</p>
							<div className="flex flex-wrap gap-3">
								<Button
									size="sm"
									className="bg-teal-600 hover:bg-teal-700 text-white font-sans"
									asChild
								>
									<a
										href="https://github.com/paramsiddharth/aksharamukha.js"
										target="_blank"
									>
										<Github className="mr-2 h-4 w-4" />
										Star on GitHub
									</a>
								</Button>
								<Button
									size="sm"
									variant="outline"
									className="border-teal-300 dark:border-teal-700 hover:bg-teal-50 dark:hover:bg-teal-950/30 font-sans"
									asChild
								>
									<a href="#demo">Try Demo</a>
								</Button>
							</div>
						</div>

						{/* Quick Links */}
						<div>
							<h4 className="text-lg font-semibold text-foreground font-sans mb-4">
								Resources
							</h4>
							<ul className="space-y-3 font-sans">
								<li>
									<a
										href="https://www.aksharamukha.com/converter"
										target="_blank"
										className="flex items-center gap-2 text-muted-foreground hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
									>
										<Globe className="h-4 w-4" />
										Aksharamukha
									</a>
								</li>
								<li>
									<a
										href="https://github.com/virtualvinodh/aksharamukha-python"
										target="_blank"
										className="flex items-center gap-2 text-muted-foreground hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
									>
										<Code2 className="h-4 w-4" />
										Engine
									</a>
								</li>
								<li>
									<a
										href="https://github.com/paramsiddharth/aksharamukha.js/blob/main/README.md"
										target="_blank"
										className="flex items-center gap-2 text-muted-foreground hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
									>
										<BookOpen className="h-4 w-4" />
										Documentation
									</a>
								</li>
							</ul>
						</div>

						{/* Stats & Info */}
						<div>
							<h4 className="text-lg font-semibold text-foreground font-sans mb-4">
								Features
							</h4>
							<div className="space-y-3">
								<Card className="p-3 border-teal-200/50 dark:border-teal-800/40 bg-white/50 dark:bg-card/50">
									<div className="text-sm font-sans">
										<div className="text-teal-700 dark:text-teal-400 font-semibold mb-1">
											100+ Scripts
										</div>
										<div className="text-muted-foreground text-xs">
											Comprehensive support for Indic
											writing systems
										</div>
									</div>
								</Card>
								<Card className="p-3 border-teal-200/50 dark:border-teal-800/40 bg-white/50 dark:bg-card/50">
									<div className="text-sm font-sans">
										<div className="text-teal-700 dark:text-teal-400 font-semibold mb-1">
											100% Offline
										</div>
										<div className="text-muted-foreground text-xs">
											No server required, entirely in the browser
										</div>
									</div>
								</Card>
							</div>
						</div>
					</div>

					{/* Divider */}
					<div className="my-8 border-t border-teal-200/30 dark:border-teal-800/30"></div>

					{/* Bottom Section */}
					<div className="flex flex-col md:flex-row items-center justify-between gap-4">
						<div className="text-center md:text-left">
							<p className="text-sm text-muted-foreground font-sans mb-2">
								Inspired by the original{" "}
								<a
									href="https://www.aksharamukha.com/converter"
									target="_blank"
									className="font-semibold text-teal-700 dark:text-teal-400 transition-colors hover:text-teal-800 dark:hover:text-teal-300 underline decoration-teal-300 dark:decoration-teal-700 underline-offset-4"
								>
									Aksharamukha
								</a>{" "}
								by <a href="http://virtualvinodh.com/" target="_blank" className="font-semibold text-teal-700 dark:text-teal-400 transition-colors hover:text-teal-800 dark:hover:text-teal-300 underline decoration-teal-300 dark:decoration-teal-700 underline-offset-4">Vinodh Rajan</a>.
							</p>
							<p className="text-xs text-muted-foreground/75 font-sans">
								Made with{" "}
								<Heart className="inline h-3 w-3 text-red-500" />{" "}
								by{" "}
								<a
									href="https://www.paramsid.com"
									target="_blank"
									className="font-semibold text-teal-700 dark:text-teal-400 transition-colors hover:text-teal-800 dark:hover:text-teal-300 underline decoration-teal-300 dark:decoration-teal-700 underline-offset-4"
								>
									Param
								</a>,{" "}
								for the preservation of Indic scripts.
							</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
