import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Canvas } from "@react-three/fiber";
import { ConfigurationContext } from "../App";
import EggButton from "./EggButton";
import * as THREE from "three";

describe("EggButton", () => {
  const mockButtonClick = vi.fn();
  const mockModel = {
    children: [
      {
        geometry: new THREE.BoxGeometry(),
      },
    ],
  };
  const mockGameConfig = {
    buttonTextures: {
      buttonNormal: new THREE.Texture(),
    },
  };

  const renderWithCanvas = (component) => {
    return render(
      <Canvas>
        <ConfigurationContext.Provider value={{ gameConfig: mockGameConfig }}>
          {component}
        </ConfigurationContext.Provider>
      </Canvas>
    );
  };
  
  it("renders without crashing", () => {
    const { getByText } = renderWithCanvas(
      <EggButton
        buttonClick={mockButtonClick}
        model={mockModel}
        position={[0, 0, 0]}
        label="Test Button"
        color="#444"
      />
    );
    expect(getByText("Test Button")).toBeTruthy();
  });

  it("calls buttonClick when clicked", () => {
    const { getByText } = renderWithCanvas(
      <EggButton
        buttonClick={mockButtonClick}
        model={mockModel}
        position={[0, 0, 0]}
        label="Test Button"
        color="#444"
      />
    );

    const buttonLabel = getByText("Test Button");
    fireEvent.pointerDown(buttonLabel);
    expect(mockButtonClick).toHaveBeenCalled();
  });

  it("applies the correct material properties", () => {
    const { container } = renderWithCanvas(
      <EggButton
        buttonClick={mockButtonClick}
        model={mockModel}
        position={[0, 0, 0]}
        label="Test Button"
        color="#444"
      />
    );

    const meshMaterial = container.querySelector("meshStandardMaterial");
    expect(meshMaterial).toBeTruthy();
    expect(meshMaterial?.getAttribute("color")).toBe("#444");
  });

});