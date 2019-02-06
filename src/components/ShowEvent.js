import React, { Component } from "react";


//comments ? 
// PUT	/organizers/:id

class ShowEvent extends Component {
    constructor() {
      super();
      this.state = {
          images:[],
          attendees:'',
          attendeesList:[],
          countAttendees:0,
          likes:0
      };
    }

    componentDidMount(){
        console.log('fetching data',`http://localhost:3000/events/${this.props.activeEvent.id}/event_images`);
        fetch(`http://localhost:3000/events/${this.props.activeEvent.id}/event_images`)
          .then( response => response.json())
          .then( data => {
            console.log('images',data);
            this.setState({
              images: data
            })
            console.log('ev', this.state.images)
          })
          .catch( error => {
            console.log(error)
          })

          {this.countAttendees()}
          {this.attendees()}
          {this.likes()}
    }
    
    attendees(){
        fetch(`http://localhost:3000/events/${this.props.activeEvent.id}/attendees`) 
          .then( response => response.json())
          .then( data => {
            console.log('attendees',data);
            this.setState({
              attendeesList: data
            })
            console.log('attnd', this.state.attendeesList)
          })
          .catch( error => {
            console.log(error)
          })
    }

    likes(){
        fetch(`http://localhost:3000/events/${this.props.activeEvent.id}/countlikes`) 
          .then( response => response.json())
          .then( data => {
            this.setState({
              likes: data
            })
          })
          .catch( error => {
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
           <div className="event-images"> <img src={img.image} alt=""/></div>
          )
        })
      }


    countAttendees(){
        fetch(`http://localhost:3000/events/${this.props.activeEvent.id}/countattendees`) 
          .then( response => response.json())
          .then( data => {
            this.setState({
              countAttendees: data
            })
          })
          .catch( error => {
            console.log(error)
          })
    }

    render() {
  return (
    <div>
      <div
        className="back"
        onClick={() => {
          this.props.setCurrentEvent(null);
        }}
      >
        back
      </div>
      <div className="container">
        <div className="event">
          <div>
            <h2>{this.props.activeEvent.name}</h2>
          </div>
          <div>
            <img src={this.props.activeEvent.logo} alt="" />
            <img src={this.props.activeEvent.logo} alt="" />
            <div className="event-details">
            <p>{this.props.activeEvent.description}</p>
            <p>{this.props.activeEvent.start_date}</p>
            <p>{this.props.activeEvent.end_date}</p>
            <p>{this.props.activeEvent.location}</p>
            <p>{this.props.activeEvent.location_id}</p>
            <p>{this.props.activeEvent.image_url}</p>
              <div className="event-buttons">
                <button onClick={() => {this.props.toggleModal()}}>Edit</button>
                <button onClick={() => {this.props.deleteEvent(this.props.activeEvent.id)}}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {this.renderEvents(this.state.images)}
      No. of likes: {this.state.likes}
      No. of attendees:  {this.state.countAttendees}
      List of attendees: {this.renderAttendees(this.state.attendeesList)}
    </div>
  );
};}

export default ShowEvent;
