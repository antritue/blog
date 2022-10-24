import { GraphQLClient } from 'graphql-request';

import { CATEGORIES } from '../../utils/graphqlRequest';

const graphClient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_API);

const handler = async (req, res) => {
  if (req.query.secret !== process.env.NEXT_PUBLIC_REVALIDATE_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Home page
  try {
    await res.revalidate('/');
  } catch (err) {
    console.log(err);
    return res.status(500).send('Error revalidating homepage');
  }

  // Category
  try {
    const { categories } = await graphClient.request(CATEGORIES);
    await Promise.all(
      categories.map(
        async (item) => await res.revalidate(`/categories/${item.slug}`)
      )
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send('Error revalidating category');
  }

  // Post
  if (req.query.path) {
    try {
      await res.revalidate(`/posts/${req.query.path}`);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err.message);
    }
  }

  return res.json({ revalidated: true });
};

export default handler;
