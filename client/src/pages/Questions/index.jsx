// import './style.less'
import Layout from 'containers/Layout'
import { useState } from 'react'
// import { listenGameCreated, listenGameUpdated, sendCreateGame } from 'utils/socketHandler'
import Question from 'components/Question'
import Answer from 'components/Answer'

function Questions() {
	const [game, setGame] = useState();

  return (
    <Layout game={game}>
      <div className="questions-container">
        {game && 
        (<>
            <Question number='1' question='Koalas sleep for how long every day?'/>
			<div className="time-answer-div">
				{/* timer */}
				<h1>32 seconds</h1>
				{/* number answered */}
				<h1>2 answers</h1>
			</div>
			<div className="answers">
				<Answer letter='A' answer='22 hours' fileName='boxA.svg'/>
				<Answer letter='B' answer='18 hours' fileName='boxB.svg'/>
				<Answer letter='C' answer='17 hours' fileName='boxC.svg'/>
				<Answer letter='D' answer='16 hours' fileName='boxD.svg'/>
			</div>
          </>
        )}
      </div>
    </Layout>
  )
}

export default Questions
