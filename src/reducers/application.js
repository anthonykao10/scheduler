export const SET_DAY = "SET_DAY";
export const UPDATE_SPOTS = "UPDATE_SPOTS";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
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