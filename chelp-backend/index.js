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
const STORAGE_ACCOUNT_URL = process.env.STORAGE_ACCOUNT_URL || null
const PIC_TO_FEN_ENDPOINT = process.env.PIC_TO_FEN_ENDPOINT || null
const STOCKFISH_ENDPOINT =  process.env.STOCKFISH_ENDPOINT  || null
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

app.post('/upload', async (req, res) => {
	const { image } = req.files
	const pov = req.body.whitePov
	
	if (!image) return res.sendStatus(400)
	if (!/^image/.test(image.mimetype)) {
		console.log('bad mimetype')
		return res.sendStatus(400)
	}

	// image name change (adding unix epoch) to avoid collisions
	image.name = `${Math.floor(Date.now() / 1000)}_${image.name}`
	
	const formdata = new FormData()
	formdata.append('image', `${STORAGE_ACCOUNT_URL}${image.name}`)
	formdata.append('whitePerspective', pov)

	uploadImageToStorageAccount(image)
		.then(nvm => {
			fetch(PIC_TO_FEN_ENDPOINT, {
				method: 'POST',
				body: formdata,
			})
				.then(res => res.json())
				.then(j => {
					console.log(j)
					res.status(200).json(j)
				})
		})
})

app.listen(port, () => {
	console.log(`Chess Helper backend listening on port ${port}`)
})

const uploadImageToStorageAccount = (image) => {

	const blobService = new BlockBlobClient(STORAGE_ACCOUNT_KEY, "images", image.name)
	const stream = Readable.from(image.data)

	return blobService.uploadStream(stream)
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