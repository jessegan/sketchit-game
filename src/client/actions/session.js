export const setUserId = (socketId) => {
  return {
    type: 'session/connect',
    payload: {
      userId: socketId
    }
  }
}