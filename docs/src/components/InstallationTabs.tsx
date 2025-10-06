"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy, Play, Package, Download } from "lucide-react";

const installMethods = [
	{
		id: "cdn",
		label: "CDN",
		icon: <Play className="w-4 h-4" />,
		description: "Quick setup with script tag",
		code: `<!DOCTYPE html>
<html lang='en'>
<head>
	<title>Aksharamukha Demo</title>
	<script src='https://cdn.jsdelivr.net/npm/aksharamukha@latest/dist/index.global.js'></script>
</head>
<body>
	<script type='module'>
		const aksharamukha = await Aksharamukha.new();
		const transliterated = await aksharamukha.process(
			'autodetect',
			'Devanagari',
			'praNAm.'
		);
		console.log(transliterated); // प्रणाम्
	</script>
</body>
</html>`,
	},
	{
		id: "npm",
		label: "NPM",
		icon: <Package className="w-4 h-4" />,
		description: "Install via npm package manager",
		code: `# Install the package
npm install aksharamukha

# Usage in your project
import { Aksharamukha } from 'aksharamukha';

const aksharamukha = await Aksharamukha.new();
const result = await aksharamukha.process(
  'autodetect',
  'Devanagari', 
  'praNAm.'
);
console.log(result); // प्रणाम्`,
	},
	{
		id: "pnpm",
		label: "PNPM",
		icon: <Package className="w-4 h-4" />,
		description: "Install using PNPM package manager",
		code: `# Install the package
pnpm add aksharamukha

# Usage in your project
import { Aksharamukha } from 'aksharamukha';

const aksharamukha = await Aksharamukha.new();
const result = await aksharamukha.process(
  'ISO',
  'Tamil',
  'vanakkam'
);
console.log(result); // வணக்கம்`,
	},
	{
		id: "yarn",
		label: "Yarn",
		icon: <Package className="w-4 h-4" />,
		description: "Install using Yarn package manager",
		code: `# Install the package
yarn add aksharamukha

# Usage in your project
import { Aksharamukha } from 'aksharamukha';

const aksharamukha = await Aksharamukha.new();
const result = await aksharamukha.process(
  'ISO',
  'Bengali',
  'dhanyabad'
);
console.log(result); // ধন্যবাদ`,
	},
	{
		id: "bun",
		label: "Bun",
		icon: <Download className="w-4 h-4" />,
		description: "Install using Bun package manager",
		code: `# Install the package
bun add aksharamukha

# Usage in your project
import { Aksharamukha } from 'aksharamukha';

const aksharamukha = await Aksharamukha.new();
const result = await aksharamukha.process(
  'ISO',
  'Kannada',
  'namaskara'
);
console.log(result); // ನಮಸ್ಕಾರ`,
	},
];

export default function InstallationTabs() {
	const [activeTab, setActiveTab] = useState("cdn");
	const [copied, setCopied] = useState(false);
	const [hoveredTab, setHoveredTab] = useState<string | null>(null);

	const activeMethod = installMethods.find((m) => m.id === activeTab);

	const handleCopy = async () => {
		if (activeMethod) {
			try {
				await navigator.clipboard.writeText(activeMethod.code);
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			} catch (err) {
				console.error("Failed to copy to clipboard:", err);
			}
		}
	};

	const handleTabClick = (tabId: string) => {
		setActiveTab(tabId);
		setCopied(false);
	};

	return (
		<div className="group">
			{/* Tab Navigation */}
			<div className="flex border-b border-teal-200/50 dark:border-teal-800/40 bg-teal-50/30 dark:bg-teal-950/10 overflow-x-auto">
				{installMethods.map((method) => (
					<button
						key={method.id}
						onClick={() => handleTabClick(method.id)}
						onMouseEnter={() => setHoveredTab(method.id)}
						onMouseLeave={() => setHoveredTab(null)}
						className={`relative flex items-center gap-2 px-6 py-4 text-sm font-medium font-sans transition-all duration-200 hover:bg-teal-100/50 dark:hover:bg-teal-900/20 whitespace-nowrap ${
							activeTab === method.id
								? "text-teal-700 dark:text-teal-400 bg-white/60 dark:bg-teal-950/30"
								: "text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400"
						} ${
							hoveredTab === method.id && activeTab !== method.id
								? "scale-105"
								: ""
						}`}
					>
						<span
							className={`transition-transform ${
								activeTab === method.id ? "scale-110" : ""
							}`}
						>
							{method.icon}
						</span>
						<span>{method.label}</span>
						{activeTab === method.id && (
							<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 dark:from-teal-400 dark:to-teal-500" />
						)}
						{hoveredTab === method.id &&
							activeTab !== method.id && (
								<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-300/60 dark:bg-teal-600/60 transition-all" />
							)}
					</button>
				))}
			</div>

			{/* Tab Description */}
			<div className="px-6 py-3 bg-teal-25/50 dark:bg-teal-975/20 border-b border-teal-200/30 dark:border-teal-800/30">
				<p className="text-sm text-muted-foreground font-sans">
					{activeMethod?.description}
				</p>
			</div>

			{/* Code Display */}
			<div className="relative group/code">
				<div className="absolute right-4 top-4 z-10 opacity-0 group-hover/code:opacity-100 transition-opacity duration-200">
					<Button
						size="sm"
						variant="ghost"
						onClick={handleCopy}
						className={`text-teal-700 dark:text-teal-400 hover:bg-teal-100/80 dark:hover:bg-teal-900/30 hover:text-teal-800 dark:hover:text-teal-300 transition-all shadow-sm ${
							copied
								? "bg-green-100/80 dark:bg-green-900/30 text-green-700 dark:text-green-400"
								: ""
						}`}
					>
						{copied ? (
							<>
								<Check className="mr-1.5 h-3.5 w-3.5 animate-in zoom-in-50" />
								Copied!
							</>
						) : (
							<>
								<Copy className="mr-1.5 h-3.5 w-3.5" />
								Copy
							</>
						)}
					</Button>
				</div>

				{/* Code highlighting backdrop */}
				<div className="absolute inset-0 bg-gradient-to-br from-teal-50/30 via-transparent to-blue-50/20 dark:from-teal-950/20 dark:via-transparent dark:to-blue-950/10 opacity-0 group-hover/code:opacity-100 transition-opacity duration-300" />

				<pre
					className="overflow-x-auto p-8 font-mono text-sm leading-relaxed relative z-0 min-h-[200px] hover:bg-gradient-to-br hover:from-teal-50/10 hover:to-blue-50/10 dark:hover:from-teal-950/10 dark:hover:to-blue-950/10 transition-all duration-300 cursor-pointer"
					onClick={handleCopy}
				>
					<code className="text-foreground whitespace-pre block transition-all duration-200 group-hover/code:text-teal-900 dark:group-hover/code:text-teal-100">
						{activeMethod?.code}
					</code>
				</pre>
			</div>
		</div>
	);
}
