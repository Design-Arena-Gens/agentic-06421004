# Auto Parts Store Management System

A comprehensive web-based application for managing auto parts stores, built with Next.js, TypeScript, and Tailwind CSS.

🌐 **Live Demo**: https://agentic-06421004.vercel.app

## Features

### ⚙️ Inventory Management
- **Complete CRUD Operations**: Add, edit, and delete products with ease
- **Smart Search**: Search by name, part number, or barcode
- **Stock Tracking**: Real-time quantity monitoring with low stock alerts
- **Multiple Pricing Tiers**: Support for purchase, wholesale, and retail prices
- **Location Management**: Track product locations in your warehouse
- **Supplier Integration**: Link products to suppliers for easy reordering

### 🧾 Sales & Invoicing
- **Quick Point-of-Sale**: Fast and intuitive sales interface
- **Product Search**: Search products by name, part number, or barcode during sales
- **Flexible Pricing**: Apply discounts and taxes per item or per sale
- **Multiple Payment Methods**: Support for cash, card, and transfer
- **Automatic Invoice Generation**: Unique invoice numbers for every transaction
- **Real-time Inventory Updates**: Stock levels automatically adjust after each sale

### 🚚 Supplier Management
- **Comprehensive Database**: Store all supplier information in one place
- **Contact Management**: Track names, phones, emails, and addresses
- **Payment Terms**: Record payment terms and conditions
- **Product Relationships**: See which products come from which suppliers

### 📊 Reports & Analytics
- **Date Range Reports**: Generate sales reports for any date range
- **Sales Metrics**: Track total sales, transaction count, and average sale value
- **Visual Dashboard**: See key metrics at a glance
- **Transaction History**: Detailed view of all sales with filtering

### 🌐 Multi-Language Support
- **English & Arabic**: Full support for both languages
- **RTL Support**: Proper right-to-left layout for Arabic
- **Easy Switching**: Toggle between languages with one click
- **Localized Content**: All UI elements translated

### 💾 Offline Operation
- **Local Storage**: All data stored in browser's local storage
- **No Internet Required**: Works completely offline
- **Instant Performance**: Lightning-fast operations
- **Data Persistence**: Data remains even after closing the browser

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand with persistence
- **Icons**: Lucide React
- **Internationalization**: Custom i18n implementation
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd auto-parts-store
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Usage Guide

### Dashboard
- View real-time statistics including today's sales, monthly sales, total products, and low stock items
- Quick overview of products that need restocking

### Managing Inventory
1. Navigate to **Inventory** from the sidebar
2. Click **Add Product** to add new items
3. Fill in product details including:
   - Product name and part number
   - Barcode (optional)
   - Compatible vehicles
   - Warehouse location
   - Quantity and minimum stock level
   - Purchase, wholesale, and retail prices
   - Supplier
4. Use the search bar to find products quickly
5. Edit or delete products using action buttons

### Creating a Sale
1. Go to **Sales** from the sidebar
2. Click **New Sale**
3. Search for products by name, part number, or barcode
4. Adjust quantities and apply discounts as needed
5. Add taxes if applicable
6. Select payment method
7. Click **Complete Sale** to finalize

### Managing Suppliers
1. Navigate to **Suppliers**
2. Click **Add Supplier**
3. Enter supplier information:
   - Company name
   - Contact person
   - Phone and email
   - Address
   - Payment terms
4. Save and link products to suppliers in inventory

### Generating Reports
1. Go to **Reports**
2. Select date range
3. View summary statistics:
   - Total sales amount
   - Number of transactions
   - Average sale value
4. Review detailed transaction list

### Language Support
- Click **English** or **العربية** in the top right corner
- Interface immediately switches language and direction
- All data labels and buttons are translated

## Features in Detail

### Smart Stock Management
- **Low Stock Alerts**: Automatically identifies products below minimum stock level
- **Stock History**: Track all inventory movements with detailed transaction logs
- **Barcode Support**: Ready for barcode scanner integration

### Sales Analytics
- **Real-time Dashboard**: See today's and month's sales at a glance
- **Flexible Reporting**: Generate reports for any date range
- **Transaction Details**: View complete sale information including items, prices, and payment methods

### Data Persistence
- All data is stored in browser's local storage
- Data survives page refreshes and browser restarts
- Export/import functionality can be added for backup

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

Modern browsers with localStorage support required.

## Deployment

The application is deployed on Vercel and can be accessed at:
https://agentic-06421004.vercel.app

To deploy your own instance:

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy with default settings (Next.js is auto-detected)

## Security Note

This application stores all data locally in the browser. For production use with sensitive data, consider:
- Adding user authentication
- Implementing server-side storage with encryption
- Regular data backups
- Access control mechanisms

## Future Enhancements

Potential features for future versions:
- Customer management module
- Purchase order tracking
- Barcode printing
- Invoice PDF generation
- Export to Excel/CSV
- Multi-user support with authentication
- Cloud storage integration
- Backup and restore functionality

## License

This project is provided as-is for educational and commercial use.

## Support

For issues, questions, or feature requests, please create an issue in the repository.

---

Built with ❤️ using Next.js and deployed on Vercel
