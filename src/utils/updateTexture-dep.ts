/*const updateTexture = () => {
  if (lastAnim !== thisAnim) {
    lastAnim = thisAnim;
  } else {
    return;
  }

  if (!canvasRef.current || !canvasRefDiff.current) return;

  const ctx = canvasRef.current.getContext("2d");
  const ctxDiff = canvasRefDiff.current.getContext("2d");

  if (!ctx || !ctxDiff) return;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, 10, 10);

  ctxDiff.fillStyle = "#a2d0c6";
  ctxDiff.fillRect(0, 0, 10, 10);

  ctx.fillStyle = "#fff";
  ctxDiff.fillStyle = "#000";

  tamagotchiArray[currentAnim].forEach((tamagotchi) => {
    ctx.fillRect(tamagotchi[0], tamagotchi[1] + 1, 1, 1);
    ctxDiff.fillRect(tamagotchi[0], tamagotchi[1] + 1, 1, 1);
  });
  texture.magFilter = THREE.NearestFilter;
  textureDiff.magFilter = THREE.NearestFilter;

  textureRef.current = texture;
  textureDiffRef.current = textureDiff;
  textureRef.current.needsUpdate = true;
  textureDiffRef.current.needsUpdate = true;
  requestRef.current = requestAnimationFrame(updateTexture);
};
*/
