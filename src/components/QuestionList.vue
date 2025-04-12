<template>
  <div>
    <div v-for="(question, index) in filteredQuestions" :key="question.id" class="question-item">
      <p>{{ question.text }}</p>
      <ul>
        <li>A. {{ question.option_a }}</li>
        <li>B. {{ question.option_b }}</li>
        <li>C. {{ question.option_c }}</li>
        <li>D. {{ question.option_d }}</li>
      </ul>
      <p><strong>Correct Answer:</strong> Option {{ question.correct_answer.toUpperCase() }}</p>

      <button @click="deleteQuestion(question.id)">Delete</button>
    </div>

    <div v-if="filteredQuestions.length === 0">
      <p>No questions available for this category.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    selectedCategory: String, // Receives selected category from parent
  },
  data() {
    return {
      questions: [], // Store all fetched questions
    };
  },
  mounted() {
    this.fetchQuestions();  // Fetch questions when component is mounted
  },
  computed: {
    // Filter questions by the selected category
    filteredQuestions() {
      return this.questions.filter(
        (question) => question.category === this.selectedCategory
      );
    },
  },
  methods: {
    // Fetch all questions from the API
    fetchQuestions() {
      axios
        .get("http://localhost:8000/api/questions")  // Replace with your API URL
        .then((response) => {
          this.questions = response.data;  // Store questions in the component
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
        });
    },
    deleteQuestion(id) {
  if (window.confirm("Are you sure you want to delete this question?")) {
    axios
      .delete(`http://localhost:8000/api/questions/${id}`)
      .then((response) => {
        this.questions = this.questions.filter(question => question.id !== id);
        alert("Question deleted successfully.");
      })
      .catch((error) => {
        console.error("Error deleting the question:", error);
        alert("There was an error deleting the question.");
      });
      }
    },
  },
};
</script>

<style scoped>
.question-item {
  margin-bottom: 15px;
  padding: 10px;
  background-color: #0c0808;
  border-radius: 6px;
}

.question-item ul {
  list-style-type: none;
  padding-left: 0;
}

.question-item li {
  margin-bottom: 5px;
}

.question-item strong {
  font-weight: bold;
}

button {
  background-color: #f44336;  /* Red background for delete button */
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
}

button:hover {
  background-color: #d32f2f;  /* Darker red on hover */
}
</style>


<style scoped>
.question-item {
  margin-bottom: 15px;
  padding: 10px;
  background-color: #0c0808;
  border-radius: 6px;
}

.question-item ul {
  list-style-type: none;
  padding-left: 0;
}

.question-item li {
  margin-bottom: 5px;
}

.question-item strong {
  font-weight: bold;
}

button {
  background-color: #f44336;  /* Red background for delete button */
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
}

button:hover {
  background-color: #d32f2f;  /* Darker red on hover */
}
</style>
