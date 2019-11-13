const express = require("express")
const legends = require("./legends")
const ytdl = require('ytdl-core')

const app = express()
app.use(express.static("static"))

app.get("/url",(req,res)=>{
 const url = req.query.url
 legends.getLegends(url)
	.then(legendsList=>{
	 res.send(legendsList)
	})
	.catch(erro=>{
	 console.error(erro)
	 res.status(400).send(erro.message)
	})
})
app.get("/legend",(req,res)=>{
 const {url,lang,name} = req.query
 legends.getLegend(url,name,lang)
	.then(jsLegend=>{
	 res.send(jsLegend)
	})
	.catch(erro=>{
	 res.status(400).send(erro.message)
	})
})
app.get('/downloadmp4', (req,res) => {
 const url = req.query.url
 console.log("Solicitado:",url)
 try{
	res.header('Content-Disposition', 'attachment; filename="video.mp4"')
	ytdl(url, {
	 format: 'mp4'
	}).pipe(res)
 }catch(e){
	res.status(400).send("Erro")
 }
})
app.listen(process.env.PORT || 3000,()=>{
 console.log("Servidor iniciado")
})
