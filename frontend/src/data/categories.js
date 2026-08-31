export const CATEGORIES = [
  { id: 'grocery-staples', name: 'Grocery & Staples', icon: '🛒', description: 'Basmati rice, pulses, oils, flour and cooking essentials' },
  { id: 'fruits-vegetables', name: 'Fruits & Vegetables', icon: '🥦', description: 'Farm-fresh organic fruits, greens and seasonal vegetables' },
  { id: 'dairy-bread-eggs', name: 'Dairy, Bread & Eggs', icon: '🥛', description: 'Fresh milk, paneer, butter, eggs and artisan bread' },
  { id: 'snacks-beverages', name: 'Snacks & Beverages', icon: '🥨', description: 'Namkeen, dry fruits, cold drinks, tea and coffee' },
  { id: 'electronics', name: 'Electronics', icon: '🎧', description: 'Headphones, bluetooth speakers, chargers and accessories' },
  { id: 'mobiles-tablets', name: 'Mobiles & Tablets', icon: '📱', description: '5G smartphones, feature phones and protective cases' },
  { id: 'home-kitchen', name: 'Home & Kitchen', icon: '✨', description: 'Non-stick cookware, LED lamps, bedding and storage' },
  { id: 'large-appliances', name: 'Large Appliances', icon: '⚡', description: 'Electric kettles, hand blenders and kitchen utilities' },
  { id: 'beauty', name: 'Beauty', icon: '💄', description: 'Face wash, hair oils, skincare and cosmetics' },
  { id: 'wellness', name: 'Wellness', icon: '🌿', description: 'Protein powders, Ayurvedic immunity boosters and supplements' },
  { id: 'books', name: 'Books', icon: '📖', description: 'Bestsellers, self-help, journals and literature' },
  { id: 'fashion', name: 'Fashion', icon: '👕', description: 'Kurtas, sarees, ethnic wear and footwear' },
  { id: 'accessories', name: 'Accessories', icon: '👛', description: 'Leather wallets, jewellery and fashion items' }
];

export const CATEGORY_MAP = CATEGORIES.reduce((acc, cat) => {
  acc[cat.name] = cat.icon;
  return acc;
}, {});
