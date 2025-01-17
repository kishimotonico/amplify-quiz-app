import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Question: a
    .model({
      id: a.id().required(),
      label: a.string(),        // "Q1", "Q2", "Q3", ....
      content: a.string(),      // "日本で2番目に高い山は？"
      options: a.hasMany("Option", "questionID"),
      progressions: a.hasMany("Progression", "questionID"),
    })
    .authorization((allow) => [allow.publicApiKey()]),
  Option: a
    .model({
      id: a.id().required(),
      label: a.string(),        // "A", "B", "C", ....
      title: a.string(),        // "ほげ山"
      content: a.string(),      // "ほげ山"
      correct: a.boolean(),     // false
      questionID: a.id().required(),
      question: a.belongsTo("Question", "questionID"),
      answers: a.hasMany("Answer", "optionID"),
    })
    .authorization((allow) => [allow.publicApiKey()]),
  Answer: a
    .model({
      id: a.id().required(),
      createdAt: a.datetime(),
      optionID: a.id().required(),
      option: a.belongsTo("Option", "optionID"),
      userID: a.id().required(),
      user: a.belongsTo("User", "userID"),
    })
    .authorization((allow) => [allow.publicApiKey()]),
  User: a
    .model({
      id: a.id().required(),
      name: a.string(),
      answers: a.hasMany("Answer", "userID"),
    })
    .authorization((allow) => [allow.publicApiKey()]),
  Progression: a
    .model({
      id: a.id().required(),
      state: a.enum([
        "in_progress",  // 問題が投票中
        "closeup",      // 回答受付を終了
        "finished",     // 問題終了（答え合わせ）
        "last_result",  // 最終結果
      ]),
      createdAt: a.datetime(),
      questionID: a.id(),
      question: a.belongsTo("Question", "questionID"),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
