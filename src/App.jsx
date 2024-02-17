import './App.css'
import { SimpleGrid, GridItem, Flex, Box, Heading, Center, Grid, VStack } from "@chakra-ui/react";
import Plot from 'react-plotly.js'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import moment from 'moment'
import * as d3 from 'd3'
import LineChartSyncCursor from './components/LineCharSynCursor'
import MultiLineChart from './components/MultiLineChart';
import Map from './components/Map'
import CalendarHeatmap from './components/CalendarHeatmap'
import { numData, geoData } from './data/mapData';
import CircleMap from './components/CircleMap';
import CrimeCircle from './components/CrimeCircle';
import Heatmap from './components/HeatMap';
import ChoroplethMap from './components/ChoroplethMap';
import BarChart from './components/BarChart';
import BarPolar from './components/BarPolar';
import CrimePicker from './components/CrimePicker';
import HorizontalBarChart from './components/HorizontalBarChart';
import DotMap from './components/DotMap';
import MapSelector from './components/MapSelector';


function App() {

  const [datacrimes, setDataCrimes] = useState({
    processed_data_map: null,
    processed_data_chart: null,
    processed_data_table: null,
    processed_data_polar: null,
    processed_data_horizontal: null,
  });

  const [processedDataHorizontal, setProcessedDataHorizontal] = useState(null);
  const [processedDataChart, setProcessedDataChart] = useState(null);
  const [processedDataLines, setProcessedDataTable] = useState(null);
  const [processedDataPolar, setProcessedDataPolar] = useState(null);
  const [processedDataMap, setProcessedDataMap] = useState(null);


// COMPONENTE MENÚ DE CONTROL EN EL MAPA
  const handleCrimeYearChange = (selectedCategories, selectedCrimes, selectedYear, selectedMonth, selectedDay, selectedCommunityArea, selectedSamples) => {
    // Crear un objeto con los datos que deseas enviar al backend
    const requestData = {
      categories: selectedCategories,
      crimes: selectedCrimes,
      year: selectedYear,
      month: selectedMonth,
      day: selectedDay,
      community_area: selectedCommunityArea,
      min_samples: selectedSamples,
    };
    console.log('Datos a enviar al backend:', requestData);
    // Realizar la solicitud HTTP utilizando el método POST y enviar el objeto JSON en el cuerpo
    fetch('http://127.0.0.1:8000/api/getcrime/',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(newDatacrimes => {
        if (newDatacrimes && newDatacrimes.success) {
          // Actualizar el estado con los nuevos datos
          setDataCrimes(newDatacrimes);
  
          const processedDataHorizontal = newDatacrimes.processed_data_horizontal;
          const processedDataChart = newDatacrimes.processed_data_chart;
          const processedDataLines = newDatacrimes.processed_data_lines;
          const processedDataPolar = newDatacrimes.processed_data_polar;
          const processedDataMap = newDatacrimes.processed_data_map;

          setProcessedDataHorizontal(processedDataHorizontal);
          setProcessedDataChart(processedDataChart);
          setProcessedDataTable(processedDataLines);
          setProcessedDataPolar(processedDataPolar);
          setProcessedDataMap(processedDataMap);
        }else {
          console.error('Error en la respuesta del servidor:', newDatacrimes.message);
        }
      })
      .catch(error => console.error('Error loading dataCrimes:', error));
  };

/*   console.log('Estado de datacrimes en TuComponentePadre:', datacrimes);
  console.log('Estado de processedDataChart en TuComponentePadre:', processedDataChart);
  console.log('Estado de processedDataLines en TuComponentePadre:', processedDataLines);
  console.log('Estado de processedDataHorizontal en TuComponentePadre:', processedDataHorizontal);
  console.log('Estado de processedDataPolar en TuComponentePadre:', processedDataPolar); */
  console.log('Estado de processedDataMap en TuComponentePadre:', processedDataMap);

// COMPONENTE SELECCION EN EL MAPA
  const handleMapClick = (clickedCommunityArea) => {
    // Maneja la lógica aquí para enviar el valor al backend o realizar otras acciones
    console.log('Main Component - Clicked Community Area:', clickedCommunityArea);
    // Aquí deberías enviar `clickedCommunityArea` al backend utilizando una llamada a API o similar.
    // fetch('/tu-backend-api', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ clickedCommunityArea }),
    // });
  };


  const [datanew, setData] = useState(
    [
      {
        "date": "2016-01-01",
        "total": 17164,
        "details":
        [
          {
          "name": "Project 1",
          "date": "2016-01-01 12:30:45",
          "value": 9192
          }, 
          {
          "name": "Project 2",
          "date": "2016-01-01 13:37:00",
          "value": 6753
          },
          {
          "name": "Project N",
          "date": "2016-01-01 17:52:41",
          "value": 1219
          }
        ]
      }
    ]
  )

/*   useEffect(() => {
    // Initialize random data for the demo
    let now = moment().endOf('day').toDate()
    let time_ago = moment().startOf('day').subtract(10, 'year').toDate()
    let data = d3.timeDays(time_ago, now).map(function (dateElement, index) {
      return {
        date: dateElement,
        details: Array.apply(null, new Array(Math.floor(Math.random() * 15))).map(function(e, i, arr) {
          return {
            'name': 'Project ' + Math.ceil(Math.random() * 10),
            'date': function () {
              let projectDate = new Date(dateElement.getTime())
              projectDate.setHours(Math.floor(Math.random() * 24))
              projectDate.setMinutes(Math.floor(Math.random() * 60))
              return projectDate
            }(),
            'value': 3600 * ((arr.length - i) / 5) + Math.floor(Math.random() * 3600) * Math.round(Math.random() * (index / 365))
          }
        }),
        init: function () {
          this.total = this.details.reduce(function (prev, e) {
            return prev + e.value
          }, 0)
          return this
        }
      }.init()
    })
    console.log(data);
    setData(data)
  }, []);  */

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/alldata/')
      .then(response => {
        const apiData = response.data;
        console.log(apiData);
        // Convertir las fechas de string a objetos Date en cada entrada
        const formattedData = apiData.map(entry => {
          const dateObject = new Date(entry.date); // Convertir el campo Date
          const details = entry.details.map(detail => ({
            ...detail,
            date: new Date(detail.date)
          }));
          
          return {
            ...entry,
            date: dateObject,
            details: details
          };
        });

        setData(formattedData);
        console.log('El resultado de la API es:', formattedData);
      })
      .catch(error => {
        console.error('Error fetching data from backend:', error);
      });
  }, []);

  const [geojson, setGeojson] = useState(null);
  const [dataAreas, setDataAreas] = useState(null);
  const [data, setDatos] = useState(null);
  const [dotdata, setDotData] = useState(null);

  useEffect(() => {
    // Aquí deberías realizar las llamadas a tu backend para obtener los datos necesarios
    // y luego actualizar los estados de geojson, dataAreas y data.
    // Ejemplo de cómo podrías hacerlo con fetch:
    fetch('http://127.0.0.1:8000/api/getmap/')
      .then(response => response.json())
      .then(geojson => setGeojson(geojson))
      .catch(error => console.error('Error loading geojson:', error));

    fetch('http://127.0.0.1:8000/api/getdotdata/')
      .then(response => response.json())
      .then(dotdata => setDotData(dotdata))
      .catch(error => console.error('Error loading dotdata:', error));

    fetch('http://127.0.0.1:8000/api/getareas/')
      .then(response => response.json())
      .then(dataAreas => setDataAreas(dataAreas))
      .catch(error => console.error('Error loading dataAreas:', error));

    fetch('http://127.0.0.1:8000/api/getclusters/')
      .then(response => response.json())
      .then(data => setDatos(data))
      .catch(error => console.error('Error loading data:', error));
  }, []); 
  // console.log('Estado de datapolar en TuComponentePadre:', datapolar);
  const dataline = [
    {
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      type: 'scatter',
      name: 'Tipo de Crimen 1',
    },
    {
      x: [1, 2, 3, 4],
      y: [16, 5, 11, 9],
      type: 'scatter',
      name: 'Tipo de Crimen 2',
    },
    // Agrega más trazados según sea necesario
  ];
  console.log('Estado de heatdata en TuComponentePadre:', datanew);
  return (
    <Flex h="100vh">
      {/* Primera columna (70%) */}
      <Flex flex="70%" h="100vh" flexDir="column">
        {/* Primera fila (75%) */}
        <Box flex="80%">
          <SimpleGrid maxH={"80vh"} columns={3} h="100%" gap={4} border="10px solid #F0F0F0">
            <Box p={5} borderRight="10px solid #F0F0F0">
              <Heading color="skyblue" size="2xl">FindAnalyzer</Heading> 
              <Heading color="skyblue" size="s">Chicago Data Interactive Visualization</Heading>
              <CrimePicker onCrimeYearChange={handleCrimeYearChange} />
            </Box>
            <Box borderRight="10px solid #F0F0F0">
              <MapSelector geojson={geojson} dataAreas={dataAreas} data={data} dotdata={processedDataMap} onMapClick={handleMapClick}/>
            </Box>
            <VStack spacing={0}>
              <Box flex={"25%"} padding={5}>
                <Center>
                  <MultiLineChart data={processedDataLines} />
                </Center>
              </Box>
              <Box flex={"25%"} borderTop={"10px solid #F0F0F0"} padding={10}>
                <Center>
                  <HorizontalBarChart processedDataHorizontalChart={processedDataHorizontal} />
                </Center>
              </Box>
            </VStack>
          </SimpleGrid>
        </Box>

        {/* Segunda fila (25%) con CalendarHeatmap */}
        <Box flex="20%" borderLeft="10px solid #F0F0F0" borderBottom="10px solid #F0F0F0" borderRight={"10px solid #F0F0F0"}>
          <CalendarHeatmap data={datanew} overview="year" color="#0000FF" />
        </Box>

        {/* 
        <Box flex="10%" borderRight={"10px solid #F0F0F0"} borderLeft={"10px solid #F0F0F0"}>
          {/* <CircleMap /> 
        </Box> */}
      </Flex>

      {/* Segunda columna (30%) */}
      <Box flex="30%" h="100%" bg="white" borderTop="10px solid #F0F0F0" borderRight="10px solid #F0F0F0">
        <SimpleGrid columns={1} h="40%">
          <Box padding={10} maxH="30vh">
            <Center>
              <BarChart processedDataChart={processedDataChart} />
            </Center>
          </Box>
        </SimpleGrid>
        <SimpleGrid columns={1} h="60%">
          <Box padding={5} maxH="30vh" borderTop={"10px solid #F0F0F0"}>
            <Center>
              <BarPolar processedDataPolar={processedDataPolar}/>
            </Center>
          </Box>
        </SimpleGrid> 
      </Box>
    </Flex>
  );
}

export default App
