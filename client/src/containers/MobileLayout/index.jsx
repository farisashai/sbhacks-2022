import Header from 'components/Header'
import './style.less'
const MobileLayout = ({ children }) => {
  return (
    <div className="MobileLayout">
      <Header
        title="Join Game"
        onClick={() => {
          console.log('fish')
        }}
      />
      <div className="content">{children}</div>
    </div>
  )
}

export default MobileLayout
