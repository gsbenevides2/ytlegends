const request = require("request")
const convert = require("xml-js")
const googleVideo = request.defaults({
 baseUrl:"http://video.google.com"
})
async function requestPromise(params,requestDefaults){
 return new Promise((resolve,reject)=>{
	function concluindo(err,req,body){
	 if(req.statusCode !== 200) reject({message:"Erro desconhecido"})
	 else resolve(body)
	}
	if(requestDefaults)requestDefaults.get(params,concluindo)
	else request.get(params,concluindo)
 })
}
function checkUrl(url){
 const regex = /((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/gm;
 return new Promise((resolve,reject)=>{
	if(!url)reject({message:"Informe uma url"})
	const result = regex.exec(url)
	if(!result)reject({message:"Url invalida"})
	else if(!result[5]) reject({message:"Verifique a sua url"})
	else resolve(result[5])
	console.log("Url:",url)
	console.log("Result",result)
 })
}
function getLegends(url){
 return new Promise(async(resolve,reject)=>{
	let tracks
	checkUrl(url).then(id=>{
	 console.log("Id",id)
	 return requestPromise({
		url:"/timedtext",
		qs:{type:"list",v:id}
	 },googleVideo)
	})
	 .then(xmlTracks=>{
		const jsTracks = convert.xml2js(xmlTracks,{compact:true}).transcript_list.track
		console.log("jsTracks",jsTracks)
		if(!jsTracks) reject({message:"Este video não contem legendas"})
		else if(!Array.isArray(jsTracks)){
		 tracks = [{
			name:jsTracks._attributes.name,
			lang_translated:jsTracks._attributes.lang_translated,
			lang:jsTracks._attributes.lang_code
		 }]
		}
		else{
		 tracks = jsTracks.map(jsTrack=>{
			return{
			 name:jsTrack._attributes.name,
			 lang_translated:jsTrack._attributes.lang_translated,
			 lang:jsTrack._attributes.lang_code
			}
		 })
		}
		resolve(tracks)
	 })
	 .catch(reject)
 })
}
function getLegend(url,name="",lang){
 return new Promise(async(resolve,reject)=>{
	checkUrl(url)
	 .then(id=>{
		//if(!name)reject({message:"Falta o parametro: name"})
		if(!lang)reject({message:"Falta o parametro: lang"})
		return requestPromise({
		 url:"/timedtext",
		 qs:{
			v:id,
			name,
			lang,
			tlang:"pt-BR",type:"track",fmt:"vtt"
		 }
		},googleVideo)
	 })
	 .then(resolve)
 })
 }
	module.exports={
	 getLegends,
	 getLegend
	}
