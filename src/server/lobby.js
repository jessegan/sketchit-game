const nanoid = require('nanoid')
const customNanoid = nanoid.customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',6)

class Lobby {

  constructor() {
    this.code = customNanoid()
  }

}

module.exports = Lobby