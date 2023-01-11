import Preview from './Preview'
import React, { useState } from 'react'
import "./MainPage.css"
import { useNavigate } from 'react-router-dom'

function MainPage(props) {
  const [selectedImg, setSelectedImg] = useState()
	const [isImgSelected, setIsImgSelected] = useState(false)
  const [whitePov, setWhitePov] = useState(false)
  const navigate = useNavigate()

  const changeHandler = (event) => {
    let f = event.target.files[0]
		if (f) {
      setSelectedImg(f)
      setIsImgSelected(true)
    }
	}

  const handleDeletion = () => {
    setIsImgSelected(false)
    setSelectedImg(undefined)
  }

  const handlePovChange = (event) => {
    setWhitePov(event.target.checked)
  }

  const handleSubmission = () => {
    const formData = new FormData()
	  formData.append('image', selectedImg)
    formData.append('whitePov', whitePov)

    const wl = window.location
    // fetch(wl.protocol + '//' + wl.host + '/upload/',
    fetch(wl.protocol + '//' + wl.hostname + ':4000/upload/', // for speed dev without front build
    	{
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      }
    )
      .then(res => {
        if (res.ok) return res.json()
        else throw new Error(res.statusText)
      }) 
      .then(json => {
        props.setFen(json.fen)
        setIsImgSelected(false)
      })
      .then(nvm => {
        navigate('/chessboard')
      })
      .catch(err => {
        console.log(err)
        alert("Something went wrong! Please try again.")
        handleDeletion()
      })
	}
    return (<div className="MainPage">
      <div className="header">
        <h1>Chess Helper</h1>
        <p>let us guide you to win</p>
      </div>
      <div className="content">
        {isImgSelected ? (
            <Preview 
              selectedImg={selectedImg} 
              handleSubmission={handleSubmission} 
              handleDeletion={handleDeletion}
              handlePovChange={handlePovChange}
            />
        ) : (
          <div className="submit-suggest-card">
              <h3>Take a photo of a chessboard of choose from library</h3>

              <input type="file" name="img" onChange={changeHandler} />
          </div>
        )}
      </div>
    </div>)
}

export default MainPage;