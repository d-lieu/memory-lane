### Welcome to my Memory Lane App

## Installation

Run the following commands from the root folder

- `npm run build` builds the project
- `npm run serve:api` starts the server
- `npm run dev` starts the client
- `npx jest` runs the tests

## Features

# Handle a Memory

You can create, edit, and delete a Memory. Create can be done from the create button at the top of the app, all other actions can be initiated from the `...` button found on each memory

# Order Memories

The ability to filter / order the Memories by timestamp, simply click on the button with the filter adjustment icon inside of the MemoryList component

# Modal to customize your Memories

A Modal accessible from anywhere in the app to modify or create Memories

# Base tests for apiHelper

Basic tests written to mock the API helper.

## Overview

- `CreateMemoryBtn` this component will use the ModalContext to create an appropriate modal.
- `Memory` a component that will display all the Memory information.
- `MemoryList` a list of Memory components.
- `MemoryModal` a component that leverages the ModalContext to display a Modal.
- `Menu` a component that displays a small menu of actions done to a Memory.
- `apiHelper.ts` leverages the API to handle create, update, delete, find, getAll actions.
- `apiHelper.test.ts` basic tests written for the apiHelper
- `MemoriesContext` creates a context for `memories` to be accessible throughout the app.
- `ModalContext` creates a context for `modalStatus` to be accessible throughout the app.
- `handlers.js` sets up the mock api calls for testing
- `global.d.ts` contains commonly exported types in the project

The Client will load Memories from the DB on startup (if there are any) and store them in
the `memories` state, which is then passed to the `MemoriesContext`.

Any Modification to a Memory with the exception of re-ordering the memories will be done through the `MemoryModal` and trigger an action to the API.

When the `modalStatus` is changed the App will fetch the updated data from the DB and re-render the `MemoryList`.

### Problem definition

After a series of discovery calls we found out a problem that our users are facing. They are having a hard time sharing their memories with friends and family. They are using a combination of social media, messaging apps, and email to share their memories. They are also using a combination of cloud storage, social media, and messaging apps to store their memories. They are looking for a solution that allows them to store and share their memories in a single place.

As a first iteration for this solution, we want to build a web application that allows users to create a memory lane and share it with friends and family. A memory lane is a collection of events that happened in a chronological order. Each event consists of a title, a description, a timestamp, and at least one image.

## Deliverables

- Clone this repository and create a new branch with your name. Open a pull request on your own instance of the repository.
- An updated README providing a high level explanation of your implementation.
- Update the API to accommodate for your technical design. Run the API by using `npm run serve:api`.
- The provided mockup is only for reference and inspiration. Feel free to improve it!

### Inspiration mockup

![Memory lane mockup](./memory_lane.png)
