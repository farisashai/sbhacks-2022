import Header from "../Header";
import './style.less'
const Layout = ({ children }) => {
    return <div className="background">
        <Header title="Join Game" onClick={() => {console.log('fish');}}/>
        {children}
    </div>
}

export default Layout
