import './index.css'

const VideoItem = props => {
  const {videoDetails} = props
  const {description, imageUrl, name} = videoDetails
  return (
    <li className="travel-video-item">
      <img src={imageUrl} className="video-image" alt={name} />
      <div className="video-text-container">
        <h1 className="video-name">{name}</h1>
        <p className="video-description">{description}</p>
      </div>
    </li>
  )
}

export default VideoItem
