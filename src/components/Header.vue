<template>
  <header class="header">
    <h1>Civil Service Admin Panel</h1>
  </header>
</template>

<style scoped>
.header {
  background: #1a1a1a; /* Dark background */
  color: #f5c518; /* Gold text color */
  padding: 15px 20px; /* Header padding */
  display: flex;
  align-items: center;
  justify-content: center; /* Center the title */
  position: fixed; /* Keep the header fixed at the top */
  top: 0;
  left: 0; /* Align with the sidebar */
  right: 0; /* Align with the right edge */
  z-index: 1000; /* Ensure it's below the sidebar */
}
</style>
