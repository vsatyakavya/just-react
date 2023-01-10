import "./App.css";
import EnrolmentForm from "./EnrolmentForm";
import React, { useState, Suspense } from "react";
const EnrolList = React.lazy(() => import("./EnrolList.js"));

const App = () => {
  const [program, setProgram] = useState("UG");
  const [ugSeats, setUgSeats] = useState(15);
  const [pgSeats, setPgSeats] = useState(10);
  const [studentDetails, setStudentDetails] = useState({});
  const [action, setAction] = useState();
  const [itemId, setItemId] = useState();
  const [isUGChecked, setIsUGChecked] = useState(true);
  const [isRestoreSeats, setIsRestoreSeats] = useState(false);

  const handleChange = (event) => {
    setProgram(event.target.value);
    setIsUGChecked(!isUGChecked);
    if (isRestoreSeats) {
      event.target.value === "UG"
        ? setPgSeats(pgSeats + 1)
        : setUgSeats(ugSeats + 1);
      setIsRestoreSeats(false);
    }
  };
  const setUpdatedSeats = (updatedSeats) => {
    if (program === "UG") {
      setUgSeats(updatedSeats);
    } else {
      setPgSeats(updatedSeats);
    }
  };
  const handleItemSelection = (action, id) => {
    setAction(action);
    setItemId(id);
  };
  const restoreSeats = (pgm) => {
    pgm === "UG" ? setUgSeats(ugSeats + 1) : setPgSeats(pgSeats + 1);
    setAction("");
  };

  const setSelectedProgram = (selProgram) => {
    selProgram === "UG" ? setIsUGChecked(true) : setIsUGChecked(false);
    setProgram(selProgram);
    setIsRestoreSeats(true);
  };
  return (
    <div className="App">
      <div className="programs">
        <h3 className="title">Student Enrolment Form</h3>
        <ul className="ulEnrol">
          <li className="parentLabels" onChange={handleChange}>
            <input
              type="radio"
              value="UG"
              name="programGroup"
              checked={isUGChecked}
            />
            UnderGraduate
            <input
              type="radio"
              className="radioSel"
              value="PG"
              name="programGroup"
              checked={!isUGChecked}
            />
            PostGraduate
          </li>
          <li>
            <label className="parentLabels">
              Remaining {program} seats - {program === "UG" ? ugSeats : pgSeats}
            </label>
          </li>
        </ul>
      </div>
      <EnrolmentForm
        // chosenProgram={program}
        // setUpdatedSeats={setUpdatedSeats}
        // currentSeats={program === "UG" ? ugSeats : pgSeats}
        setStudentDetails={setStudentDetails}
        handleItemSelection={handleItemSelection}
        // setSelectedProgram={setSelectedProgram}
        // setIsRestoreSeats = {setIsRestoreSeats}
      />
      <Suspense fallback={<div> Enrolled student details loading......</div>}>
        <EnrolList
          studentDetails={studentDetails}
          setStudentDetails={setStudentDetails}
          selectedItemId={itemId}
          action={action}
          restoreSeats={restoreSeats}
          setUpdatedSeats={setUpdatedSeats}
          currentSeats={program === "UG" ? ugSeats : pgSeats}
          chosenProgram={program}
          setSelectedProgram={setSelectedProgram}


        />
      </Suspense>
    </div>
  );
};

export default App;

// eslint-disable-next-line no-lone-blocks
{
  /* <label>UG seats: {ugSeats}</label>
<br/>
<label>PG seats: {pgSeats}</label>
<br/>
<br/>
<label>Choose Program : </label>
<select className = "appDropDowns"
value = {program}
onChange = {handleChange}>
  <option value="UG">UnderGraduate</option>
  <option value="PG">PostGraduate</option>
</select> */
}
