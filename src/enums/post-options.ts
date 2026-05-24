export enum PostOption {

	// ʾ ʿ to ʼ ʽ.
	AlephAyinLatnAlternate = 'alephAyinLatnAlternate',

	// ʾ ʿ to ʔ ʕ.
	AlephAyinLatnAlternate2 = 'alephAyinLatnAlternate2',

	// Aleph as mater lectionis.
	AlephMaterLectionis = 'AlephMaterLectionis',

	// Anusvara as n.
	AnusvaraAsN = 'AnusvaraAsN',

	// Anusvara to nasal.
	AnusvaratoNasalASTISO = 'AnusvaratoNasalASTISO',

	// أ/a/ to Alif /ا/.
	ArabAtoAleph = 'ArabAtoAleph',

	// Phonetic Mapping.
	ArabicRemoveAdditionsPhonetic = 'arabicRemoveAdditionsPhonetic',

	// Archaic II and AU.
	ArchaicAIAU = 'archaicAIAU',

	// Archaic jña.
	BalineseArchaicJNA = 'BalineseArchaicJNA',

	// Use a-based vowels.
	BalineseAvowels = 'BalineseAvowels',

	// Move repha.
	BalineseMoveRepha = 'BalineseMoveRepha',

	// Use simplified Mapping.
	BalineseSimplified = 'BalineseSimplified',

	// দৃঢ আষাঢ to দৃঢ় আষাঢ়.
	BengaliIntervocalicDDA = 'BengaliIntervocalicDDA',

	// Old Bengali ra.
	BengaliOldRA = 'BengaliOldRA',

	// ৰ as b and ব as v.
	BengaliRaBa = 'BengaliRaBa',

	// য to ẏa and য় to ya.
	BengaliSwitchYaYYa = 'BengaliSwitchYaYYa',

	// য় everywhere.
	BengaliYYA = 'BengaliYYA',

	// Retain spaces.
	BhaiksukiRetainSpace = 'BhaiksukiRetainSpace',

	// Capitalize sentences.
	CapitalizeSentence = 'capitalizeSentence',

	// Enable all conjuncts.
	ChakmaEnableAllConjuncts = 'ChakmaEnableAllConjuncts',

	// Pali orthography.
	ChakmaPali = 'ChakmaPali',

	// Enable independent i, u and e.
	ChakmaVowelsIndependent = 'ChakmaVowelsIndependent',

	// Contextual ள.
	ContextualLLa = 'ContextualLLa',

	// Pali Text.
	CyrillicPali = 'CyrillicPali',

	// ऍ to ॲ.
	DevanagariACandra = 'DevanagariACandra',

	// Use Anusvara to nasalize.
	DevanagariAnusvara = 'DevanagariAnusvara',

	// Balbodh Style.
	Devanagaribalbodh = 'devanagaribalbodh',

	// Jain Style.
	Devanagarijain = 'devanagarijain',

	// Nepali Style.
	Devanagarinepali = 'devanagarinepali',

	// Prishthamatra orthography.
	DevanagariPrishtamatra = 'DevanagariPrishtamatra',

	// Uttara Style.
	Devanagariuttara = 'devanagariuttara',

	// y as vowel carrier.
	DivesAkuruAlternateIndVowels = 'DivesAkuruAlternateIndVowels',

	// Use nasal sign.
	DivesAkuruHomoOrganNasal = 'DivesAkuruHomoOrganNasal',

	// 𑠨 to 𑠋.
	DograShaKha = 'DograShaKha',

	// Dot reph.
	DotReph = 'dotReph',

	// E-Grantamil encoding.
	Egrantamil = 'egrantamil',

	// Only word-final ன.
	FinalNNa = 'FinalNNa',

	// עׄ to ג.
	GainGimel = 'gainGimel',

	// Other final forms.
	Granthafinal = 'granthafinal',

	// Grantha old AU vowel sign.
	GranthaOldau = 'GranthaOldau',

	// Prakrit orthography.
	GranthaPrakrit = 'GranthaPrakrit',

	// Noto Serif Grantha.
	Granthaserif = 'granthaserif',

	// Yakaash.
	GurmukhiYakaash = 'GurmukhiYakaash',

	// Use Qof.
	HeberewQoph = 'HeberewQoph',

	// Use Kamats Katan for Short o.
	HebewShortO = 'HebewShortO',

	// Use Hindi/Marathi Mapping.
	HindiMarathiRomanLoCFix = 'HindiMarathiRomanLoCFix',

	// Archaic chillus.
	HistoricChillu = 'historicChillu',

	// inherent a as ô.
	InherentAO = 'inherentAO',

	// Use Jain OM.
	JainomDevangari = 'jainomDevangari',

	// Archaic jña.
	JavaneseArchaicJNA = 'JavaneseArchaicJNA',

	// Use a-based independent vowels.
	JavaneseAvowels = 'JavaneseAvowels',

	// Move repha.
	JavaneseMoveRepha = 'JavaneseMoveRepha',

	// Use simplified Mapping.
	JavaneseSimplified = 'JavaneseSimplified',

	// Retain spaces.
	KaithiRetainSpace = 'KaithiRetainSpace',

	// Kannada Nakaara Pollu.
	KannadaNakaraPollu = 'KannadaNakaraPollu',

	// Avoid Repha.
	KannadaNotRepha = 'KannadaNotRepha',

	// Use spacing Chandrabindu.
	KannadaSpacingCandrabindu = 'KannadaSpacingCandrabindu',

	// Use Alt. AI/AU.
	KawiAltAiAU = 'KawiAltAiAU',

	// Archaic jña.
	KawiArchaicJNA = 'KawiArchaicJNA',

	// Use decomposed vowels.
	KawiDecomposedVowel = 'KawiDecomposedVowel',

	// Move Repha.
	KawiMoveRepha = 'KawiMoveRepha',

	// Kawitan font.
	Kawitan = 'kawitan',

	// Myanmar numerals.
	KhamiShanMyanmarNumerals = 'KhamiShanMyanmarNumerals',

	// Use ꩳ.
	KhamtiShanRa = 'KhamtiShanRa',

	// ৎব to ত্ৱ.
	Khandatabatova = 'khandatabatova',

	// Khojki QA.
	KhojkiQa = 'KhojkiQa',

	// Retain spaces.
	KhojkiRetainSpace = 'KhojkiRetainSpace',

	// Lao Nativization.
	LaoNative = 'LaoNative',

	// Lao phonetic.
	LaoPhonetic = 'LaoPhonetic',

	// Sajjhāya orthography.
	LaoSajjhaya = 'LaoSajjhaya',

	// Nativized sajjhāya.
	LaoSajjhayawithA = 'LaoSajjhayawithA',

	// Lao orthography.
	LaoTranscription = 'LaoTranscription',

	// Limbu Devanagari conventions.
	LimbuDevanagariConvention = 'LimbuDevanagariConvention',

	// SA-I for vowel length.
	LimbuSpellingSaI = 'LimbuSpellingSaI',

	// MARC-8 decomposed diacritics.
	LoCMarc8 = 'LoCMarc8',

	// Circle virama.
	MalayalamCircVirama = 'MalayalamCircVirama',

	// Bar virama.
	MalayalamLineVirama = 'MalayalamLineVirama',

	// Prakrit orthography.
	MalayalamPrakrit = 'MalayalamPrakrit',

	// റ്റ ṟṟ ന്റ nṟa to ṯṯ nṯ.
	MalayalamTTNTA = 'MalayalamTTNTA',

	// Sanskrit palatals.
	MarchenSanskritPalatals = 'MarchenSanskritPalatals',

	// ṃ to ṁ.
	MDotAboveToBelow = 'mDotAboveToBelow',

	// Syllabize input.
	MongolianSyllabize = 'MongolianSyllabize',

	// Use Prishtamatra orthography.
	NandinagariPrishtamatra = 'NandinagariPrishtamatra',

	// Use tilde for nasalization.
	NasalTilde = 'NasalTilde',

	// Devanagari-based Newa font.
	Nepaldevafont = 'nepaldevafont',

	// Disable repha.
	NewaDisableRepha = 'NewaDisableRepha',

	// Enable murmured consonants.
	NewaMurmurConsonants = 'NewaMurmurConsonants',

	// Special ta conjunct.
	NewaSpecialTa = 'NewaSpecialTa',

	// ēō to eo.
	NoLongEO = 'noLongEO',

	// Use Old Dogra forms.
	Olddogra = 'olddogra',

	// Old orthography.
	Oldtamilortho = 'oldtamilortho',

	// ଵ instead of ୱ.
	OriyaVaAlt = 'OriyaVaAlt',

	// ୟ everywhere.
	OriyaYYA = 'OriyaYYA',

	// p g پ گ to f j ف ج.
	PersianPaGaFaJa = 'persianPaGaFaJa',

	// Seal style.
	PhagsPaSeal = 'PhagsPaSeal',

	// Tibetan style.
	PhagsPaTib = 'PhagsPaTib',

	// ק to ק̈.
	QafTwodot = 'qafTwodot',

	// Lantsa Style Tibetan.
	Ranjanalantsa = 'ranjanalantsa',

	// Wartu Style Tibetan.
	Ranjanawartu = 'ranjanawartu',

	// Readable Itrans.
	ReadableItrans = 'readableItrans',

	// Remove diacritics.
	RemoveDiacritics = 'removeDiacritics',

	// Remove Harakat.
	RemoveDiacriticsArabic = 'removeDiacriticsArabic',

	// Remove Majlīyānā.
	RemoveMajliyana = 'removeMajliyana',

	// Remove all Niqquds.
	RemoveNikkud = 'removeNikkud',

	// Remove Pali characters.
	RemovePaliAhom = 'removePaliAhom',

	// Remove Quššāyā.
	RemoveQussaya = 'removeQussaya',

	// Remove Rūkkāḵā.
	RemoveRukkaka = 'removeRukkaka',

	// Join syllables.
	RemoveSegmentSpacesBurmese = 'removeSegmentSpacesBurmese',

	// Remove Sukun at end of words.
	RemoveSukunEnd = 'removeSukunEnd',

	// ḏ ṯ ḡ to d t g and d t g to d꞉ t꞉ g꞉.
	Removetddash = 'removetddash',

	// Remove Vowel Diacritics.
	RemoveVowelsSyriac = 'removeVowelsSyriac',

	// Double consonants after reph.
	RephaDoubleMalayalam = 'RephaDoubleMalayalam',

	// Vedic retroflex l.
	RomanLoCSLaDotLaUnderscore = 'RomanLoCSLaDotLaUnderscore',

	// Alternate longshort eo.
	RomanReadableLongEO = 'RomanReadableLongEO',

	// Convert Saurashtra Haaru as.
	SaurastraHaaruColon = 'SaurastraHaaruColon',

	// Show explicit schwa Hindi rāma to राम॔, viracita to विर॔॔चित॔.
	ShowSchwaHindi = 'ShowSchwaHindi',

	// MuktamSiddham font.
	Siddhammukta = 'siddhammukta',

	// Siddham AP font.
	Siddhamap = 'siddhamap',

	// Enable all conjuncts.
	SinhalaConjuncts = 'SinhalaConjuncts',

	// Sanskrit/Pali Orthography.
	SinhalaPali = 'SinhalaPali',

	// Use 𐽀 Resh-Ayin for Ayin.
	SogdReshAyin = 'SogdReshAyin',

	// Use 𐼘 Resh-Ayin-Dalesh for Ayin.
	SogoReshAyinDaleth = 'SogoReshAyinDaleth',

	// Mongolian finals.
	SoyomboFinals = 'SoyomboFinals',

	// Initial-form ra, la, sa.
	SoyomboInitials = 'SoyomboInitials',

	// Sanskrit palatals.
	SoyomboSanskritPalatals = 'SoyomboSanskritPalatals',

	// Use Tsheg.
	SoyomboSpaceTscheg = 'SoyomboSpaceTscheg',

	// Syllabize input.
	SoyomboSyllabize = 'SoyomboSyllabize',

	// Archaic conjuncts.
	SundaneseHistoricConjuncts = 'SundaneseHistoricConjuncts',

	// Sundapura font.
	Sundapura = 'sundapura',

	// EO for long, eo for short.
	SwapEe = 'swapEe',

	// EO for long, eo for short.
	SwapEeItrans = 'swapEeItrans',

	// Syriac convention.
	SyriacRoman = 'syriacRoman',

	// Medieval Takri orthography.
	TakriArchaicKha = 'TakriArchaicKha',

	// Avoid duplicated consonants.
	TakriRemoveGemination = 'TakriRemoveGemination',

	// Mark the first varga.
	TamilAddFirstVarga = 'TamilAddFirstVarga',

	// Disable ஶ.
	TamilDisableSHA = 'TamilDisableSHA',

	// Avoid Anusvara.
	TamilExtendedAnusvara = 'TamilExtendedAnusvara',

	// Contextual ன.
	TamilExtendedNNA = 'TamilExtendedNNA',

	// Grantha Visarga.
	TamilGranthaVisarga = 'TamilGranthaVisarga',

	// Disable ௐ.
	TamilOmDisable = 'TamilOmDisable',

	// Remove apostrophe.
	TamilRemoveApostrophe = 'TamilRemoveApostrophe',

	// Remove diacritic numerals.
	TamilRemoveNumbers = 'TamilRemoveNumbers',

	// Tamil Style -u -ū.
	TamilStyleUUCore = 'TamilStyleUUCore',

	// Tamil Style -u -ū.
	TamilStyleUUOther = 'TamilStyleUUOther',

	// Subscript numerals.
	TamilSubScript = 'TamilSubScript',

	// תׄ to ת֒.
	TavThreedot = 'tavThreedot',

	// ת to ת̈.
	TavTwodot = 'tavTwodot',

	// Arasunna as Chandrabindu.
	TeluguArasunnaChandrabindu = 'TeluguArasunnaChandrabindu',

	// Telugu Nakaara Pollu.
	TeluguNakaraPollu = 'TeluguNakaraPollu',

	// Telugu repha.
	TeluguReph = 'TeluguReph',

	// Tamil-Style Rra.
	TeluguTamilRra = 'TeluguTamilRra',

	// Tamil-Style Zha.
	TeluguTamilZha = 'TeluguTamilZha',

	// Thai phonetic.
	ThaiNativeConsonants = 'ThaiNativeConsonants',

	// Sajjhāya orthography.
	ThaiSajjhayaOrthography = 'ThaiSajjhayaOrthography',

	// Nativized sajjhaya.
	ThaiSajjhayawithA = 'ThaiSajjhayawithA',

	// Thai orthography.
	ThaiTranscription = 'ThaiTranscription',

	// Sara a ะ as Visarga.
	ThaiVisargaSaraA = 'ThaiVisargaSaraA',

	// Shift Mai Kang Lai.
	ThamShiftMaiKangLai = 'ThamShiftMaiKangLai',

	// Disable explicit Tall -ā.
	ThamTallADisable = 'ThamTallADisable',

	// Tall -ā with cabara/bha.
	ThamTallAOthers = 'ThamTallAOthers',

	// Dbu Med Ume style.
	Tibetandbumed = 'tibetandbumed',

	// Bindu with nada.
	TibetanNada = 'TibetanNada',

	// Sanskrit palatals.
	TibetanSanskritPalatals = 'TibetanSanskritPalatals',

	// Syllabize input.
	TibetanSyllabize = 'TibetanSyllabize',

	// Use space.
	TibetanTsheg = 'TibetanTsheg',

	// Traditional orthography.
	TradOrtho = 'tradOrtho',

	// Remove all inherent a.
	UrduRemoveInherent = 'urduRemoveInherent',

	// Remove short vowels.
	UrduRemoveShortVowels = 'UrduRemoveShortVowels',

	// Variant I 1.
	UseAlternateI1 = 'UseAlternateI1',

	// Variant I 2.
	UseAlternateI2 = 'UseAlternateI2',

	// Variant II.
	UseAlternateII = 'UseAlternateII',

	// ᨠᩮᩣ to ᨠᩰ.
	UseAlternateo1 = 'UseAlternateo1',

	// Pali o.
	UseAlternateo2 = 'UseAlternateo2',

	// Variant U.
	UseAlternateU = 'UseAlternateU',

	// Variant vowel sign U 𑗜.
	UseAlternateVSU = 'UseAlternateVSU',

	// Variant vowel sign UU 𑗝.
	UseAlternateVSUU = 'UseAlternateVSUU',

	// Use Alt. y.
	UseAlternateYA = 'UseAlternateYA',

	// Vertical text.
	VerticalKana = 'verticalKana',

	// v to b ゔぃのお to びの.
	VtobJapanese = 'vtobJapanese',

	// Sanskrit palatals.
	ZanabazarSanskritPalatals = 'ZanabazarSanskritPalatals',

	// Alternate ai/au.
	ZanabazarSquareAiAu = 'ZanabazarSquareAiAu',

	// Contextual yarala/va and Repha.
	ZanabazarSquareContextual = 'ZanabazarSquareContextual',

	// Mongolian final-mark.
	ZanabazarSquareMongolianFinal = 'ZanabazarSquareMongolianFinal',

	// Tsheg.
	ZanzabarSpaceTsheg = 'ZanzabarSpaceTsheg',
}

