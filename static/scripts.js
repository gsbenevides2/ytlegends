const pages = {}
let legends,url
$(document).ready(()=>{
 pages.urlForm = $("#page-urlForm")
 pages.selectLegend = $("#page-selectLegend")
 pages.videoPlayer = $("#page-videoPlayer")
 pages.videoPlayer.fadeOut(500)
 pages.selectLegend.fadeOut(500)
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
	 pages.selectLegend.html(table)
	 pages.urlForm.fadeOut(500,()=>pages.selectLegend.fadeIn(500))

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
 pages.selectLegend.fadeOut(500,()=>pages.videoPlayer.fadeIn(500))
}
