import { createClient } from "@sanity/client";

export const sanityClient = createClient({
	projectId: "5j8mujwd",
	dataset: "production",
	apiVersion: "2024-01-01",
	useCdn: true,
});
