import React, { useEffect } from 'react';
import Plotly from 'plotly.js-dist';

const HorizontalBarChart = ({ processedDataHorizontalChart }) => {
  useEffect(() => {
    if (processedDataHorizontalChart && processedDataHorizontalChart.length > 0) {
      plotChart(processedDataHorizontalChart[0]);
    }
  }, [processedDataHorizontalChart]);

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
      y: [crimeType.type],
      x: crimeType.values,
      type: 'bar',
      orientation: 'h',
      name: crimeType.type,
      marker: {
        color: colorPalette[index % colorPalette.length],
      },
    }));

    const layout = {
      barmode: 'stack',
      yaxis: { title: 'Tipos de Crimen', showticklabels: false },
      xaxis: { title: 'Incidencia' },
      width: 400,
      height: 260,
      margin: { t: 0, r: 0, b: 40, l: 20 },
      paper_bgcolor: 'rgba(0,0,0,0)',
      legend: { orientation: 'h', y: 8 },
    };

    Plotly.newPlot('HorizontalbarChart', data, layout);
  };

  return <div id="HorizontalbarChart" style={{ width: '100%', height: '100%' }} />;
};

export default HorizontalBarChart;
