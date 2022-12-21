import './App.css';
import React, {useRef, useEffect, useState} from 'react';

function App() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);

  const getVideo = () => {
    navigator.mediaDevices.getUserMedia({
      video: { width: 1920, height: 1000 }
    }).then(stream => {
      let video = videoRef.current;
      video.srcObject = stream;
      video.play();
    }).catch(err => {
      console.error(err);
    });

  }

  useEffect(()=>{
    getVideo();
  },[]);

  const takePhoto = () => {
    const width = 414;
    const height = width / (16/9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext('2d');
    ctx.drawImage(video, 0, 0, width, height);

    setHasPhoto(true);


        let blobUrl = photo.toDataURL()
        let link = document.createElement("a"); 
          link.href = blobUrl;
          console.log(link)
          link.download = "image.jpg";
          link.innerHTML = "Click here to download the file";
          document.body.appendChild(link); 
          document.querySelector('a').click() 

  }

  const closePhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext('2d');
    setHasPhoto(false);

    ctx.clearRect(0,0, photo.width, photo.height);
  }

  useEffect(()=>{
  },[]);

  const showLocation = (position) => {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      alert("Latitude : " + latitude + " Longitude: " + longitude);
  }

  const errorHandler = (err) =>{
      if(err.code === 1) {
         alert("Error: Access is denied!");
      } else if( err.code === 2) {
         alert("Error: Position is unavailable!");
      }
   }

  const getLocation = () => {
      if(navigator.geolocation) {
         
         // timeout at 60000 milliseconds (60 seconds)
         var options = {timeout:60000};
         navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
      } else {
         alert("Sorry, browser does not support geolocation!");
      }
   }


  return (
    <div className="App">
      <div className="camera">
        <video  style={{width: "500px", height: "500px"}} ref={videoRef}></video>
        <button onClick={takePhoto} id="snap">Snap!</button>
        <button onClick={getLocation} id="geolocation">Geolocation!</button>
      </div>
      <div className={'result' + (hasPhoto ? 'hasPhoto' : '')}>
        <canvas ref={photoRef}></canvas>
        <button onClick={closePhoto}>CLOSE</button>
      </div>
    </div>
  );
}

export default App;

