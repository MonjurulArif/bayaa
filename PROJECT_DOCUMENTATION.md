# Project Documentation: Bayaa (E-Commerce Platform)

This document provides a comprehensive technical overview of the **Bayaa** project codebase. It is designed to give AI assistants and developers complete context on the architecture, technologies, data models, state management, routing, and feature workflows to facilitate further feature implementation, refactoring, and AI-driven enhancements.

---

## 1. Overview & Tech Stack

**Bayaa** is a modern, responsive, client-first E-Commerce web application built using Next.js (App Router) and TypeScript.

- **Framework**: Next.js 16.2.7 (App Router)
- **UI Engine**: React 19.2.4
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`) with CSS variables (`Geist` & `Geist Mono` fonts)
- **Iconography**: Lucide React (`lucide-react`)
- **State Management**: Zustand v5.0.14 with LocalStorage persistence (`zustand/middleware` `persist`)
- **Data Fetching / Caching**: TanStack React Query (`@tanstack/react-query` v5.101.4)
- **Toast Notifications**: React Hot Toast (`react-hot-toast` v2.6.0)

---

## 2. File & Directory Structure

```
bayaa/
├── app/                      # Next.js App Router pages and layouts
│   ├── layout.tsx            # Root layout containing font configs & Toast container
│   ├── page.tsx              # Homepage
│   ├── globals.css           # Global Tailwind CSS import & base styles
│   ├── cart/                 # Shopping Cart page
│   ├── category/             # Category browsing page
│   │   └── [slug]/           # Dynamic category page with filtering & sorting
│   ├── checkout/             # Checkout page
│   ├── login/                # Login authentication page
│   ├── signup/               # User registration page
│   ├── orders/               # Order history page
│   ├── products/             # Product catalog
│   │   └── [slug]/           # Dynamic product details page
│   ├── profile/              # User profile management page
│   ├── search/               # Search result page
│   ├── wishlist/             # Saved items / wishlist page
│   └── test/                 # Test / sandbox page
├── components/               # Modular UI React components
│   ├── auth/                 # AuthGuard protection wrapper
│   ├── cart/                 # CartItem, CartSummary components
│   ├── category/             # CategoryFilters, SortSelect components
│   ├── checkout/             # Checkout form and payment components
│   ├── common/               # Badge, Rating, SearchBar components
│   ├── home/                 # HeroBanner, CategoryGrid, ProductCard, ProductGrid, RecentlyViewed
│   ├── layout/               # Header, Footer, AccountMenu, CategoriesMenu
│   ├── product/              # AddToCartButton, ProductGallery, ProductInfo, ProductReviews, WishlistButton, TrackRecentlyViewed
│   └── search/               # SearchSortSelect component
├── data/                     # Mock data source
│   └── products.ts           # Mock product database array
├── services/                 # Data access layer (async mock services)
│   ├── auth.service.ts       # Authentication API service mock
│   ├── order.service.ts      # Order API service mock
│   └── product.service.ts    # Product queries, search, filter, and sort algorithms
├── store/                    # Zustand global state stores with persistence
│   ├── authStore.ts          # Auth status and user profile state
│   ├── cartStore.ts          # Cart items, stock checks, and totals
│   ├── ordersStore.ts        # Placed orders history state
│   ├── recentlyViewedStore.ts# Track up to 8 recently viewed products
│   ├── reviewStore.ts        # User reviews state per product
│   └── wishlistStore.ts      # Wishlist toggle and items array
├── types/                    # TypeScript interfaces and types
│   └── products.ts           # Product data contract interface
├── package.json              # Project dependencies and npm scripts
└── tsconfig.json             # TypeScript compiler settings & `@/*` path alias
```

---

## 3. Data Models & Contracts

### 3.1 Product Interface (`types/products.ts`)
```typescript
export interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  thumbnail: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  stock: number;
}
```

### 3.2 User Profile Model (`store/authStore.ts`)
```typescript
export interface User {
  emailOrMobile: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  birthDate: string;
  division: string;
  district: string;
  area: string;
  address: string;
}
```

### 3.3 Order Model (`store/ordersStore.ts`)
```typescript
export interface Order {
  id: string;
  date: string;
  items: (Product & { quantity: number })[];
  total: number;
  status: string; // e.g., 'Pending', 'Processing', 'Delivered'
  customerName: string;
  phone: string;
  email: string;
  division: string;
  district: string;
  area: string;
  address: string;
  paymentMethod: string;
}
```

### 3.4 Product Review Model (`store/reviewStore.ts`)
```typescript
export interface Review {
  id: string;
  productId: number;
  rating: number;
  comment: string;
  date: string;
}
```

---

## 4. State Management (Zustand Stores)

All global state stores utilize `zustand/middleware` `persist` to maintain client-side persistence in `localStorage`.

1. **`useCartStore` (`store/cartStore.ts`)**:
   - `items`: Array of items in cart with `quantity`.
   - `addToCart(product)`: Checks stock availability; notifies user with `toast` if stock limit reached.
   - `increaseQuantity(id)` / `decreaseQuantity(id)` / `removeFromCart(id)` / `clearCart()`.
   - Storage Key: `cart-storage`.

2. **`useAuthStore` (`store/authStore.ts`)**:
   - `user`: `User | null`, `isLoggedIn`: boolean.
   - `login(user)`, `logout()`, `updateProfile(partialUser)`.
   - Storage Key: `auth-storage`.

3. **`useOrderStore` (`store/ordersStore.ts`)**:
   - `orders`: `Order[]`.
   - `addOrder(order)`: Records placed orders.
   - Storage Key: `order-storage`.

4. **`useWishlistStore` (`store/wishlistStore.ts`)**:
   - `items`: `Product[]`.
   - `addToWishlist(product)`, `removeFromWishlist(id)`.
   - Storage Key: `wishlist-storage`.

5. **`useRecentlyViewedStore` (`store/recentlyViewedStore.ts`)**:
   - `items`: `Product[]`. Maintains up to 8 unique recently viewed products, pushing the latest product to the front.
   - Storage Key: `recently-viewed-storage`.

6. **`useReviewStore` (`store/reviewStore.ts`)**:
   - `reviews`: `Review[]`. Stores dynamic user reviews added to products.
   - Storage Key: `review-storage`.

---

## 5. Service Layer Abstraction (`services/product.service.ts`)

Currently, product operations run against static local data (`data/products.ts`) encapsulated in async helper functions:

- `getProducts()`: Returns all products.
- `getProductById(id)` / `getProductsBySlug(slug)`.
- `getProductsByCategory(categorySlug)`.
- `searchProducts(query)`: Case-insensitive search on name and description.
- `sortProducts(products, sortOption)`: Handles sorting (`price-asc`, `price-desc`, `name`).
- `filterProducts(products, priceRange)`: Filters by price ranges (`under1000`, `1000to2000`, `above2000`).
- `filterByRating(products, rating)` / `filterByStock(products, inStockOnly)`.
- `getRelatedProducts(category, currentProductId)`: Retrieves up to 8 related items in the same category.

---

## 6. Key Application Workflows

1. **Homepage (`/`)**:
   - Displays `HeroBanner`, category highlights (`CategoryGrid`), product feed (`ProductGrid`), and `RecentlyViewed` items.

2. **Catalog Browsing & Search (`/category/[slug]`, `/search`)**:
   - URL-driven search params (`?sort=`, `?price=`, `?rating=`, `?stock=`).
   - `CategoryFilters` component triggers live filter adjustments.

3. **Product Page (`/products/[slug]`)**:
   - Tracks product viewing via `TrackRecentlyViewed`.
   - Features `ProductGallery`, stock availability badge, `AddToCartButton`, `WishlistButton`, and `ProductReviews` component allowing logged-in or guest users to leave feedback.

4. **Checkout & Order Creation (`/checkout`)**:
   - Reads cart state from `useCartStore`.
   - Captures delivery address (Division, District, Area) and payment mode.
   - Dispatches order to `useOrderStore` and clears `cartStore`.

---

## 7. Roadmap & Next Steps for AI Assistants

When extending or improving this codebase, consider targeting these high-priority areas:

1. **Backend Integration**:
   - Replace static `data/products.ts` and `services/product.service.ts` with real API endpoints (e.g., Next.js API routes `/app/api/...`, REST backend, or GraphQL).
   - Implement database integration (Prisma ORM with PostgreSQL/MongoDB or Supabase).

2. **Authentication System**:
   - Replace mock `authStore` persistence with secure NextAuth.js (Auth0 / Supabase / JWT cookies) for real authentication & role-based authorization (Customer vs Admin).

3. **Payment Gateway**:
   - Implement checkout integration with Stripe, SSLCommerz, bkash, or PayPal SDK.

4. **Form Validation & Error Handling**:
   - Integrate `react-hook-form` and `zod` schema validation for checkout, address, profile, and login/signup forms.

5. **Server-Side Rendering (SSR) & SEO Optimizations**:
   - Convert catalog and detail pages to leverage Next.js Server Components with dynamic meta tags, OpenGraph metadata, and Structured Data (JSON-LD) for rich search snippet representation.

6. **Testing**:
   - Add unit/integration tests using Vitest / React Testing Library for Zustand stores and services, and Playwright for E2E checkout workflows.
