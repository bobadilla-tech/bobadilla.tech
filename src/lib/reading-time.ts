/**
 * Calculate reading time for blog content
 * Based on average reading speed of 200-250 words per minute
 */

const WORDS_PER_MINUTE = 225;

/**
 * Calculate reading time in minutes from markdown content
 * @param content - The markdown content to analyze
 * @returns Reading time in minutes (rounded up)
 */
export function calculateReadingTime(content: string): number {
	// Remove markdown syntax for more accurate word count
	const cleanContent = content
		// Remove code blocks
		.replace(/```[\s\S]*?```/g, "")
		// Remove inline code
		.replace(/`[^`]*`/g, "")
		// Remove images
		.replace(/!\[.*?\]\(.*?\)/g, "")
		// Remove links but keep text
		.replace(/\[([^\]]*)\]\(.*?\)/g, "$1")
		// Remove HTML tags
		.replace(/<[^>]*>/g, "")
		// Remove markdown headers
		.replace(/^#+\s/gm, "")
		// Remove bold/italic markers
		.replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, "$1")
		// Remove list markers
		.replace(/^[-*+]\s/gm, "")
		// Remove numbered list markers
		.replace(/^\d+\.\s/gm, "");

	// Count words (split by whitespace and filter empty strings)
	const words = cleanContent
		.split(/\s+/)
		.filter((word) => word.length > 0).length;

	// Calculate minutes and round up (minimum 1 minute)
	const minutes = Math.ceil(words / WORDS_PER_MINUTE);

	return Math.max(1, minutes);
}
