import {Component} from 'react'
import ScoreCard from '../ScoreCard/ScoreCard'
import './MathGame.css'

const Tab = props => {
  const {tabId, displayText, activeTab, tabClick} = props
  const activeTabClass = activeTab === tabId ? 'active-tab' : ''
  const onTabClick = () => {
    tabClick(tabId)
  }
  return (
    <li>
      <button
        onClick={onTabClick}
        className={`btn ${activeTabClass}`}
        type="button"
      >
        {displayText}
      </button>
    </li>
  )
}

const Thumbnail = props => {
  const {id, thumbnailUrl, thumbnailClick} = props
  const onThubanailClick = () => {
    thumbnailClick(id)
  }
  return (
    <li>
      <button
        onClick={onThubanailClick}
        className="thumbnail-btn"
        type="button"
      >
        <img className="thumbnail-img" src={thumbnailUrl} alt="thumbnail" />
      </button>
    </li>
  )
}

class MathGame extends Component {
  constructor(props) {
    super(props)
    const {imagesList, tabsList} = this.props
    this.state = {
      countDown: 60,
      isGameOver: false,
      toMatchImageId: imagesList[0].id,
      activeTab: tabsList[0].tabId,
      clickedImagesIdList: [],
    }
  }

  componentDidMount() {
    this.timerId = setInterval(this.timer, 1000)
  }

  reset = () => {
    const {imagesList, tabsList} = this.props
    this.setState({
      countDown: 60,
      isGameOver: false,
      toMatchImageId: imagesList[0].id,
      activeTab: tabsList[0].tabId,
      clickedImagesIdList: [],
    })
    this.clearTimer()
  }

  timer = () => {
    const {countDown} = this.state
    if (countDown === 0) {
      this.setState({isGameOver: true})
      this.clearTimer()
    } else {
      this.setState(prevState => ({countDown: prevState.countDown - 1}))
    }
  }

  clearTimer = () => {
    clearInterval(this.timerId)
  }

  tabClick = tabId => {
    this.setState({activeTab: tabId})
  }

  getNewimageId = (clickedImagesIdList, toMatchImageId, imagesList) => {
    const getRemainingList = imagesList.filter(
      eachImg =>
        !clickedImagesIdList.includes(eachImg.id) &&
        eachImg.id !== toMatchImageId,
    )
    console.log(getRemainingList)
    return getRemainingList.sort(() => Math.random() - 0.5)
  }

  thumbnailClick = id => {
    const {clickedImagesIdList, toMatchImageId} = this.state
    const {imagesList} = this.props
    const alreadyClicked = clickedImagesIdList.includes(id)

    if (alreadyClicked || clickedImagesIdList.length === imagesList.length) {
      this.setState({isGameOver: true})
      this.clearTimer()
    }
    if (id === toMatchImageId) {
      const newImgId = this.getNewimageId(
        clickedImagesIdList,
        toMatchImageId,
        imagesList,
      )
      this.setState(prevState => ({
        clickedImagesIdList: [...prevState.clickedImagesIdList, id],
        toMatchImageId: newImgId[0].id,
      }))
    } else {
      this.setState({isGameOver: true})
      this.clearTimer()
    }
  }

  getMatchImg = () => {
    const {toMatchImageId} = this.state
    const {imagesList} = this.props
    const toMatchImage = imagesList.filter(
      eachImg => eachImg.id === toMatchImageId,
    )
    return toMatchImage[0].imageUrl
  }

  renderImageToBeMathched = () => {
    const {imagesList, tabsList} = this.props
    const {activeTab} = this.state
    const filteredImagesList = imagesList.filter(
      eachImg => eachImg.category === activeTab,
    )
    const matchImg = this.getMatchImg()
    return (
      <div className="match-image-container">
        <img className="match-image" src={matchImg} alt="match" />
        <ul className="btn-list">
          {tabsList.map(eachTab => (
            <Tab
              {...eachTab}
              key={eachTab.tabId}
              tabClick={this.tabClick}
              activeTab={activeTab}
            />
          ))}
        </ul>
        <ul className="thumbnail-list">
          {filteredImagesList.map(eachImg => (
            <Thumbnail
              {...eachImg}
              thumbnailClick={this.thumbnailClick}
              key={eachImg.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {clickedImagesIdList, countDown, isGameOver} = this.state

    return (
      <div className="home">
        <nav>
          <ul className="nav-bar">
            <li>
              <img
                className="website-logo"
                src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png "
                alt="website logo"
              />
            </li>
            <li className="score-container">
              <p className="score-text">Score:</p>
              <p className="score-value">{clickedImagesIdList.length}</p>
              <div className="timer-container">
                <img
                  className="timer-img"
                  src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                  alt="timer"
                />
                <p className="score-value">{countDown} sec</p>
              </div>
            </li>
          </ul>
        </nav>
        <div className="result-container">
          {isGameOver ? (
            <ScoreCard score={clickedImagesIdList.length} reset={this.reset} />
          ) : (
            this.renderImageToBeMathched()
          )}
        </div>
      </div>
    )
  }
}

export default MathGame
