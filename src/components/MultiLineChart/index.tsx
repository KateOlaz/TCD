import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Plotly from 'plotly.js-dist';

const MultiLineChart = ({ data }) => {
  useEffect(() => {
    if (data && data.length > 0) {
      plotChart(data);
    }
  }, [data]);

  const plotChart = (data) => {
    try {
      const pastelColors = [
        '#f1c40f', // Amarillo
        '#2ecc71', // Verde
        '#3498db', // Azul
        '#9b59b6', // Morado
        '#e67e22', // Naranja
        '#1abc9c', // Turquesa
        '#34495e', // Gris oscuro
      ];
  
      const sortedMonths = data[0].index_values
        .map(month => month.slice(0, 3)) // Extraer las primeras tres letras de cada mes
        .sort((a, b) => new Date('2000 ' + a) - new Date('2000 ' + b)) // Ordenar los meses cronológicamente
  
      const plotData = data.map((series, seriesIndex) => {
        return series.crime_types_info.map((crime, crimeIndex) => {
          return {
            x: sortedMonths,
            y: crime.values,
            name: crime.type,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {
              color: pastelColors[crimeIndex % pastelColors.length], // Utiliza crimeIndex en lugar de seriesIndex
            },
          };
        });
      }).flat();
  
      const layout = {
        xaxis: { title: 'Meses' },
        yaxis: { title: 'Incidencia' },
        width: 350,
        height: 250,
        showlegend: true,
        margin: { t: 0, r: 0, b: 40, l: 0 },
        legend: { orientation: 'h', y: 8 },
      };
  
      Plotly.newPlot('myDiv', plotData, layout);
    } catch (error) {
      console.error('Error plotting chart:', error);
    }
  };

  return <div id="myDiv" style={{ width: '100%', height: '100%' }} />;
};

MultiLineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default MultiLineChart;
