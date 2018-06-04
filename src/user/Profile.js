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
            <h3>{this.state.userObject.email}</h3>
            </div>
        )
    }
}

export default Profile