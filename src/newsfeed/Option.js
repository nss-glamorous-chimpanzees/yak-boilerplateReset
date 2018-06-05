import React, { Component } from "react"


export default class Option extends Component {
    render() {
        return(
            <option key={this.props.id} value={this.props.id}>{this.props.name}</option>
        )
    }
}