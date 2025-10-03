interface Script {
	name: string;
	sample: string;
	englishName: string;
}

const supportedScripts: Script[] = [
	{ name: "Devanagari", sample: "नमस्ते", englishName: "Hindi/Sanskrit" },
	{ name: "Tamil", sample: "வணக்கम்", englishName: "Tamil" },
	{ name: "Telugu", sample: "నమస్తే", englishName: "Telugu" },
	{ name: "Kannada", sample: "ನಮಸ್ಕಾರ", englishName: "Kannada" },
	{ name: "Malayalam", sample: "നമസ്കാരം", englishName: "Malayalam" },
	{ name: "Bengali", sample: "নমস্কার", englishName: "Bengali" },
	{ name: "Gujarati", sample: "નમસ્તે", englishName: "Gujarati" },
	{ name: "Gurmukhi", sample: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", englishName: "Punjabi" },
	{ name: "Oriya", sample: "ନମସ୍କାର", englishName: "Odia" },
	{ name: "Sinhala", sample: "ආයුබෝවන්", englishName: "Sinhala" },
	{ name: "Tibetan", sample: "བཀྲ་ཤིས་བདེ་ལེགས།", englishName: "Tibetan" },
	{ name: "Myanmar", sample: "မင်္ဂလာပါ", englishName: "Myanmar" },
];

export default function ScriptShowcase() {
	return (
		<div className="mt-16 max-w-6xl mx-auto">
			<div className="text-center mb-8">
				<h3 className="text-2xl font-semibold text-foreground mb-3 font-sans">
					Supported Scripts
				</h3>
				<p className="text-muted-foreground font-sans">
					Convert between any of these writing systems instantly
				</p>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
				{supportedScripts.map((script, index) => (
					<div
						key={script.name}
						className="group bg-white/40 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl p-4 border border-teal-200/30 dark:border-teal-800/30 hover:border-teal-300/50 dark:hover:border-teal-700/50 transition-all hover:shadow-lg hover:shadow-teal-500/10 hover:scale-105"
						style={{ animationDelay: `${index * 100}ms` }}
					>
						<div className="text-center">
							<div className="text-2xl mb-2 font-serif text-foreground group-hover:scale-110 transition-transform">
								{script.sample}
							</div>
							<div className="text-xs font-medium text-teal-700 dark:text-teal-400 mb-1 font-sans">
								{script.name}
							</div>
							<div className="text-xs text-muted-foreground font-sans">
								{script.englishName}
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="text-center mt-6">
				<p className="text-sm text-muted-foreground font-sans">
					...and many more regional variants and historical scripts
				</p>
			</div>
		</div>
	);
}
