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

let formData = new FormData()
formData.append("file", file)

fetch("http://127.0.0.1:5000/upload_csv",{
method:"POST",
body:formData
})
.then(res=>res.json())
.then(data=>{

const body=document.getElementById("resultsBody")

body.innerHTML=data.map(r=>`

<tr>
<td>${r.site}</td>
<td colspan="4"></td>
<td>${r.prediction}</td>
</tr>

`).join("")

document.getElementById("resultsTable").classList.add("show")

})
}
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