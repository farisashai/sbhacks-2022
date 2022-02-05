import './style.less'
import CircleButton from '../CircleButton'

const HowToCircle = ({image, description, buttonText, setIndex}) => {
    return (
        <div className='how-to-circle'>
            <h1>How It Works</h1>
            <img src={image} alt="how to"/>
            <h3>{description}</h3>
            <div className="button-group">
                <button onClick={() => setIndex(index => index - 1)}>Back</button>
                <CircleButton
                    onclick={() => setIndex(index => index + 1)} 
                    text={buttonText}
                />
            </div>
        </div>
    )
}

export default HowToCircle