import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class EventForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: props.activeEvent ? props.activeEvent.name : '',
      description: props.activeEvent ? props.activeEvent.description : '',
      start_date: props.activeEvent ? props.activeEvent.start_date : '',
      end_date: props.activeEvent ? props.activeEvent.end_date : '',
      location: props.activeEvent ? props.activeEvent.location : '',
      location_id: props.activeEvent ? props.activeEvent.location_id : '',
      logo: props.activeEvent ? props.activeEvent.logo : '',
      id: props.activeEvent ? props.activeEvent.id : null
    }
  }
  handleChange(event){
    const currentInput = event.target.name;
    const newValue = event.target.value;
    console.log('current input: ', currentInput);
    console.log('newValue: ', newValue);

    this.setState({
      [currentInput]: newValue
    }, function(){
      console.log(this.state);
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.state)
  }
  
  render(){
    return(
      <div  className="modall">
      <div className="content">

          <div className="close-modal" onClick={()=>{this.props.toggleModal()}}>x</div>
      <h1>Event</h1>
        <form  onSubmit={this.handleSubmit.bind(this)}>
          Event Name :
          <br></br><input  name='name'  label="Name" type="text" value={this.state.name}  onChange={this.handleChange.bind(this)} /><br></br>
          Description :
          <br></br><input  name='description'  label="Description" type="text" value={this.state.description}  onChange={this.handleChange.bind(this)} /><br></br>
          Start date:
          <br></br><input  name='start_date'  label="Start Date" type="date" value={this.state.start_date}  onChange={this.handleChange.bind(this)}    /><br></br>
          End date :
          <br></br><input  name='end_date'  label="End Date" type="date" value={this.state.end_date}  onChange={this.handleChange.bind(this)}    /><br></br>
          Location :
          <br></br><input  name='location'  label="Location" type="text" value={this.state.location}  onChange={this.handleChange.bind(this)} /><br></br>
          {/* <input  name='location_id'  label="Location Id" type="text" value={this.state.location_id}  onChange={this.handleChange.bind(this)} /><br></br> */}
          Logo : 
          <br></br><input  name='logo'  label="Logo" type="text" value={this.state.logo}  onChange={this.handleChange.bind(this)} /><br></br>
        <br></br>
          <button>Submit</button>
        </form>
      </div>
        
      </div>
    )
  }
}

export default EventForm;