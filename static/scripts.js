const pages = {}
let legends,url
$(document).ready(()=>{
 pages.urlForm = $("#page-urlForm")
 pages.selectLegend = $("#page-selectLegend")
 pages.videoPlayer = $("#page-videoPlayer")
 pages.urlForm.css("display","block")
 pages.urlForm.animate({
	opacity:1
 },500)
 const url = new URL(window.location.href)
 if(url.searchParams.has("text")){
	$("#url").parent().addClass("input-focus")
	$("#url").val(url.searchParams.get("text"))
 }
 if("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js")
 const inputsDiv = $(".input")
 for(let inputDiv of inputsDiv){
	const input = $(inputDiv).find("input")
	input.on("focus",(e)=>{
	 $(e.target.parentNode).removeClass("invalid")
	 $(e.target.parentNode).addClass("input-focus")
	})
	input.on("blur",(e)=>{
	 if(!e.target.value){
		$(e.target.parentNode).removeClass("input-focus")
	 }
	})
 }
})

function urlSubmit(){
 url = $("#url").val()
 $.get("/url",{url},response=>{
	legends = response
	if(legends.length!==0){
	 console.log(legends)
	 const table = legends.map((legend,indice)=>`
		<tr>
		 <td onclick="selectLegend(${indice})">${legend.name || legend.lang_translated}</td>
		</tr>
		`).join("")
	 pages.selectLegend.find("table").html(table)
	 pages.urlForm.fadeOut(500,()=>{
		pages.selectLegend.css("display","block")
		pages.selectLegend.animate({opacity:1},500)
	 })

	}
	else{
	 alert("Esse video não tem legendas")
	}
 })
	.fail(error=>{
	 alert(error.responseText)
	})
}
function selectLegend(e){
 const legend = legends[e]
 const video = pages.videoPlayer.find("video")
 let html = `<source src="/downloadmp4?url=${url}" type="video/mp4">
 <track kind="subtitles" srclang="pt-BR" label="Lagenda Traduzida" src="/legend?url=${url}&name=${legend.name}&lang=${legend.lang}">
 `
 video.html(html)
 video.show()
 pages.selectLegend.fadeOut(500,()=>{
	pages.videoPlayer.css("display","block")
	pages.videoPlayer.animate({opacity:1},500)
 })
}
function areaDeTransferencia(){
 if('clipboard' in navigator){
	navigator.clipboard.readText()
	 .then(text=>{
		$("#url").parent().addClass("input-focus")
		$("#url").val(text)
	 })
	 .catch(error=>{
		if(error.name === "NotAllowedError") alert("Por favor vá as configuraçōes do navegador e libere o acesso a area de transferencia.")
	 })
 }
 else alert("Seu navegador não suporta Clipboard API. Por favor atualize seu navegador")
}
