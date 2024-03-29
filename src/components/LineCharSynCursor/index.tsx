import React, { useState } from "react";
import { data, data2 } from "../../data/lineData";
import LineChart from "../MultiLineChart";
import { Box, Heading } from "@chakra-ui/react";

const LineChartSyncCursor = ({ width = 700, height = 150 }) => {
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);

  return (
    <Box>
      <Heading as="h2" size="md" mb={1}>
        2001
      </Heading>
      <LineChart
        data={data}
        width={width}
        height={height}
        cursorPosition={cursorPosition}
        setCursorPosition={setCursorPosition}
        color={"#B6BC58"}
      />
    </Box>
  );
};

export default LineChartSyncCursor;
