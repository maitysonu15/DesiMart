import React from 'react';

export default function CategoryCard({ category, productCount, isActive, onClick }) {
  return (
    <button
      className={`cat-card ${isActive ? 'active' : ''}`}
      onClick={() => onClick(category.name)}
    >
      <div className="emoji">{category.icon}</div>
      <div className="name">{category.name}</div>
      {productCount !== undefined && (
        <div className="count">{productCount} items</div>
      )}
    </button>
  );
}
