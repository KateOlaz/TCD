import React from 'react';
import Plot from 'react-plotly.js';

const BarPolar = ({ processedDataPolar }) => {
  if (!processedDataPolar || !processedDataPolar.length) {
    console.error('Los datos de BarPolar no tienen la estructura esperada:', processedDataPolar);
    return <div>Error: Cargando</div>;
  }

  const categories = processedDataPolar[0].index_values;
  const colors = ['#3498db', '#1abc9c', '#2ecc71', '#27ae60', '#9b59b6', '#8e44ad', '#2c3e50'];

  const plotData = processedDataPolar[0].crime_types_info.map((crimeType, index) => ({
    type: 'barpolar',
    r: crimeType.values,
    name: crimeType.type,
    hoverinfo: 'r+text',
    text: categories,
    width: 5,
    marker: { color: colors[index] },
    line: {
      color: colors[index],
      width: 2,
    },
  }));

  const layout = {
    font: { size: 16 },
    legend: { orientation: 'h', font: { size: 10 }, x: 0.2, y: -0.1 },
    polar: {
      radialaxis: { showticklabels: false, ticks: '' },
      angularaxis: { showticklabels: false },
      bgcolor: 'rgba(255, 255, 255, 0.9)',
      gridcolor: 'rgba(211, 211, 211, 0.9)',
    },
    height: 440,
    width: 440,
    margin: { l: 0, r: 0, b: 30, t: 20 },
  };

  return <Plot data={plotData} layout={layout} />;
};

export default BarPolar;
