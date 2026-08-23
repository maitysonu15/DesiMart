import React from 'react';
import { INFO_PAGES } from '../data/infoPages';

export default function InfoPage({ pageKey, navigateTo }) {
  const page = INFO_PAGES[pageKey] || INFO_PAGES.help;

  return (
    <div className="container" style={{ paddingTop: '36px', paddingBottom: '60px' }}>
      <div className="breadcrumb">
        <button onClick={() => navigateTo('home')}>← Back to Home</button>
      </div>

      <div className="info-card">
        <h1>{page.title}</h1>
        <p className="sub" style={{ fontSize: '1.05rem', color: 'var(--ink-dim)', marginBottom: '24px' }}>
          {page.subtitle}
        </p>

        <div
          className="info-body"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </div>
  );
}
