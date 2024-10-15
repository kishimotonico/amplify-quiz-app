import { useEffect, useRef, useState } from 'react';
import { View, Heading, Button, Flex, Text, Card, Input, ButtonGroup } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { sortOptionsByLabel } from '../logic/option';
import { sortQuestionsByLabel } from '../logic/question';

const client = generateClient<Schema>();

type QuestionType = Schema["Question"]["type"];
type OptionType = Schema["Option"]["type"];

const TextOrInput = (props: {
  value: string,
  onChange: (value: string) => void,
  placeholder?: string,
  variation?: "quiet",
  style?: React.CSSProperties,
}) => {
  const { value, onChange, placeholder, variation, style } = props;
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const startEdit = () => {
    setEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  return editing ? (
    <Input
      value={text}
      onChange={handleTextChange}
      onBlur={submitUpdate}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      variation={variation}
      ref={inputRef}
        style={style}
      />
  ) : (
    <Text onClick={startEdit} style={{
      cursor: "pointer",
      ...style,
    }}>
      {text || "_"}
    </Text>
  );
}

const OptionForm = (props: { option: OptionType }) => {
  const { option } = props;
  const deleteOption = async () => {
    client.models.Option.delete({ id: option.id });
  };
  const toggleCorrect = async () => {
    client.models.Option.update({ id: option.id, correct: !option.correct });
  }

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <TextOrInput
        value={option.label ?? ""}
        onChange={(label) => client.models.Option.update({ id: option.id, label })}
        placeholder='A'
        style={{ flexGrow: 0 }}
      />
      <TextOrInput
        value={option.title ?? ""}
        onChange={(title) => client.models.Option.update({ id: option.id, title })}
        placeholder='短い選択肢名'
        style={{ flexGrow: 1 }}
      />
      <TextOrInput
        value={option.content ?? ""}
        onChange={(content) => client.models.Option.update({ id: option.id, content })}
        placeholder='詳しい内容'
          style={{ flexGrow: 2 }}
      />
      <ButtonGroup>
        <Button onClick={toggleCorrect} style={{ fontSize: "14px" }}>
          {option.correct ? "⭕️" : "❌️"}
        </Button>
        <Button onClick={deleteOption} style={{ fontSize: "14px" }}>
          🗑️
        </Button>
      </ButtonGroup>
    </Flex>
  );
}

const QuestionCard = (props: { question: QuestionType }) => {
  const { question } = props;
  const [options, setOptions] = useState<Array<OptionType>>([]);

  useEffect(() => {
    client.models.Option.observeQuery({
      filter: { questionID: { eq: question.id } },
    }).subscribe({
      next: (data) => setOptions(sortOptionsByLabel([...data.items])),
    });
  }, []);

  const createOption = async () => {
    const label = String.fromCharCode(65 + options.length);
    const option = await client.models.Option.create({
      label,
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
        <TextOrInput
          value={question.label ?? ""}
          onChange={(label) => client.models.Question.update({ id: question.id, label })}
          placeholder="Q1."
        />
        <TextOrInput
          value={question.content ?? ""}
          onChange={(content) => client.models.Question.update({ id: question.id, content })}
          placeholder="日本で2番目に高い山は？"
        />
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

export const EditPage = () => {
  const [questions, setQuestions] = useState<Array<QuestionType>>([]);

  useEffect(() => {
    client.models.Question.observeQuery().subscribe({
      next: (data) => setQuestions(sortQuestionsByLabel([...data.items])),
    });
  }, []);

  async function createQuestion() {
    const question = await client.models.Question.create({});
    if (question === null) {
      console.error("問題の作成に失敗しました。");
    }
  }

  return (
    <View padding="2rem">
      <Heading level={1} marginBottom="1rem">
        申し訳程度の編集画面
      </Heading>
      <Flex direction="column" gap="1rem">
        {questions.map((question) => (
          <QuestionCard question={question} key={question.id} />
        ))}
      </Flex>
      <Button onClick={createQuestion} variation="primary" marginTop="1rem">質問を追加</Button>
    </View>
  );
};
