const githubUserApi = "https://api.github.com/users"

function validateUser() {
  throw new Error("User must be passed in!")
}

const handleError = resp => {
  if (!resp.ok) {
    Promise.reject(resp)
  }
  return resp
}

const handle = async promise =>
  await promise
    .then(handleError)
    .then(resp => resp.json())
    .then(data => [data, undefined])
    .catch(error => [undefined, error])

export async function fetchFromGithub(url) {
  return await fetch(url, {
    headers: {
      "Content-Type": "application/vnd.github.v3+json"
    }
  })
}

export const getUser = async (username = validateUser()) =>
  await handle(fetchFromGithub(`${githubUserApi}/${username}`))

export const getUserRepos = async (username = validateUser()) =>
  await handle(fetchFromGithub(`${githubUserApi}/${username}/repos`))

const githubSearchApi = "https://api.github.com/search/users?"

export const searchForUser = async (searchParam = "") =>
  await handle(
    fetch(githubSearchApi + new URLSearchParams(`q=${searchParam}`), {
      headers: {
        "Content-Type": "application/vnd.github.v3+json"
      }
    })
  )
