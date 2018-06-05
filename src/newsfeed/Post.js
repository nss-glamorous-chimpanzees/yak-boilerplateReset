import React, { Component } from "react"
import "./Post.css"

export default class Post extends Component {
    state = {
        userName: '',
        userId: '',
        userImg: '',
        toFriendName: '',
        posterId: ''
    }

    getNames() {

        //retrieves the names of the user who posted this post as well as the name of the receiving friend if this post is a private chat

        fetch((`http://localhost:5001/posts/?id=${this.props.post.id}`))
            .then(post => post.json())
            .then(post => {
                this.setState({
                    userId: post[0].userId
                })
                return fetch(`http://localhost:5001/users/?id=${this.state.userId}`)
            })
            .then(poster => poster.json())
            .then(poster => {
                this.setState({
                    userName: `${poster[0].first} ${poster[0].last}`,
                    userImg: poster[0].image
                })
                return fetch(`http://localhost:5001/users/?id=${this.props.post.toFriendId}`)
            })
            .then(friend => friend.json())
            .then(friend => {

                {this.props.post.toFriendId ? (
                    this.setState({
                        toFriendName: `${friend[0].first} ${friend[0].last}`
                    })
                ) : (
                    this.setState({
                        toFriendName: 'everyone'
                    })
                )}
            })
    }

    componentDidMount() {
        this.getNames()
    }

    render() {

        return (
            <div className="post card">
                <section className="post-body">
                    <h3 className="post-title">{this.props.post.title}</h3>
                    <p className="post-date">{this.props.post.date}</p>

            {/* ternary will render an image only if there is one available in the database. Otherwise, it will render an empty paragraph */}
                    {this.props.post.image ? (
                        <img src={this.props.post.image} className="post-image" alt={this.props.post.title} />
                    ) : (
                        <p></p>
                    )}
                    <section className="post-text">
                        {this.props.post.content}
                    </section>
            {/* ternary will display a "to/from" message if this post is part of a private chat. If the post is public, the author's first and last names and profile picture will appear. */}
                    {this.props.post.toFriendId ? (
                        <section className="private">
                            <p>This is a private message from {this.state.userName} to {this.state.toFriendName} </p>
                        </section>
                        ) : (
                        <section className="post-author">
                            <img src={this.state.userImg} className="post-poster-image" alt={this.state.userName} />
                            <p>{this.state.userName}</p>
                        </section>
                        )
                    }
            {/* Displays the "like" button only if the post was not authored by the current user. Otherwise, an empty paragraph appears */}
                    {(parseInt(this.props.post.userId) !== parseInt(this.props.activeUser)) ? (
                            <a href="#" className="btn btn-outline-success">Like</a>
                        ) : (
                            <p></p>
                        )
                    }
                </section>
            </div>
        )
    }
}
