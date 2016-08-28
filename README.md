# Statuses

Wall messages implementation based on React and friends (mobx & director).

## Installation

```
npm install
```
## Working Demo

```
npm start
```
## Application Structure

```
client

  stores

      StatusStore

      ViewStore

  components

      constants

      statusApp                     @observer

      statusHeader                  @observer
      
      statusEntry                   @observer

      statusOverview                @observer

          statusItem                @observer

models
    StatusModel                 *** @observable ***
```

## Mobx

 - http://mobxjs.github.io/mobx/

---

> React renders the application state by providing mechanisms to translate it into a tree of renderable components.

> MobX provides the mechanism to store and update the application state that React then uses.

---

> React provides mechanisms to optimally render UI by using a virtual DOM that reduces the number of costly DOM mutations.

> MobX provides mechanisms to optimally synchronize application state with your React components by using a reactive virtual dependency state graph that is only updated when strictly needed and is never stale.

---

## Lodash

 - https://lodash.com/docs

Delivers modularity, performance  & extras.

## Material UI Components

 - http://www.material-ui.com/#/components

Provides a set of reusable and accessible UI components.

## Base Material UI Theme

 - https://github.com/callemall/material-ui/tree/master/src/styles/baseThemes

## Reflexbox

 - http://jxnblk.com/reflexbox/

Responsive React flexbox grid system higher order component.

## SVG Icons

 - https://github.com/callemall/material-ui/tree/master/src/svg-icons
