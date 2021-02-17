// search example
export const getExampleUserSearch = users => {
  return {
    total_count: users.length,
    incomplete_results: false,
    items: users.map(mockUserSearch)
  }
}

export const getExampleUser = user => {
  return mockUser(user)
}

export const octocat_avatar =
  "https://avatars.githubusercontent.com/u/583231?s=400&u=a59fef2a493e2b67dd13754231daf220c82ba84d&v=4"

const mockUserSearch = userName => ({
  avatar_url: octocat_avatar,
  events_url: `https://api.github.com/users/${userName}/events{/privacy}`,
  followers_url: `https://api.github.com/users/${userName}/followers`,
  following_url: `https://api.github.com/users/${userName}/following{/other_user}`,
  gists_url: `https://api.github.com/users/${userName}/gists{/gist_id}`,
  gravatar_id: ``,
  html_url: `https://github.com/${userName}`,
  id: 5539624,
  login: `${userName}`,
  node_id: `MDQ6VXNlcjU1Mzk2MjQ=`,
  organizations_url: `https://api.github.com/users/${userName}/orgs`,
  received_events_url: `https://api.github.com/users/${userName}/received_events`,
  repos_url: `https://api.github.com/users/${userName}/repos`,
  score: 1,
  site_admin: false,
  starred_url: `https://api.github.com/users/${userName}/starred{/owner}{/repo}`,
  subscriptions_url: `https://api.github.com/users/${userName}/subscriptions`,
  type: `User`,
  url: `https://api.github.com/users/${userName}`
})

const mockUser = userName => ({
  login: `${userName}`,
  id: 1,
  node_id: "MDQ6VXNlcjE=",
  avatar_url: octocat_avatar,
  gravatar_id: "",
  url: `https://api.github.com/users/${userName}`,
  html_url: `https://github.com/${userName}`,
  followers_url: `https://api.github.com/users/${userName}/followers`,
  following_url: `https://api.github.com/users/${userName}/following{/other_user}`,
  gists_url: `https://api.github.com/users/${userName}/gists{/gist_id}`,
  starred_url: `https://api.github.com/users/${userName}/starred{/owner}{/repo}`,
  subscriptions_url: `https://api.github.com/users/${userName}/subscriptions`,
  organizations_url: `https://api.github.com/users/${userName}/orgs`,
  repos_url: `https://api.github.com/users/${userName}/repos`,
  events_url: `https://api.github.com/users/${userName}/events{/privacy}`,
  received_events_url: `https://api.github.com/users/${userName}/received_events`,
  type: "User",
  site_admin: false,
  name: "monalisa octocat",
  company: "GitHub",
  blog: "https://github.com/blog",
  location: "San Francisco",
  email: `${userName}@github.com`,
  hireable: false,
  bio: "There once was...",
  twitter_username: "monatheoctocat",
  public_repos: 2,
  public_gists: 1,
  followers: 20,
  following: 0,
  created_at: "2008-01-14T04:33:35Z",
  updated_at: "2008-01-14T04:33:35Z"
})
