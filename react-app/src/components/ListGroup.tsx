import { MouseEvent } from "react";

function ListGroup() {
  const name = ["Trichy", "Chennai", "Bangalore", "New Delhi"];
  //   name = [];

  const eventhandler = (event: MouseEvent) => console.log(event);

  return (
    //write multiple jsx commands
    //fragment shortcut - Returning multiple dom elements
    <>
      <h1>List</h1>
      {/* {name.length===0? <p>no items Found!</p>:null} */}
      {name.length === 0 && <p>no items Found!</p>}
      <ul className="list-group">
        {name.map((nam) => (
          <li className="list-group-name" key={nam} onClick={eventhandler}>
            {nam}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
