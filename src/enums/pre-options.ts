export enum PreOption {

	// Aleph as mater lectionis.
	AlephMaterLectionis = 'AlephMaterLectionis',

	// Anusvara and Chandrabindu equivalent.
	AnuChandraEqDeva = 'AnuChandraEqDeva',

	// Use /j/ as /g/.
	ArabicGimelJa = 'ArabicGimelJa',

	// Moved repha.
	BalineseMoveRepha = 'BalineseMoveRepha',

	// Render conjuncts like sva and dva explicitly.
	// Misspelt as in the original library, for compatibility.
	BengaliSubjoinedVa = 'BengaliSubojinedVa',

	// Map Bengali ya forms to distinct transliteration outputs.
	BengaliSwitchYaYYa = 'BengaliSwitchYaYYa',

	// Map Bengali ba to va in this mode.
	BengaliTargetVa = 'BengaliTargetVa',

	// Pali orthography text.
	ChakmaPali = 'ChakmaPali',

	// Pali Text.
	CyrillicPali = 'CyrillicPali',

	// Use /y/ as the vowel carrier.
	DivesAkuruAlternateIndVowels = 'DivesAkuruAlternateIndVowels',

	// Prakrit orthography.
	Egrantamil = 'egrantamil',

	// Treat /ou/ and /ei/ as diphthongs, not long /e/ or /o/.
	Eiaudipthongs = 'eiaudipthongs',

	// Disambiguate (Daleth-Resh) as d-r.
	HatrDalethResh = 'HatrDalethResh',

	// Use Hindi/Marathi Mapping.
	HindiMarathiRomanLoCFix = 'HindiMarathiRomanLoCFix',

	// Treat Holam as long /o/.
	Holamlong = 'holamlong',

	// Lack of vowel signs as pure consonant.
	InsertViramaSyriac = 'insertViramaSyriac',

	// Moved repha.
	JavaneseMoveRepha = 'JavaneseMoveRepha',

	// tat tvam asi to tattvamasi.
	JoinVowelConsIAST = 'joinVowelConsIAST',

	// tat tvam asi to tattvamasi.
	JoinVowelConsISO = 'joinVowelConsISO',

	// Repha as word-final /r.
	KawiMoveRepha = 'KawiMoveRepha',

	// Segment Khmer Words.
	KhmerWordSplit = 'KhmerWordSplit',

	// Ra-Haam as consonantal sign /r/ to kar k.
	KhuenRaHaamKaren = 'KhuenRaHaamKaren',

	// Lao Phonetic text.
	LaoPhonetic = 'LaoPhonetic',

	// Sajjhaya orthography text.
	LaoSajhayaOrthography = 'LaoSajhayaOrthography',

	// Nativized Sajjhaya text.
	LaoSajhayaOrthographywithA = 'LaoSajhayaOrthographywithA',

	// Lao orthography text.
	LaoTranscription = 'LaoTranscription',

	// Limbu Devanagari conventions.
	LimbuDevanagariConvention = 'LimbuDevanagariConvention',

	// SA-I for vowel length.
	LimbuSpellingSaI = 'LimbuSpellingSaI',

	// Treat e/o as long.
	LongEOISO = 'longEOISO',

	// Transcribe Samvrutokara (extra-short-u).
	MalayalamHalfu = 'MalayalamHalfu',

	// Prakrit orthography text.
	MalayalamPrakrit = 'MalayalamPrakrit',

	// Transcribe Malayalam text.
	MalayalamTranscribe = 'MalayalamTranscribe',

	// Vowels are not marked.
	NovowelshebrewIndic = 'novowelshebrewIndic',

	// Niqqud not shown.
	NovowelshebrewSemitic = 'novowelshebrewSemitic',

	// Render conjuncts like sva and dva explicitly.
	OriyaSubojinedVa = 'OriyaSubojinedVa',

	// Map Oriya ba to va in this mode.
	OriyaTargetVa = 'OriyaTargetVa',

	// Disambiguate Waw-Ayin-Resh as w-' -r.
	PhliWawAyinResh = 'PhliWawAyinResh',

	// Disambiguate (Mem-Quoph) as m-q.
	PhlpMemQoph = 'PhlpMemQoph',

	// Disambiguate Waw-Ayin-Resh as w-' -r.
	PhlpWawAyinResh = 'PhlpWawAyinResh',

	// Assume /Sukun/ at end of word.
	RemoveFinalSchwaArab = 'removeFinalSchwaArab',

	// Schwa deletion (Hindi) to ram, to sabse.
	RemoveSchwaHindi = 'RemoveSchwaHindi',

	// Vedic retroflex /l.
	RomanLoCSLaDotLaUnderscore = 'RomanLoCSLaDotLaUnderscore',

	// Convert : as Haaru.
	SaurastraHaaruColonTamil = 'SaurastraHaaruColonTamil',

	// Schwa deletion (Only word-final).
	SchwaFinalBengali = 'SchwaFinalBengali',

	// Schwa deletion (Only word-final).
	SchwaFinalGujarati = 'SchwaFinalGujarati',

	// Schwa deletion (Only word-final).
	SchwaFinalGurmukhi = 'SchwaFinalGurmukhi',

	// Schwa deletion (Only word-final).
	SchwaFinalWarangCiti = 'SchwaFinalWarangCiti',

	// Segment Burmese Syllables.
	SegmentBurmeseSyllables = 'segmentBurmeseSyllables',

	// Segment Shan Syllables.
	SegmentShanSyllables = 'segmentShanSyllables',

	// Segment Tham Syllables.
	SegmentThamSyllabes = 'segmentThamSyllabes',

	// Show Chillus.
	ShowChillus = 'ShowChillus',

	// Show Khanda TA.
	ShowKhandaTa = 'ShowKhandaTa',

	// Treat all shvas as shva nakh.
	Shvanakhall = 'shvanakhall',

	// Devanagari-based Siddham font.
	Siddhammukta = 'siddhammukta',

	// Sanskrit/Pali orthography text.
	SinhalaPali = 'SinhalaPali',

	// Disambiguate Resh-Ayin as r-'.
	SogdReshAyin = 'SogdReshAyin',

	// Disambiguate Resh-Ayin-Daleth as r-' -d.
	SogoReshAyinDaleth = 'SogoReshAyinDaleth',

	// E/O for long, e/o for short.
	SwapEe = 'swapEe',

	// E/O for long, e/o for short.
	SwapEeItrans = 'swapEeItrans',

	// Medieval Takri orthography text.
	TakriArchaicKha = 'TakriArchaicKha',

	// Use Tamil numeric superscript variants (k2/k3/k4).
	TamilNumeralSub = 'TamilNumeralSub',

	// Transcribe Tamil (Standard).
	TamilTranscribe = 'TamilTranscribe',

	// Transcribe Tamil (Dialectal).
	TamilTranscribeDialect = 'TamilTranscribeDialect',

	// Thai orthography text.
	ThaiOrthography = 'ThaiOrthography',

	// Thai Phonetic text.
	ThaiPhonetic = 'ThaiPhonetic',

	// Sajjhaya orthography text.
	ThaiSajjhayaOrthography = 'ThaiSajjhayaOrthography',

	// Nativized Sajjhaya text.
	ThaiSajjhayawithA = 'ThaiSajjhayawithA',

	// Short vowels not shown.
	UrduShortNotShown = 'UrduShortNotShown',

	// Render /w/ as a /v/-like form.
	Wasvnukta = 'wasvnukta',
}