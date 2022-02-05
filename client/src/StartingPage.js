import './StartingPage.less';
import Header from './components/Header'


function StartingPage() {
  return (
    <div className="StartingPage">
      <Header title="4/6 Players" onClick={() => {console.log('fish');}}/>
      
    </div>
  );
}

export default StartingPage;
