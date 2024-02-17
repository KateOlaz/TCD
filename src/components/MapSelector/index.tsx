// MapSelector.jsx

import React, { useState } from 'react';
import DotMap from '../DotMap';
import ChoroplethMap from '../ChoroplethMap';

const MapSelector = ({ geojson, dataAreas, data, dotdata, onMapClick }) => {
  const [selectedMap, setSelectedMap] = useState('DotMap');
  console.log('MapSelector', data, dotdata);
  const handleMapChange = (mapType) => {
    setSelectedMap(mapType);
  };

  return (
    <div>
      <div>
        <label style={styles.radioLabel}>
          <input
            type="radio"
            value="DotMap"
            checked={selectedMap === 'DotMap'}
            onChange={() => handleMapChange('DotMap')}
          />
          Dot Map
        </label>
        <label style={styles.radioLabel}>
          <input
            type="radio"
            value="ChoroplethMap"
            checked={selectedMap === 'ChoroplethMap'}
            onChange={() => handleMapChange('ChoroplethMap')}
          />
          Choropleth Map
        </label>
      </div>

      {selectedMap === 'DotMap' && <DotMap geojson={geojson} dataAreas={dataAreas} dotdata={dotdata} />}
      {selectedMap === 'ChoroplethMap' && <ChoroplethMap geojson={geojson} dataAreas={dataAreas} data={data} onMapClick={onMapClick} />}
    </div>
  );
};

const styles = {
  radioGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
  radioLabel: {
    margin: '0 40px 0 0',
    fontSize: '16px',
  },
};

export default MapSelector;
