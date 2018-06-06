import React, { Component } from "react"
import "./Profile.css"


class Profile extends Component {

    state = {
        userObject: {},
        status: "",
        relationshipId: null, 
        requestObject: {}
    }

    //event handler for removeFriend button
    removeFriendHandler = function () {
        fetch(`http://localhost:5001/friends/${this.state.relationshipId.toString()}`, { method: "DELETE" })
        this.props.showView("home")
    }.bind(this)

    //event handler for add friend button
    addFriendHandler = function () {
        const friendRequest =
            {
                requestingFriendId: parseInt(this.props.activeUser),
                acceptedFriendId: parseInt(this.props.viewingUser)
            }
        fetch(`http://localhost:5001/friendRequests`,
            {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(friendRequest)
            })
        alert(`You sent ${this.state.userObject.first} a friend request!`)
        this.props.showView("home")
    }.bind(this)
    //handler for the accept friend button
    acceptFriend = function () {
        const friendRequest = {requestingFriendId: parseInt(this.props.viewingUser), acceptedFriendId: parseInt(this.props.activeUser)}
        fetch(`http://localhost:5001/friends`,
            {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(friendRequest)
            })
        fetch(`http://localhost:5001/friendRequests/${this.state.requestObject.id}`, {method: "DELETE"})
        alert (`You and ${this.state.userObject.first} are now friends!`)
        this.props.showView("home")
    }.bind(this)
    
    //handler for the reject friend button
    rejectFriend = function () {
        fetch(`http://localhost:5001/friendRequests/${this.state.requestObject.id}`, {method: "DELETE"})
        this.props.showView("home")
    }.bind(this)

    //function to build appropriate friend affordance on the profile
    friendAffordance = function () {
        switch (this.state.status) {
            case "friends":
                return (<input type="button" onClick={this.removeFriendHandler} value="Remove Friend"/>)
            case "you":
                return (<p>This is you</p>)
            case "friend-request":
                return (<div><input type="button" onClick={this.acceptFriend} value="Accept Friend Request"/><input type="button" onClick={this.rejectFriend} value="Reject Friend Request"/></div>)
            case "not-friends":
                return (<input type="button" onClick={this.addFriendHandler} value="Add Friend"/>)
            default:
                return (<div></div>)
        }
    }.bind(this)


    componentDidMount() {
        let friend
        fetch(`http://localhost:5001/users?id=${this.props.viewingUser}`)
            .then(r => r.json())
            .then(user => {
                this.setState({ userObject: user[0] })
                return fetch(`http://localhost:5001/friends`)
            })
            .then(r => r.json())
            .then(friends => {
                friend = friends.find(friend =>
                    ((friend.requestingFriendId === parseInt(this.props.activeUser) && friend.acceptedFriendId === parseInt(this.props.viewingUser))
                        || (friend.requestingFriendId === parseInt(this.props.viewingUser) && friend.acceptedFriendId === parseInt(this.props.activeUser))))
                return fetch(`http://localhost:5001/friendRequests?acceptedFriendId=${this.props.activeUser}`)
            })
            .then(r => r.json())
            .then(friendRequests => {
                const friendRequest = friendRequests.find(request => request.requestingFriendId === parseInt(this.props.viewingUser))
                
                this.setState({
                    requestObject: friendRequest
                })
                if (this.props.viewingUser === this.props.activeUser) {
                    this.setState({
                        status: "you"
                    })
                } else if (friend) {
                    this.setState({
                        status: "friends",
                        relationshipId: friend.id
                    })
                } else if (friendRequest) {
                    this.setState({
                        status: "friend-request"
                    })
                } else {
                    this.setState({
                        status: "not-friends"
                    })
                }
            })
    }

    render() {
        return (
            <div className="profile">
                <img src={this.state.userObject.image} />
                <h3>{this.state.userObject.first} {this.state.userObject.last}</h3>
                <p>{this.state.userObject.location}</p>
                <p>{this.state.userObject.email}</p>
                <this.friendAffordance />
            </div>
        )
    }
}

export default Profile