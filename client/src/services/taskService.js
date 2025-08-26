const API_BASE_URL = import.meta.env.VITE_API_URL;

class TaskService {
  async getAllTasks() {
    const response = await fetch(`${API_BASE_URL}/tasks`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  async createTask(taskData) {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  }

  async deleteTask(taskId) {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  }
}

export const taskService = new TaskService();
