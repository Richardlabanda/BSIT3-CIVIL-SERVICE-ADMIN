<template>
  <div class="dashboard-container">
    <Header />
    <div class="dashboard-content">
      <Sidebar />

      <div class="content-area">
        <h1>Dashboard</h1>
        <p>Welcome to the admin dashboard!</p>

        <div class="dashboard-stats">
          <p><strong>Total Users:</strong> {{ totalUsers }}</p>
          <p><strong>Total Questionnaires:</strong> {{ totalQuestionnaires }}</p> 
          <p v-if="selectedUser"><strong>Tests Passed:</strong> {{ passedCount }}</p>
        </div>

        <div class="user-list">
          <h2>Users</h2>
          <ul>
            <li 
              v-for="user in users" 
              :key="user.id" 
              @click="fetchUserResults(user.id)"
              class="user-item"
            >
              {{ user.name }}
            </li>
          </ul>
        </div>

        <div v-if="selectedUser" class="user-results">
          <div class="user-results-header">
            <h3>{{ selectedUser.name }}'s Test Results</h3>
            <button class="close-btn" @click="closeUserResults">×</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Score</th>
                <th>Percentage</th> 
                <th>Date Taken</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="result in userTestResults" :key="result.id">
                <td>{{ result.category }}</td>
                <td>{{ result.score }}</td>
                <td>{{ calculatePercentage(result) }}%</td> 
                <td>{{ new Date(result.taken_at).toLocaleString() }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';

export default defineComponent({
  name: "Dashboard",
  components: {
    Header,
    Sidebar,
  },
  setup() {
    const users = ref([]);
    const selectedUser = ref(null);
    const userTestResults = ref([]);
    const totalQuestionnaires = ref(0);
    const questions = ref([]);

    // Fetch users
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/users");
        const data = await response.json();
        users.value = data;
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    const fetchUserResults = async (userId: number) => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/user_scores/${userId}`);
        const data = await response.json();
        selectedUser.value = users.value.find(user => user.id === userId);
        userTestResults.value = data;
      } catch (error) {
        console.error("Failed to fetch user results:", error);
      }
    };

    const closeUserResults = () => {
      selectedUser.value = null;
      userTestResults.value = [];
    };

    const totalUsers = computed(() => users.value.length);

    const passedCount = computed(() => {
      return userTestResults.value.filter(result => {
        const percentage = calculatePercentage(result);
        return percentage >= 80;
      }).length;
    });

    const fetchTotalQuestionnaires = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/questions");
        const data = await response.json();
        totalQuestionnaires.value = data.length; 
        questions.value = data; 
      } catch (error) {
        console.error("Failed to fetch total questionnaires:", error);
      }
    };

    const calculatePercentage = (result: any) => {
      const categoryQuestions = questions.value.filter(question => question.category === result.category);
      const totalQuestions = categoryQuestions.length;

      if (totalQuestions === 0) {
        return 0;
      }

      const correctAnswers = result.score; 

      const percentage = (correctAnswers / totalQuestions) * 100;
      return percentage.toFixed(2);
    };

    onMounted(() => {
      fetchUsers();
      fetchTotalQuestionnaires();
    });

    return {
      users,
      selectedUser,
      userTestResults,
      fetchUserResults,
      closeUserResults,
      totalUsers,
      passedCount,  
      totalQuestionnaires,
      calculatePercentage, 
    };
  },
});
</script>


<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.dashboard-content {
  display: flex;
  flex-grow: 1;
  margin-top: 60px;
  padding: 10px;
}

.sidebar {
  width: 250px;
  background-color: #2c2c2c;
  color: white;
  padding: 20px;
  position: sticky;
  top: 0;
  height: calc(100vh - 60px);
  overflow-y: auto;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
}

.content-area {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: #333;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  margin-left: 20px;
  width: 100%;
  overflow-y: auto;
}

h1 {
  margin-bottom: 20px;
  font-size: 2rem;
  text-align: center;
  color: #f5c518;
}

p {
  margin: 0;
  text-align: center;
  font-size: 1.1rem;
  color: #888;
  margin-bottom: 30px;
}

/* Dashboard Stats */
.dashboard-stats {
  margin-top: 10px;
  background-color: #222;
  padding: 15px;
  border-radius: 8px;
  color: #f5c518;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.user-list {
  margin-top: 20px;
}

.user-list h2 {
  font-size: 1.6rem;
  color: #f5c518;
  margin-bottom: 15px;
  text-align: center;
}

.user-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.user-item {
  padding: 12px;
  margin: 12px 0;
  background-color: #444;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
  color: white;
  transition: background-color 0.3s ease, transform 0.2s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.user-item:hover {
  background-color: #f5c518;
  color: #121212;
  transform: scale(1.03);
}

.user-results {
  margin-top: 30px;
}

.user-results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #222;
  padding: 10px 20px;
  border-radius: 5px 5px 0 0;
}

.user-results h3 {
  font-size: 1.5rem;
  color: #f5c518;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  color: #f5c518;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s;
}

.close-btn:hover {
  transform: scale(1.2);
  color: #ff5252;
}

.user-results table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.user-results th,
.user-results td {
  padding: 12px;
  text-align: left;
  border: 1px solid #444;
  color: #fff;
}

.user-results th {
  background-color: #333;
  color: #f5c518;
}

.user-results td {
  background-color: #444;
}

.user-results td:hover {
  background-color: #555;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #f5c518;
}

.error {
  color: red;
  text-align: center;
  font-size: 1rem;
  margin-top: 20px;
}
</style>
