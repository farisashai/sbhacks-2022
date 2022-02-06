import Header from "components/Header";
import './style.less'
const Layout = ({ game, children }) => {
    return <div className="background">
        <Header game={game} title="Join Game" onClick={() => {console.log('fish');}}/>
        {children}
    </div>
}

export default Layout
