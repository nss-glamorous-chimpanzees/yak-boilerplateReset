import React, { Component } from "react"
import Event from './Event'
import './calendar.css'
import $ from "jquery"


export default class Calendar extends Component {
    constructor(props) {
        super(props)
        this.state={
            eventsList: []
        }
    }

    componentDidMount(){
        fetch(`http://localhost:5001/events?userId=${this.props.activeUser}`)
        .then(response => response.json())
        .then(events => {
            events.forEach((singleEvent, loc) => {
                if ((Date.now() + 604800000) <= new Date(singleEvent.date) || new Date(singleEvent.date) <= Date.now() ) {
                    events.splice(loc, 2)
                }
            })
            this.setState({
                eventsList: events
            })
        })
    }


    handleClick = function (e) {

            let eventNameVal = $("#eventName") 
            let eventLocationVal = $("#eventLocation") 
            let eventDateVal = $("#eventDate") 
            let eventStartVal = $("#eventStart")
            let eventEndVal = $("#eventEnd")

            if (
                eventNameVal.val() 
                && eventLocationVal.val() 
                && eventDateVal.val() 
                && eventStartVal.val() 
                && eventEndVal.val()
            ){
                const newEvent = {
                    userId: this.props.activeUser,
                    name: eventNameVal.val(),
                    location: eventLocationVal.val(),
                    date: eventDateVal.val(),
                    start: eventStartVal.val(),
                    end: eventEndVal.val()
                }
                fetch('http://localhost:5001/events/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newEvent)
                    })
                eventNameVal.val("")
                eventLocationVal.val("") 
                eventDateVal.val("") 
                eventStartVal.val("") 
                eventEndVal.val("")
                $("#newEventForm").slideToggle(333)
            } else {
                $("#eventFormErrorAlert").slideToggle(333).delay(3000).slideToggle(333)
            }
   }.bind(this)

    render () {
        return (
        <div id="calendarEvents">
            {this.state.eventsList.map(event => 
                <Event event={event} key={event.id}/>
            )}
            <input type="button" value="Add New Event" onClick={()=>$("#newEventForm").slideToggle(333)} />
            <form id="newEventForm">
                <h1>Add New Event</h1>
                <input type="text" placeholder="Event Name" id="eventName" />
                <input type="text" placeholder="Event Location" id="eventLocation" />
                <br />
                <label for="eventDate">Date:</label>
                <input type="date" id="eventDate"/>
                <br />
                <label for="eventStart">Start Time:</label>
                <input type="time" id="eventStart" />
                <br />
                <label for="eventEnd">End Time:</label>
                <input type="time" id="eventEnd" />
                <br />
                <input type="button" value="Submit" id="submitNewEvent" onClick={this.handleClick}/>
            </form>
            <h1 id="eventFormErrorAlert">All fields must be complete</h1>
        </div>
        )
    }
}