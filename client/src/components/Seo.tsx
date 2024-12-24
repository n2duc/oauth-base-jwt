interface ISeoProps {
  title: string;
  description: string;
}

const Seo = ({ title, description }: ISeoProps) => {
  return (
    <>
      <title>{title}</title>
      <meta name="author" content="n2duc" />
      <meta name="description" content={description} />
    </>
  )
};

export default Seo;