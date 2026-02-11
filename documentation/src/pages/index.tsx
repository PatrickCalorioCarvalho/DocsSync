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
          <div style={{display: 'flex', gap: '30px', justifyContent: 'center'}}>
            <Link
              className="card"
              to="/docs/intro"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '40px',
                textDecoration: 'none',
                border: '2px solid #4CAF50',
                borderRadius: '12px',
                boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                backgroundColor: 'transparent',
                color: '#4CAF50',
                width: '200px',
                height: '150px',
                textAlign: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.15)';
              }}
            >
              <h3>Documentations</h3>
            </Link>
            <Link
              className="card"
              to="/upload-assets"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '40px',
                textDecoration: 'none',
                border: '2px solid #2196F3',
                borderRadius: '12px',
                boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                backgroundColor: 'transparent',
                color: '#2196F3',
                width: '200px',
                height: '150px',
                textAlign: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.15)';
              }}
            >
              <h3>Assets</h3>
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
