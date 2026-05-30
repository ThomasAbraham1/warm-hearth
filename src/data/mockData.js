/**
 * Warm Hearth – Mock Data
 * Localized Indian home-cooked meal data for the prototype.
 */

export const MOCK_VENDORS = [
  {
    id: 'v1',
    name: 'Shantaben\'s Kitchen',
    location: 'Borivali West',
    rating: 4.9,
    reviewCount: 312,
    tag: 'Gujarati Comfort',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&q=80',
  },
  {
    id: 'v2',
    name: 'Meenakshi Tiffin Centre',
    location: 'T. Nagar, Chennai',
    rating: 4.8,
    reviewCount: 241,
    tag: 'South Indian Daily',
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=600&q=80',
  },
  {
    id: 'v3',
    name: 'Pushpa Didi\'s Dabba',
    location: 'Rajouri Garden, Delhi',
    rating: 4.7,
    reviewCount: 178,
    tag: 'North Indian Home Style',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80',
  },
];

export const MOCK_MEALS = [
  {
    id: 'm1',
    vendorId: 'v2',
    vendorName: 'Meenakshi Tiffin Centre',
    name: 'Soft Idlis with Mild Sambar',
    description: 'Four pillowy steamed idlis paired with a lightly spiced, thin sambar. Easy to chew, gentle on digestion.',
    price: 80,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80',
    chips: ['Low Sodium', 'Soft Chew', 'Diabetic Friendly'],
    chipColors: ['#506446', '#9d3d1e', '#4a6b8a'],
    mealTime: 'Breakfast / Lunch',
  },
  {
    id: 'm2',
    vendorId: 'v1',
    vendorName: "Shantaben's Kitchen",
    name: 'Methi Thepla with Plain Curd',
    description: 'Soft whole-wheat flatbreads enriched with fresh fenugreek, served with chilled plain curd. No pickle, gentle spice.',
    price: 90,
    image: 'https://images.unsplash.com/photo-1627308595171-d1b5d67129c4?w=600&q=80',
    chips: ['High Fibre', 'Soft Chew', 'Bone Health'],
    chipColors: ['#506446', '#9d3d1e', '#7a5c3e'],
    mealTime: 'Breakfast / Snack',
  },
  {
    id: 'm3',
    vendorId: 'v1',
    vendorName: "Shantaben's Kitchen",
    name: 'Moong Dal Khichdi',
    description: 'A one-pot comforting dish of yellow moong lentils and soft rice, seasoned with cumin and a touch of ghee.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&q=80',
    chips: ['Low Sodium', 'Easy Digest', 'Diabetic Friendly'],
    chipColors: ['#506446', '#7a5c3e', '#4a6b8a'],
    mealTime: 'Lunch / Dinner',
  },
  {
    id: 'm4',
    vendorId: 'v2',
    vendorName: 'Meenakshi Tiffin Centre',
    name: 'Rasam & Mashable Rice',
    description: 'Thin, warming tomato rasam served with well-cooked soft rice. Highly digestible and deeply comforting.',
    price: 100,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80',
    chips: ['Easy Digest', 'Low Fat', 'Soft Chew'],
    chipColors: ['#7a5c3e', '#506446', '#9d3d1e'],
    mealTime: 'Lunch / Dinner',
  },
  {
    id: 'm5',
    vendorId: 'v3',
    vendorName: "Pushpa Didi's Dabba",
    name: 'Lauki Dal with Soft Rotis',
    description: 'Bottle gourd cooked in toor dal, mildly spiced. Served with 3 soft hand-rolled wheat rotis.',
    price: 130,
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80',
    chips: ['Low Sodium', 'Heart Healthy', 'Diabetic Friendly'],
    chipColors: ['#506446', '#4a6b8a', '#9d3d1e'],
    mealTime: 'Lunch / Dinner',
  },
  {
    id: 'm6',
    vendorId: 'v3',
    vendorName: "Pushpa Didi's Dabba",
    name: 'Sabudana Khichdi (Mild)',
    description: 'Light and energising pearl sago stir-fried with peanuts and green chilli (minimal). Easy to eat.',
    price: 85,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80',
    chips: ['Gluten Free', 'Soft Chew', 'Easy Digest'],
    chipColors: ['#4a6b8a', '#9d3d1e', '#7a5c3e'],
    mealTime: 'Breakfast / Snack',
  },
];

export const DELIVERY_TIMES = [
  'Breakfast – 8:00 AM',
  'Breakfast – 9:30 AM',
  'Lunch – 12:00 PM',
  'Lunch – 12:30 PM',
  'Lunch – 1:00 PM',
  'Dinner – 7:00 PM',
  'Dinner – 7:30 PM',
  'Dinner – 8:00 PM',
];

export const SERVICE_PINCODES = [
  '400001', '400092', '400066', '400091', '400064',
  '600017', '600014', '600035', '600040',
  '110027', '110031', '110058', '110047',
  '560001', '560011', '560038',
  '411001', '411014', '411030',
];
