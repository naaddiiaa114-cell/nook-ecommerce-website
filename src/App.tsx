import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight, Heart, Minus, Plus,
  Search, ShoppingBag, Star, Truck, X, Menu, Leaf, Sparkles, SlidersHorizontal
} from 'lucide-react';

type Product = {
  id: number; name: string; category: string; price: number; oldPrice?: number;
  rating: number; reviews: number; image: string; description: string; badge?: string;
};
type CartItem = Product & { quantity: number };

const P = 'https://images.pexels.com/photos/';
const img = (id: string, ext = 'jpeg') => `${P}${id}/pexels-photo-${id}.${ext}?auto=compress&cs=tinysrgb&h=650&w=940`;

const images = {
  home: [
    img('29378867'), img('29904622'), img('19884207', 'png'), img('39199681'),
    img('2611817'), img('5556176'), img('29463558'), img('17840023'),
    img('9523640'), img('31213891'), img('18273385'), img('18273390'),
    img('9440473'), img('18273376'), img('37817349'),
  ],
  beauty: [
    img('38822007'), img('36339062'), img('39281912'), img('33525723'),
    img('3750640'), img('4841534'), img('4841273'), img('4841328'),
    img('28482020'), img('18441533'), img('6634844'), img('33538456', 'png'),
    img('33538457', 'png'), img('11124449'), img('39281882'), img('33538415', 'png'),
    img('33537356', 'png'), img('33537352', 'png'),
  ],
  style: [
    img('26925267'), img('13094187'), img('27204277'), img('19869755'),
    img('27298278'), img('27141838'), img('27141837'), img('34976481'),
    img('27127410'), img('27127411'), img('27008317'), img('27035625'),
    img('27204279'), img('27204268'), img('27256473'), img('26975778'),
    img('27503507', 'png'), img('27113450'),
  ],
  tech: [
    img('4533076'), img('3568521'), img('31410610'), img('29283981'),
    img('3394650'), img('4765366'), img('8346914'), img('38986380'),
    img('2659939'), img('38986382'), img('62689'), img('38986383'),
    img('13509190'), img('8891159'), img('20140155'), img('9635171'),
  ],
};

