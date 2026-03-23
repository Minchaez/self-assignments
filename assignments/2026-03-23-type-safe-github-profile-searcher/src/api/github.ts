import type { GithubUser } from "../types";

export async function fetchGithubUser(username: string): Promise<GithubUser> {
  const response = await fetch(
    `https://api.github.com/users/${encodeURIComponent(username)}`,
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("NOT_FOUND");
    }
    throw new Error("API_ERROR");
  }

  return (await response.json()) as GithubUser;
}
