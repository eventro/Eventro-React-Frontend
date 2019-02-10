import React, { Component } from "react";


//comments ? 
// PUT	/organizers/:id

class ShowEvent extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      attendees: '',
      attendeesList: [],
      countAttendees: 0,
      likes: 0
    };
  }

  componentDidMount() {
    console.log('fetching data', `http://localhost:3000/events/${this.props.activeEvent.id}/event_images`);
    fetch(`http://localhost:3000/events/${this.props.activeEvent.id}/event_images`)
      .then(response => response.json())
      .then(data => {
        console.log('images', data);
        this.setState({
          images: data
        })
        console.log('ev', this.state.images)
      })
      .catch(error => {
        console.log(error)
      })

    { this.countAttendees() }
    { this.attendees() }
    { this.likes() }
  }

  attendees() {
    fetch(`http://localhost:3000/events/${this.props.activeEvent.id}/attendees`)
      .then(response => response.json())
      .then(data => {
        console.log('attendees', data);
        this.setState({
          attendeesList: data
        })
        console.log('attnd', this.state.attendeesList)
      })
      .catch(error => {
        console.log(error)
      })
  }

  likes() {
    fetch(`http://localhost:3000/events/${this.props.activeEvent.id}/countlikes`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          likes: data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  renderAttendees(attendees) {
    return attendees.map((el) => {
      return (
        <div className="attendees">
          <p>{el.name}</p> {/* i think we need only names? */}
          {/* <p>{el.username}</p> */}
        </div>
      )
    })
  }

  renderEvents(eventImages) {
    return eventImages.map((img) => {
      console.log('img', img)
      return (
        <div className="event-images"> <img src={img.image} alt="" /></div>
      )
    })
  }


  countAttendees() {
    fetch(`http://localhost:3000/events/${this.props.activeEvent.id}/countattendees`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          countAttendees: data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div className="content">


        <div
          className="back"
          onClick={() => {
            this.props.setCurrentEvent(null);
          }}
        >
          back
      </div>
       
       {/* <div id="cen"> */}
         <p>{this.props.activeEvent.image_url}</p>

        <img src={this.props.activeEvent.logo} alt="" width="50%" height="50%"/>
        <h2>{this.props.activeEvent.name}</h2>
        {this.renderEvents(this.state.images)} <br/>
        No. of likes: {this.state.likes}<br/>
        No. of attendees:  {this.state.countAttendees}<br/>
        List of attendees: {this.renderAttendees(this.state.attendeesList)}<br/>
        <p id="cen">Start Date :{this.props.activeEvent.start_date}</p>
        <p id="cen">End Date :{this.props.activeEvent.end_date}</p>
        <p id="cen">Description :<br></br>{this.props.activeEvent.description}</p>
        <button onClick={() => { this.props.toggleModal() }}>Edit</button>
        <button onClick={() => { this.props.deleteEvent(this.props.activeEvent.id) }}>Delete</button>
        </div>
      // </div>
    );
  };
}

export default ShowEvent;



