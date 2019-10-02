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
  appointments.map(appointment => {
    if (state.appointments[appointment]) {
      output.push(state.appointments[appointment]);
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