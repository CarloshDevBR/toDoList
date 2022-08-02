const form = document.querySelector('form')
const btn = document.querySelector('button')
const ul = document.querySelector('ul')

const input = document.querySelector('input')

let arrTask = []

const loadPage = async () => {
    const date = await localStorage.getItem("tasks")
    const converted = JSON.parse(date)

    if(converted) {
        arrTask.push(...converted)

        loadTask()
    }
}

const addTask = () => {
    arrTask.push({
        id: (Math.random() * (100 - 5) + 5).toFixed(2),
        task: input.value,
        state: ''
    })

    input.value = ''

    loadTask()
}

const deleteTask = (id) => {
    const filteredArr = arrTask.filter(e => e.id != id)

    arrTask = filteredArr

    loadTask()
}

const taskCompleted = (id) => {
    const task = document.getElementById(`${id}`)

    const index = arrTask.findIndex(e => e.id == id)

    task.classList.add('completed')

    if(arrTask[index].state) {
        arrTask[index].state = false
    } else {
        arrTask[index].state = true
    }

    loadTask()
}

const loadTask = async () => {
    ul.innerHTML = arrTask.map(e => `
    <div>
        <button onclick="taskCompleted(${e.id})">V</button>
        <li id=${e.id} } class="${e.state && 'completed'}">${e.task}</li>
        <button id="deleteBtn" onclick="deleteTask(${e.id})">delete</button>
    </div>

    `).join(' ')

    await localStorage.setItem("tasks", JSON.stringify(arrTask))
}

document.addEventListener('load', loadPage())
document.addEventListener('keypress', (e) => {
    e == 13 && addTask()
})

btn.addEventListener('click', () => {
    if(input.value) return addTask()
})

form.addEventListener('submit', (e) => e.preventDefault())