import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },  
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "test student 2",
      interviewer: {
        id: 3,
        name: "test interviewer 3",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },  
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "test student 3",
      interviewer: {
        id: 4,
        name: "test interviewer 4",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
];

export default function Application(props) {
  const [ day, setDay ] = useState('Monday');
  const [ days, setDays ] = useState([]);

  useEffect(() => {
    axios('/api/days')
      .then(res => {
        console.log(res);
        setDays(res.data);
      })
      .catch(e => console.log(e));
  }, []);

  const appointmentElems = appointments.map(appointment => {
    return (
      <Appointment key={appointment.id} {...appointment} />
    );
  });
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            day={day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {<>
          {appointmentElems}
          <Appointment key="last" time="5pm" />
        </>}
      </section>
    </main>
  );
}
