import { useState } from 'react';
import { CATEGORIES } from '../data/categories';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/common/ProductCard';

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

  const activeCategory = selectedCat !== 'all' ? selectedCat : initialCategory;
  const activeSearch = search !== '' ? search : searchQuery;

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
    const query = activeSearch.trim().toLowerCase();
    const matchesSearch =
      !query ||
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query);

    const matchesCat = activeCategory === 'all' || p.category === activeCategory;

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
      {/* Section Heading matching mockup */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
          All Products
        </h2>
        <p style={{ color: '#64748B', fontSize: '0.95rem' }}>
          Search, filter and sort to find exactly what you need.
        </p>
      </div>

      {/* Single White Filter Card Toolbar matching mockup */}
      <div className="products-toolbar-card">
        <input
          type="search"
          className="products-search-input"
          placeholder="Search products..."
          value={search}
          onChange={handleSearchInput}
        />

        <select
          className="products-select-pill"
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          className="products-select-pill"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option value="all">All Availability</option>
          <option value="in">In Stock Only</option>
          <option value="out">Out of Stock</option>
        </select>

        <select
          className="products-select-pill"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>

        <span className="products-count-text">
          {filtered.length} product{filtered.length === 1 ? '' : 's'} found
        </span>
      </div>

      {/* Category Cards Grid matching mockup */}
      <div className="cat-grid-scroll">
        <button
          className={`cat-card-v2 ${selectedCat === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCat('all')}
        >
          <div className="cat-card-emoji">🛍️</div>
          <div className="cat-card-name">All Items</div>
        </button>

        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`cat-card-v2 ${selectedCat === cat.name ? 'active' : ''}`}
            onClick={() => setSelectedCat(cat.name)}
          >
            <div className="cat-card-emoji">{cat.icon}</div>
            <div className="cat-card-name">{cat.name}</div>
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div className="empty-state" style={{ background: '#FFFFFF', padding: '50px 20px', borderRadius: '16px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🔍</div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>No matching products found</h3>
          <p style={{ color: '#64748B', marginBottom: '20px' }}>Try adjusting your search terms or category filters.</p>
          <button className="auth-submit-btn" style={{ maxWidth: '200px' }} onClick={resetFilters}>
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
