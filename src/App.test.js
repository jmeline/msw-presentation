import React from "react"
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "./App"
import server from "./mocks/server"
import { rest } from "msw"
import DeveloperSearch from "./components/DeveloperSearch"
import { octocat_avatar } from "./mocks/mock_utils"

beforeAll(() => server.listen({ onUnhandledRequest: "warn" }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const element = props => <DeveloperSearch {...props} />

test.skip("developer search page", async () => {
  render(element())

  // Find "Search for developers" button
  userEvent.click(screen.getByText(/Developers/i))

  // Enter in "jmeline" into the textbox
  userEvent.type(screen.getByRole("textbox"), "jmeline")

  // click search button
  userEvent.click(screen.getByText("Search"))

  // wait for jmeline to appear
  await waitFor(() => expect(screen.getByText("jmeline")).toBeInTheDocument())

  // verify no one has been selected
  expect(screen.getByText("Selected: 0")).toBeInTheDocument()

  // verify the image is octocat
  expect(screen.getByRole("img")).toHaveAttribute("src", octocat_avatar)

  // click on jmeline
  userEvent.click(screen.getByText("jmeline"))

  // verify a selection was made
  expect(screen.getByText("Selected: 1")).toBeInTheDocument()

  // begin fetching user data
  userEvent.click(screen.getByText("Add"))
})

test.only("developer search page throws an error", async () => {
  render(element())

  // Find "Search for developers" button
  userEvent.click(screen.getByText(/Developers/i))

  // Enter in "jmeline" into the textbox
  userEvent.type(screen.getByRole("textbox"), "jmeline")

  server.use(
    rest.get("https://api.github.com/search/users", (req, res, ctx) => {
      const user = req.url.searchParams.get("q")
      return res(ctx.status(500, `Something went wrong searching for ${user}`))
    })
  )

  // click search button
  userEvent.click(screen.getByText("Search"))

  // wait for jmeline to appear
  await waitForElementToBeRemoved(() => screen.getByText("Loading Developers"))
  await waitFor(() =>
    expect(
      screen.getByText("500 - Something went wrong searching for jmeline")
    ).toBeInTheDocument()
  )
})

test.skip("mocking a window.fetch function?", async () => {
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