const products: Product[] = [
  { id: 1, name: 'Luna Stoneware Teapot', category: 'Home & Living', price: 68, oldPrice: 84, rating: 4.9, reviews: 128, image: images.home[0], badge: 'Bestseller', description: 'A quiet morning essential in hand-finished stoneware with a smooth matte glaze.' },
  { id: 2, name: 'Aalto Sculptural Vase', category: 'Home & Living', price: 54, rating: 4.8, reviews: 76, image: images.home[1], description: 'Sculptural lines and a soft clay finish give your space an effortless focal point.' },
  { id: 3, name: 'Arc Ceramic Collection', category: 'Home & Living', price: 96, oldPrice: 120, rating: 4.7, reviews: 42, image: images.home[2], badge: 'New', description: 'A considered set of artisan ceramics made for slow dinners and long conversations.' },
  { id: 4, name: 'Meadow Pitcher', category: 'Home & Living', price: 48, rating: 4.9, reviews: 93, image: images.home[3], description: 'A charming vintage-inspired pitcher that makes even everyday flowers feel special.' },
  { id: 5, name: 'Bianca Marble Plate', category: 'Home & Living', price: 38, rating: 4.7, reviews: 61, image: images.home[4], description: 'A minimalist white ceramic plate that turns every meal into a small celebration.' },
  { id: 6, name: 'Hearth Open Shelving', category: 'Home & Living', price: 142, rating: 4.6, reviews: 19, image: images.home[5], badge: "Editor's Pick", description: 'Warm, open shelving that gives your kitchen a curated, lived-in feel.' },
  { id: 7, name: 'Garden Spice Grinder', category: 'Home & Living', price: 34, oldPrice: 44, rating: 4.8, reviews: 87, image: images.home[6], description: 'A rustic hand-cranked grinder for fresh spices and pepper at the table.' },
  { id: 8, name: 'Sunrise Citrus Bowl', category: 'Home & Living', price: 28, rating: 4.9, reviews: 112, image: images.home[7], description: 'A bright, playful bowl that makes morning fruit feel like a small ritual.' },
  { id: 9, name: 'Candlelight Table Set', category: 'Home & Living', price: 72, oldPrice: 89, rating: 4.7, reviews: 34, image: images.home[8], badge: 'Set of 4', description: 'An elegant table setting with a warm candle centerpiece for memorable evenings.' },
  { id: 10, name: 'Nordic Living Room Edit', category: 'Home & Living', price: 198, rating: 4.8, reviews: 23, image: images.home[9], description: 'A complete Scandinavian-inspired living room refresh in calm, neutral tones.' },
  { id: 11, name: 'Bloom Floral Teapot Set', category: 'Home & Living', price: 64, rating: 4.9, reviews: 95, image: images.home[10], badge: 'Bestseller', description: 'A delicate floral teapot with matching cups for afternoon tea, beautifully gift-boxed.' },
  { id: 12, name: 'Heritage Porcelain Tea Set', category: 'Home & Living', price: 89, oldPrice: 110, rating: 4.7, reviews: 48, image: images.home[11], description: 'A timeless porcelain tea set with a hand-painted floral design.' },
  { id: 13, name: 'Terra Colored Bowl Set', category: 'Home & Living', price: 52, rating: 4.8, reviews: 73, image: images.home[12], badge: 'Set of 6', description: 'A warm, earthy set of ceramic bowls that brings color to every table.' },
  { id: 14, name: 'Garden Party Tableware', category: 'Home & Living', price: 76, rating: 4.6, reviews: 31, image: images.home[13], description: 'A charming floral tableware set with a teapot, cups, and decorative tray.' },
  { id: 15, name: 'Modern Dining Room Edit', category: 'Home & Living', price: 215, oldPrice: 260, rating: 4.7, reviews: 12, image: images.home[14], description: 'A stylish dining room collection with modern furniture and fresh green accents.' },

  { id: 16, name: 'Night Bloom Serum', category: 'Beauty & Care', price: 42, oldPrice: 55, rating: 4.9, reviews: 214, image: images.beauty[0], badge: '20% Off', description: 'A replenishing overnight serum powered by niacinamide and rosehip oil.' },
  { id: 17, name: 'Cloud Cream Ritual', category: 'Beauty & Care', price: 36, rating: 4.8, reviews: 108, image: images.beauty[1], description: 'Whipped, weightless hydration for skin that feels as good as it looks.' },
  { id: 18, name: 'Daily Glow Set', category: 'Beauty & Care', price: 58, rating: 4.7, reviews: 88, image: images.beauty[2], badge: 'Set of 3', description: 'Your simple three-step ritual for a fresh, naturally luminous complexion.' },
  { id: 19, name: 'Silk + Sage Hair Pair', category: 'Beauty & Care', price: 44, oldPrice: 52, rating: 4.8, reviews: 65, image: images.beauty[3], description: 'Nourishing shampoo and conditioner with a clean, calming botanical scent.' },
  { id: 20, name: 'Velvet Hour Makeup Kit', category: 'Beauty & Care', price: 68, rating: 4.7, reviews: 92, image: images.beauty[4], badge: 'Bestseller', description: 'A sophisticated makeup and perfume collection for an effortless evening look.' },
  { id: 21, name: 'Earth Skincare Bundle', category: 'Beauty & Care', price: 48, rating: 4.9, reviews: 134, image: images.beauty[5], description: 'Eco-friendly skincare in natural packaging, kind to your skin and the planet.' },
  { id: 22, name: 'Stone Glow Essentials', category: 'Beauty & Care', price: 55, oldPrice: 70, rating: 4.8, reviews: 71, image: images.beauty[6], description: 'High-end skincare with cooling stones for a spa-quality routine at home.' },
  { id: 23, name: 'Botanical Face Tray', category: 'Beauty & Care', price: 39, rating: 4.7, reviews: 56, image: images.beauty[7], description: 'A round tray of natural skincare with botanical extracts for daily radiance.' },
  { id: 24, name: 'Pure Elements Flat Lay', category: 'Beauty & Care', price: 45, rating: 4.8, reviews: 83, image: images.beauty[8], badge: 'New', description: 'A curated set of skincare essentials with natural elements on soft white fabric.' },
  { id: 25, name: 'Charcoal Detox Mask', category: 'Beauty & Care', price: 32, oldPrice: 42, rating: 4.7, reviews: 119, image: images.beauty[9], description: 'A purifying charcoal mask with cucumber soap and essential oils for deep clean skin.' },
  { id: 26, name: 'Spa Day Jade Roller', category: 'Beauty & Care', price: 38, rating: 4.9, reviews: 156, image: images.beauty[10], badge: 'Bestseller', description: 'A calming jade roller and bath salt set for a serene at-home spa experience.' },
  { id: 27, name: 'White Glow Skincare Set', category: 'Beauty & Care', price: 62, rating: 4.6, reviews: 44, image: images.beauty[11], description: 'A complete set of creams, face wash, and serum in sleek modern packaging.' },
  { id: 28, name: 'Hydra Toner Duo', category: 'Beauty & Care', price: 41, oldPrice: 50, rating: 4.8, reviews: 67, image: images.beauty[12], description: 'A toner and face wash duo designed to balance and refresh in two simple steps.' },
  { id: 29, name: 'Pastel Oil Collection', category: 'Beauty & Care', price: 54, rating: 4.7, reviews: 38, image: images.beauty[13], badge: 'New', description: 'A colorful collection of skincare oils and creams on dreamy pastel backgrounds.' },
  { id: 30, name: 'Natural Light Serum', category: 'Beauty & Care', price: 46, rating: 4.9, reviews: 91, image: images.beauty[14], description: 'A stylish serum arrangement that catches the natural light for your morning routine.' },
  { id: 31, name: 'Minimalist Skin Edit', category: 'Beauty & Care', price: 50, oldPrice: 65, rating: 4.8, reviews: 52, image: images.beauty[15], description: 'A minimalist skincare set displayed with a decorative vase for beauty and wellness.' },
  { id: 32, name: 'Floral Body Lotion', category: 'Beauty & Care', price: 34, rating: 4.7, reviews: 78, image: images.beauty[16], description: 'An elegant body lotion with a light floral fragrance for soft, nourished skin.' },
  { id: 33, name: 'Daily Care Tubes', category: 'Beauty & Care', price: 29, rating: 4.6, reviews: 64, image: images.beauty[17], badge: 'Set of 3', description: 'Three vibrant lotion tubes for everyday care in red, blue, and white.' },

  { id: 34, name: 'Sienna Slide Sandals', category: 'Style & Accessories', price: 74, rating: 4.8, reviews: 54, image: images.style[0], description: 'An easy leather slide with a sculpted footbed made for everyday movement.' },
  { id: 35, name: 'Essential Cotton Shirt', category: 'Style & Accessories', price: 62, oldPrice: 78, rating: 4.9, reviews: 141, image: images.style[1], badge: 'Best Seller', description: 'The softly structured shirt that anchors every wardrobe.' },
  { id: 36, name: 'Cove Leather Tote', category: 'Style & Accessories', price: 124, rating: 4.9, reviews: 39, image: images.style[2], description: 'A roomy, buttery leather tote designed to carry your day beautifully.' },
  { id: 37, name: 'Carmine Mini Bag', category: 'Style & Accessories', price: 88, rating: 4.6, reviews: 27, image: images.style[3], description: 'A confident pop of color with just enough room for the essentials.' },
  { id: 38, name: 'Terra Knee Boots', category: 'Style & Accessories', price: 168, oldPrice: 210, rating: 4.8, reviews: 33, image: images.style[4], badge: 'New', description: 'Brown leather knee-high boots paired with a chic white handbag for autumn days.' },
  { id: 39, name: 'Studio Leather Boots', category: 'Style & Accessories', price: 155, rating: 4.7, reviews: 41, image: images.style[5], description: 'Knee-high leather boots with a matching handbag, styled for the studio.' },
  { id: 40, name: 'Cream Leather Boot Set', category: 'Style & Accessories', price: 148, oldPrice: 185, rating: 4.8, reviews: 22, image: images.style[6], description: 'Cream leather knee-high boots with a matching bag on a bold red backdrop.' },
  { id: 41, name: 'Citrus Day Flat Lay', category: 'Style & Accessories', price: 56, rating: 4.6, reviews: 48, image: images.style[7], badge: 'Set', description: 'A chic flat lay with an orange handbag, sunglasses, lipstick, and jewelry.' },
  { id: 42, name: 'Olive Designer Handbag', category: 'Style & Accessories', price: 132, rating: 4.9, reviews: 36, image: images.style[8], description: 'An olive designer handbag that highlights elegance and effortless style.' },
  { id: 43, name: 'Beige Carry Handbag', category: 'Style & Accessories', price: 98, oldPrice: 120, rating: 4.7, reviews: 51, image: images.style[9], description: 'A timeless brown handbag against a warm beige backdrop for everyday carry.' },
  { id: 44, name: 'Studio Heels + Bag', category: 'Style & Accessories', price: 115, rating: 4.8, reviews: 29, image: images.style[10], description: 'A brown leather bag and heels set styled for a confident studio look.' },
  { id: 45, name: 'Noir Heels + Handbag', category: 'Style & Accessories', price: 108, oldPrice: 135, rating: 4.7, reviews: 37, image: images.style[11], badge: 'Bestseller', description: 'Sleek black heels with a matching leather handbag for evening wear.' },
  { id: 46, name: 'Platform Ankle Boots', category: 'Style & Accessories', price: 142, rating: 4.8, reviews: 24, image: images.style[12], description: 'Black leather platform ankle boots paired with a bold red handbag.' },
  { id: 47, name: 'Modern Black Heels', category: 'Style & Accessories', price: 96, rating: 4.6, reviews: 43, image: images.style[13], description: 'Chic black heels and a handbag in a clean, modern setting.' },
  { id: 48, name: 'Heritage Ankle Boots', category: 'Style & Accessories', price: 128, oldPrice: 160, rating: 4.9, reviews: 58, image: images.style[14], badge: 'New', description: 'Brown leather ankle boots with high heels, displayed on white pedestals.' },
  { id: 49, name: 'Rose Stiletto', category: 'Style & Accessories', price: 84, rating: 4.7, reviews: 46, image: images.style[15], description: 'A striking red high heel that adds a bold finish to any outfit.' },
  { id: 50, name: 'Crimson Collection', category: 'Style & Accessories', price: 175, rating: 4.8, reviews: 18, image: images.style[16], badge: "Editor's Pick", description: 'An elegant collection of red leather bag, shoes, and matching accessories.' },
  { id: 51, name: 'Azure Heels', category: 'Style & Accessories', price: 92, oldPrice: 115, rating: 4.6, reviews: 31, image: images.style[17], description: 'Stylish blue high heels on a textured blue studio background.' },

  { id: 52, name: 'Studio Desk Edit', category: 'Tech & Workspace', price: 145, oldPrice: 180, rating: 4.7, reviews: 48, image: images.tech[0], badge: "Editor's Pick", description: 'A focused little collection for a calmer, more capable workspace.' },
  { id: 53, name: 'Everyday Desk Kit', category: 'Tech & Workspace', price: 92, rating: 4.8, reviews: 62, image: images.tech[1], description: 'Thoughtful tools and textures to make your workday feel more intentional.' },
  { id: 54, name: 'Oak Halo Lamp', category: 'Tech & Workspace', price: 79, rating: 4.9, reviews: 81, image: images.tech[2], description: 'Warm, directional light with a tactile oak base and timeless silhouette.' },
  { id: 55, name: 'Focus Corner Bundle', category: 'Tech & Workspace', price: 188, rating: 4.6, reviews: 21, image: images.tech[3], description: 'A complete desktop refresh for brighter thinking and better focus.' },
  { id: 56, name: 'Pure Wireless Headphones', category: 'Tech & Workspace', price: 119, oldPrice: 149, rating: 4.9, reviews: 174, image: images.tech[4], badge: 'Bestseller', description: 'Sleek white wireless headphones with crisp sound and all-day comfort.' },
  { id: 57, name: 'Desk Companion Kit', category: 'Tech & Workspace', price: 65, rating: 4.7, reviews: 53, image: images.tech[5], description: 'A neatly arranged desk set with a smartphone stand, notebook, mug, and accessories.' },
  { id: 58, name: 'Dark Mode Gadget Set', category: 'Tech & Workspace', price: 138, rating: 4.8, reviews: 39, image: images.tech[6], badge: 'New', description: 'A minimalist dark flatlay of modern gadgets for the focused professional.' },
  { id: 59, name: 'Halo Warm Desk Lamp', category: 'Tech & Workspace', price: 72, oldPrice: 89, rating: 4.9, reviews: 96, image: images.tech[7], description: 'A minimalist modern wooden desk lamp casting a warm, focused glow.' },
  { id: 60, name: 'Green Desk Setup', category: 'Tech & Workspace', price: 104, rating: 4.7, reviews: 44, image: images.tech[8], description: 'A minimalist desk setup with laptop, speakers, and a touch of greenery.' },
  { id: 61, name: 'Sculpt Desk Lamp', category: 'Tech & Workspace', price: 68, rating: 4.8, reviews: 71, image: images.tech[9], description: 'A stylish wooden desk lamp with a minimalist look for modern decoration.' },
  { id: 62, name: 'Creative Workspace Kit', category: 'Tech & Workspace', price: 125, oldPrice: 155, rating: 4.7, reviews: 28, image: images.tech[10], badge: 'Set', description: 'A top-view workspace kit with camera, laptop, and accessories for creatives.' },
  { id: 63, name: 'Natural Light Desk Edit', category: 'Tech & Workspace', price: 98, rating: 4.9, reviews: 57, image: images.tech[11], description: 'A stylish desk setup with a wooden lamp and potted plant in natural light.' },
  { id: 64, name: 'Cozy Window Workspace', category: 'Tech & Workspace', price: 82, rating: 4.6, reviews: 35, image: images.tech[12], description: 'A cozy home workspace with laptop, books, and a camera by the window.' },
  { id: 65, name: 'Studio Recording Kit', category: 'Tech & Workspace', price: 165, oldPrice: 200, rating: 4.8, reviews: 19, image: images.tech[13], badge: "Editor's Pick", description: 'A minimalist home recording studio with laptop, microphone, and creative gear.' },
  { id: 66, name: 'Concrete Desk Minimal', category: 'Tech & Workspace', price: 58, rating: 4.7, reviews: 42, image: images.tech[14], description: 'A minimalist workspace with notepad, coffee cup, and accessories on concrete.' },
  { id: 67, name: 'Soft Glow Lamp', category: 'Tech & Workspace', price: 49, oldPrice: 62, rating: 4.8, reviews: 68, image: images.tech[15], description: 'A minimalist lamp casting a soft, warm glow for quiet evenings at the desk.' },
];

