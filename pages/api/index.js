import { gql } from 'graphql-request';

export const POSTS = gql`
  query Posts($skip: Int) {
    postsConnection(orderBy: datePublished_DESC, first: 3, skip: $skip) {
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
