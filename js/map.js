function selectSite(name,risk,lat,lng,safe,riskIndex,stability){

document.getElementById("no-site-msg").style.display="none"

let panel=document.getElementById("site-detail-panel")

panel.classList.add("show")

document.getElementById("sd-name").textContent=name

let badge=document.getElementById("sd-badge")

badge.textContent=risk
badge.className="risk-badge "+risk

document.getElementById("sd-coords").textContent=lat+" , "+lng

document.getElementById("sd-safe").textContent=safe+"%"

document.getElementById("sd-risk").textContent=riskIndex

document.getElementById("sd-stab").textContent=stability

document.getElementById("sd-coords2").textContent="Lat:"+lat+" | Lng:"+lng

}