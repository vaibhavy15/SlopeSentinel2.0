function dragOver(e){
e.preventDefault()
document.getElementById("uploadZone").classList.add("drag")
}

function dragLeave(){
document.getElementById("uploadZone").classList.remove("drag")
}

function dropFile(e){

e.preventDefault()

dragLeave()

const file=e.dataTransfer.files[0]

if(file){
processFile(file)
}

}

function handleFile(input){

if(input.files[0]){

processFile(input.files[0])

}

}

function processFile(file){

document.getElementById("filename").textContent=file.name

document.getElementById("progressArea").classList.add("show")

let bar=document.getElementById("progressBar")

let width=0

let interval=setInterval(()=>{

width+=10

bar.style.width=width+"%"

if(width>=100){

clearInterval(interval)

showResults()

}

},200)

}

const mockData=[

{ id:"Site-001", angle:34, rain:45, density:2.7, score:0.12, pred:"safe" },

{ id:"Site-002", angle:52, rain:120, density:2.3, score:0.61, pred:"caution" },

{ id:"Site-003", angle:68, rain:210, density:1.9, score:0.87, pred:"critical" }

]

function showResults(){

const body=document.getElementById("resultsBody")

body.innerHTML=mockData.map(r=>`

<tr>

<td>${r.id}</td>

<td>${r.angle}</td>

<td>${r.rain}</td>

<td>${r.density}</td>

<td>${(r.score*100).toFixed(0)}%</td>

<td>${r.pred}</td>

</tr>

`).join("")

document.getElementById("resultsTable").classList.add("show")

}