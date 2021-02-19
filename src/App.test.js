import React from "react"
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "./App"
import { server} from "./mocks/server"
import { rest } from "msw"
import { octocat_avatar } from "./mocks/mock_utils"

const element = props => <App {...props} />

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test.only("developer search page", async () => {
  render(element())

  // Find "Search for developers" button
  userEvent.click(screen.getByText(/Developers/i))

  // // Enter in "jmeline" into the textbox
  userEvent.type(screen.getByRole("textbox"), "jmeline")

  // // click search button
  userEvent.click(screen.getByText("Search"))

  // // wait for jmeline to appear
  await waitFor(() => expect(screen.getByText("jmeline")).toBeInTheDocument())

  // // verify the image is octocat
  expect(screen.getByRole("img")).toHaveAttribute("src", octocat_avatar)

  // // click on jmeline
  // userEvent.click(screen.getByText("jmeline"))

  // // begin fetching user data
  // userEvent.click(screen.getByText("Add"))

  // // make sure we add the developers and then close the modal 
  // await waitForElementToBeRemoved(() => screen.getByText("Add Developer"))

  // await waitFor(() => expect(screen.getByText("Favorite languages: javascript(5), clojure(2), F#(2)")).toBeInTheDocument())
  // screen.debug()
})

test("developer search page throws an error", async () => {
  render(element())

  // Find "Search for developers" button
  userEvent.click(screen.getByText(/Developers/i))

  // Enter in "jmeline" into the textbox
  userEvent.type(screen.getByRole("textbox"), "jmeline")

  // server.use(
  //   rest.get("https://api.github.com/search/users", (req, res, ctx) => {
  //     const user = req.url.searchParams.get("q")
  //     return res(ctx.status(500, `Something went wrong searching for ${user}`))
  //   })
  // )

  // click search button
  // userEvent.click(screen.getByText("Search"))

  // wait for jmeline to appear
  // await waitForElementToBeRemoved(() => screen.getByText("Loading Developers"))
  // await waitFor(() =>
  //   expect(
  //     screen.getByText("500 - Something went wrong searching for jmeline")
  //   ).toBeInTheDocument()
  // )
})