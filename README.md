# Canvas Editor - A Drag-and-Drop Canvas with Redux and React

This project is a drag-and-drop canvas editor built with **React** and **Redux**. Users can add, move, resize, and modify text or image elements within a customizable canvas, and all changes are managed through a global state using **Redux Toolkit**.

## Features

- **Drag-and-Drop Functionality**: Easily add new elements like text or images by dragging from the toolbar and dropping them onto the canvas.
- **Resizable and Movable Elements**: Elements on the canvas can be moved around and resized dynamically using the `react-rnd` library.
- **Element Settings Panel**: Modify the properties of selected elements, such as text content, font size, colors, and dimensions, through a dedicated settings panel.
- **State Management with Redux Toolkit**: The entire state of the elements on the canvas is managed using Redux, making it easier to track and update each element efficiently.

## Project Setup

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc.) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them.

## Core Libraries and Tools

- **React**: A JavaScript library for building user interfaces.
- **Redux Toolkit**: A more efficient way to manage global state in Redux, offering simple APIs and powerful development tools.
- **react-rnd**: A flexible library used for making elements resizable and draggable.
- **Tailwind CSS**: A utility-first CSS framework used for styling components.

## Project Structure

The project is organized as follows:

```bash
src/
│
├── components/
│   ├── Canvas.js          # Main canvas component where elements are rendered
│   ├── ElementSettings.js # Component for modifying properties of selected elements
│   └── Toolbar.js         # UI for adding elements to the canvas
│
├── redux/
│   ├── elementsSlice.js   # Redux slice for managing elements on the canvas
│   └── store.js           # Store configuration for Redux
│
├── App.js                 # Main app component
└── index.js               # Entry point for the React app
```
