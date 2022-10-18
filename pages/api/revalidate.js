import { PATH } from '../../constants';
import { GraphQLClient } from 'graphql-request';

import { SLUGS } from '../../utils/graphqlRequest';

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
    await res.revalidate(`/categories/${PATH.life}`);
    await res.revalidate(`/categories/${PATH.career}`);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Error revalidating category');
  }

  // Post
  try {
    console.log(req.body);
    const { posts } = await graphClient.request(SLUGS);
    await Promise.all(
      posts.map(async (post) => await res.revalidate(`/posts/${post.slug}`))
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }

  return res.json({ revalidated: true });
};

export default handler;
