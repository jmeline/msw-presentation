import React from "react"
import { render } from "@testing-library/react"
import App from "./App"

const mockUserSearch = (userName) => ({
    avatar_url: `https://avatars.githubusercontent.com/u/5539624?v=4`,
    events_url: `https://api.github.com/users/${userName}/events{/privacy}`,
    followers_url: `https://api.github.com/users/${userName}/followers`,
    following_url: `https://api.github.com/users/${userName}/following{/other_user}`,
    gists_url: `https://api.github.com/users/${userName}/gists{/gist_id}`,
    gravatar_id: ``,
    html_url: `https://github.com/${userName}`,
    id: 5539624,
    login: `${userName}`, //<-- this is important
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

const searchResponse = [
  mockUserSearch("jmeline"),
]


test("mocking a window.fetch function?", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => [{ title: "Princess Mononoke" }]
    })
  )

  const { getByText, debug, findByText } = render(<App />)
  const items = await findByText(/mononoke/i)
  // toHaveTextContent is part of the expanded jest-dom library
  expect(items).toHaveTextContent(/Princess Mononoke/i)
})
