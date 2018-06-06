import React, { Component } from "react"


export default class Friend extends Component {

    switchToProfile = function (event) {
        console.log(event.target.id)
        console.log(this.props);
        this.props.setViewingUser(event.target.id)
        this.props.showView("profile")
    }.bind(this)


    render() {
        return (
            <div className="friend-item">
                <h4 id={this.props.id} onClick={this.switchToProfile}>{this.props.email}</h4>
            </div>
        )
    }
}