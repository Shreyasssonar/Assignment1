// ChartComponent.js

import React, { useRef, useEffect, useState } from 'react';
import { createChart } from 'lightweight-charts';

function ChartComponent({ data }) {
  const chartContainerRef = useRef(null);
  const chartInstance = useRef(null);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    chartInstance.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.offsetWidth,
      height: chartContainerRef.current.offsetHeight,
    });

    const lineSeries = chartInstance.current.addLineSeries({
      topColor: 'rgba(70, 130, 180, 0.5)', 
      bottomColor: 'rgba(70, 130, 180, 0.1)', 
      lineColor: '#4682B4', 
    });
    const chartData = data.map(({ date, cumsum }) => ({
      time: new Date(date).getTime(),
      value: cumsum,
    }));
    lineSeries.setData(chartData);

    // Prepare table data
    const formattedTableData = data.map(({ date, pnl, cumsum }) => ({
      date,
      pnl,
      cumsum,
    }));
    setTableData(formattedTableData);

    return () => {
      if (chartInstance.current !== null) {
        chartInstance.current.remove();
      }
    };
  }, [data]);

  return (
    <div className="container">
      <div className="chart-container" ref={chartContainerRef} />
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Period</th>
              <th>MaxDD</th>
              <th>Days</th>
            </tr>
          </thead>
          <tbody>
            {tableData.slice(0, 11).map((rowData, index) => (
              <tr key={index}>
                <td>{rowData.date}</td>
                <td>{rowData.pnl}</td>
                <td>{rowData.cumsum}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ChartComponent;
