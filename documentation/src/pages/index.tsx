import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh'}}>
        <div style={{textAlign: 'center'}}>
          <h1 style={{marginBottom: 8}}>{siteConfig.title}</h1>
          <p style={{marginBottom: 20}}>{siteConfig.tagline}</p>
          <Link className="button button--primary" to="/upload-assets">
            Ir para Upload de Imagens
          </Link>
        </div>
      </main>
    </Layout>
  );
}
