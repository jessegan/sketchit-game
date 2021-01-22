export const updateGame = (gameData) => {
  return {
    type: "game/update",
    payload: gameData
  }
}