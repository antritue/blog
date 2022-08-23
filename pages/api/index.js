import { gql } from 'graphql-request';

export const blogList = gql`
  {
    posts {
      id
      title
      slug
      coverPhoto {
        url
      }
    }
  }
`;

export const slugList = gql`
  {
    posts {
      slug
    }
  }
`;

export const postDetail = gql`
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
