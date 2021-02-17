import { rest } from "msw"
import {
  getExampleUserSearch,
  getExampleUser,
  getExampleUserRepo
} from "./mock_utils"

const handlers = [
  // rest.get("https://api.github.com/search/users", (req, res, ctx) => {
  //   const user = req.url.searchParams.get("q")
  //   return res(
  //     ctx.delay(200),
  //     ctx.status(200),
  //     ctx.json(getExampleUserSearch([user]))
  //   )
  // }),

  // rest.get("https://api.github.com/users/:userId", (req, res, ctx) => {
  //   // will match all GET https://api.github.com/users/*
  //   const { userId } = req.params
  //   return res(ctx.status(200), ctx.json(getExampleUser(userId)))
  // }),

  // rest.get("https://api.github.com/users/:userId/repos", (req, res, ctx) => {
  //   // will match all GET https://api.github.com/users/*/repos
  //   const { userId } = req.params
  //   return res(ctx.status(200), ctx.json(getExampleUserRepo(userId)))
  // })
]

export default handlers
