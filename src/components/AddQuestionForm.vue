<template>
  <form @submit.prevent="addQuestion" class="question-form">
    <input 
      v-model="newQuestion.text" 
      type="text" 
      placeholder="Enter new question" 
      class="question-input"
      required
    />
    
    <!-- Category Dropdown -->
    <select v-model="newQuestion.category" class="category-select" required>
      <option value="" disabled>Select Category</option>
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>
    
    <!-- Multiple Choice Options -->
    <div class="options-container">
      <input v-model="newQuestion.option_a" type="text" placeholder="Option A" class="option-input" required />
      <input v-model="newQuestion.option_b" type="text" placeholder="Option B" class="option-input" required />
      <input v-model="newQuestion.option_c" type="text" placeholder="Option C" class="option-input" required />
      <input v-model="newQuestion.option_d" type="text" placeholder="Option D" class="option-input" required />
    </div>
    
    <!-- Correct Answer Dropdown -->
    <select v-model="newQuestion.correct_answer" class="correct-answer-select" required>
      <option value="" disabled>Select Correct Answer</option>
      <option value="a">Option A</option>
      <option value="b">Option B</option>
      <option value="c">Option C</option>
      <option value="d">Option D</option>
    </select>
    
    <button type="submit" class="add-button">Add Question</button>
  </form>
</template>

<script>
export default {
  name: "AddQuestionForm",
  data() {
    return {
      newQuestion: {
        text: "",
        category: "",
        option_a: "",
        option_b: "",
        option_c: "",
        option_d: "",
        correct_answer: "",
      },
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
    };
  },
  methods: {
    addQuestion() {
      if (this.newQuestion.text && this.newQuestion.category && this.newQuestion.correct_answer) {
        // Make the POST request to the backend
        fetch('http://127.0.0.1:8000/api/questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: this.newQuestion.text,
            category: this.newQuestion.category,
            option_a: this.newQuestion.option_a,
            option_b: this.newQuestion.option_b,
            option_c: this.newQuestion.option_c,
            option_d: this.newQuestion.option_d,
            correct_answer: this.newQuestion.correct_answer,
          }),
        })
        .then(response => response.json())
        .then(data => {
          if (data.message === "Question added successfully!") {
            alert('Question added successfully!');
            this.resetForm();
          } else {
            alert('Error: ' + data.message);
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('There was an error adding the question.');
        });
      } else {
        alert('Please fill all fields before submitting the question.');
      }
    },
    resetForm() {
      this.newQuestion = {
        text: "",
        category: "",
        option_a: "",
        option_b: "",
        option_c: "",
        option_d: "",
        correct_answer: "",
      };
    },
  },
};
</script>

<style scoped>
.question-form {
  margin-bottom: 20px;
  background-color: #2c2c2c;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.question-input,
.option-input,
.category-select,
.correct-answer-select {
  padding: 12px;
  margin-bottom: 15px;
  width: 100%;
  max-width: 400px;
  border: 1px solid #444;
  border-radius: 6px;
  background-color: #333;
  color: #fff;
}

.question-input::placeholder,
.option-input::placeholder,
.category-select::placeholder {
  color: #888;
}

.add-button {
  padding: 12px 25px;
  background-color: #f5c518;
  color: #121212;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  max-width: 200px;
}

.add-button:hover {
  background-color: #d1b200;
}
</style>