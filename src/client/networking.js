import io from 'socket.io-client'

export const socket = io(`ws://${window.location.host}`, { reconnection: false })