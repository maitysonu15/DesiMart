import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../data/categories';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/common/ProductCard';
import CategoryCard from '../components/common/CategoryCard';

export default function ProductsPage({
  onViewDetails,
  initialCategory = 'all',
  searchQuery = '',
  onSearchChange
}) {
  const { products } = useCart();
  const [search, setSearch] = useState(searchQuery);
  const [selectedCat, setSelectedCat] = useState(initialCategory);
  const [availability, setAvailability] = useState('all');
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    if (initialCategory) setSelectedCat(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery]);

  const handleSearchInput = (e) => {
    const val = e.target.value;
    setSearch(val);
    if (onSearchChange) onSearchChange(val);
  };

  const resetFilters = () => {
    setSearch('');
    if (onSearchChange) onSearchChange('');
    setSelectedCat('all');
    setAvailability('all');
    setSortOption('default');
  };

  let filtered = products.filter((p) => {
    const query = search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query);

    const matchesCat = selectedCat === 'all' || p.category === selectedCat;

    const matchesAvail =
      availability === 'all' ||
      (availability === 'in' ? p.stock > 0 : p.stock === 0);

    return matchesSearch && matchesCat && matchesAvail;
  });

  if (sortOption === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  else if (sortOption === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  else if (sortOption === 'name-asc') filtered.sort((a, b) => a.name.localeCompare(b.name));
  else if (sortOption === 'name-desc') filtered.sort((a, b) => b.name.localeCompare(a.name));

  return (
    <div className="container" style={{ paddingTop: '36px', paddingBottom: '60px' }}>
      <div className="section-head">
        <div>
          <h2>All Marketplace Products</h2>
          <p>Search, filter by category or stock status, and sort to find your products.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <input
          type="search"
          placeholder="Search products, brands, or categories..."
          value={search}
          onChange={handleSearchInput}
        />

        <select
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
        >
          <option value="all">All Categories ({CATEGORIES.length})</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option value="all">All Availability</option>
          <option value="in">In Stock Only</option>
          <option value="out">Out of Stock</option>
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default">Sort: Recommended</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>

        <span className="result-count">
          {filtered.length} product{filtered.length === 1 ? '' : 's'} found
        </span>
      </div>

      {/* Category Rail */}
      <div className="cat-grid" style={{ marginBottom: '28px' }}>
        <button
          className={`cat-card ${selectedCat === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCat('all')}
        >
          <div className="emoji">🛍️</div>
          <div className="name">All Items</div>
        </button>
        {CATEGORIES.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            isActive={selectedCat === cat.name}
            onClick={(name) => setSelectedCat(name)}
          />
        ))}
      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="emoji">🔍</div>
          <h3>No matching products found</h3>
          <p>Try adjusting your search terms or category filters.</p>
          <button className="btn btn-primary" onClick={resetFilters}>
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
}
