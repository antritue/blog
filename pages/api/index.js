import { gql } from 'graphql-request';

export const LATEST_POSTS = gql`
  query LatestPost {
    posts(orderBy: datePublished_DESC, first: 5) {
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
      orderBy: datePublished_DESC
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
      datePublished
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

export const POSTS_IN_CATEGORY = gql`
  query PostsByCategory($slug: String!, $skip: Int) {
    postsConnection(
      where: { category: { slug: $slug } }
      orderBy: datePublished_DESC
      first: 3
      skip: $skip
    ) {
      edges {
        node {
          category {
            name
          }
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
  query Author {
    author(where: { id: "cl8ah3w6fctz60c1aqqlwqy2c" }) {
      id
      info {
        html
      }
      keywords
      description
      title
    }
  }
`;
