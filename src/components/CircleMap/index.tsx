import React, { useEffect } from 'react';
import Plotly from 'plotly.js-basic-dist';
import 'plotly.js-basic-dist/plotly-basic';
import * as d3 from 'd3';

const CircleMap = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/plotly/datasets/master/gapminderDataFiveYear.csv');
        const data = await response.text();

        // Parse CSV data
        const parsedData = d3.csvParse(data);

        // Create a lookup table using d3.group and d3.rollup
        const nestedData = d3.group(parsedData, d => d.year, d => d.continent);
        console.log("nestedDataoficial", nestedData);
        // Create the main traces, one for each continent:
        const traces = [];
        const years = Array.from(nestedData.keys());
        console.log(years);
        const firstYear = nestedData.get(years[0]);
        const continents = Array.from(firstYear.keys());

        for (let i = 0; i < continents.length; i++) {
          const continentData = firstYear.get(continents[i]);
          console.log("continentData",continentData);
          traces.push({
            name: continents[i],
            x: continentData.map(d => d.lifeExp),
            y: continentData.map(d => d.gdpPercap),
            id: continentData.map(d => d.country),
            text: continentData.map(d => d.country),
            mode: 'markers',
            marker: {
              size: continentData.map(d => d.pop),
              sizemode: 'area',
              sizeref: 200000
            }
          });
          
        }
        console.log(traces);
        // Create frames
        const frames = years.map(year => ({
          name: year,
          data: continents.map(continent => ({
            x: nestedData.get(year).get(continent).map(d => d.lifeExp),
            y: nestedData.get(year).get(continent).map(d => d.gdpPercap),
            id: nestedData.get(year).get(continent).map(d => d.country),
            text: nestedData.get(year).get(continent).map(d => d.country),
          }))
        }));

        // Create slider steps
        const sliderSteps = years.map(year => ({
          method: 'animate',
          label: year,
          args: [[year], {
            mode: 'immediate',
            transition: { duration: 300 },
            frame: { duration: 300, redraw: false },
          }]
        }));

        const layout = {
          xaxis: {
            title: 'Life Expectancy',
            range: [30, 85]
          },
          yaxis: {
            title: 'GDP per Capita',
            type: 'log'
          },
          hovermode: 'closest',
          updatemenus: [{
            x: 0,
            y: 0,
            yanchor: 'top',
            xanchor: 'left',
            showactive: false,
            direction: 'left',
            type: 'buttons',
            pad: { t: 87, r: 10 },
            buttons: [{
              method: 'animate',
              args: [null, {
                mode: 'immediate',
                fromcurrent: true,
                transition: { duration: 300 },
                frame: { duration: 500, redraw: false }
              }],
              label: 'Play'
            }, {
              method: 'animate',
              args: [[null], {
                mode: 'immediate',
                transition: { duration: 0 },
                frame: { duration: 0, redraw: false }
              }],
              label: 'Pause'
            }]
          }],
          sliders: [{
            pad: { l: 130, t: 55 },
            currentvalue: {
              visible: true,
              prefix: 'Year:',
              xanchor: 'right',
              font: { size: 20, color: '#666' }
            },
            steps: sliderSteps
          }]
        };

        // Create the plot:
        Plotly.newPlot('myDiv', {
          data: traces,
          layout: layout,
          frames: frames,
        });
      } catch (error) {
        console.error('Error fetching or processing data:', error);
      }
    };

    fetchData();
  }, []); // Dependencia vacía para ejecutar el efecto solo una vez al montar el componente

  return (
    <div>
      <div id="myDiv"></div>
    </div>
  );
};

export default CircleMap;
