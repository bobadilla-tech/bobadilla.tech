/**
 * Reddit API response type
 */
interface RedditApiResponse {
	data?: {
		children?: Array<{
			data?: {
				created_utc?: number;
			};
		}>;
	};
}

/**
 * Fetch post creation timestamp from Reddit API
 * @param subreddit Subreddit name
 * @param postId Reddit post ID
 * @returns Unix timestamp in milliseconds
 */
export async function fetchRedditPostTimestamp(
	subreddit: string,
	postId: string
): Promise<number> {
	const response = await fetch(
		`https://www.reddit.com/r/${subreddit}/comments/${postId}/.json`,
		{
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
			},
			cache: "no-store",
		}
	);

	if (!response.ok) {
		throw new Error(
			"Failed to fetch post data from Reddit. The post may not exist or may be private."
		);
	}

	// Check if the response is actually JSON (Reddit may return HTML when blocking requests)
	const contentType = response.headers.get("content-type");
	if (!contentType || !contentType.includes("application/json")) {
		throw new Error(
			"Reddit blocked the request. Please try again later or use a different URL."
		);
	}

	const data = (await response.json()) as RedditApiResponse[];
	const postData = data[0]?.data?.children?.[0]?.data;

	if (!postData?.created_utc) {
		throw new Error("Could not extract post date from Reddit response");
	}

	return Math.floor(postData.created_utc * 1000);
}

/**
 * Validate Reddit post timestamp is within reasonable bounds
 * @param timestamp Unix timestamp in milliseconds
 * @throws Error if timestamp is invalid
 */
export function validateTimestamp(timestamp: number): void {
	const minTimestamp = new Date("2005-06-01").getTime(); // Reddit founded June 2005
	const maxTimestamp = Date.now() + 86400000; // Allow 1 day in future for clock skew

	if (timestamp < minTimestamp || timestamp > maxTimestamp) {
		throw new Error("Invalid post timestamp. Please verify the Reddit URL.");
	}
}
