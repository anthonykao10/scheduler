import React from "react";

import { 
  render, 
  cleanup, 
  waitForElement, 
  fireEvent, 
  prettyDOM,
  getByText, 
  getAllByTestId,
  getByPlaceholderText,
  getByAltText,
  queryByText,
  queryByAltText
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
  
    return waitForElement(() => getByText("Monday"))
      .then(() => {
        fireEvent.click(getByText("Tuesday"));
        expect(getByText("Leopold Silvers")).toBeInTheDocument();
      });
  });


  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    // Enter student name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    // Select interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    // Check for "Status" component
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // Check for student name, after "Saving" indicator is hidden
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    // Find specific "day node" for "Monday"
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    // Check for "no spots remaining" text
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });
  

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // Select booked appointment
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));
    
    // Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument();
    
    fireEvent.click(queryByText(appointment, "Confirm"));

    // Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // Find specific "day node" for "Monday"
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    // Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });


  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Select booked appointment
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    
    // Edit appointment
    fireEvent.click(queryByAltText(appointment, "Edit"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    // Check for "Status" component
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // Check for student name, after "Saving" indicator is hidden
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    // Verify spots don't change
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });
});