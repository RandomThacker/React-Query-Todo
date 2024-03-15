import axios from "axios";

const url = 'https://calm-plum-jaguar-tutu.cyclic.app/todos'


//done
export async function fetchTasks(){
    const response =await axios.get(url)
    return response.data.data
}

//done
export async function fetchTask(id){
    const response =await axios.get(`${url}/${id}`)
    return response.data.data
}

export async function createTask(newTask) {
    const response = await axios.post(url, newTask, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.data.data;
}

export async function updateTask(updatedTask) {
    try {
      const response = await axios.put(`${url}/${updatedTask._id}`, updatedTask, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      return response.data.data;
    } catch (error) {
      throw new Error("Failed to update task: " + error.message);
    }
  }
  

//done
export async function deleteTask(id){
    const response =await axios.delete(`${url}/${id}`)
    return response.data.data
}
