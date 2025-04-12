<template>
  <div class="users-container">
    <!-- Header Component -->
    <Header />

    <!-- Dashboard Layout: Sidebar + Main Content -->
    <div class="users-content">
      <!-- Sidebar Component -->
      <Sidebar />

      <!-- Main Content Area for Users Management -->
      <div class="content-area">
        <h2>User Management</h2>
        <p>Manage your users here.</p>

        <!-- Loading Spinner -->
        <div v-if="loading" class="loading">
          <p>Loading users...</p>
        </div>

        <!-- Display the list of users -->
        <table v-if="users.length > 0" class="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ formatDate(user.created_at) }}</td>
              <td>
                <button @click="deleteUser(user.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- No users found message -->
        <p v-else>No users found.</p>

        <!-- Error Message -->
        <p v-if="error" class="error">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";

export default defineComponent({
  name: "UsersView",
  components: {
    Header,
    Sidebar,
  },
  setup() {
    const users = ref([]);
    const loading = ref(false);
    const error = ref(null);

    // Fetch users from API when component is mounted
    const fetchUsers = async () => {
      loading.value = true;
      error.value = null;
      try {
        const response = await fetch("http://127.0.0.1:8000/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        users.value = data;
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    };

    // Format date function (e.g., from YYYY-MM-DD to a more readable format)
    const formatDate = (date) => {
      const newDate = new Date(date);
      return newDate.toLocaleDateString();
    };

    // Call fetchUsers when the component is mounted
    onMounted(fetchUsers);

    // Delete user functionality
    const deleteUser = async (userId) => {
      const confirmDelete = confirm("Are you sure you want to delete this user?");
      if (!confirmDelete) return;

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete user");
        }

        // Remove the user from the list in the UI
        users.value = users.value.filter(user => user.id !== userId);
        alert("User deleted successfully.");
      } catch (err) {
        error.value = err.message;
      }
    };

    return {
      users,
      loading,
      error,
      deleteUser,
      formatDate,
    };
  },
});
</script>

<style scoped>
/* Overall container for users view layout */
.users-container {
  display: flex;
  flex-direction: column; /* Stack header and sidebar vertically */
  min-height: 100vh; /* Ensure it takes full height of the viewport */
}

/* Container for sidebar and main content */
.users-content {
  display: flex; /* Sidebar and content will be side-by-side */
  flex-grow: 1;
  margin-top: 20px; /* Add some top margin for spacing */
  padding: 10px; /* Add some padding to avoid content touching the edges */
}

/* Sidebar container styling */
.sidebar {
  width: 250px; /* Sidebar width */
  background-color: #2c2c2c; /* Dark background for sidebar */
  color: white; /* White text for sidebar */
  padding: 20px;
  position: sticky; /* Fixes the sidebar when scrolling */
  top: 0;
  height: calc(100vh - 60px); /* Take full height minus the header height */
  overflow-y: auto; /* Allow scrolling if the sidebar content overflows */
}

/* Main content area (Users Management content) */
.content-area {
  flex-grow: 1; /* Take remaining space after sidebar */
  display: flex;
  flex-direction: column; /* Stack content vertically */
  justify-content: flex-start; /* Align content to the top */
  padding: 20px;
  background: #333; /* Dark background for the content */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); /* Add shadow for better visual separation */
  border-radius: 8px;
  margin-left: 20px; /* Add space between sidebar and content */
  width: 100%;
  overflow-y: auto; /* Ensure content scrolls properly if needed */
}

/* Styling for the User Management heading */
h2 {
  margin-bottom: 20px; /* Space below the heading */
  font-size: 2rem;
  text-align: center;
  color: #f5c518; /* Change heading color to match the color scheme */
}

/* Additional styling for the paragraph */
p {
  margin: 0;
  text-align: center;
  font-size: 1.1rem;
  color: #888; /* Light gray color for paragraphs */
}

/* Table styling */
.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.user-table th,
.user-table td {
  padding: 12px;
  border: 1px solid #444; /* Dark border for table cells */
  text-align: left;
  color: #fff; /* White text for table */
}

.user-table th {
  background-color: #333; /* Dark background for table headers */
  color: #f5c518; /* Gold color for headers */
}

.user-table button {
  padding: 5px 10px;
  margin: 0 5px;
  background-color: #f5c518; /* Gold button background */
  color: #121212; /* Dark text color */
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.user-table button:hover {
  background-color: #d1b200; /* Darker gold on hover */
}

/* Loading Spinner */
.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #f5c518; /* Gold color for loading message */
}

/* Error Message */
.error {
  color: red;
  text-align: center;
  font-size: 1rem;
  margin-top: 20px;
}
</style>
