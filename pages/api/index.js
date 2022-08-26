import { gql } from 'graphql-request';

export const blogList = gql`
  {
    posts(orderBy: datePublished_DESC) {
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
  query Post($slug: String!) {
    posts(where: { category: { slug: $slug } }, orderBy: datePublished_DESC) {
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
`;