const categories = [
  { name: 'All pieces', icon: '✦', image: images.home[2] },
  { name: 'Home & Living', icon: '⌂', image: images.home[10] },
  { name: 'Beauty & Care', icon: '✧', image: images.beauty[5] },
  { name: 'Style & Accessories', icon: '◒', image: images.style[4] },
  { name: 'Tech & Workspace', icon: '⌘', image: images.tech[4] },
  { name: 'Gifts under $75', icon: '◇', image: images.beauty[9] },
];

function App() {
  const [activeCategory, setActiveCategory] = useState('All pieces');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('Featured');
  const [cart, setCart] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('nook-cart') || '[]') as CartItem[]; } catch { return []; }
  });
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => { localStorage.setItem('nook-cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { if (toast) { const timer = setTimeout(() => setToast(''), 2600); return () => clearTimeout(timer); } }, [toast]);

  const filtered = useMemo(() => {
    let list = products.filter((product) => {
      const inCategory = activeCategory === 'All pieces' || activeCategory === 'Gifts under $75' ? true : product.category === activeCategory;
      const inGiftRange = activeCategory !== 'Gifts under $75' || product.price < 75;
      const matches = `${product.name} ${product.category}`.toLowerCase().includes(search.toLowerCase());
      return inCategory && inGiftRange && matches;
    });
    if (sort === 'Price: low to high') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'Price: high to low') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'Top rated') list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [activeCategory, search, sort]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);
      return found ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item) : [...current, { ...product, quantity }];
    });
    setToast(`${product.name} added to your bag`);
  };
  const updateQuantity = (id: number, delta: number) => setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity + delta } : item).filter((item) => item.quantity > 0));
  const removeItem = (id: number) => setCart((current) => current.filter((item) => item.id !== id));
  const toggleWishlist = (id: number) => setWishlist((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  return (
    <div className="site-shell">
      <div className="announcement"><span>Complimentary shipping on orders over $100</span><span className="announcement-link">Explore the edit <ArrowRight size={13} /></span></div>
      <header className="header">
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu"><Menu size={21} /></button>
        <a className="logo" href="#top">nook<span>.</span></a>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
          {['Shop all', 'New arrivals', 'Home', 'Beauty', 'Style'].map((item) => <a key={item} href="#shop" onClick={() => { setActiveCategory(item === 'Shop all' ? 'All pieces' : item === 'Home' ? 'Home & Living' : item === 'Beauty' ? 'Beauty & Care' : item === 'Style' ? 'Style & Accessories' : 'All pieces'); setMenuOpen(false); }}>{item}</a>)}
        </nav>
        <div className="header-actions">
          <div className="search-wrap"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the collection" /></div>
          <button className="icon-btn" onClick={() => setWishlist(products.filter((item) => !wishlist.includes(item.id)).map((item) => item.id).slice(0, 0))} aria-label="Wishlist"><Heart size={20} strokeWidth={1.7} /></button>
          <button className="bag-btn" onClick={() => setCartOpen(true)}><ShoppingBag size={20} strokeWidth={1.7} /><span>Bag</span>{cartCount > 0 && <b>{cartCount}</b>}</button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy"><p className="eyebrow">The everyday edit</p><h1>Little things,<br /><em>beautifully</em> chosen.</h1><p className="hero-sub">Thoughtful goods for slower mornings, softer spaces, and the life you're making.</p><a href="#shop" className="button button-dark">Shop the collection <ArrowRight size={16} /></a></div>
          <div className="hero-art"><div className="hero-image"><img src={images.home[2]} alt="Sculptural ceramic collection" /></div><div className="hero-tag"><Leaf size={16} /><span>Made for<br /><strong>your everyday</strong></span></div><span className="hero-index">01 <span>/</span> 04</span></div>
        </section>

        <section className="promise-row"><div><Truck size={19} /><span><strong>Thoughtful shipping</strong> Carbon-neutral delivery</span></div><div><Sparkles size={19} /><span><strong>Small batch finds</strong> Made with intention</span></div><div><Leaf size={19} /><span><strong>Good to know</strong> Better materials, always</span></div></section>

        <section className="category-section"><div className="section-heading"><div><p className="eyebrow">Browse by mood</p><h2>Find your kind of lovely.</h2></div><div className="slider-arrows"><button aria-label="Previous"><ChevronLeft size={17} /></button><button aria-label="Next"><ChevronRight size={17} /></button></div></div><div className="category-scroll">{categories.map((category) => <button className={`category-card ${activeCategory === category.name ? 'category-active' : ''}`} key={category.name} onClick={() => { setActiveCategory(category.name); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }); }}><img src={category.image} alt={category.name} /><span className="category-icon">{category.icon}</span><span>{category.name}</span></button>)}</div></section>

        <section className="shop-section" id="shop"><div className="shop-heading"><div><p className="eyebrow">The collection</p><h2>{activeCategory === 'All pieces' ? 'Good things, gathered.' : activeCategory}</h2><p className="muted">{filtered.length} pieces to make your world a little more considered.</p></div><div className="controls"><button className="filter-button"><SlidersHorizontal size={15} /> Filter</button><label className="sort-select"><span>Sort by</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option>Featured</option><option>Top rated</option><option>Price: low to high</option><option>Price: high to low</option></select><ChevronDown size={15} /></label></div></div>
          {filtered.length ? <div className="product-grid">{filtered.map((product) => <ProductCard key={product.id} product={product} wished={wishlist.includes(product.id)} onView={() => setSelected(product)} onAdd={() => addToCart(product)} onWish={() => toggleWishlist(product.id)} />)}</div> : <div className="empty-results"><Search size={30} /><h3>No pieces found</h3><p>Try a different search or browse all pieces.</p><button className="button button-dark" onClick={() => { setSearch(''); setActiveCategory('All pieces'); }}>Clear filters</button></div>}
        </section>

        <section className="story-banner"><div><p className="eyebrow">A little more intention</p><h2>Made to be lived with.</h2><p>We look for objects that earn their place: useful, quietly beautiful, and made to last beyond a season.</p><button className="text-button">Our point of view <ArrowRight size={16} /></button></div><div className="story-stat"><span>01</span><p>Less, but<br /><em>better.</em></p></div></section>
        <section className="newsletter"><p className="eyebrow">The nook note</p><h2>A thoughtful email, occasionally.</h2><p>New finds, considered stories, and a little inspiration for your inbox.</p><form onSubmit={(event) => { event.preventDefault(); setToast("You're on the list. Welcome to nook."); }}><input required type="email" placeholder="Your email address" /><button className="button button-dark">Subscribe</button></form></section>
      </main>
      <footer className="footer"><a className="logo" href="#top">nook<span>.</span></a><p>Small joys for everyday living.</p><div><a href="#shop">Shop</a><a href="#shop">About</a><a href="#shop">Journal</a><a href="#shop">Contact</a></div><small>© 2024 nook. Made with intention.</small></footer>

      {toast && <div className="toast"><Check size={17} /> {toast}</div>}
      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} onAdd={(quantity) => { addToCart(selected, quantity); setSelected(null); }} />}
      {cartOpen && <CartDrawer cart={cart} subtotal={subtotal} onClose={() => setCartOpen(false)} onUpdate={updateQuantity} onRemove={removeItem} onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }} />}
      {checkoutOpen && <CheckoutModal subtotal={subtotal} onClose={() => setCheckoutOpen(false)} onComplete={() => { setCheckoutOpen(false); setCart([]); setToast('Order placed — thank you for choosing nook.'); }} />}
    </div>
  );
}

