export interface RedditPostDate {
	utcDate: string;
	localDate: string;
	timestamp: number;
	postId: string;
}

interface ApiErrorResponse {
	error?: string;
}

/**
 * Validates a Reddit URL and extracts the post ID
 * @param url - The Reddit post URL
 * @returns The post ID if valid
 * @throws Error if URL is invalid
 */
export function extractRedditPostId(url: string): string {
	const redditUrlPattern = /reddit\.com\/r\/[^/]+\/comments\/([a-z0-9]+)/i;
	const match = url.match(redditUrlPattern);

	if (!match) {
		throw new Error(
			"Invalid Reddit URL. Please use format: https://www.reddit.com/r/subreddit/comments/post_id/"
		);
	}

	return match[1];
}

/**
 * Extracts post date from Reddit URL via our API route
 * @param url - The Reddit post URL
 * @returns The post creation timestamp and ID
 * @throws Error if URL is invalid or fetch fails
 */
export async function fetchRedditPostDate(
	url: string
): Promise<RedditPostDate> {
	// Validate URL format first
	extractRedditPostId(url);

	try {
		// Call our API route which handles Reddit API requests server-side
		const response = await fetch(
			`/api/reddit-post-date?url=${encodeURIComponent(url)}`
		);

		if (!response.ok) {
			const errorData = (await response.json()) as ApiErrorResponse;
			throw new Error(
				errorData.error || "Failed to fetch post data from Reddit."
			);
		}

		const data = (await response.json()) as RedditPostDate;

		if (!data.timestamp || !data.postId) {
			throw new Error("Invalid response from API");
		}

		return formatRedditPostDate(data.timestamp, data.postId);
	} catch (error) {
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("An unexpected error occurred while fetching post data");
	}
}

/**
 * Formats a timestamp into human-readable date strings
 * @param timestamp - Unix timestamp in milliseconds
 * @param postId - The Reddit post ID
 * @returns Formatted date information
 */
export function formatRedditPostDate(
	timestamp: number,
	postId: string
): RedditPostDate {
	const date = new Date(timestamp);

	const utcDate = date.toUTCString();
	const localDate = date.toLocaleString(undefined, {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		timeZoneName: "short",
	});

	return {
		utcDate,
		localDate,
		timestamp,
		postId,
	};
}
