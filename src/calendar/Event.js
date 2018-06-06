import React, { Component } from "react"

export default class Event extends Component {
    constructor(props) {
        super(props)
        this.state={
            event: []
        }
    }

    componentDidMount(){
        // fetch(`http://localhost:5001/events?id=${this.props.event.id}`)
        // .then(response => response.json())
        // .then(events => {
        //     this.setState({
        //         eventsList: events
        //     })
        // })
        this.setState({
            event: this.props.event
        })
    }

    render () {
        return (
        <div>
            <h1>{this.state.event.name}</h1>
            <h2>Location: {this.state.event.location}</h2>
            <p>Date: {this.state.event.date}</p>
            <p>Time: {this.state.event.start} - {this.state.event.end}</p>
        </div>
        )
    }
}