/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAnswer = /* GraphQL */ `
  mutation CreateAnswer(
    $condition: ModelAnswerConditionInput
    $input: CreateAnswerInput!
  ) {
    createAnswer(condition: $condition, input: $input) {
      createdAt
      id
      option {
        content
        createdAt
        id
        label
        questionID
        updatedAt
        __typename
      }
      optionID
      updatedAt
      __typename
    }
  }
`;
export const createOption = /* GraphQL */ `
  mutation CreateOption(
    $condition: ModelOptionConditionInput
    $input: CreateOptionInput!
  ) {
    createOption(condition: $condition, input: $input) {
      answers {
        nextToken
        __typename
      }
      content
      createdAt
      id
      label
      question {
        content
        createdAt
        id
        updatedAt
        __typename
      }
      questionID
      updatedAt
      __typename
    }
  }
`;
export const createQuestion = /* GraphQL */ `
  mutation CreateQuestion(
    $condition: ModelQuestionConditionInput
    $input: CreateQuestionInput!
  ) {
    createQuestion(condition: $condition, input: $input) {
      content
      createdAt
      id
      options {
        nextToken
        __typename
      }
      updatedAt
      __typename
    }
  }
`;
export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $condition: ModelTodoConditionInput
    $input: CreateTodoInput!
  ) {
    createTodo(condition: $condition, input: $input) {
      content
      createdAt
      id
      updatedAt
      __typename
    }
  }
`;
export const deleteAnswer = /* GraphQL */ `
  mutation DeleteAnswer(
    $condition: ModelAnswerConditionInput
    $input: DeleteAnswerInput!
  ) {
    deleteAnswer(condition: $condition, input: $input) {
      createdAt
      id
      option {
        content
        createdAt
        id
        label
        questionID
        updatedAt
        __typename
      }
      optionID
      updatedAt
      __typename
    }
  }
`;
export const deleteOption = /* GraphQL */ `
  mutation DeleteOption(
    $condition: ModelOptionConditionInput
    $input: DeleteOptionInput!
  ) {
    deleteOption(condition: $condition, input: $input) {
      answers {
        nextToken
        __typename
      }
      content
      createdAt
      id
      label
      question {
        content
        createdAt
        id
        updatedAt
        __typename
      }
      questionID
      updatedAt
      __typename
    }
  }
`;
export const deleteQuestion = /* GraphQL */ `
  mutation DeleteQuestion(
    $condition: ModelQuestionConditionInput
    $input: DeleteQuestionInput!
  ) {
    deleteQuestion(condition: $condition, input: $input) {
      content
      createdAt
      id
      options {
        nextToken
        __typename
      }
      updatedAt
      __typename
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $condition: ModelTodoConditionInput
    $input: DeleteTodoInput!
  ) {
    deleteTodo(condition: $condition, input: $input) {
      content
      createdAt
      id
      updatedAt
      __typename
    }
  }
`;
export const updateAnswer = /* GraphQL */ `
  mutation UpdateAnswer(
    $condition: ModelAnswerConditionInput
    $input: UpdateAnswerInput!
  ) {
    updateAnswer(condition: $condition, input: $input) {
      createdAt
      id
      option {
        content
        createdAt
        id
        label
        questionID
        updatedAt
        __typename
      }
      optionID
      updatedAt
      __typename
    }
  }
`;
export const updateOption = /* GraphQL */ `
  mutation UpdateOption(
    $condition: ModelOptionConditionInput
    $input: UpdateOptionInput!
  ) {
    updateOption(condition: $condition, input: $input) {
      answers {
        nextToken
        __typename
      }
      content
      createdAt
      id
      label
      question {
        content
        createdAt
        id
        updatedAt
        __typename
      }
      questionID
      updatedAt
      __typename
    }
  }
`;
export const updateQuestion = /* GraphQL */ `
  mutation UpdateQuestion(
    $condition: ModelQuestionConditionInput
    $input: UpdateQuestionInput!
  ) {
    updateQuestion(condition: $condition, input: $input) {
      content
      createdAt
      id
      options {
        nextToken
        __typename
      }
      updatedAt
      __typename
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $condition: ModelTodoConditionInput
    $input: UpdateTodoInput!
  ) {
    updateTodo(condition: $condition, input: $input) {
      content
      createdAt
      id
      updatedAt
      __typename
    }
  }
`;
