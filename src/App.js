import React from 'react';
import ChartComponent from './com/ChartComponent'; // Update path as needed
import returnsData from './com/data/returns.json'; // Import returns.json
import periodsData from './com/data/ddperiod.json'; // Import ddperiod.json
import Navbar from './com/Navbar'; // Import the new Navbar component
import './App.css';

function App() {
  // Assuming you want to display the 'combined' dataset
  const combinedData = returnsData.data.combined;
  const periods = periodsData.data || []; // Ensure periods is an array

  return (
    <div className="App">
      {/* Include the new Navbar component */}
      <Navbar />
      
      <h2>Drawdown Period</h2>
      <div className="chart-container">
        {/* Pass the selected dataset, its data key, and periods data to ChartComponent */}
        <ChartComponent data={combinedData} periods={periods} />
      </div>
    </div>
  );
}

export default App;
