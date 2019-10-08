import { useEffect, useReducer } from "react";
import axios from "axios";

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  UPDATE_SPOTS
} from "reducers/application";

export default function useApplicationData() {
  const [ state, dispatch ] = useReducer(reducer, 
    { 
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

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, appointments });
        dispatch({ type: UPDATE_SPOTS, day: state.day, days: state.days, appointments: state.appointments});
      });
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
      .then(() => {
        dispatch({ type: SET_INTERVIEW, appointments });
        dispatch({ type: UPDATE_SPOTS, day: state.day, days: state.days, appointments: state.appointments});
      });
  }

  const setDay = day => dispatch({ type: SET_DAY, day });

  const setStateObj = (days, appointments, interviewers) => {
    dispatch({ type: SET_APPLICATION_DATA, interviewers, days, appointments });
  };

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
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