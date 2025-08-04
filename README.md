# Harsukh Residencies - Luxury Apartments in Galiyat, Pakistan

🏔️ **A premium real estate website showcasing luxury apartments in Nathiagali, Galiyat, Pakistan**

## 🌟 Project Overview

Harsukh Residencies is a sophisticated Next.js 14 application that presents luxury mountain apartments in Galiyat, Pakistan. The website features immersive 3D visualizations, interactive floor plans, and comprehensive property information designed to attract investors and buyers seeking premium mountain real estate.

### 🎯 Key Features

- **Interactive 3D Building Explorer** - Navigate through floors and apartments
- **Dynamic Floor Plans** - Detailed apartment layouts with interactive SVG overlays
- **Unity Integration** - WebGL for 3D interactive experiences
- **Video Background Sections** - Immersive multimedia experience
- **Responsive Design** - Optimized for all devices
- **SEO Optimized** - Complete meta tags and structured data
- **Contact Management** - Integrated lead generation forms
- **Blog System** - Content management for property insights
- **Map Integration** - Interactive location visualization

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: CSS Modules + Custom CSS
- **Animations**: Framer Motion
- **State Management**: Redux Toolkit + Redux Persist
- **Forms**: React Hook Form + React Phone Number Input
- **Media**: Next.js Image Optimization
- **3D/Interactive**: OpenSeadragon for floor plan navigation
- **Analytics**: Google Tag Manager, Facebook Pixel, LinkedIn Insight

## 📁 Project Structure

```
harsukh/
├── app/                          # Next.js App Router
│   ├── page.js                   # Main homepage with front page loader
│   ├── layout.js                 # Root layout with SEO and analytics
│   ├── about/                    # About page
│   ├── apartments/               # Apartment types and information
│   ├── blog/                     # Blog system
│   ├── contact/                  # Contact forms and information
│   ├── developer/                # Developer information
│   ├── explore/                  # 3D building explorer
│   ├── investment/               # Investment opportunities
│   ├── location/                 # Location details and map
│   ├── map-view/                 # Interactive map with landmarks
│   ├── chat/                     # Chat interface (placeholder)
│   ├── [floor]/                  # Dynamic floor pages
│   └── [floor]/[apartment]/      # Individual apartment pages
├── component/                    # Reusable components
│   ├── sections/                 # Page sections
│   ├── modules/                  # Complex feature modules
│   ├── ui/                       # UI components
│   └── data/                     # Static data
├── styles/                       # CSS modules and global styles
├── state/                        # Redux store configuration
└── public/                       # Static assets
```

## 🏠 Pages  Features Overview

### **Unity Page (`/unity`)**
- **Unity WebGL Player**: Interactive 3D environment
- **Loading Bar**: Displays progress while loading
- **Responsive Canvas**: Adapts to screen size
- **Service Worker**: Manages caching and offline capabilities

### **Homepage (`/`)**
- **Front Page Loader**: Branded loading screen with progress bar
- **Hero Section**: Video background with luxury apartment showcase
- **Why Harsukh**: Key selling points and benefits
- **Luxury Benchmark**: Video content section with property details
- **About Us**: Company information and vision
- **Developer**: Developer profiles and company background
- **CEO Vision**: Leadership message and company direction
- **FAQ**: Frequently asked questions
- **Footer**: Contact information and links

### **Apartments (`/apartments`)**
- Studio apartments (309-488 sqft)
- One bedroom (451-899 sqft)
- Two bedroom (815-1339 sqft)
- Three bedroom (1568-1796 sqft)
- Penthouses (1108-1665 sqft)
- Detailed specifications and pricing

### **Explore (`/explore`)**
- **Interactive 3D Building**: Floor-by-floor navigation
- **Floor Plans**: Detailed layouts with apartment selection
- **Virtual Tours**: Immersive property exploration
- **Apartment Details**: Specifications, pricing, and availability

### **Floor Pages (`/[floor]`)**
- **Dynamic Routing**: Individual pages for each floor
- **Interactive SVG Overlays**: Clickable apartment units
- **High-Resolution Images**: Zoomable floor plan viewers
- **Apartment Selection**: Direct booking and inquiry system

