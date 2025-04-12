<template>
  <nav class="sidebar">
    <ul>
      <li><router-link to="/dashboard">Dashboard</router-link></li>
      <li><router-link to="/users">User Management</router-link></li>
      <li><router-link to="/categories">Categories</router-link></li>
      <li><router-link to="/questionnaires">Questionnaires</router-link></li>
    </ul>
  </nav>
</template>

<style scoped>
.sidebar {
  width: 250px; /* Fixed sidebar width */
  height: 100vh; /* Full height of the viewport */
  background: #222; /* Dark background for sidebar */
  padding: 20px;
  position: fixed; /* Fix the sidebar on the left */
  top: 0;
  left: 0;
  z-index: 1001; /* Ensure the sidebar stays above other content */
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

.sidebar ul li {
  margin: 15px 0;
}

.sidebar ul li a {
  color: #f5c518; /* Gold color for the links */
  text-decoration: none;
  display: block;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background 0.3s;
}

.sidebar ul li a:hover {
  background: rgba(255, 215, 0, 0.2); /* Hover effect */
}
</style>
