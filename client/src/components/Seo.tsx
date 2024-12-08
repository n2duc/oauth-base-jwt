import { Helmet } from 'react-helmet-async';

interface ISeoProps {
  title: string;
  description: string;
}

const Seo = ({ title, description }: ISeoProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  )
};

export default Seo;