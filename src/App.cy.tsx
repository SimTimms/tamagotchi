import App from "./App";
import { mount } from "cypress/react"; // Import Cypress's mount function

describe("<App />", () => {
  it("renders", () => {
    mount(<App />); // Use the imported mount function
  });
});
