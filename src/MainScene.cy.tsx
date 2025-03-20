import MainScene from "./MainScene";
import { mount } from "cypress/react"; // Import Cypress's mount function

describe("<MainScene />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    mount(
      <MainScene
        resetState={false}
        setResetState={() => {}}
        autoRotate={false}
        setAutoRotate={() => {}}
      />
    );
  });
});
