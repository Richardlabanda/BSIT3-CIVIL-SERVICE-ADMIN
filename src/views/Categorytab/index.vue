<template>
  <div class="categories-container">
    <Header />
    <div class="categories-content">
      <Sidebar />
      <div class="content-area">
        <h2>Categories</h2>
        <p>Select a category to view questions.</p>

        <div class="category-list">
          <div
            v-for="category in categories"
            :key="category"
            class="category-box"
            @click="selectCategory(category)"
          >
            <p>{{ category }}</p>
          </div>
        </div>

        <div v-if="selectedCategory">
          <h3>Questions for {{ selectedCategory }}</h3>
          <QuestionList :selectedCategory="selectedCategory" />
        </div>

        <div v-else>
          <p>Please select a category to view questions.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import QuestionList from '@/components/QuestionList.vue';

export default {
  name: "CategoryView",
  components: {
    Header,
    Sidebar,
    QuestionList,
  },
  data() {
    return {
      categories: [
        "Verbal Ability",
        "Analytical Ability",
        "Mathematical Ability",
        "General Knowledge",
        "Ethics and Values",
        "Filipino Language and Culture",
        "Current Events",
        "Technology and Innovation",
        "Public Service",
        "Basic Computer Literacy",
      ],
      selectedCategory: null,
    };
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category;
    },
  },
};
</script>



<style scoped>
.categories-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.categories-content {
  display: flex;
  flex-grow: 1;
  padding: 20px;
}

.content-area {
  flex-grow: 1;
  padding: 20px;
  background-color: #191818;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-left: 250px; /* Make space for sidebar */
  overflow-y: auto;
}

h2 {
  margin-bottom: 20px;
  font-size: 2rem;
  text-align: center;
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.category-box {
  padding: 20px;
  background-color: #ed942d; /* Changed background color to a blue shade */
  color: #ffffff; /* Changed font color to white for better visibility */
  border-radius: 8px;
  cursor: pointer;
  margin: 10px;
  text-align: center;
  transition: background-color 0.3s ease;
  width: 200px;
}

.category-box:hover {
  background-color: #5e5f64; /* Darker shade on hover */
}

h3 {
  margin-top: 40px;
  font-size: 1.8rem;
  text-align: center;
}

p {
  text-align: center;
  color: #ffffff;
}

@media (max-width: 768px) {
  /* Adjust sidebar and content area on smaller screens */
  .categories-content {
    flex-direction: column;
    margin-left: 0;
  }
  
  .content-area {
    margin-left: 0; /* Remove left margin when sidebar collapses */
  }

  .category-box {
    width: 100%; /* Full width on small screens */
  }
}
</style>
