// api.js
const BASE_URL = 'http://localhost:3001/api/tasks'; // Replace with your backend API URL

const api = {
  async getTasks() {
    const response = await fetch(BASE_URL);
    return response.json();
  },

  async createTask(newTask) {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });
    return response.json();
  },

  async updateTaskStatus(taskId, newStatus) {
    const response = await fetch(`${BASE_URL}/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    });
    return response.json();
  },

  async deleteTask(taskId) {
    const response = await fetch(`${BASE_URL}/${taskId}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};

export default api;
