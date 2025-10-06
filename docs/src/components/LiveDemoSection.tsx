import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Copy, Check, Shuffle, ArrowRightLeft } from "lucide-react";

declare global {
	interface Window {
		aksharamukha?: {
			process: (
				text: string,
				fromScript: string,
				toScript: string
			) => Promise<string>;
		};
	}
}

const scripts = [
	{ code: 'kaithi', value: "Kaithi", label: "𑂍𑂶𑂟𑂲 (Kaithi)", example: "𑂣𑂹𑂩𑂝𑂰𑂧𑂹" },
	{ code: 'devanagari', value: "Devanagari", label: "देवनागरी (Devanagari)", example: "प्रणाम्" },
	{ code: 'tamil', value: "Tamil", label: "தமிழ் (Tamil)", example: "வணக்கம்" },
	{ code: 'kannada', value: "Kannada", label: "ಕನ್ನಡ (Kannada)", example: "ನಮಸ್ಕಾರ" },
	{ code: 'telugu', value: "Telugu", label: "తెలుగు (Telugu)", example: "నమస్కారం" },
	{ code: 'malayalam', value: "Malayalam", label: "മലയാളം (Malayalam)", example: "നമസ്കാരം" },
	{ code: 'bengali', value: "Bengali", label: "বাংলা (Bengali)", example: "নমস্কার" },
	{ code: 'gujarati', value: "Gujarati", label: "ગુજરાતી (Gujarati)", example: "નમસ્કાર" },
	{ code: 'gurmukhi', value: "Gurmukhi", label: "ਗੁਰਮੁਖੀ (Gurmukhi)", example: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ" },
	{ code: 'oriya', value: "Oriya", label: "ଓଡ଼ିଆ (Oriya)", example: "ନମସ୍କାର" },
	{ code: 'itrans', value: "ITRANS", label: "Latin (ITRANS)", example: "namaskara" },
];

const sampleTexts = [
	"namaste",
	"dhanyavaada",
	"shubha raatri",
	"praNAm",
	"svaagatam",
	"kShamaa karie",
];

interface LiveDemoSectionProps {
	isLoaded: boolean;
}

export default function LiveDemoSection({ isLoaded }: LiveDemoSectionProps) {
	const [inputText, setInputText] = useState("praNAm.");
	const [outputText, setOutputText] = useState("");
	const [fromScript, setFromScript] = useState("itrans");
	const [toScript, setToScript] = useState("kaithi");
	const [copied, setCopied] = useState(false);
	const [isConverting, setIsConverting] = useState(false);

	const swapScripts = useCallback(() => {
		const temp = fromScript;
		setFromScript(toScript);
		setToScript(temp);
		setInputText(outputText);
	}, [fromScript, toScript, outputText]);

	const generateRandomText = useCallback(() => {
		const randomSample =
			sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
		setInputText(randomSample);
	}, []);

	useEffect(() => {
		if (isLoaded && window.aksharamukha && inputText) {
			setIsConverting(true);
			const timeoutId = setTimeout(async () => {
				try {
					const result = await window.aksharamukha?.process(
						fromScript,
						toScript,
						inputText
					);
					setOutputText(result || "");
				} catch {
					setOutputText("Error converting text");
				} finally {
					setIsConverting(false);
				}
			}, 100); // Small delay to show loading state

			return () => clearTimeout(timeoutId);
		}
	}, [inputText, fromScript, toScript, isLoaded]);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(outputText);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<section
			id="demo"
			className="min-h-screen flex items-center justify-center border-b border-gray-200/30 dark:border-gray-700/30 bg-gradient-to-b from-teal-50/30 to-background dark:from-teal-950/10 dark:to-background relative overflow-hidden"
		>
			{/* Animated background elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-300/20 dark:bg-teal-600/10 rounded-full blur-3xl animate-pulse" />
				<div
					className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-400/15 dark:bg-teal-700/8 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: "3s" }}
				/>
			</div>

			<div className="container mx-auto px-4 py-12 relative z-10">
				<div className="mx-auto max-w-6xl">
					<div className="text-center mb-12">
						<h2 className="text-4xl lg:text-5xl font-bold text-teal-700 dark:text-teal-400 font-sans mb-4">
							Live Demo
						</h2>
						<p className="text-xl text-muted-foreground font-sans mb-6">
							Try transliterating text between different scripts
							instantly
						</p>

						{/* Quick action buttons */}
						<div className="flex justify-center gap-3 mb-8">
							<Button
								onClick={generateRandomText}
								variant="outline"
								size="sm"
								className="border-teal-200 text-teal-700 hover:bg-teal-50 dark:border-teal-800 dark:text-teal-400 dark:hover:bg-teal-950/30"
							>
								<Shuffle className="w-4 h-4 mr-2" />
								Random
							</Button>
							<Button
								onClick={swapScripts}
								variant="outline"
								size="sm"
								className="border-teal-200 text-teal-700 hover:bg-teal-50 dark:border-teal-800 dark:text-teal-400 dark:hover:bg-teal-950/30"
								disabled={!outputText}
							>
								<ArrowRightLeft className="w-4 h-4 mr-2" />
								Swap
							</Button>
						</div>
					</div>
					<Card className="border-teal-200/50 dark:border-teal-800/40 bg-white/80 dark:bg-card/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
						<div className="grid gap-0 lg:grid-cols-2">
							{/* Input Section */}
							<div className="space-y-6 p-8 bg-gradient-to-br from-teal-50/30 to-teal-100/20 dark:from-teal-950/20 dark:to-teal-900/10">
								<div className="mb-4">
									<h3 className="text-lg font-semibold text-teal-700 dark:text-teal-400 mb-1">
										Input
									</h3>
									<p className="text-sm text-muted-foreground">
										Enter your text and select source script
									</p>
								</div>

								<div>
									<label className="mb-3 block text-sm font-semibold text-foreground font-sans">
										From Script
									</label>
									<Select
										value={fromScript}
										onValueChange={setFromScript}
									>
										<SelectTrigger className="border-teal-200/60 dark:border-teal-800/50 focus:border-teal-400 dark:focus:border-teal-600 focus:ring-teal-500/20 hover:border-teal-300/70 dark:hover:border-teal-700/60 transition-all duration-200">
											<SelectValue />
										</SelectTrigger>
										<SelectContent className="border-teal-200/60 dark:border-teal-800/50">
											{scripts.map((script) => (
												<SelectItem
													key={script.value}
													value={script.code}
													className="hover:bg-teal-50/80 dark:hover:bg-teal-950/50"
												>
													<div className="flex items-center gap-2">
														<span>
															{script.label}
														</span>
														<span className="text-xs text-muted-foreground font-mono">
															{script.example}
														</span>
													</div>
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div>
									<label className="mb-3 block text-sm font-semibold text-foreground font-sans">
										Input Text
									</label>
									<Textarea
										value={inputText}
										onChange={(e) =>
											setInputText(e.target.value)
										}
										placeholder="Enter text to transliterate..."
										className="min-h-[240px] border-teal-200/60 dark:border-teal-800/50 font-mono text-base focus:border-teal-400 dark:focus:border-teal-600 focus:ring-teal-500/20 hover:border-teal-300/70 dark:hover:border-teal-700/60 transition-all duration-200 resize-none"
									/>
								</div>
							</div>

							{/* Output Section */}
							<div className="space-y-6 p-8 bg-gradient-to-bl from-teal-50/20 to-teal-100/10 dark:from-teal-950/10 dark:to-teal-900/5 relative border-l border-teal-200/50 dark:border-teal-800/50">
								<div className="mb-4">
									<h3 className="text-lg font-semibold text-teal-700 dark:text-teal-400 mb-1">
										Output
									</h3>
									<p className="text-sm text-muted-foreground">
										Select target script and see results
									</p>
								</div>

								{/* Conversion indicator */}
								{isConverting && (
									<div className="absolute top-8 right-8">
										<div className="flex items-center gap-2 text-xs text-teal-600 dark:text-teal-400 bg-teal-100/80 dark:bg-teal-950/50 px-2 py-1 rounded-full">
											<div className="w-3 h-3 animate-spin rounded-full border-2 border-teal-400 border-t-transparent"></div>
											<span>Converting...</span>
										</div>
									</div>
								)}

								<div>
									<label className="mb-3 block text-sm font-semibold text-foreground font-sans">
										To Script
									</label>
									<Select
										value={toScript}
										onValueChange={setToScript}
									>
										<SelectTrigger className="border-teal-200/60 dark:border-teal-800/50 focus:border-teal-400 dark:focus:border-teal-600 focus:ring-teal-500/20 hover:border-teal-300/70 dark:hover:border-teal-700/60 transition-all duration-200">
											<SelectValue />
										</SelectTrigger>
										<SelectContent className="border-teal-200/60 dark:border-teal-800/50">
											{scripts.map((script) => (
												<SelectItem
													key={script.value}
													value={script.code}
													className="hover:bg-teal-50/80 dark:hover:bg-teal-950/50"
												>
													<div className="flex items-center gap-2">
														<span>
															{script.label}
														</span>
														<span className="text-xs text-muted-foreground font-mono">
															{script.example}
														</span>
													</div>
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div className="relative">
									<label className="mb-3 block text-sm font-semibold text-foreground font-sans">
										Result
									</label>

									<div className="relative group">
										{/* Hover copy button */}
										{outputText && (
											<Button
												size="sm"
												variant="ghost"
												onClick={handleCopy}
												className={`absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 ${
													copied
														? "bg-green-100/90 dark:bg-green-900/40 text-green-700 dark:text-green-400"
														: "bg-white/90 dark:bg-card/90 text-teal-700 dark:text-teal-400 hover:bg-teal-100/90 dark:hover:bg-teal-900/40 shadow-sm"
												}`}
											>
												{copied ? (
													<>
														<Check className="w-3.5 h-3.5 mr-1" />
														Copied!
													</>
												) : (
													<>
														<Copy className="w-3.5 h-3.5 mr-1" />
														Copy
													</>
												)}
											</Button>
										)}

										<div
											className="min-h-[240px] rounded-lg border border-teal-200/60 dark:border-teal-800/50 bg-gradient-to-br from-teal-50/50 to-teal-100/30 dark:from-teal-950/20 dark:to-teal-900/10 p-6 font-mono text-lg leading-relaxed backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:border-teal-300/70 dark:hover:border-teal-700/60 cursor-pointer"
											onClick={handleCopy}
										>
											{isLoaded ? (
												<>
													{outputText ? (
														<div className="text-foreground">
															{outputText}
														</div>
													) : (
														<div className="flex items-center justify-center h-full">
															<span className="text-muted-foreground italic">
																Enter text to
																see the
																transliteration...
															</span>
														</div>
													)}
												</>
											) : (
												<div className="flex items-center justify-center h-full">
													<div className="flex items-center gap-3 text-muted-foreground">
														<div className="h-5 w-5 animate-spin rounded-full border-2 border-teal-400 border-t-transparent"></div>
														<span className="animate-pulse">
															Loading
															transliteration
															engine...
														</span>
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</section>
	);
}
