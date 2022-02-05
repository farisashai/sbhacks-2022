import './App.less';
import LandingCircle from './components/Circle/LandingCircle'
import HowToCircle from './components/Circle/HowToCircle';
import howto1 from './assets/howto1.svg'
import howto2 from './assets/howto2.svg'
import howto3 from './assets/howto3.svg'
import { useState } from 'react'
import Layout from './components/Layout';
import Header from './components/Header';

const App = () => {
  const [index, setIndex] = useState(0);

  const slides = [
    <LandingCircle
      setIndex={setIndex}
    />,
    <HowToCircle 
      image={howto1}
      description="First, upload your notes to generate questions!"
      buttonText="Next"
      setIndex={setIndex}
    />,
    <HowToCircle 
      image={howto2}
      description="Second, have your friends scan the QR code"
      buttonText="Next"
      setIndex={setIndex}
    />,
    <HowToCircle 
      image={howto3}
      description="Last, answer questions and climb the leaderboard!"
      buttonText="Start"
      setIndex={setIndex}
    />,
  ];
  
  return (
    <Layout>
        <Header title="Join Game" onClick={() => {console.log('fish');}}/>
      <div className="circle">

        {slides[0]}
        {/* <LandingCircle /> */}
        {/* <HowToCircle image={howto1} buttonText={"Click Me"} description="First, have your friends scan the QR code" /> */}
      </div>
    </Layout>

      
  );
}

export default App;
