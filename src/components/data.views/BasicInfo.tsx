import React, { useState } from 'react';

import loadData, { State } from "../../data"

function App() {
  const [state, setState] = useState<State>(loadData());
  const [salary, setSalary] = useState<number>(state.basicInfo.salary);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  }

  return (
    <div>
       <div className="Section">
        <header>
          Basic Info
        </header>
        <form onSubmit={handleSubmit}>
          <label>
            Salary:
            <input type="number" name="salary" value={salary} onChange={(e) => setSalary(e.target.value as unknown as number)}/>
          </label>
          <br></br>
          <input type="submit" value="Save" />
        </form>
      </div>
    </div>
  );
}

export default App;


// <div className="App">
//   <header className="App-header">
//     <img src={logo} className="App-logo" alt="logo" />
//     <p>
//       Edit <code>src/App.tsx</code> and save to reload.
//     </p>
//     <a
//       className="App-link"
//       href="https://reactjs.org"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       Learn React
//     </a>
//   </header>
// </div>