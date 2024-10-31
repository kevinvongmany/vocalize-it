const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    savedClips: [Clip]!
    clipCount: Int
  }

  type Clip {
    _id: ID!
    title: String!
    description: String
    userId: ID!
    duration: Int!
    audioUrl: String!
    format: String!
    createdAt: String!
    tags: [String]
  }

  input SavedClipInput {
    title: String!
    description: String
    userId: ID!
    duration: Int!
    audioUrl: String!
    format: String!
    tags: [String]
  }

  type Query {
    users: [User]!
    user(username: String!): User
    me: User
    searchClips(query: String!): [Clip]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeClip(clipId: ID!): User
    saveClip(input: SavedClipInput!): User
  }

  type Auth {
    token: String
    user: User
  }
`;

module.exports = typeDefs;