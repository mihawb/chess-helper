const express = require('express');
const fileUpload = require('express-fileupload')
const cors = require('cors')
const path = require('path')

const app = express()
const port = process.env.PORT || 4000
const corsOptions = {
	origin: process.env.CLIENT_URL || 'http://localhost:3000',
	optionSuccessStatus: 200
}

app.use(express.static(path.join(__dirname, 'build')))
app.use(fileUpload())
app.use(cors(corsOptions))

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.post('/upload', (req, res) => {
	const { image } = req.files

	if (!image) return res.sendStatus(400)
	if (!/^image/.test(image.mimetype)) {
		console.log('bad mimetype')
		return res.sendStatus(400)
	}


	// call to containers here, for now sending stub
	const resFen = { fen: image.name }
	console.log(resFen)
	res.status(200).json(resFen)
})

app.listen(port, () => {
  console.log(`Chess Helper backend listening on port ${port}`)
})