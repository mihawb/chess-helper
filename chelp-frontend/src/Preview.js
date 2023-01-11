import { useState, useEffect } from 'react'
import './Preview.css'

const Preview = (props) => {
	const [imgPreview, setImgPreview] = useState()

	useEffect(() => {
    if (!props.selectedImg) {
      setImgPreview(undefined)
      return
    }

    const objUrl = URL.createObjectURL(props.selectedImg)
    setImgPreview(objUrl)

    return () => URL.revokeObjectURL(objUrl)
  }, [props.selectedImg])

	return (
		<div className="preview-card">
			<img className="cb-preview" alt="Preview of uploaded file" src={imgPreview}/>
			<div className="btns-wrapper">
				<button className="ctrl-btn" onClick={props.handleSubmission}>Submit</button>
				<button className="ctrl-btn" onClick={props.handleDeletion}>Remove</button>
				<label for="whitePerspective">White perspective</label>
				<input type="checkbox" id="whitePerspective" name="whitePerspective" onChange={props.handlePovChange}/>
			</div>
		</div>
	)
}

export default Preview