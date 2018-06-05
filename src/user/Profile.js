import React, { Component } from "react"
import "./Profile.css"


class Profile extends Component {

    state = {
        userObject: {},
        status: "",
        relationshipId: null
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
                requestingFriendId: this.props.activeUser,
                acceptedFriendId: this.props.viewingUser
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

    //function to build appropriate friend affordance on the profile
    friendAffordance = function () {
        switch (this.state.status) {
            case "friends":
                return (<input type="button" onClick={this.removeFriendHandler} value="Remove Friend"/>)
            case "you":
                return (<p>This is you</p>)
            case "not-friends":
                return (<input type="button" onClick={this.addFriendHandler} value="Add Friend"/>)
            default:
                return (<div></div>)
        }
    }.bind(this)


    componentDidMount() {
        fetch(`http://localhost:5001/users?id=${this.props.viewingUser}`)
            .then(r => r.json())
            .then(user => {
                this.setState({ userObject: user[0] })
                return fetch(`http://localhost:5001/friends`)
            })
            .then(r => r.json())
            .then(friends => {
                const friend = friends.find(friend =>
                    ((friend.requestingFriendId === parseInt(this.props.activeUser) && friend.acceptedFriendId === parseInt(this.props.viewingUser))
                        || (friend.requestingFriendId === parseInt(this.props.viewingUser) && friend.acceptedFriendId === parseInt(this.props.activeUser)))
                )
                if (this.props.viewingUser === this.props.activeUser) {
                    this.setState({
                        status: "you"
                    })
                } else if (friend) {
                    this.setState({
                        status: "friends",
                        relationshipId: friend.id
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