const express = require('express');
const fileUpload = require('express-fileupload')
const cors = require('cors')
const path = require('path')

const app = express()
const port = process.env.PORT || 4000
const corsOptions = {
	origin: process.env.CLIENT_URL || 'http://localhost:3000', // TODO dodac do app service adres jako env var
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

	image.mv(__dirname + '/images/' + image.name)

	const resObj = { moves: [...image.data.slice(0, 20)] }
	res.status(200).json(resObj)
})

app.listen(port, () => {
  console.log(`Chess Helper backend listening on port ${port}`)
})