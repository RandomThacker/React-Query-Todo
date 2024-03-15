import axios from "axios";

const url = 'https://calm-plum-jaguar-tutu.cyclic.app/todos'


//done
export async function fetchTasks(){
    const response =await axios.get(url)
    return response.data.data
}

export const addTask = async (taskData) => {
  const { data } = await axios.post("/api/tasks", taskData);
  return data;
};

export async function fetchData(){
  const response =await axios.get(url)
  return response
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

// export async function updateTask(updatedTask) {
//     try {
//       const response = await axios.post(`${url}/${updatedTask._id}`, updatedTask)
//       console.log("Updated TAsk API",updatedTask);
//       console.log("response api",response);
//       return response.data.data;

//     } catch (error) {
//       console.log(error);
//       throw new Error("Failed to update task: " + error.message);
//     }
//   }

export async function updateTask(updatedTask) {
  try {
    const response = await axios.post(url, updatedTask)
    console.log("Updated TAsk API",updatedTask);
    console.log("response api",response);
    return response.data.data;

  } catch (error) {
    console.log(error);
    throw new Error("Failed to update task: " + error.message);
  }
}
  

//done
export async function deleteTask(id){
    const response =await axios.delete(`${url}/${id}`)
    return response.data.data
}
