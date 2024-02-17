import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const ChoroplethMap = ({ geojson, dataAreas, data, onMapClick }) => {
  const [chicagoGeo, setChicagoGeo] = useState(null);

  useEffect(() => {
    setChicagoGeo(geojson);
  }, [geojson]);

  const handleMapClick = (event) => {
    if (onMapClick) {
      const clickedCommunityArea = event.points[0].location;
      onMapClick(clickedCommunityArea);
    }
  };

  if (!chicagoGeo || !dataAreas || !data) {
    return null; // O cualquier lógica de carga
  }

  // Establecer un color sólido para el mapa de cloropletos y las burbujas
  const mapColor = 'white';
  console.log('ChoroplethMap', dataAreas);
  // Crear un gráfico de cloropleto sin escala de color
  const figure = {
    data: [
      {
        type: 'choropleth',
        geojson: chicagoGeo,
        featureidkey: 'properties.area_num_1',
        locations: dataAreas['Community_Area'],
        z: dataAreas['Incidencias'],
        hoverinfo: 'text',
        colorscale: [[0, mapColor], [1, mapColor]], // Establecer color sólido
        showscale: false, // Ocultar la barra de colores
        text: dataAreas['Community_Area'].map((area, index) => `${dataAreas['Community Area Name'][index]} (ID: ${area})`),  // Agrega el texto para los popups
        // visible: true,
      },
      {
        type: 'scattergeo',
        lat: data['Latitude'],
        lon: data['Longitude'],
        mode: 'markers',
        marker: {
          size: data['Incidencias'],
          color: 'gray', // Establecer color sólido
          opacity: 0.4,
        },
        text: data['Incidencias'],
        hoverinfo: 'text',
        showlegend: false,
      },
    ],
    layout: {
      geo: {
        projection: { type: 'mercator' }, // Cambiar la proyección a 'mercator'
        fitbounds: 'locations',
        showocean: true,
        oceancolor: 'white',
        showlakes: true,
        lakecolor: 'white',
        showrivers: true,
        rivercolor: 'LightBlue',
        showland: true,
        landcolor: 'transparent',
        line: { color: 'transparent'},
        visible: false,
        showframe: false,
      },
      autosize: false,
      height: 650,
      width: 430,
      margin: { r: 0, t: 0, l: 0, b: 0 },
    },
  };

  return (
    <Plot
      data={figure.data}
      layout={figure.layout}
      style={{ background: 'transparent', width: '100%', height: '100%', margin: 0, padding: 0 }}
      config={{ displayModeBar: false }}
      onClick={handleMapClick}
    />
  );
};

export default ChoroplethMap;