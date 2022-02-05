import CircleButton from '../CircleButton'
import './style.less'
const LandingCircle = ({setIndex}) => {
    return (
        <div className='landing-circle'>
            <h3>Upload, quiz, study</h3>
            <h1>Turn your notes into a game</h1>
            <CircleButton 
                onclick={() => setIndex(index => index + 1)} 
                text="Create"
            />
        </div>
    )
}

export default LandingCircle