function ProductCard({ product, wished, onView, onAdd, onWish }: { product: Product; wished: boolean; onView: () => void; onAdd: () => void; onWish: () => void }) {
  return <article className="product-card"><div className="product-image-wrap" onClick={onView}><img src={product.image} alt={product.name} /><div className="card-badges">{product.badge && <span>{product.badge}</span>}</div><button className={`wishlist ${wished ? 'wished' : ''}`} onClick={(event) => { event.stopPropagation(); onWish(); }} aria-label="Add to wishlist"><Heart size={17} fill={wished ? 'currentColor' : 'none'} /></button><button className="quick-add" onClick={(event) => { event.stopPropagation(); onAdd(); }}>Quick add <Plus size={14} /></button></div><div className="product-info"><div><h3>{product.name}</h3><p>{product.category}</p></div><div className="price"><strong>${product.price}</strong>{product.oldPrice && <del>${product.oldPrice}</del>}</div></div><div className="rating"><Star size={12} fill="currentColor" /> {product.rating} <span>({product.reviews})</span></div></article>;
}

function ProductModal({ product, onClose, onAdd }: { product: Product; onClose: () => void; onAdd: (quantity: number) => void }) {
  const [quantity, setQuantity] = useState(1);
  return <div className="overlay" onMouseDown={onClose}><div className="product-modal" onMouseDown={(event) => event.stopPropagation()}><button className="close-btn" onClick={onClose}><X size={20} /></button><img src={product.image} alt={product.name} /><div className="modal-info"><p className="eyebrow">{product.category}</p><h2>{product.name}</h2><div className="modal-rating"><Star size={15} fill="currentColor" /> {product.rating} <span>from {product.reviews} reviews</span></div><div className="modal-price">${product.price} {product.oldPrice && <del>${product.oldPrice}</del>}</div><p className="modal-description">{product.description}</p><div className="quantity-row"><span>Quantity</span><div className="quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={14} /></button><b>{quantity}</b><button onClick={() => setQuantity(quantity + 1)}><Plus size={14} /></button></div></div><button className="button button-dark full" onClick={() => onAdd(quantity)}>Add to bag <ShoppingBag size={16} /></button><p className="modal-note"><Leaf size={14} /> Ships within 2–3 business days</p></div></div></div>;
}

