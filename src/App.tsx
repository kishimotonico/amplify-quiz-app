import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { QuestionCreateForm } from "../ui-components"; // Docにはこっちの書き方だけどWarningでてる
import OptionCreateForm from "../ui-components/OptionCreateForm";
import AnswerCreateForm from "../ui-components/AnswerCreateForm";

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
      <QuestionCreateForm />
      <OptionCreateForm />
      <AnswerCreateForm />
    </main>
  );
}

export default App;
