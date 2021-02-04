const githubUserApi = "https://api.github.com/users"

function validateUser() {
  throw new Error("User must be passed in!")
}

export async function fetchFromGithub(url) {
  return await fetch(url, {
    headers: {
      'Content-Type': 'application/vnd.github.v3+json'
    }
  })
}

export async function getUser(username = validateUser()) {
  const response = await fetchFromGithub(`${githubUserApi}/${username}`)
  if (!response.ok) {
    console.log(response.error);
    return;
  }
  return await response.json()
}


export async function getUserRepos(username = validateUser()) {
  const response = await fetchFromGithub(`${githubUserApi}/${username}/repos`)
  if (!response.ok) {
    console.log(response.error);
    return;
  }
  return await response.json()
}
