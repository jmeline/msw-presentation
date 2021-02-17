# Who am I?

# MSW

In order to better understand how MSW operates, let's take a look at what service workers do.

# Service workers (4)

## What is a service worker?

* A **service worker** is a type of web worker that runs from your browser. 

* It runs separate from your website on a separate thread. Therefore, it **cannot interact with the dom**. 

* These web workers have the ability to intercept, modify, and response to **all network requests** using the fetch api.

* Service workers can access the Cache Api and asynchronous client side data stores, such as IndexedDb, to store resources.

* In other words, it is a **programmable network proxy**. 

## Why do I need it?

* Service workers can deliver a **much better offline experience** to the user.

* Web sites act more like **native applications**. These special web sites have a name: **Progressive Web App**

## How do you create a service worker? Example!!!

* Using the CRA-pwa template, we can get started playing around with intercepting network traffic. Here is a dumb app that returns dogs when the site loads up.

* Service workers **must be served via HTTPS** for security reasons since they literally act as a "Man in the middle". **Localhost is considered a secure origin by browsers**

* Because we're going to use the CRA-pwa template, it requires production in order to run the service worker. 
    * Get started with service workers by modifying the service worker.js file
    * There is a lot of junk in there that we don't care about for this example.
        * Comment it all out.
        * Lets add a couple listeners here.
            * Discussion about service worker life cycle.
            * **INSTALL **
                * caching happens here.
            * **ACTIVATE **
                * handling of old caches
                * only after the activate step will the service worker control all pages that fall under its scope.
            * **EVENTS **
                * fetch
    * This file is executed within the browser. "self" refers to the service worker. It is entirely event based 
* 

## MSW
    * Young library 1 year.
    * A service worker that can help you test, develop, and debug your web apps.
    * 


## Mocking Fetch? (3)

### Can't we just mock fetch and move on with our lives?

Yes, but...

Mocking is an important tool when testing applications. We use it to avoid hitting a database, a payment api, and other concerns outside of our application.

jest.mock helps you to mock an entire implmementation of something. If you mock a request library, it no longer behaves as it usually does. Your mock will do exactly as you told it. You become in charge of them. Need to verify the content-type or accepted-content? header content in your test? You must build it up.

Need to handle this in more than one test? Well, you will have to maintain it in each test.

```
jest.spyOn('window', 'fetch')
```

What happens if we're joining a large project where developers used different libraries for GET/POST? MSW doesn't care. Your handlers will be compatible with those libraries.


## Mocking Api Requests using MSW (remaining time)

### testing using jest

Since service workers can only work in the browser. When running tests, MSW will intercept requests via node-request-interceptor. Even though there is a "server" in serviceWorker, there isn't a server that is spun-up. 

```shell
yarn add -D msw 
```

Do the next few steps

* Create the following directory "./src/mocks"
* Create a server file "./src/mocks/server.js"
* Create a handlers file "./src/mocks/handlers.js"

```js
import { setupServer } from "msw/node"
import handlers from "./handler"

const server = setupServer(...handlers);

export default server; 
```

build out your handlers

```js
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() =>  server.close())
```

### independent development

```js
$ npx msw init public/
```

### debugging your environment

## Handling Errors