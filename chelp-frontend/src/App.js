import React, {useState} from 'react'
import Preview from './Preview'
import './App.css'

function App() {
  const [selectedImg, setSelectedImg] = useState()
	const [isImgSelected, setIsImgSelected] = useState(false)

  const changeHandler = (event) => {
    let f = event.target.files[0]
		setSelectedImg(f)
		if (f) setIsImgSelected(true)
	}

  const handleDeletion = () => {
    setIsImgSelected(false)
    setSelectedImg(undefined)
  }

  const handleSubmission = () => {
    const formData = new FormData()
	  formData.append('image', selectedImg)

    const wl = window.location
    // fetch(wl.protocol + '//' + wl.host + '/upload/',
    fetch(wl.protocol + '//' + wl.hostname + ':4000/upload/', // for speed dev without front build
    	{
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      }
    )
      .then(res => console.log(res))
      .then(res => res.json())
      .then(res => console.log('Success:', res))
      .catch(err => console.log('Error:', err))
	}

  return (
    <div className="App">
      <div className="header">
        <h1>Chess Helper</h1>
        <p>let us guide you to win</p>
      </div>
			{isImgSelected ? (
        <div>
          <Preview 
            selectedImg={selectedImg} 
            handleSubmission={handleSubmission} 
            handleDeletion={handleDeletion}
          />
				</div>
			) : (
        <div className="submit-card">
				  <h3>Take a photo of a chessboard of choose from library</h3>
          <input type="file" name="img" onChange={changeHandler} />
        </div>
			)}
    </div>
  )
}

export default App
