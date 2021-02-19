## MSW

Hello I'm jacob. I would like to share with everyone a new way to test and mock your api requests using MSW. I don't feel like there are enough presentation topics around javascript and felt encouraged to share this. It makes not only testing your application a breeze but it also allows you to develop new features without a backend. It'll give you more confidence in your code as you won't have to mock out the low level networking api's.

I hope that this presentation will encourage you to give it a shot in your projects.

First, let's gain a basic understanding of what a service worker is and how does it operate.

### What is a service worker?

A service worker is a script that runs inbetween your application and the rest of the network. It can intercept all traffic. Your application doesn't need to know about it.

## Dog -> Cat example

Let's take closer look at service workers by taking a look at an app for a client.

The client is kind of crazy and wanted a site that would load up puppies. The client wouldn't let me change the code when I wanted to show them other animals. It was at this moment that I thought I would use a service worker to intercept the request for puppies and return a different animal instead. So let's intercept requests using a service worker in my create react app.

```js
/* eslint-disable no-restricted-globals */
const ignored = self.__WB_MANIFEST;

/*
 * ********************************
 *  Custom service worker goes here
 * ********************************
 */

const fetchCats = async (x,y) => {
  const caturl = `https://placekittens.com/${x}/${y}`
  console.log(`Responding with cats!!! ${caturl}`)
  return await fetch(caturl, { mode: "no-cors"})
}

self.addEventListener("fetch", (event) => {
  console.log(`Intercepting ${event.request.method} to ${event.request.url}`);
  if (/place-puppy/.test(event.request.url)) {
    // let's intercept!!!
    const [_, x, y] = event.request.url.match(/(\d+)x(\d+)/)
    event.respondWith(fetchCats(x,y))
  }
})
```

Developer showcase uses the github api to search for github users and displays their information along with their preferred languages based on their repos.

## Why even consider it?

* Simply your api mocking
* Reuse request handlers testing and development.
* Testing your code in a way a user would use the product. Higher confidence
* Works out of the box with any api library such as fetch or axios
* Supports both graphql and rest
* Full Typescript support

## MSW Development

We're going to first take a look at how we can mock the api requests using msw. We could have started with the testing side. It doesn't matter.

Using MSW for development requires us to install a service worker. Because we're using create react app, the home for the service worker will be in the public directory. If you're using angular, vue, etc, they'll each have their respective directories where you will install it. For the majority of cases, the public folder will be place to throw it.

We install this service worker by running the following command

```
$ npm msw init public
```

Take a quick look at the service worker

We'll start the worker in index.js

```js
if (process.env.NODE_ENV === "development"){
 const { worker } = require("./mocks/browser")
 worker.start({ onUnhandledRequest: "warn" })
}
```

Something neat we can do here is to have msw warn us if there are any unhandled api requests. From those warnings, I will go build the request handlers.

** run project **

* Note that [MSW] Mocking enabled indicates MSW is running

Now lets build our handlers

```js
  //handlers.js
  export const handlers = [
    // req = request
    // res = response
    // ctx = collection of functions to help build your response
    rest.get("https://api.github.com/search/users", (req, res, ctx) => {
      const userName = req.url.searchParams.get('q')
      return res(
        ctx.status(200),
        ctx.json(getExampleUserSearch(userName))
      )
    })
  ]

```

Once we have those that handler, refresh the page. We should see our search being completely mocked

Let's add the next couple handlers

```js
  // handlers.js

  export const handlers = [
    // req = request
    // res = response
    // ctx = collection of functions to help build your response
    rest.get("https://api.github.com/search/users", (req, res, ctx) => {
      const userName = req.url.searchParams.get('q')
      return res(
        ctx.status(200),
        ctx.json(getExampleUserSearch(userName))
      )
    }),
    rest.get("https://api.github.com/users/:userId", (req, res, ctx) => {
      const { userId } = req.params
      return res(
        ctx.status(200),
        ctx.json(getExampleUser(userId))
      )
    }),
    rest.get("https://api.github.com/users/:userId/repos", (req, res, ctx) => {
      const { userId } = req.params
      return res(
        ctx.status(200),
        ctx.json(getExampleUser(userId))
      )
    })
  ]
```

We should see that octocat is now being returned on the search page as well as the main page. Sweet! We can continue to add more handlers

Let's take a look at how we can then test this page. We know what the page should look like while running under MSW

### MSW Testing

Now that we've done the hard work getting the handlers built. We now will create a new file in our mocks directory called "server.js"

Since service workers are a browser feature, we don't have an actual service worker here. MSW uses the library node-request-intercepter to handle the requests.

In server.js

```js

// server.js
import { setupServer } from "msw/node"
import { handlers } from "./handlers"
export const server = setupServer(...handers)
```

The last thing to do is to have the server listen for our requests in our tests.
We can set up the listener in a test file or in a global configuration

I've got this test project setup and I am nearly half way through testing it. We need to handle the api requests.

```js
beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())
```

Here is how we can use the server.use function for modifying our handlers in the middle of a function
server.use(
  rest.get("https://api.github.com/search/users", (req, res, ctx) => {
    const user = req.url.searchParams.get("q")
    return res(ctx.status(500, `Something went wrong searching for ${user}`))
  })
)

