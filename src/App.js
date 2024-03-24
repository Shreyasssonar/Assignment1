// App.js

import React from 'react';
import ChartComponent from './com/ChartComponent';
import returnsData from './com/data/returns.json'; // Import returns.json
import Navbar from './com/Navbar'; // Import the new Navbar component
import './App.css';

function App() {
  // Assuming you want to display the 'combined' dataset
  const combinedData = returnsData.data.combined;

  return (
    <div className="App">
      {/* Include the new Navbar component */}
      <Navbar />
      
      <h2>Drawdown Period</h2>
      <div className="chart-container">
        {/* Pass the selected dataset and its data key to ChartComponent */}
        <ChartComponent data={combinedData} dataKey="cumsum" />
      </div>
    </div>
  );
}

export default App;
