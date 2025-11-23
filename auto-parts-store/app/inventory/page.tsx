'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import Layout from '@/components/Layout';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import ProductDialog from '@/components/ProductDialog';

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);

  const allProducts = useStore((state) => state.products.filter((p) => p.isActive));
  const searchProducts = useStore((state) => state.searchProducts);
  const deleteProduct = useStore((state) => state.deleteProduct);
  const suppliers = useStore((state) => state.suppliers.filter((s) => s.isActive));

  const products = searchTerm
    ? searchProducts(searchTerm)
    : allProducts;

  const handleEdit = (id: string) => {
    setEditingProduct(id);
    setShowDialog(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const getSupplierName = (supplierId?: string) => {
    if (!supplierId) return '-';
    const supplier = suppliers.find((s) => s.id === supplierId);
    return supplier?.name || '-';
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Inventory</h1>
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowDialog(true);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, part number, barcode..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Part Number</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Product Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Quantity</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Location</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Retail Price</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Supplier</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      No products found. Click &quot;Add Product&quot; to get started.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">{product.partNumber}</td>
                      <td className="px-4 py-3">{product.name}</td>
                      <td className="px-4 py-3">
                        <span
                          className={
                            product.quantity <= product.minimumStock
                              ? 'text-red-600 font-semibold'
                              : ''
                          }
                        >
                          {product.quantity}
                        </span>
                      </td>
                      <td className="px-4 py-3">{product.location || '-'}</td>
                      <td className="px-4 py-3">${product.retailPrice.toFixed(2)}</td>
                      <td className="px-4 py-3">{getSupplierName(product.supplierId)}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(product.id)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showDialog && (
        <ProductDialog
          productId={editingProduct}
          onClose={() => {
            setShowDialog(false);
            setEditingProduct(null);
          }}
        />
      )}
    </Layout>
  );
}
