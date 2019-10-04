import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // inputs: 
  // - id: appointment id
  // - interview: interview object
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    console.log(id, interview);
    /* save to db */
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => setState({ ...state, appointments }))
      // .catch(e => console.log(e));
  }

  // input: 
  // - id: appointment id
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState({...state, appointments}))
      // .catch(e => console.log(e));
  }

  const setDay = day => setState({...state, day});
  const setStateObj = (days, appointments, interviewers) => setState(prev => ({ ...prev, interviewers, days, appointments}));

  useEffect(() => {
    Promise.all([
      axios('/api/days'),
      axios('/api/appointments'),
      axios('/api/interviewers')
    ])
      .then(res => {
        setStateObj(res[0].data, res[1].data, res[2].data);
      })
      .catch(e => console.log(e));
  }, []);

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
            days={state.days}
            day={state.day}
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
          { 
            getAppointmentsForDay(state, state.day).map(appointment => {
              const interview = getInterview(state, appointment.interview);
              return (
                <Appointment
                student={appointment.interview && appointment.interview.student }
                interviewer={appointment.interview && appointment.interview.interviewer}
                key={appointment.id}
                id={appointment.id}
                time={appointment.time}
                interview={interview}
                interviewers={getInterviewersForDay(state, state.day)}
                bookInterview={bookInterview}
                cancelInterview={cancelInterview}
              />
              );
            })
          }
          <Appointment key="last" time="5pm" />
        </>}
      </section>
    </main>
  );
}
