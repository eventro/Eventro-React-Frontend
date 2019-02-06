import React from 'react';

const Event = (props) => {
  return(
    <div className="event-view"
    onClick={() => {props.setCurrentEvent(props.event)}}  >
    <br/>
    <img src={props.event.logo} alt=""/>
     <div className="event-name">{props.event.name}</div>
     <div className="event-date">  {props.event.start_date}</div>


      </div>

  )
}

export default Event;