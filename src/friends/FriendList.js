import React, { Component } from "react"
import Friend from "./Friend"

export default class FriendList extends Component {
    constructor (props) {
        super(props)
        this.uniqueKey = 1
        this.state = {
            friends: []
        }
        
    }
    
    loadFriends =  function () {
        let friendArray
        let relationships
        let friendList = []
        fetch(`http://localhost:5001/friends?requestingFriendId=${this.props.activeUser}`)
        .then(r => r.json())
        .then(friendItems => {
            friendArray = friendItems
            return fetch(`http://localhost:5001/friends?acceptedFriendId=${this.props.activeUser}`)
        })
        .then(r => r.json())
        .then(friendItems => {
             relationships = friendArray.concat(friendItems)
             return fetch(`http://localhost:5001/users`)
        })
        .then(r => r.json())
        .then(users => {
            relationships.forEach(relationship => {
                if (relationship.requestingFriendId === parseInt(this.props.activeUser)) {
                    friendList.push(users.find(user => user.id === relationship.acceptedFriendId))
                } else {
                    
                    friendList.push(users.find(user => user.id === relationship.requestingFriendId))
                }
            })
            this.setState({
                friends: friendList
            })
        }) 
    }.bind(this)

    componentDidMount () {
        this.loadFriends()
    }

    render() {
        return (
            <div id="friends-list">
            <h1>Friends</h1>
            {this.state.friends.map(friend => {
                return <Friend id={friend.id} setViewingUser={this.props.setViewingUser} showView={this.props.showView} key={this.uniqueKey++} email={friend.email} /> 
            })}
            </div>
        )
    }
}
