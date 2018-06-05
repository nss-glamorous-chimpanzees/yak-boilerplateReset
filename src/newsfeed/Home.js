import React, { Component } from "react"
import "./Home.css"
import PostList from "./PostList";
import AdList from "../ads/AdList";
import FriendList from "../friends/FriendList";
import Option from './Option'

export default class Home extends Component {
    
    state = {
        posts: [],
        userIds: [],
        message: "",
        title: "",
        image: "",
        toFriendId: null,
        friendIdsAndNames: []
    }
    
    //API call to post a new message to the database
    postMessage = (text) => fetch("http://localhost:5001/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: this.state.message,
            userId: this.props.activeUser,
            title: this.state.title,
            image: this.state.image,
            date: (new Date()).toLocaleDateString('en-US'),
            toFriendId: this.state.toFriendId
            
        })
    })

    //refreshes the post view. The submitted post should appear on top immediately.
    .then(() => {
        this.getFollowedUsers()
    })
    
    //erases the fields in the new post form
    .then(
        this.setState({
            message: "",
            title: "",
            image: ""
        })
    )
    
    //If the ID for each form element matches a property in this component's state, the value submitted to that form element will be set in state (ex: form field id "message" will set the value of "message" in this component's state when the form is submitted.)
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    getFollowedUsers() {

        //fetch call returns a single object representing the currently logged in user. That object has an embedded array of all of the current user's followed users.
        fetch((`http://localhost:5001/users/?id=${this.props.activeUser}&_embed=follows`))
        .then(user => user.json())
        .then(user => {

            //grabs just the ID for each of the followed users and pushes the ID to the userIds array in this component's state
            user[0].follows.forEach(follow => {
                this.state.userIds.push(parseInt(follow.followId))
            })

            //call function to build a list of postIds
            this.getPosts()
        })
    }

    getPosts() {

        //create a variable to store the parameter string that will be passed to JSON Server. Initialize the variable with the ID of the current user.
        let postUsers = `?userId=${this.props.activeUser}`

        //add the userIds of each followed user to the parameter string
        this.state.userIds.forEach(userId => {
            postUsers += `&userId=${userId}`
        })

        //make the API call using the parameter string
        fetch((`http://localhost:5001/posts${postUsers}`))
            .then(posts => posts.json())
            .then(posts => {
                let sortedPostIds=[]
                let filteredPostObjects=[]

                //create array of post objects
                const postObjects = [].concat(posts)

                //filter the post objects to remove private messages that are not to or from the current user
                postObjects.forEach(post => {

                    //if the 'toFriendId' field is null, the post is public and should be displayed
                    if(post.toFriendId === null) {
                        filteredPostObjects.push(post)

                    //if the "toFriendId" field is not null but it or the "userId" field matches the current user's Id, the post is private but should be displayed for the current user.
                    } else if (parseInt(post.userId) === parseInt(this.props.activeUser) || parseInt(post.toFriendId) === parseInt(this.props.activeUser)) {
                        filteredPostObjects.push(post)
                    }
                })

                //sort the filtered posts by date with the newest one on top
                filteredPostObjects.sort((a, b) => a.date < b.date)
                this.setState({
                    posts: filteredPostObjects
                })
            })
    }


    
    createFriendDropdown() {
        let friendArray
        let relationships
        let friendList = []
        let htmlArray = []

        //This logic duplicates the friend list and should be refactored in the future so we're using the same API calls.
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

            //Once we have a list of friends, create an array of objects that contains just the ID and name. This array will be passed down as props to the Option component during render.
            friendList.forEach(friend => {
                htmlArray.push({
                    id: friend.id,
                    name: `${friend.first} ${friend.last}`
                }                
            )
            })
            this.setState({
                friendIdsAndNames: htmlArray
            })
        })
    }   
    componentDidMount() {
        this.getFollowedUsers()
        this.createFriendDropdown()
    }
        
    render() {
        return (
            <div className="container-full">
                <div className="row">
                    <div className="col col-sm-3">
                        <FriendList activeUser={this.props.activeUser} showView={this.props.showView} setViewingUser={this.props.setViewingUser} />
                    </div>
                    <div className="col content col-sm-6">
                        <div className="newsfeed">
        {/* form for entering a new post */}
                            <form>
                                <div className="form-group">
                                    <label htmlFor="message"><h5>Yak to me, honey.</h5></label>
                                    <input type="text" placeholder="Title" id="title" value={this.state.title} onChange={this.handleFieldChange} className="form-control" />
                                    <textarea id="message" value={this.state.message} onChange={this.handleFieldChange} className="form-control" rows="4"></textarea>
                                    <input type="text" placeholder="Image URL" id="image" value={this.state.image} onChange={this.handleFieldChange} className="form-control" />
        {/* Drop-down for creating a private chat */}
                                    <select id="toFriendId" onChange={this.handleFieldChange} label="Private Chat With Friends">
                                        <option defaultValue="" id="">Public Post</option> 
                                        {
                                            this.state.friendIdsAndNames.map(f => <Option key={f.id} id={f.id} name={f.name} />)
                                        }
                                     </select>
                                </div>
                                <button type="button" onClick={this.postMessage} className="btn btn-info btn-lg">Post</button>
                            </form>
                            <PostList posts={this.state.posts} activeUser={this.props.activeUser} />
                        </div>
                    </div>
                    <div className="col col-sm-3">
                        <AdList activeUser={this.props.activeUser} />
                    </div>
                </div>
            </div>



        )
    }
}
