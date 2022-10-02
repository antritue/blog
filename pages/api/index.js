import { gql } from 'graphql-request';

export const LATEST_POSTS = gql`
  query LatestPost {
    posts(orderBy: createdAt_DESC, first: 5) {
      id
      title
      slug
      coverPhoto {
        url
      }
    }
  }
`;

export const LATEST_POSTS_BY_CATEGORY = gql`
  query LatestPost($slug: String) {
    posts(
      orderBy: createdAt_DESC
      first: 5
      where: { category: { slug: $slug } }
    ) {
      id
      title
      slug
      coverPhoto {
        url
      }
    }
  }
`;

export const SLUGS = gql`
  {
    posts {
      slug
    }
  }
`;

export const POST_DETAIL = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      description
      title
      slug
      keywords
      createdAt
      author {
        name
        avatar {
          url
        }
      }
      content {
        html
      }
      coverPhoto {
        url
      }
      alt
    }
  }
`;

export const CATEGORIES = gql`
  query Categories {
    categories {
      slug
    }
  }
`;

export const CATEGORY = gql`
  query Category($slug: String!) {
    category(where: { slug: $slug }) {
      slug
      name
      description
    }
  }
`;

export const POSTS_IN_CATEGORY = gql`
  query PostsByCategory($slug: String!, $skip: Int) {
    postsConnection(
      where: { category: { slug: $slug } }
      orderBy: createdAt_DESC
      first: 3
      skip: $skip
    ) {
      edges {
        node {
          id
          title
          slug
          coverPhoto {
            url
          }
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

export const AUTHOR = gql`
  query Author($id: ID) {
    author(where: { id: $id }) {
      id
      info {
        html
      }
      description
      title
    }
  }
`;
