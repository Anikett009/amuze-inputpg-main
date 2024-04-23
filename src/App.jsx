import React, { useState } from 'react';
import SearchBar from './SearchBar';
import TrackList from './TrackList';
import { CSVLink } from 'react-csv';
import axios from 'axios';
import styles from './home-screen-dark1.module.css';
import FrameComponent from './components/frame-component';
import BottomGroup1 from './components/bottom-group1';

function App() {
  const [selectedTracks, setSelectedTracks] = useState([]);

  const handleAddTrack = (track) => {
    setSelectedTracks([...selectedTracks, track]);
  };

  const handleRemoveTrack = (trackId) => {
    const updatedTracks = selectedTracks.filter(track => track.id !== trackId);
    setSelectedTracks(updatedTracks);
  };

  const handleClearAllTracks = () => {
    setSelectedTracks([]);
  };

  const handleExportToCSV = () => {
    const csvData = selectedTracks.map(track => `${track.id},${track.name},${track.artist}`).join('\n');

    axios.post('http://localhost:8080/track-info', { csvData }, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000' // Adjust the origin to match your frontend URL
      
      }
    })
    .then(response => {
        console.log('CSV file saved on the server');
        // Optionally, you can show a message to the user indicating that the CSV file has been successfully saved
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle error
    });
};

  return (
    <div className={styles.homeScreenDark}>
      <FrameComponent />
      <main className={styles.homeScreenDarkInner}>
        <section className={styles.optionsExpandParent}>
          
          <div className={styles.trackContainerParent}>
            <div className={styles.trackContainer}>
              <div className={styles.rectangleParent}>
                <h1>
                  Amuze Search
                  </h1>
                <SearchBar onAddTrack={handleAddTrack} />
                <TrackList
                  tracks={selectedTracks}
                  onRemoveTrack={handleRemoveTrack}
                  onClearAllTracks={handleClearAllTracks}
                  onExportToCSV={handleExportToCSV}
                />
              </div>
            </div>
            
          </div>
        </section>
      </main>
      <BottomGroup1 />
    </div>
  );
}

export default App;