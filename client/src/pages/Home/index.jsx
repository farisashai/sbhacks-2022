import './style.less'
import LandingCircle from 'components/Circle/LandingCircle'
import HowToCircle from 'components/Circle/HowToCircle'
import howto1 from 'assets/howto1.svg'
import howto2 from 'assets/howto2.svg'
import howto3 from 'assets/howto3.svg'
import { useState } from 'react'
import Layout from 'containers/Layout'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [index, setIndex] = useState(0)
  const navigate = useNavigate()

  const slides = [
    <LandingCircle onclick={() => setIndex((index) => index + 1)} />,
    <HowToCircle
      image={howto1}
      description="First, upload your notes to generate questions!"
      buttonText="Next"
      back={() => setIndex((index) => index - 1)}
      next={() => setIndex((index) => index + 1)}
    />,
    <HowToCircle
      image={howto2}
      description="Second, have your friends scan the QR code"
      buttonText="Next"
      back={() => setIndex((index) => index - 1)}
      next={() => setIndex((index) => index + 1)}
    />,
    <HowToCircle
      image={howto3}
      description="Last, answer questions and climb the leaderboard!"
      buttonText="Start"
      back={() => setIndex((index) => index - 1)}
      next={() => navigate('/upload')}
    />,
  ]

  return (
    <Layout>
      <div className="circle">{slides[index]}</div>
    </Layout>
  )
}

export default Home
