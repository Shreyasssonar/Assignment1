import React, { useRef, useEffect, useState } from 'react';
import { createChart } from 'lightweight-charts';

function ChartComponent({ data, periods }) {
  const chartContainerRef = useRef(null);
  const chartInstance = useRef(null);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    chartInstance.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.offsetWidth,
      height: chartContainerRef.current.offsetHeight,
    });

    const lineSeries = chartInstance.current.addAreaSeries({
      topColor: 'rgba(70, 130, 180, 0.5)', // Top color for gradient
      bottomColor: 'rgba(70, 130, 180, 0.1)', // Bottom color for gradient
      lineColor: '#4682B4', 
    });
    const chartData = data.map(({ date, cumsum }) => ({
      time: new Date(date).getTime(),
      value: cumsum,
    }));
    lineSeries.setData(chartData);

    // Calculate MaxDD and Days for each period
    const formattedTableData = periods.map(({ Start_Date, End_Date }) => {
      // Calculate MaxDD (assuming data contains pnl values)
      const pnlValues = data.filter(({ date }) => date >= Start_Date && date <= End_Date).map(({ pnl }) => pnl);
      const maxDD = calculateMaxDrawdown(pnlValues);

      // Calculate Days
      const startDate = new Date(Start_Date);
      const endDate = new Date(End_Date);
      const days = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));

      return {
        Start_Date,
        End_Date,
        MaxDD: maxDD.toFixed(2),
        Days: days,
      };
    });

    setTableData(formattedTableData);

    return () => {
      if (chartInstance.current !== null) {
        chartInstance.current.remove();
      }
    };
  }, [data, periods]);

  // Function to calculate maximum drawdown
  const calculateMaxDrawdown = (values) => {
    let maxDD = 0;
    let peak = values[0];
    for (let i = 1; i < values.length; i++) {
      const current = values[i];
      if (current > peak) {
        peak = current;
      } else {
        const drawdown = (peak - current) / peak;
        if (drawdown > maxDD) {
          maxDD = drawdown;
        }
      }
    }
    return maxDD;
  };

  // Render the component
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
                <td>{`${rowData.Start_Date} - ${rowData.End_Date}`}</td>
                <td>{rowData.MaxDD}</td>
                <td>{rowData.Days}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ChartComponent;
