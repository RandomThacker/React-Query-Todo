export async function fetchTasks(){
    const response = await fetch("http://localhost:3000/tasks")
    return response.json()
}

export async function fetchTask(id){
    const response = await fetch(`http://localhost:3000/tasks/${id}`)
    return response.json()
}