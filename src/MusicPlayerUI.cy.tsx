import UI from "./MusicPlayer";
import { mount } from "cypress/react"; // Import Cypress's mount function

describe("<UI />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    mount(<UI isPlaying={true} />);
  });
});
