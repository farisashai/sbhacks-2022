import './UploadNotes.less';
import Header from './components/Header'
import Upload from "antd"
import CircleButton from './components/Circle/CircleButton'

function StartingPage(setIndex) {
  return (
    <div className="UploadNotes">
      <Header title="4/6 Players" onClick={() => {console.log('fish');}}/>
      <div className="square">
        <h1>Upload Notes</h1>
        <Upload />
        <div className="button-group">
                <button onClick={() => setIndex(index => index - 1)}>Back</button>
                <CircleButton
                    onclick={() => setIndex(index => index + 1)} 
                    text="Start"
                />
            </div>
      </div>
      
    </div>
  );
}

export default StartingPage;
