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

export const categoriesList = gql`
  {
    categories {
      id
      slug
      name
    }
  }
`;

export const blogListInCategory = gql`
  query Post($category: String!) {
    posts(where: { category: { name: $category } }) {
      category {
        name
      }
      datePublished
      description
      title
    }
  }
`;
