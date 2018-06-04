import React, { Component } from "react"
import "./Ad.css"


export default class Ad extends Component {

    constructor(props) {
        super(props)

        this.state = {
            adId: 0,
            adTitle: "",
            adContent: "",
            adCompany: ""
        }
    }


    componentDidMount() {
        fetch(`http://localhost:5001/ads/${this.props.adId}`)
        .then(response => response.json())
        .then(data => {
            this.setState({
                adTitle: data.title,
                adContent: data.content,
                adCompany: data.company,
                adId: data.id
            })
        })
    }
    
    handleClick = function (e) {
        const newUserAd = {
            userId: this.props.userId,
              adId: e.target.id
        }
        fetch('http://localhost:5001/usersads/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUserAd)
          })
          this.props.callback(e.target.id)
   }.bind(this)

    render() {
      return (
        <div className="Ad">
            <h2>{this.state.adTitle}</h2>
            <input type="button" value="Remove Ad" id={this.state.adId} onClick={this.handleClick} />
            <p>{this.state.adContent}</p>
            <p>{this.state.adContent}</p>
        </div>
      )
    }
}
