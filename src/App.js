import './App.less';
import Header from './components/Header'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="circle">
        <h3>Upload, quiz, study</h3>
        <h1>Turn your notes into a game</h1>
        <button>Create</button>
      </div>
    </div>
  );
}

export default App;
