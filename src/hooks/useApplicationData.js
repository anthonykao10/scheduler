import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
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

    /* save to db */
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => setState({ ...state, appointments }))
      .catch(e => console.log(e));
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
      .catch(e => console.log(e));
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

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}