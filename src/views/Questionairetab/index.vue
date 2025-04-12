<template>
  <div class="questionnaires-container">
    <!-- Header Component -->
    <Header />

    <div class="questionnaires-content">
      <!-- Sidebar Component -->
      <Sidebar />

      <div class="content-area">
        <h2>Questionnaires</h2>
        <p>Manage questionnaires here.</p>

        <!-- Add Question Form -->
        <AddQuestionForm @add-question="addQuestion" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import AddQuestionForm from '@/components/AddQuestionForm.vue';

export default defineComponent({
  name: "QuestionnairesView",
  components: {
    Header,
    Sidebar,
    AddQuestionForm
  },
  data() {
    return {
      questions: [] // Store questions here
    };
  },
  methods: {
    addQuestion(newQuestion) {
      // Add the new question to the list
      this.questions.push(newQuestion);

      // Emit the new question to the Categories view if needed
      this.$emit('new-question', newQuestion);
    }
  }
});
</script>
<style scoped>
.questionnaires-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.questionnaires-content {
  display: flex;
  flex-grow: 1;
  margin-left: 250px; /* Space for the sidebar */
}

.sidebar {
  width: 250px;
  background-color: #333;
  color: white;
  padding: 20px;
  position: fixed; /* Fix the sidebar in place */
  top: 0;
  left: 0;
  height: 100vh;
}

.content-area {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  background: rgb(12, 11, 11);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-left: 20px; /* Adjust margin for content to avoid overlap with sidebar */
}

h2 {
  margin-bottom: 20px;
  font-size: 2rem;
  text-align: center;
}

p {
  margin: 15px 0;
  text-align: center;
  font-size: 1.2rem;
  color: #ffffff;
}

@media (max-width: 768px) {
  /* Make the sidebar smaller on smaller screens */
  .sidebar {
    width: 70px;
    height: auto;
    position: fixed;
    top: 0;
    left: 0;
  }

  .questionnaires-content {
    margin-left: 70px; /* Adjust the content margin for smaller sidebar */
  }

  .content-area {
    margin-left: 10px; /* Reduce margin when sidebar is smaller */
  }
}
</style>
