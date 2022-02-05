import './App.less';
import Header from './components/Header'
import LandingCircle from './components/Circle/LandingCircle'
import HowToCircle from './components/Circle/HowToCircle';
import howto1 from './assets/howto1.svg'
import howto2 from './assets/howto1.svg'
import howto3 from './assets/howto1.svg'

const howToSlides = [
  {
    image: howto1,
    description: 'blah blah blah',
    buttonText: 'Click me'
  },
  {

  }
]


function App() {
  return (
    <div className="App">
      <Header title="Join Game" onClick={() => {console.log('fish');}}/>
      <div className="circle">
        {/* <LandingCircle /> */}
        <HowToCircle image={howto1} buttonText={"Click Me"} description="First, have your friends scan the QR code" />
      </div>
    </div>
  );
}

export default App;
