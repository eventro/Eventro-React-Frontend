import React, { Component } from "react";
import { getToken } from "../services/authService";
import Event from './Event';
import ShowEvent from './ShowEvent';
import EventForm from '././EventForm';

class Organizer extends Component {
  constructor() {
    super();
    this.state = {
        events:[],
        activeEvent: null,
        modal: false,
        info:false
    };
  }
    componentDidMount(){
        console.log('fetching data');
        fetch(`http://localhost:3000/organizers/${this.props.user.id}/events?auth_token=${getToken()}`)
          .then( response => response.json())
          .then( data => {
            console.log('dddd',data);
            this.setState({
              events: data
            })
            console.log('ev', this.state.events)
          })
          .catch( error => {
            console.log(error)
          })
      }

    //   "email": "org1@gmail.com",
    //   "name": "Organizer1",
    //   "phone": "0505993972",

      updateOrganizerInfo(event) {
        const url = `http://localhost:3000/organizers/${this.props.user.id}?auth_token=${getToken()}`
        
        fetch(url, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(event)
        })
        .then(response => response.json())
        .then(data => {
        console.log('updated data', data)
         // this.props.updateOrganizerInfo(data)


        //   const updatedEvents = this.state.events.map(el => {
        //     return el.id === data.id ? data : el
        //   })
        //   console.log('current state: ', this.state.events);
        //   console.log('new state: ', updatedEvents)
    
        //   this.setState({
        //     events: updatedEvents,
        //     activeEvent: event,
        //     modal: false
        //   })
        })
        .catch(error => {
          console.log(error);
        })
      }

      setCurrentEvent(event) {
        console.log('setting event');
        console.log(event);
        this.setState({
          activeEvent: event
        })
      }

      deleteEvent(id) {
        const url = `http://localhost:3000/events/${id}?auth_token=${getToken()}`;
        fetch(url, {
            method: 'DELETE'
          })
          .then(response => response.json())
          .then(data => {
            const updatedEvents = this.state.events.filter( event => event.id !== id)
            this.setState({
              events: updatedEvents,
              activeEvent: null
            })
          })
          .catch(error => {
            console.log(error);
          })
      }




  updateEvent(event) {
    const url = `http://localhost:3000/events/${event.id}?auth_token=${getToken()}`
    
    fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(event)
    })
    .then(response => response.json())
    .then(data => {

      const updatedEvents = this.state.events.map(el => {
        return el.id === data.id ? data : el
      })
      console.log('current state: ', this.state.events);
      console.log('new state: ', updatedEvents)

      this.setState({
        events: updatedEvents,
        activeEvent: event,
        modal: false
      })
    })
    .catch(error => {
      console.log(error);
    })
  }

  createNewEvent(event) {
   const url = `http://localhost:3000/organizers/${this.props.user.id}/events?auth_token=${getToken()}`
   fetch(url, {
       method: 'POST',
       headers: {
         "Content-Type": "application/json"
       },
       body: JSON.stringify(event)
     })
     .then(response => response.json())
     .then(data => {
       console.log('DATA')
       console.log(data);
       const updatedEvents = this.state.events.concat([data]);
       console.log(updatedEvents)
       this.setState({
         events: updatedEvents,
         activeEvent: data,
         modal: false
       })
     })
     .catch(error => {
       console.log(error);
     })
  }

  toggleModal(){
    
    this.setState({
      modal: !this.state.modal
    })
    console.log('hi', this.state.modal)
  }

  toggleInfo(){
    
    this.setState({
      info: !this.state.modal
    })
    console.log('hi', this.state.modal)
  }
      renderEvents(allEvents) {
        return allEvents.map((event) => {
          return (
            <Event key={event.id}
              event={event}
              setCurrentEvent={this.setCurrentEvent.bind(this)}
              />
          )
        })
      }

      handleSubmit(event) {
        if(this.state.activeEvent) {
          this.updateEvent(event)
        } else {
          this.createNewEvent(event)
        }
      }

      renderContent(){
        if (this.state.activeEvent)
        return (
        <ShowEvent
        setCurrentEvent={this.setCurrentEvent.bind(this)} 
        activeEvent={this.state.activeEvent}
        deleteEvent={this.deleteEvent.bind(this)}
        toggleModal={this.toggleModal.bind(this)}
        />)
        else
       return( 
           <div>
             <br></br>
             <button onClick={this.toggleModal.bind(this)}>Add Event</button>
           {/* <div onClick={this.toggleModal.bind(this)}>+</div> */}
           <div className="event-views"> {this.renderEvents(this.state.events)} </div>
           </div>)
      }


  render() {
    return (
      <div id="organizer">

        Hello {this.props.user.name}

{this.renderContent()}
        {this.state.modal ? 
          <EventForm 
            handleSubmit={this.handleSubmit.bind(this)} 
            toggleModal={this.toggleModal.bind(this)}
            activeEvent={this.state.activeEvent}
            /> : ''}

        </div>

    );
  }
}

export default Organizer;

