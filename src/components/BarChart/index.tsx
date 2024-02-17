import React, { useEffect } from 'react';
import Plotly from 'plotly.js-dist';

const BarChart = ({ processedDataChart }) => {
  useEffect(() => {
    if (processedDataChart && processedDataChart.length > 0) {
      plotChart(processedDataChart[0]);
    }
  }, [processedDataChart]);

  const plotChart = (chartData) => {
    const colorPalette = [
      'rgba(66, 135, 245, 0.7)',  // Azul claro
      'rgba(0, 102, 204, 0.7)',  // Azul medio
      'rgba(0, 68, 136, 0.7)',   // Azul oscuro
      'rgba(64, 224, 208, 0.7)', // Turquesa claro
      'rgba(0, 206, 209, 0.7)',  // Turquesa medio
      'rgba(0, 139, 139, 0.7)',  // Turquesa oscuro
    ];

    const data = chartData.crime_types_info.map((crimeType, index) => ({
      x: chartData.index_values,
      y: crimeType.values,
      type: 'bar',
      name: crimeType.type,
      marker: {
        color: colorPalette[index % colorPalette.length],
      },
    }));

    const layout = {
      barmode: 'stack',
      xaxis: { categoryorder: 'category ascending', title: 'Horas del día' },
      yaxis: { title: 'Incidencia' },
      width: 450,
      height: 300,
      margin: { t: 0, r: 0, b: 40, l:50 },
      paper_bgcolor: 'rgba(0,0,0,0)',
      legend: { orientation: 'h', y: 8},
    };

    Plotly.newPlot('barChart', data, layout);
  };

  return <div id="barChart" style={{ width: '100%', height: '100%' }} />;
};

export default BarChart;
