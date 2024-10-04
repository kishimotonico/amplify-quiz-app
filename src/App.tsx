import { useEffect, useState } from 'react';
import { View, Heading, Button, Flex, Text, Card, Icon } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

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
    <View padding="2rem">
      <Heading level={1} marginBottom="1rem">Questions</Heading>
      <Button onClick={createQuestion} variation="primary" size="large" marginBottom="2rem">Create Question</Button>
      <Flex direction="column" gap="1rem">
        {questions.map((question) => (
          <Card key={question.id} padding="1rem" backgroundColor="white" borderRadius="0.5rem" boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)">
            <Flex alignItems="center" justifyContent="space-between">
              <Text>{question.content}</Text>
              <Button onClick={() => deleteQuestion(question.id)} variation="link">
                <Icon name="delete" />
              </Button>
            </Flex>
          </Card>
        ))}
      </Flex>
    </View>
  );
}

export default App;
