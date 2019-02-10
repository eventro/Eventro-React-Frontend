import React from 'react';

const Event = (props) => {
  return(

    <div className="content">

    <div className="event-view"
    onClick={() => {props.setCurrentEvent(props.event)}}  >
    <br/>
    <img src={props.event.logo} alt="" width="200px" height="200px"/>
     <div className="event-name">{props.event.name}</div>
     <div className="event-date">  {props.event.start_date}</div>


      </div>
    </div>

  )
}

export default Event;