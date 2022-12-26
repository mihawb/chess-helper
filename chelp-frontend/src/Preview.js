import { useState, useEffect } from 'react'

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
			<img alt="Preview of uploaded file" src={imgPreview}/>
			<button onClick={props.handleSubmission}>Submit</button>
			<button onClick={props.handleDeletion}>Remove</button>
		</div>
	)
}

export default Preview