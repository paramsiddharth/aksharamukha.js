"use client";

import React, { useEffect, useState } from "react";

declare global {
	interface Window {
		aksharamukha?: {
			convert: (
				text: string,
				fromScript: string,
				toScript: string
			) => Promise<string>;
		};
	}
}

type Example = {
	label: string; // short label like "ITRANS → Telugu"
	fromScript: string;
	toScript: string;
	source: string;
	expected: string;
};

const EXAMPLES: Example[] = [
	{
		label: "ITRANS → Telugu",
		fromScript: "ITRANS",
		toScript: "Telugu",
		source: "rAma",
		expected: "రామ",
	},
	{
		label: "Harvard-Kyoto → Siddham",
		fromScript: "Harvard-Kyoto",
		toScript: "Siddham",
		source: "buddhaH",
		expected: "𑖤𑖲𑖟𑖿𑖠𑖾",
	},
	{
		label: "Devanagari → Malayalam",
		fromScript: "Devanagari",
		toScript: "Malayalam",
		source: "धर्म",
		expected: "ധര്മ",
	},
];

export default function ScriptShowcase({ isLoaded }: { isLoaded: boolean }) {
	const [index, setIndex] = useState<number>(0);
	const [converted, setConverted] = useState<string>(EXAMPLES[0].expected);
	const [loading, setLoading] = useState<boolean>(false);
	const cycleInterval = 4000;

	// perform conversion for the current example
	useEffect(() => {
		let mounted = true;
		async function doConvert() {
			const ex = EXAMPLES[index];
			// show expected immediately if not loaded to avoid blank UI
			if (!isLoaded || !window?.aksharamukha?.convert) {
				setConverted(ex.expected);
				setLoading(false);
				return;
			}

			setLoading(true);
			try {
				const out = await window.aksharamukha!.convert(
					ex.source,
					ex.fromScript,
					ex.toScript
				);
				if (!mounted) return;
				// defensive: some conversions may return empty; fallback to expected
				setConverted(out && out.trim().length > 0 ? out : ex.expected);
			} catch {
				// fallback to expected result on any failure
				if (mounted) setConverted(ex.expected);
			} finally {
				if (mounted) setLoading(false);
			}
		}

		doConvert();
		return () => {
			mounted = false;
		};
	}, [index, isLoaded]);

	useEffect(() => {
		const t = setInterval(() => {
			setIndex((i) => (i + 1) % EXAMPLES.length);
		}, cycleInterval);
		return () => clearInterval(t);
	}, []);

	const goTo = (i: number) => {
		setIndex(i);
	};

	const current = EXAMPLES[index];

	return (
		<div className="mt-16 max-w-4xl mx-auto px-4">
			<div className="text-center mb-6">
				<h3 className="text-2xl font-semibold text-foreground mb-2 font-sans">
					Live Transliteration
				</h3>
				<p className="text-sm text-muted-foreground font-sans">
					Examples from unit tests — automatic transliteration using
					Aksharamukha.
				</p>
			</div>

			<div
				className="bg-white/40 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-5 border border-teal-200/30 dark:border-teal-800/30 transition-shadow shadow-sm"
				role="region"
				aria-label="Live transliteration showcase"
			>
				<div className="flex items-center justify-between mb-4 gap-3">
					<div className="flex items-center gap-3">
						<span className="text-xs font-medium text-teal-700 dark:text-teal-300 uppercase tracking-wide font-sans">
							{current.label}
						</span>
						<span className="text-xs text-muted-foreground font-sans">
							•
						</span>
						<span className="text-xs text-muted-foreground font-sans">
							Example #{index + 1} of {EXAMPLES.length}
						</span>
					</div>

					{/* loading indicator */}
					<div className="flex items-center gap-2">
						{loading ? (
							<span
								className="inline-flex items-center justify-center w-6 h-6 rounded-full border-2 border-t-transparent border-teal-600 animate-spin"
								aria-hidden
							/>
						) : (
							<span className="text-xs text-teal-700 dark:text-teal-300 font-sans">
								Ready
							</span>
						)}
					</div>
				</div>

				{/* 3-column layout: source → arrow → target */}
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center text-center">
					{/* source */}
					<div className="p-4 rounded-xl border border-teal-100/40 dark:border-teal-800/30 bg-white/30 dark:bg-gray-900/30">
						<div className="text-xs text-teal-700 dark:text-teal-300 font-sans mb-1">
							Source
						</div>
						<div className="text-2xl font-serif break-words">
							{current.source}
						</div>
					</div>

					{/* arrow */}
					<div className="flex flex-col items-center justify-center p-2">
						<svg
							className="w-10 h-10"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden
						>
							<path
								d="M3 12h14"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="text-teal-600"
							/>
							<path
								d="M13 6l6 6-6 6"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="text-teal-600"
							/>
						</svg>
						<div className="text-xs text-muted-foreground font-sans mt-1">
							Transliteration
						</div>
					</div>

					{/* target */}
					<div className="p-4 rounded-xl border border-teal-100/40 dark:border-teal-800/30 bg-white/30 dark:bg-gray-900/30">
						<div className="flex items-center justify-center gap-2 mb-1">
							<div className="text-xs text-teal-700 dark:text-teal-300 font-sans">
								Target
							</div>
							<div className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-200 font-medium">
								{" "}
								{current.toScript}{" "}
							</div>
						</div>

						{/* show spinner or converted text; fallback handled in state */}
						<div className="text-2xl font-serif min-h-[3rem] flex items-center justify-center break-words">
							{loading ? (
								<>
									{/* subtle text while converting */}
									<span className="opacity-70 text-sm text-muted-foreground font-sans mr-3">
										Converting…
									</span>
									<span
										className="inline-flex items-center justify-center w-6 h-6 rounded-full border-2 border-t-transparent border-teal-600 animate-spin"
										aria-hidden
									/>
								</>
							) : (
								<span>{converted}</span>
							)}
						</div>

						{/* small note about fallback */}
						<div className="mt-2 text-xs text-muted-foreground font-sans">
							{!isLoaded
								? "Aksharamukha not loaded — showing expected result."
								: loading
								? "Running conversion…"
								: "Conversion result (falls back to expected on failure)."}
						</div>
					</div>
				</div>

				{/* progress dots */}
				<div className="mt-4 flex items-center justify-center gap-3">
					{EXAMPLES.map((_, i) => {
						const active = i === index;
						return (
							<button
								key={i}
								aria-label={`Go to example ${i + 1}`}
								onClick={() => goTo(i)}
								className={`w-3 h-3 rounded-full transition-transform focus:outline-none ${
									active
										? "scale-125 bg-teal-600 shadow-md"
										: "bg-teal-200/60 dark:bg-teal-800/40 hover:scale-110"
								}`}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
