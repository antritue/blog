const handler = async (req, res) => {
  await res.revalidate('/');
  return res.send({ revalidate: true });
};
export default handler;
