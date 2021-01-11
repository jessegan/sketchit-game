class Node {
  constructor(playerId, next=null) {
    this.playerId = playerId
    this.next = next
  }
}

class PlayerList {

  constructor(players=null) {
    this.head = new Node(0)
    this._initializePlayers(players)
    this.next = this.head
  }

  add(player) {
    this._appendLeft(player)
  }

  remove(player) {
    let prev = this.head
    let cur = this.head.next

    while (cur && cur.val !== player) {
      prev = cur
      cur = cur.next
    }

    if (cur) {
      prev.next = cur.next
      if (cur == this.next ){
        this.next = prev
      }
    }
  }

  hasNext() {
    return this.next.next ? true : false
  }
  
  getNext() {
    if (this.hasNext()) {
      this.next = this.next.next
      return this.next.playerId
    } else {
      return null
    }
  }

  reset() {
    this.next = this.head
  }

  empty() {
    return this.head.next ? false : true
  }

  /* PRIVATE METHODS */

  _appendLeft(player) {
    let new_node = new Node(player,this.head.next)
    this.head.next = new_node
  }

  _initializePlayers(players) {
    if (players) {
      let cur = this.head
      for (let p of players) {
        cur.next = new Node(p)
        cur = cur.next
      }
    }
  }

}

module.exports = PlayerList