import Header from "components/Header";
import './style.less'
import { useNavigate } from 'react-router-dom'

const Layout = ({ game, children }) => {
    const navigate = useNavigate()
    return <div className="background">
        <Header game={game} title="Join Game" onClick={() => navigate('/join')}/>
        {children}
    </div>
}

export default Layout
