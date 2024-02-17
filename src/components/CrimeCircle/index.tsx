import React, { useEffect } from 'react';
import Plotly from 'plotly.js-basic-dist';
import 'plotly.js-basic-dist/plotly-basic';
import * as d3 from 'd3';
import { MongoClient } from 'mongodb';
import axios from 'axios';

const CrimeCircle = () => {
    useEffect(() => {
      const fetchData = async () => {
        try {
            axios.get('http://127.0.0.1:8000/api/battery/')
  
          // Parsea y procesa los datos como sea necesario
          const parsedData = crimeData.map(d => {
            const date = new Date(d.date);
            return {
              ...d,
              year: date.getFullYear(),
            };
          });
          
          const nestedData = d3.group(parsedData, d => d.year);
          console.log("nestedDataoficial", nestedData);
  
          // Resto del código para procesar y visualizar los datos...
        } catch (error) {
          console.error('Error fetching or processing data:', error);
        } finally {
          // Asegúrate de cerrar la conexión a MongoDB cuando hayas terminado
          await client.close();
          console.log('Desconectado de MongoDB');
        }
      };
  
      fetchData();
    }, []); // Dependencia vacía para ejecutar el efecto solo una vez al montar el componente
  
    return (
      <div>
        <div id="myDiv" style={{ width: '100%', height: '500px' }}></div>
      </div>
    );
  };
  
  export default CrimeCircle;