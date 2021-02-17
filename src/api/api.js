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

export const fetchFromGithub = async url =>
  await fetch(url, {
    headers: {
      "Content-Type": "application/vnd.github.v3+json"
    }
  })

const githubUserApi = "https://api.github.com/users"
const githubSearchApi = "https://api.github.com/search/users?"

export const getUser = async username =>
  await handle(fetchFromGithub(`${githubUserApi}/${username}`))

export const getUserRepos = async username =>
  await handle(fetchFromGithub(`${githubUserApi}/${username}/repos`))

export const searchForUser = async (searchParam = "") =>
  await handle(
    fetch(githubSearchApi + new URLSearchParams(`q=${searchParam}`), {
      headers: {
        "Content-Type": "application/vnd.github.v3+json"
      }
    })
  )
