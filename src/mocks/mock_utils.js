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

export const getExampleUserRepo = userName => {
  const buildRepo = buildRepoForUser(userName)
  return [
    buildRepo("testRepo1", "javascript"),
    buildRepo("testRepo2", "javascript"),
    buildRepo("testRepo3", "javascript"),
    buildRepo("testRepo5", "javascript"),
    buildRepo("testRepo6", "javascript"),
    buildRepo("testRepo7", "clojure"),
    buildRepo("testRepo8", "clojure"),
    buildRepo("testRepo9", "F#"),
    buildRepo("testRepo10", "F#")
  ]
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
  login: userName,
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
  name: userName,
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

const buildRepoForUser = userName => (name, language) => ({
  id: 70358466,
  node_id: "MDEwOlJlcG9zaXRvcnk3MDM1ODQ2Ng==",
  name,
  full_name: `${userName}/${name}`,
  private: false,
  owner: {
    login: `${userName}`,
    id: 6642964,
    node_id: `MDQ6VXNlcjY2NDI5NjQ=`,
    avatar_url: octocat_avatar,
    gravatar_id: "",
    url: `https://api.github.com/users/${userName}`,
    html_url: `https://github.com/${userName}`,
    followers_url: `https://api.github.com/users/${userName}/followers`,
    following_url:
      `https://api.github.com/users/${userName}/following{/other_user}`,
    gists_url: `https://api.github.com/users/${userName}/gists{/gist_id}`,
    starred_url: `https://api.github.com/users/${userName}/starred{/owner}{/repo}`,
    subscriptions_url: `https://api.github.com/users/${userName}/subscriptions`,
    organizations_url: `https://api.github.com/users/${userName}/orgs`,
    repos_url: `https://api.github.com/users/${userName}/repos`,
    events_url: `https://api.github.com/users/${userName}/events{/privacy}`,
    received_events_url: `https://api.github.com/users/${userName}/received_events`,
    type: `User`,
    site_admin: false
  },
  html_url: `https://github.com/${userName}/${name}`,
  description: `Documented algorithmic problems/solutions + datastructures`,
  fork: true,
  url: `https://api.github.com/repos/${userName}/${name}`,
  forks_url: `https://api.github.com/repos/${userName}/${name}/forks`,
  keys_url: `https://api.github.com/repos/${userName}/${name}/keys{/key_id}`,
  collaborators_url:
    `https://api.github.com/repos/${userName}/${name}/collaborators{/collaborator}`,
  teams_url: `https://api.github.com/repos/${userName}/${name}/teams`,
  hooks_url: `https://api.github.com/repos/${userName}/${name}/hooks`,
  issue_events_url:
    `https://api.github.com/repos/${userName}/${name}/issues/events{/number}`,
  events_url: `https://api.github.com/repos/${userName}/${name}/events`,
  assignees_url:
    `https://api.github.com/repos/${userName}/${name}/assignees{/user}`,
  branches_url:
    `https://api.github.com/repos/${userName}/${name}/branches{/branch}`,
  tags_url: `https://api.github.com/repos/${userName}/${name}/tags`,
  blobs_url: `https://api.github.com/repos/${userName}/${name}/git/blobs{/sha}`,
  git_tags_url:
    `https://api.github.com/repos/${userName}/${name}/git/tags{/sha}`,
  git_refs_url:
    `https://api.github.com/repos/${userName}/${name}/git/refs{/sha}`,
  trees_url: `https://api.github.com/repos/${userName}/${name}/git/trees{/sha}`,
  statuses_url:
    `https://api.github.com/repos/${userName}/${name}/statuses/{sha}`,
  languages_url: `https://api.github.com/repos/${userName}/${name}/languages`,
  stargazers_url: `https://api.github.com/repos/${userName}/${name}/stargazers`,
  contributors_url:
    `https://api.github.com/repos/${userName}/${name}/contributors`,
  subscribers_url:
    `https://api.github.com/repos/${userName}/${name}/subscribers`,
  subscription_url:
    `https://api.github.com/repos/${userName}/${name}/subscription`,
  commits_url: `https://api.github.com/repos/${userName}/${name}/commits{/sha}`,
  git_commits_url:
    `https://api.github.com/repos/${userName}/${name}/git/commits{/sha}`,
  comments_url:
    `https://api.github.com/repos/${userName}/${name}/comments{/number}`,
  issue_comment_url:
    `https://api.github.com/repos/${userName}/${name}/issues/comments{/number}`,
  contents_url:
    `https://api.github.com/repos/${userName}/${name}/contents/{+path}`,
  compare_url:
    `https://api.github.com/repos/${userName}/${name}/compare/{base}...{head}`,
  merges_url: `https://api.github.com/repos/${userName}/${name}/merges`,
  archive_url:
    `https://api.github.com/repos/${userName}/${name}/{archive_format}{/ref}`,
  downloads_url: `https://api.github.com/repos/${userName}/${name}/downloads`,
  issues_url: `https://api.github.com/repos/${userName}/${name}/issues{/number}`,
  pulls_url: `https://api.github.com/repos/${userName}/${name}/pulls{/number}`,
  milestones_url:
    `https://api.github.com/repos/${userName}/${name}/milestones{/number}`,
  notifications_url:
    `https://api.github.com/repos/${userName}/${name}/notifications{?since,all,participating}`,
  labels_url: `https://api.github.com/repos/${userName}/${name}/labels{/name}`,
  releases_url: `https://api.github.com/repos/${userName}/${name}/releases{/id}`,
  deployments_url:
    `https://api.github.com/repos/${userName}/${name}/deployments`,
  created_at: `2016-10-08T21:29:35Z`,
  updated_at: `2016-10-08T21:29:36Z`,
  pushed_at: `2016-11-13T22:44:15Z`,
  git_url: `git://github.com/${userName}/${name}.git`,
  ssh_url: `git@github.com:${userName}/${name}.git`,
  clone_url: `https://github.com/${userName}/${name}.git`,
  svn_url: `https://github.com/${userName}/${name}`,
  homepage: ``,
  size: 1835,
  stargazers_count: 0,
  watchers_count: 0,
  language,
  has_issues: false,
  has_projects: true,
  has_downloads: true,
  has_wiki: true,
  has_pages: false,
  forks_count: 0,
  mirror_url: null,
  archived: false,
  disabled: false,
  open_issues_count: 0,
  license: null,
  forks: 0,
  open_issues: 0,
  watchers: 0,
  default_branch: `master`
})

