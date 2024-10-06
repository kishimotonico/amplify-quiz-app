import { useEffect, useState } from 'react';
import { View, Heading, Button, Flex, Text, Card, Input } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

type QuestionType = Schema["Question"]["type"];
type OptionType = Schema["Option"]["type"];

const TextOrInput = (props: { value: string, onChange: (value: string) => void, placeholder?: string, variation?: "quiet" }) => {
  const { value, onChange, placeholder, variation } = props;
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const submitUpdate = () => {
    setEditing(false);
    onChange(text);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      submitUpdate();
    }
  };

  return editing ? (
    <Input
      value={text}
      onChange={handleTextChange}
      onBlur={submitUpdate}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      variation={variation}
    />
  ) : (
    <Text onClick={() => setEditing(true)}>{text}</Text>
  );
}

const OptionForm = (props: { option: OptionType }) => {
  const { option } = props;
  const deleteOption = async () => {
    client.models.Option.delete({ id: option.id });
  };

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <TextOrInput value={option.label ?? ""} onChange={(label) => client.models.Option.update({ id: option.id, label })} variation='quiet' />
      <TextOrInput value={option.content ?? ""} onChange={(content) => client.models.Option.update({ id: option.id, content })} variation='quiet' />
      <Button onClick={deleteOption} style={{ fontSize: "14px" }}>
        ❌️
      </Button>
    </Flex>
  );
}

const QuestionCard = (props: { question: QuestionType }) => {
  const { question } = props;
  const [options, setOptions] = useState<Array<OptionType>>([]);

  useEffect(() => {
    client.models.Option.observeQuery().subscribe({
      next: (data) => setOptions([...data.items.filter((option) => option.questionID === question.id)]),
    });
  }, []);
  
  const createOption = async () => {
    const label = String.fromCharCode(65 + options.length);
    const option = await client.models.Option.create({
      label,
      content: "崑崙山",
      questionID: question.id,
    });
    if (option === null) {
      alert("選択肢の作成に失敗しました。");
    }
  };

  const deleteQuestion = async () => {
    client.models.Question.delete({ id: question.id });
  };

  return (
    <Card key={question.id} padding="1rem" backgroundColor="white" borderRadius="0.5rem" boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)">
      <Flex alignItems="center" justifyContent="space-between" marginBottom="1rem">
        <TextOrInput value={question.content ?? ""} onChange={(content) => client.models.Question.update({ id: question.id, content })} />
        <Button onClick={deleteQuestion}>
          🗑️
        </Button>
      </Flex>
      <Flex direction="column" gap="1rem">
        {options.map((option) => (
          <OptionForm option={option} key={option.id} />
        ))}
      </Flex>
      <Button size="small" onClick={createOption} marginTop="1rem">選択肢を追加</Button>
    </Card>
  );
};

function App() {
  const [questions, setQuestions] = useState<Array<QuestionType>>([]);

  useEffect(() => {
    client.models.Question.observeQuery().subscribe({
      next: (data) => setQuestions([...data.items]),
    });
  }, []);

  async function createQuestion() {
    const question = await client.models.Question.create({
      content: "日本で2番目に高い山は？",
    });
    if (question === null) {
      console.error("問題の作成に失敗しました。");
    }
  }

  return (
    <View padding="2rem">
      <Heading level={1} marginBottom="1rem">Questions</Heading>
      <Flex direction="column" gap="1rem">
        {questions.map((question) => (
          <QuestionCard question={question} key={question.id} />
        ))}
      </Flex>
      <Button onClick={createQuestion} variation="primary" marginTop="1rem">質問を追加</Button>
    </View>
  );
}

export default App;
