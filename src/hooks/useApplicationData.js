import { useEffect, useReducer } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const UPDATE_SPOTS = "UPDATE_SPOTS";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";


function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { 
        ...state, 
        day: action.day 
      }
    case SET_APPLICATION_DATA:
      return { 
        ...state, 
        days: action.days, 
        appointments: action.appointments, 
        interviewers: action.interviewers 
      }
    case SET_INTERVIEW: {
      return { 
        ...state, 
        appointments: action.appointments 
      }
    }
    case UPDATE_SPOTS: {
      const newDays = [...action.days];
      const dayObj = newDays.find(dayObj => dayObj.name === action.day);

      // Get spots for day
      let spots = 0;
      dayObj.appointments.forEach(appointmentId => {
        // Increment spots if interview obj exists for that appointment
        if (!state.appointments[appointmentId].interview) spots++;
      });
      // Update spots
      newDays[dayObj.id - 1].spots = spots;
      
      return {
        ...state,
        days: newDays
      }
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}


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
      })
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
      .then(() => {
        dispatch({ type: SET_INTERVIEW, appointments });
        dispatch({ type: UPDATE_SPOTS, day: state.day, days: state.days, appointments: state.appointments});
      })
      .catch(e => console.log(e));
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