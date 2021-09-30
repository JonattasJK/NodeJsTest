const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')

async function changeSaves(urlPath){
    const res = await fetch(urlPath).then((data) => data.json()).then((data) => {console.log(urlPath)})
}
async function load(){
    const res = await fetch("http://localhost:3000/").then((data) => data.json())
    res.urls.map(({name, url}) => addElement({name, url}))
}
load();

function addElement({ name, url }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.onclick = () => removeElement(trash)

    li.append(a)
    li.append(trash)
    ul.append(li)
}

function removeElement(el) {
    if (confirm('Tem certeza que deseja deletar?')){
        let thisLi = el.parentNode
        let thisA = thisLi.getElementsByTagName("A")[0]
        changeSaves(`http://localhost:3000/?name=${thisA.innerHTML}&url=${thisA.href}&del=1`)
        thisLi.remove()
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input

    if (!value) 
        return alert('Preencha o campo')

    const [name, url] = value.split(",")

    if (!url) 
        return alert('formate o texto da maneira correta')

    if (!/^http/.test(url)) 
        return alert("Digite a url da maneira correta")

    addElement({ name, url })
    changeSaves(`http://localhost:3000/?name=${name}&url=${url}`)

    input.value = ""
})