/**
 * Returns array of objects with appointment details
 * @param {object} state 
 * @param {string} day 
 * @return {array}
 */
export function getAppointmentsForDay(state, day) {
  const dayObj = state.days.find(elem => elem.name === day);
  const output = [];
  if (!dayObj) return [];

  const appointments = dayObj.appointments;
  appointments.forEach(appointment => {
    if (state.appointments[appointment]) {
      output.push(state.appointments[appointment]);
    }
  });
  return output;
}


/**
 * Returns array of objects with interviewer details
 * @param {object} state 
 * @param {string} day 
 * @return {array}
 */
export function getInterviewersForDay(state, day) {
  const dayObj = state.days.find(elem => elem.name === day);
  const output = [];
  if (!dayObj) return [];
  
  const interviewers = dayObj.interviewers;
  interviewers.forEach(interviewer => {
    if (state.interviewers[interviewer]) {
      output.push(state.interviewers[interviewer]);
    }
  });
  return output;
}


/**
 * @param {object} state 
 * @param {object} interview
 * @return {object}
 */
export function getInterview(state, interview) {
  if (!interview) return null;
  const interviewer = state.interviewers[interview.interviewer];
  return {
    ...interview,
    interviewer
  };
}