const mutuallyExclusivePostOptions: Array<Set<PostOption>> = [
	new Set([PostOption.Ranjanalantsa, PostOption.Ranjanawartu]),
	new Set([PostOption.UseAlternateI1, PostOption.UseAlternateI2]),
	new Set([PostOption.Siddhammukta, PostOption.Siddhamap]),
	new Set([PostOption.PhagsPaTib, PostOption.PhagsPaSeal]),
	new Set([PostOption.MalayalamLineVirama, PostOption.MalayalamCircVirama]),
	new Set([
		PostOption.Devanagariuttara,
		PostOption.Devanagarijain,
		PostOption.Devanagarinepali,
		PostOption.Devanagaribalbodh,
	]),
	new Set([PostOption.MDotAboveToBelow, PostOption.NasalTilde]),
	new Set([PostOption.Sundapura, PostOption.Kawitan]),
	new Set([
		PostOption.ThaiTranscription,
		PostOption.ThaiSajjhayaOrthography,
		PostOption.ThaiSajjhayawithA,
		PostOption.ThaiNativeConsonants,
	]),
	new Set([
		PostOption.LaoTranscription,
		PostOption.LaoSajjhaya,
		PostOption.LaoSajjhayawithA,
		PostOption.LaoPhonetic,
	]),
];

const mutuallyExclusivePostOptionGroupByOption = new Map<PostOption, number>(
	mutuallyExclusivePostOptions.flatMap((group, groupIndex) =>
		Array.from(group, option => [option, groupIndex] as const)
	)
);

export function fixPostOptions(options: PostOption[]): PostOption[] {
	const selectedByGroup = new Map<number, PostOption>();
	const fixedOptions = new Map<PostOption, true>();

	for (const option of options) {
		const groupIndex = mutuallyExclusivePostOptionGroupByOption.get(option);

		if (groupIndex != null) {
			const previousOption = selectedByGroup.get(groupIndex);
			if (previousOption != null) {
				fixedOptions.delete(previousOption);
			}
			selectedByGroup.set(groupIndex, option);
		}

		// Keep latest-order semantics by reinserting at the end.
		fixedOptions.delete(option);
		fixedOptions.set(option, true);
	}

	return Array.from(fixedOptions.keys());
}