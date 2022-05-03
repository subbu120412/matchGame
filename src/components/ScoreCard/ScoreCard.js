import './ScoreCard.css'

const ScoreCard = props => {
  const {score, reset} = props
  return (
    <div className="score-card-bg">
      <img
        className="trophy-img"
        src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png "
        alt="trophy"
      />
      <p className="score">YOUR SCORE</p>
      <h1 className="score">{score}</h1>
      <button onClick={reset} className="play-again-btn" type="button">
        <img
          className="reset-img"
          src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
          alt="reset"
        />
        PLAY AGAIN
      </button>
    </div>
  )
}

export default ScoreCard
