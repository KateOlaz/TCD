import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const DotMap = ({ geojson, dataAreas, dotdata }) => {
  const [chicagoGeo, setChicagoGeo] = useState(null);

  useEffect(() => {
    setChicagoGeo(geojson);
  }, [geojson]);

  if (!chicagoGeo || !dataAreas || !dotdata) {
    return null;
  }

  const colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'pink'];
  const mapColor = 'white';

  const figure = {
    data: [
      {
        type: 'choropleth',
        geojson: chicagoGeo,
        featureidkey: 'properties.area_num_1',
        locations: dataAreas['Community_Area'],
        z: dataAreas['Incidencias'],
        colorscale:  [[0, mapColor], [1, mapColor]],
        hoverinfo: 'text',
        showscale: false,
        text: dataAreas['Community_Area'].map((area, index) => `${dataAreas['Community Area Name'][index]} (ID: ${area})`), 
      },
      // Dot map trace
      ...Object.keys(dotdata).map((category, index) => ({
        type: 'scattergeo',
        lat: dotdata[category].map(point => point['Latitude']),
        lon: dotdata[category].map(point => point['Longitude']),
        mode: 'markers',
        marker: {
          size: 5,
          color: dotdata[category].map(point => point['ID_Cluster']),
          colorscale: 'Viridis',
          opacity: 0.8,
          colorbar: {
            title: 'Tipo de Crimen',
          },
          showscale: false,
        },
        text: dotdata[category].map(point => point['ID_Cluster']),
        hoverinfo: 'text',
        showlegend: false,
      })),
    ],
    layout: {
      geo: {
        projection: { type: 'mercator' },
        fitbounds: 'locations',
        showocean: true,
        oceancolor: 'white',
        showlakes: true,
        lakecolor: 'white',
        showrivers: true,
        rivercolor: 'LightBlue',
        showland: true,
        landcolor: 'transparent',
        line: { color: 'transparent' },
        visible: false,
        showframe: false,
      },
      autosize: false,
      height: 630,
      width: 400,  // Adjust the width to your preference
      margin: { r: 0, t: 0, l: 0, b: 0 },
    },
  };

  return (
    <Plot
      data={figure.data}
      layout={figure.layout}
      style={{ background: 'transparent', width: '100%', height: '100%', margin: 0, padding: 0 }}
    />
  );
};

export default DotMap;