### **Individual Apartments (`/[floor]/[apartment]`)**
- **Detailed Specifications**: Area, bedrooms, bathrooms
- **Pricing Information**: Investment costs and ROI
- **Floor Plan Views**: Detailed layout visualization
- **Booking System**: Lead generation and contact forms

### **Map View (`/map-view`)**
- **Interactive Video Map**: Aerial view of location
- **Landmark Information**: Nearby attractions and amenities
- **Distance Calculator**: Walking and driving times
- **Location Benefits**: Strategic positioning highlights

### **Investment (`/investment`)**
- **ROI Analysis**: 15-20% annual appreciation
- **Rental Yields**: 8-12% during peak seasons
- **Market Analysis**: Growth potential and demand trends
- **Investment Security**: Legal documentation and transparency

### **Location (`/location`)**
- **Strategic Positioning**: Minutes from Nathiagali Bazaar
- **Natural Surroundings**: Pine forests and mountain views
- **Accessibility**: Road connections and infrastructure
- **Local Amenities**: Restaurants, shops, and attractions

### **Contact (`/contact`)**
- **Lead Generation Forms**: Comprehensive inquiry system
- **Contact Information**: Sales office and team details
- **Site Visit Booking**: Appointment scheduling
- **Multi-channel Support**: Phone, email, and form submissions

### **Blog (`/blog`)**
- **Property Insights**: Market trends and investment tips
- **Location Features**: Area highlights and attractions
- **Company Updates**: Development progress and news
- **SEO Content**: Educational real estate content

### **Developer (`/developer`)**
- **Company Profile**: Development expertise and history
- **Team Information**: Key personnel and leadership
- **Project Portfolio**: Previous developments and experience
- **Vision & Mission**: Company values and objectives

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn
- Git for version control

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd harsukh
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   ```bash
   # Create environment file
   cp .env.example .env.local
   ```

4. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Enhanced layouts for iPad and tablets
- **Desktop Experience**: Full-featured desktop interface
- **Touch Interactions**: Gesture support for mobile navigation

## 🎨 Key Components

### **Interactive Floor Plans**
- OpenSeadragon integration for high-resolution images
- SVG overlays for apartment selection
- Responsive zoom and pan functionality
- Dynamic apartment information popups

### **Video Backgrounds**
- Optimized WebM video format
- Auto-play with fallback handling
- Mobile-responsive video scaling
- Performance-optimized loading

### **Contact Forms**
- React Phone Number Input with country codes
- Form validation and error handling
- Lead generation and CRM integration
- Success/failure state management

### **Animation System**
- Framer Motion for smooth transitions
- Scroll-triggered animations
- Page transition effects
- Interactive hover states

## 🔍 SEO & Analytics

### **SEO Features**
- Complete meta tags for all pages
- Open Graph and Twitter Card support
- JSON-LD structured data
- Canonical URLs and sitemaps
- Performance optimization

### **Analytics Integration**
- Google Tag Manager
- Google Analytics 4
- Facebook Pixel tracking
- LinkedIn Insight Tag
- Conversion tracking

## 🚀 Deployment

### **Build for Production**
```bash
npm run build
npm start
```

### **Performance Optimizations**
- Next.js Image Optimization
- Code splitting and lazy loading
- CDN integration for media assets
- Compression and caching strategies

## 🛠️ Development Features

- **Hot Reload**: Instant development feedback
- **Error Boundaries**: Graceful error handling
- **TypeScript Ready**: Easy migration path
- **Modular Architecture**: Scalable component structure

## 📞 Support & Maintenance

- **Regular Updates**: Framework and dependency updates
- **Performance Monitoring**: Core Web Vitals tracking
- **Security Patches**: Regular security updates
- **Feature Enhancements**: Continuous improvement

## 🏗️ Future Enhancements

- **Virtual Reality Tours**: VR apartment viewing
- **AI Chatbot**: Automated customer support
- **Payment Integration**: Online booking and payments
- **CRM Integration**: Advanced lead management
- **Multi-language Support**: Urdu and Arabic translations

---

**Website**: [theharsukh.com](https://theharsukh.com)  
**Location**: Nathiagali, Galiyat, Pakistan  
**Contact**: info@theharsukh.com
