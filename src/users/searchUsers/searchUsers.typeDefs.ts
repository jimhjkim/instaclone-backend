import { gql } from 'apollo-server-express';

export default gql`
    searchUsers(keyword: String!, lastId: Int): [User]!
`;
