import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VideoItem from './components/VideoItem'
import './App.css'

// Replace your code here
const travelStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class App extends Component {
  state = {
    travelGuideList: [],
    apiStatus: travelStatusConstants[0],
  }

  componentDidMount() {
    this.getTravelGuideData()
  }

  getTravelGuideData = async () => {
    this.setState({apiStatus: travelStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      const updatedData = data.packages.map(eachItem => ({
        id: eachItem.id,
        description: eachItem.description,
        imageUrl: eachItem.image_url,
        name: eachItem.name,
      }))
      this.setState({
        travelGuideList: updatedData,
        apiStatus: travelStatusConstants.success,
      })
    }
  }

  // LOADER VIEW >>>
  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  // SUCCESS VIEW >>>
  renderSuccessView = () => {
    const {travelGuideList} = this.state
    return (
      <ul className="travel-guide-videos-list-container">
        {travelGuideList.map(eachItem => (
          <VideoItem key={eachItem.id} videoDetails={eachItem} />
        ))}
      </ul>
    )
  }

  // RENDER ALL VIEWS

  renderAllStatusViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case travelStatusConstants.success:
        return this.renderSuccessView()
      case travelStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return ''
    }
  }

  render() {
    return (
      <div className="bg-App-container">
        <h1 className="travel-guide-heading">Travel Guide</h1>
        <hr className="line" />
        <div className="travel-guide-videos-container">
          {this.renderAllStatusViews()}
        </div>
      </div>
    )
  }
}

export default App
