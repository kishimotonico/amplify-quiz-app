/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAnswer = /* GraphQL */ `
  subscription OnCreateAnswer($filter: ModelSubscriptionAnswerFilterInput) {
    onCreateAnswer(filter: $filter) {
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
export const onCreateOption = /* GraphQL */ `
  subscription OnCreateOption($filter: ModelSubscriptionOptionFilterInput) {
    onCreateOption(filter: $filter) {
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
export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion($filter: ModelSubscriptionQuestionFilterInput) {
    onCreateQuestion(filter: $filter) {
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
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onCreateTodo(filter: $filter) {
      content
      createdAt
      id
      updatedAt
      __typename
    }
  }
`;
export const onDeleteAnswer = /* GraphQL */ `
  subscription OnDeleteAnswer($filter: ModelSubscriptionAnswerFilterInput) {
    onDeleteAnswer(filter: $filter) {
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
export const onDeleteOption = /* GraphQL */ `
  subscription OnDeleteOption($filter: ModelSubscriptionOptionFilterInput) {
    onDeleteOption(filter: $filter) {
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
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion($filter: ModelSubscriptionQuestionFilterInput) {
    onDeleteQuestion(filter: $filter) {
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
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($filter: ModelSubscriptionTodoFilterInput) {
    onDeleteTodo(filter: $filter) {
      content
      createdAt
      id
      updatedAt
      __typename
    }
  }
`;
export const onUpdateAnswer = /* GraphQL */ `
  subscription OnUpdateAnswer($filter: ModelSubscriptionAnswerFilterInput) {
    onUpdateAnswer(filter: $filter) {
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
export const onUpdateOption = /* GraphQL */ `
  subscription OnUpdateOption($filter: ModelSubscriptionOptionFilterInput) {
    onUpdateOption(filter: $filter) {
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
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion($filter: ModelSubscriptionQuestionFilterInput) {
    onUpdateQuestion(filter: $filter) {
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
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onUpdateTodo(filter: $filter) {
      content
      createdAt
      id
      updatedAt
      __typename
    }
  }
`;