function CartDrawer({ cart, subtotal, onClose, onUpdate, onRemove, onCheckout }: { cart: CartItem[]; subtotal: number; onClose: () => void; onUpdate: (id: number, delta: number) => void; onRemove: (id: number) => void; onCheckout: () => void }) {
  return <div className="overlay" onMouseDown={onClose}><aside className="cart-drawer" onMouseDown={(event) => event.stopPropagation()}><div className="drawer-header"><div><p className="eyebrow">Your selection</p><h2>Your bag <span>({cart.reduce((sum, item) => sum + item.quantity, 0)})</span></h2></div><button className="close-btn" onClick={onClose}><X size={20} /></button></div>{cart.length ? <><div className="cart-list">{cart.map((item) => <div className="cart-item" key={item.id}><img src={item.image} alt={item.name} /><div className="cart-item-info"><h3>{item.name}</h3><p>${item.price}</p><div className="cart-item-bottom"><div className="quantity small"><button onClick={() => onUpdate(item.id, -1)}><Minus size={12} /></button><b>{item.quantity}</b><button onClick={() => onUpdate(item.id, 1)}><Plus size={12} /></button></div><button className="remove" onClick={() => onRemove(item.id)}>Remove</button></div></div></div>)}</div><div className="drawer-bottom"><div className="subtotal"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div><p>Shipping and taxes calculated at checkout.</p><button className="button button-dark full" onClick={onCheckout}>Continue to checkout <ArrowRight size={16} /></button></div></> : <div className="empty-cart"><ShoppingBag size={32} /><h3>Your bag is waiting.</h3><p>Add a few lovely things and they'll show up here.</p><button className="button button-dark" onClick={onClose}>Continue shopping</button></div>}</aside></div>;
}

function CheckoutModal({ subtotal, onClose, onComplete }: { subtotal: number; onClose: () => void; onComplete: () => void }) {
  return <div className="overlay" onMouseDown={onClose}><div className="checkout-modal" onMouseDown={(event) => event.stopPropagation()}><button className="close-btn" onClick={onClose}><X size={20} /></button><div className="checkout-copy"><p className="eyebrow">Almost yours</p><h2>Make it yours.</h2><p>Enter your details and we'll prepare your order with care.</p><div className="checkout-total"><span>Total today</span><strong>${subtotal.toFixed(2)}</strong></div></div><form onSubmit={(event) => { event.preventDefault(); onComplete(); }}><label>Name<input required placeholder="Your full name" /></label><label>Email<input required type="email" placeholder="you@example.com" /></label><label>Phone number<input required type="tel" placeholder="(555) 000-0000" /></label><label>Address<input required placeholder="Street and apartment" /></label><div className="form-row"><label>City<input required placeholder="City" /></label><label>Postal code<input required placeholder="00000" /></label></div><button className="button button-dark full" type="submit">Place order <Check size={16} /></button><small>For this demo, no payment is required.</small></form></div></div>;
}

export default App;
