const express = require('express');
const fileUpload = require('express-fileupload')
const cors = require('cors')
const path = require('path')
const { Readable } = require('stream');

const { BlockBlobClient } = require("@azure/storage-blob");
const ejs = require('ejs');

const app = express()
const port = process.env.PORT || 4000
const STORAGE_ACCOUNT_KEY = process.env.STORAGE_ACCOUNT_KEY || null
const corsOptions = {
	origin: process.env.CLIENT_URL || 'http://localhost:3000',
	optionSuccessStatus: 200
}

app.use(express.static(path.join(__dirname, 'build')))
app.use(fileUpload())
app.use(cors(corsOptions))
app.set("view engine", "ejs");

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

	// send img to blob storage only from prod
	if (STORAGE_ACCOUNT_KEY)
		uploadImageToStorageAccount(image)

	// call to containers here, for now sending stub
	const resFen = { fen: image.name }
	console.log(resFen)
	res.status(200).json(resFen)
})

app.listen(port, () => {
	console.log(`Chess Helper backend listening on port ${port}`)
})

const uploadImageToStorageAccount = (image) => {

	const blobService = new BlockBlobClient(STORAGE_ACCOUNT_KEY, "images", image.name)
	const stream = Readable.from(image.data)

	blobService.uploadStream(stream)
		.then(
			() => {
				console.log("Image uploaded to Storage Account!");
			}
		).catch(
			(err) => {
				if (err) {
					console.log(err)
					return;
				}
			}
		)
}