import './App.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import moment from 'moment'
import * as d3 from 'd3'
import LineChartSyncCursor from './components/LineCharSynCursor'
import Map from './components/Map'
import CalendarHeatmap from './components/CalendarHeatmap'
import { numData, geoData } from './data/mapData';
import { Box, Center, Heading, SimpleGrid } from '@chakra-ui/react'
function App() {
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
  }, []); */

  useEffect(() => {
    axios.get('http://localhost:8000/api/alldata/')
      .then(response => {
        const apiData = response.data;

        // Convertir las fechas de string a objetos Date en cada entrada
        const formattedData = apiData.map(entry => {
          const dateObject = new Date(entry.Date); // Convertir el campo Date
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


  return (
    <Box border={"20px solid #F0F0F0"}>
      <SimpleGrid columns={3} h="70vh">
        <Box h="100%" p={4} borderRight="30px solid #F0F0F0">
          <Heading color="skyblue" size="3xl">FindAnalyzer</Heading> 
          <Heading color="skyblue" size="s">Chicago Data Interactive Visualization</Heading>
        </Box>
        <Box bg="" borderRight="30px solid #F0F0F0">
          <Map geoData={geoData} numData={numData} width={800} height={600} />
        </Box>
        <Box padding={5} maxH="70vh">
          <Center>
            <LineChartSyncCursor width={500} height={180} />
          </Center>
        </Box>
      </SimpleGrid>
      <Box minH="30vh" borderTop="30px solid #F0F0F0">
        <CalendarHeatmap data={datanew} overview="year" color="#0000FF" />
      </Box>

    </Box>
  )
}

export default App
