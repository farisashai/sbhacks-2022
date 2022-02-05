import './App.less';
import Header from './components/Header'
import arrow from "./assets/arrow.svg"
function App() {
  return (
    <div className="App">
      <Header />
      <div className="circle">
        <h3>Upload, quiz, study</h3>
        <h1>Turn your notes into a game</h1>
        <div className="create">
          <button>Create</button>
		  <img src={arrow} alt="arrow"></img>
        </div>
      </div>
    </div>
  );
}

export default App;
