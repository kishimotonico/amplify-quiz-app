import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import '@aws-amplify/ui-react/styles.css'

const client = generateClient<Schema>();

function App() {
  const [questions, setQuestions] = useState<Array<Schema["Question"]["type"]>>([]);

  useEffect(() => {
    client.models.Question.observeQuery().subscribe({
      next: (data) => setQuestions([...data.items]),
    });
  }, []);

  function createQuestion() {
    client.models.Question.create({ content: window.prompt("Question content") });
  }

  function deleteQuestion(id: string) {
    client.models.Question.delete({ id });
  }

  return (
    <main>
      <h1>Questions</h1>
      <button onClick={createQuestion}>Create Question</button>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <span>{question.content}</span>
            <button onClick={() => deleteQuestion(question.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
