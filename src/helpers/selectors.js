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