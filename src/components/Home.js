import { LoginContext } from "../AppContext/Context";
import React, { useState, useContext } from 'react';
import ShowSpeechScores from './Speech';
import Scores from './Scores';
import axios from 'axios';


function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [value1, setValue1] = useState('');
  // const { user } = useContext(LoginContext);

  const handleFileInput = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleValue1Input = (event) => {
    setValue1(event.target.value);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('audio', selectedFile);
    formData.append('value1', value1);
    // formData.append('value2', value2);
  
    fetch("http://127.0.0.1:5001/data/", {
      method: 'POST',
      body: formData
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });
  };
  const handleShowScoresClick = async () => {
    try {
      const scores={"clarity_score": 10,
      "speakingrate_score": 6,
      "pauses_score": 7,
      "pronunciation_score": 7.0,
      "listenability_score": 6}
      const response = await axios.get('http://127.0.0.1:5001/scores/');
      console.log(response.data);
      console.log(scores);
      <div className="tab-content">
            <Scores session={scores} />
          </div>
      // Perform any actions you want to do with the scores data
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      <input type="file" onChange={handleFileInput} />
      <input type="text" placeholder="Value 1" value={value1} onChange={handleValue1Input} />
      {/* <input type="text" placeholder="Value 2" value={value2} disabled /> */}
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleShowScoresClick}>Show scores</button>
    </div>
  );
}

export default Home;


