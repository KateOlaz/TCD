import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import * as d3 from 'd3';

const Map = () => {
  const [selectedYear, setSelectedYear] = useState(2015);
  const [outputContainer, setOutputContainer] = useState('');
  const [beeMapFigure, setBeeMapFigure] = useState({});

  useEffect(() => {
    const updateGraph = async (optionSelected) => {
      try {
        console.log(optionSelected);

        setOutputContainer(`The year chosen by the user was: ${optionSelected}`);

        const response = await fetch("https://raw.githubusercontent.com/Coding-with-Adam/Dash-by-Plotly/master/Other/Dash_Introduction/intro_bees.csv");
        const csvData = await response.text();

        // Utiliza la función d3.csvParse para analizar los datos CSV
        const data = d3.csvParse(csvData);

        const dff = data.filter(item => item["Year"] === optionSelected && item["Affected by"] === "Varroa_mites");

        const fig = {
          data: [{
            type: 'choropleth',
            locationmode: 'USA-states',
            locations: dff.map(item => item['state_code']),
            scope: 'usa',
            z: dff.map(item => parseFloat(item["Pct of Colonies Impacted"])),
            colorscale: 'YlOrRd',
            hoverinfo: 'location+z',
          }],
          layout: {
            title: "Bees Affected by Mites in the USA",
            title_xanchor: "center",
            title_font: { size: 24 },
            title_x: 0.5,
            geo: { scope: 'usa' },
          },
        };

        setBeeMapFigure(fig);
      } catch (error) {
        console.error('Error updating graph:', error);
      }
    };

    updateGraph(selectedYear);
  }, [selectedYear]);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Web Application Dashboards with Dash</h1>
      <select
        value={selectedYear}
        style={{ width: "40%" }}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        <option value={2015}>2015</option>
        <option value={2016}>2016</option>
        <option value={2017}>2017</option>
        <option value={2018}>2018</option>
      </select>
      <div id='output_container'>{outputContainer}</div>
      <Plot id='my_bee_map' data={beeMapFigure.data} layout={beeMapFigure.layout} />
    </div>
  );
};

export default Map;
