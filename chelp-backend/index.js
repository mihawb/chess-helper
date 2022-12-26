const express = require('express');
const fileUpload = require('express-fileupload')
const path = require('path')
const app = express()
const port = process.env.PORT || 4000

app.use(express.static(path.join(__dirname, 'build')))
app.use(fileUpload())

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

	res.sendStatus(200)
})

app.listen(port, () => {
  console.log(`Chess Helper backend listening on port ${port}`)
})