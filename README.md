# Employee Management Frontend

A React frontend exercise for listing, creating, editing and deleting employee records through a REST API.

## Implementation

- List and individual-record views.
- Create and edit forms with Redux actions.
- Axios requests for record operations.
- Client-side routing, translations and toast-message components.

## Stack

React 17, JavaScript, Redux, Redux Thunk, Axios, React Router 5, Bootstrap 5, SCSS and i18next.

## Local development

Requires Node.js and npm. From the repository directory:

```sh
npm install
npm start
```

The development frontend runs at `http://localhost:3000`.

```sh
npm run build
npm test
```

These are the configured scripts. This project uses an older React Scripts 4 toolchain, so a compatible Node.js environment or dependency updates may be needed.

## Backend requirement and safety

The UI depends on an employee API. Existing API calls are hard-coded in `src/redux/store/Employee/actions.js`; running the UI does not create a local backend. Before exercising any record operation, point every request to a backend you control, with synthetic test data. Do not submit create, update or delete requests to the original service.

The tracked environment files use an API-key-named variable for a server URL. A frontend environment variable is not a secret store. Never put passwords, private tokens or real employee data in client-side code.

## Source guide

- `src/pages/`: list, create and edit views.
- `src/redux/store/Employee/`: record requests and state.
- `src/locales/`: translation resources.

This README describes the code structure, not a current backend-availability, test-pass or production-readiness guarantee.
