import './style.less'
import Layout from 'containers/Layout'
import { useEffect, useState } from 'react'
import { listenGameCreated, listenGameUpdated,sendCreateGame } from 'utils/socketHandler'
import Question from 'components/Question'
import Answer from 'components/Answer'

function Questions() {
	const [game, setGame] = useState();

  return (
    <Layout game={game}>
      <div className="lobby-container">
        {game && 
        (<>
            <Question number='1'/>
			<div className="time-answer-div">
				{/* timer */}
				<h1>32 seconds</h1>
				{/* number answered */}
				<h1>2 answers</h1>
			</div>
			<div className="answers">
				<Answer />
				<Answer />
				<Answer />
				<Answer />
			</div>
          </>
        )}
      </div>
    </Layout>
  )
}

export default Questions
