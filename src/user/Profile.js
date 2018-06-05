import React, {Component} from "react"
import "./Profile.css"


class Profile extends Component {

    state = {
        userObject: {}
    }

    componentDidMount() {
        fetch(`http://localhost:5001/users?id=${this.props.viewingUser}`)
        .then(r => r.json())
        .then(user => {
            this.setState({userObject: user[0]})
        })
    }

    render() {
        return (
            <div className="profile">
            <img src={this.state.userObject.image}/>
            <h3>{this.state.userObject.first} {this.state.userObject.last}</h3>
            <p>{this.state.userObject.location}</p>
            <p>{this.state.userObject.email}</p>
            </div>
        )
    }
}

export default Profile