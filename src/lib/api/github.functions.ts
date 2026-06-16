import { createServerFn } from "@tanstack/react-start";

interface Repo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics?: string[];
}

interface Profile {
  login: string;
  name: string | null;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  avatar_url: string;
  html_url: string;
  blog: string | null;
  location: string | null;
}

export interface GitHubData {
  profile: Profile | null;
  repos: Repo[];
  totalStars: number;
  topLanguages: { name: string; count: number }[];
  fetchedAt: string;
  ok: boolean;
  error?: string;
}

export const getGitHubData = createServerFn({ method: "GET" }).handler(
  async (): Promise<GitHubData> => {
    const username = "abbn7";
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "abdelhamed-nada-portfolio",
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }
    try {
      const [profileRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`, { headers }),
        fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers }),
      ]);
      if (!profileRes.ok || !reposRes.ok) {
        return {
          profile: null,
          repos: [],
          totalStars: 0,
          topLanguages: [],
          fetchedAt: new Date().toISOString(),
          ok: false,
          error: `GitHub API ${profileRes.status}/${reposRes.status}`,
        };
      }
      const profile = (await profileRes.json()) as Profile;
      const reposRaw = (await reposRes.json()) as Repo[];
      const repos = reposRaw
        .filter((r) => !((r as unknown as { fork?: boolean }).fork))
        .sort((a, b) => b.stargazers_count - a.stargazers_count || +new Date(b.updated_at) - +new Date(a.updated_at));
      const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
      const langCounts: Record<string, number> = {};
      for (const r of repos) {
        if (r.language) langCounts[r.language] = (langCounts[r.language] ?? 0) + 1;
      }
      const topLanguages = Object.entries(langCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 6);

      return {
        profile: {
          login: profile.login,
          name: profile.name,
          bio: profile.bio,
          followers: profile.followers,
          following: profile.following,
          public_repos: profile.public_repos,
          avatar_url: profile.avatar_url,
          html_url: profile.html_url,
          blog: profile.blog,
          location: profile.location,
        },
        repos: repos.slice(0, 12).map((r) => ({
          name: r.name,
          description: r.description,
          html_url: r.html_url,
          language: r.language,
          stargazers_count: r.stargazers_count,
          forks_count: r.forks_count,
          updated_at: r.updated_at,
          topics: r.topics ?? [],
        })),
        totalStars,
        topLanguages,
        fetchedAt: new Date().toISOString(),
        ok: true,
      };
    } catch (e) {
      return {
        profile: null,
        repos: [],
        totalStars: 0,
        topLanguages: [],
        fetchedAt: new Date().toISOString(),
        ok: false,
        error: e instanceof Error ? e.message : "Unknown error",
      };
    }
  },
);
