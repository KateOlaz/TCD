import './App.css'
import LineChartSyncCursor from './components/LineCharSynCursor'
import Map from './components/Map'
import Heatmap from "./components/HeatMap";
import { numData, geoData } from './data/mapData';
import { data } from "./data/heapData";
import { Box, Center, Heading, SimpleGrid } from '@chakra-ui/react'
function App() {
  return (
    <Box border={"20px solid #F0F0F0"}>
      <SimpleGrid columns={3} h="70vh">
        <Box h="100%" p={4} borderRight="30px solid #F0F0F0">
          <Heading color="skyblue" size="3xl">FindAnalyzer</Heading> 
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
        <Heatmap data={data} width={1870} height={250} />
      </Box>

    </Box>
  )
}

export default App
