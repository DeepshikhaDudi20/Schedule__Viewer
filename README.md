# Schedule Viewer

# About project - Schedule & Schedule Logs

The purpose of this project is to develop a Schedule Viewer that allows a user to view a list of schedules for one of the current sessions and its corresponding log entries.
The Schedule Viewer Page is divided into three sections: Header and Footer, along with main section having two vertical sections (Schedule List and Schedule Log Entries).
It provides a UI interface with various features and follows best practices for performance, maintainability, and accessibility.
The project has been developed using the TDD approach with React Testing Library and Jest.

## Tech Stack

- ReactJS with TypeScript: ReactJS is chosen for its better performance due to virtual DOM, efficient UI updates, and static type checking provided by TypeScript.
- SCSS (Sass): SCSS is used for styling to ensure clean and maintainable CSS. It reduces repetition, increases reusability, and helps maintain modular and organized stylesheets.
- React Testing Library & Jest: React Testing Library and Jest are used for unit testing. They closely resemble how end-users interact with the application and focus on testing behavior rather than implementation details.
- ESLint: ESLint is used to catch linting errors, enforce consistent code style, and ensure code quality by following best practices.

## Key Features implemented

The Schedule Viewer includes the following key features:

- Schedule List and Log Entries: Users can view a list of schedules on the left side and their corresponding log entries on the right side in tabular format. Schedule List can scroll independently of log entries
- Interactive Filtering: Users can filter schedules based on their status, such as "All," "Active," or "Retired." Additionally, log entries can be filtered based on their status, such as "Completed," "Pending," "Running," or "Exception/Terminated."
- Click-to-View Log Entries: When a user clicks on a schedule in the Schedule List, the corresponding log entries will be displayed on the right side in a table format.
- Retire/Unretire Schedule: Users have the ability to switch a schedule between "retired" and "unretired" states.

## Additional implementations

- User can filter schedules based on Status (All/Active/Retired)
- User can filter schedule log entries based on Status (All/Completed/Pending/Running/Exception/Terminated)
- Exception/Error handling
- Accessibility
- Unit Testing

# Project Styling

- Used sass library, followed modular approach (To have robust structure & easy maintenance)
- Stored all colors used across application in a common file named as variable.scss for consistent styles across app.

## Accessibility as per WCAG 2.1 - AA standards

- Checklist {https://www.w3.org/WAI/WCAG21/quickref/} : to confirm the project is meeting WCAG 2.1 - AA standards
- Made it screen readers compliant by providing appropriate roles and aria-\* attributes to elements
- Pressing the TAB or SHIFT + TAB keys to allow the user to navigate and interact with interactive elements on the page. (TAB moves to the next element, SHIFT + TAB moves to the previous element)
- User can navigate through cards and retire/unretire button(interactive elements) using tab, tab + shift. On pressing enter on card, corresponding log entries will be displayed. On pressing enter on retire/unretire, status will be changed.
- Used axe devTools to check styling and other Accessibility standards

## Unit Testing performed

- Accessibility violations testing using jest-axe library
- Manual testing coverage
    - axe DevTools
    - Site-improve Accessibility Checker & Lighthouse
    - Keyboard
    - VoiceOver

## Scope of Improvement

While the Schedule Viewer is fully functional, there are several areas where further improvements can be made:

- Separate Error and Loader component. (Enhanced the error handling mechanism.)
- Responsive Design: Update the styles to ensure optimal display on various devices, such as mobile phones and tablets. Consider a design that includes horizontal scrolling for schedule cards and log entries displayed below schedule list for mobile view.
- End to end testing with Cypress
- Implementing ‘SKIP-TO-CONTENT’ on Home Page to help keyboard users and screen readers jump from the top of the
page to the content without having to go through all the navigation links (best accessibility practice to follow)
- Import i18next library and store language in a text file to make it in multiple languages
- Component performance can be further optimised after observing it through Profiler (to avoid unnecessary re-render)
- Moving the API call to a separate file or module to make the code more modular and easier to test.
- Adding error handling for failed API requests.

## Execution

### Server

- Go to server directory:
    - cd blueprism-ui-tech-test-mocked-api-server
- To install dependencies:
    - npm install
- To spin up the server:
    - npm start

### Client

- Go to UI directory:
    - cd blue-prism-ui
- To install dependencies:
    - npm install
- To build app:
    - npm run build
- To spin up the app:
    - npm start
- To run test cases:
    - npm run test

## Screenshots
![Screenshot](https://github.com/DeepshikhaDudi20/schedule_viewer/blob/master/app-screenshots/App_Layout.png)
![Screenshot](https://github.com/DeepshikhaDudi20/schedule_viewer/blob/master/app-screenshots/LightHouse.png)
![Screenshot](https://github.com/DeepshikhaDudi20/schedule_viewer/blob/master/app-screenshots/Accessibility.png)
