import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
	subsets: ["latin"],
	variable: "--font-poppins",
	display: "swap",
	weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-jetbrains-mono",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Aksharamukha.js - Transliterate Indic Scripts",
	description:
		"A browser-compatible transliteration tool for Indic scripts. Perform script conversions directly in your web browser.",
	generator: "v0.app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`font-sans ${poppins.variable} ${jetbrainsMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
