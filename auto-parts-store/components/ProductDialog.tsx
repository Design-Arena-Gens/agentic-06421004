'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { X } from 'lucide-react';

interface ProductDialogProps {
  productId: string | null;
  onClose: () => void;
}

export default function ProductDialog({ productId, onClose }: ProductDialogProps) {
  const addProduct = useStore((state) => state.addProduct);
  const updateProduct = useStore((state) => state.updateProduct);
  const getProduct = useStore((state) => state.getProduct);
  const suppliers = useStore((state) => state.suppliers.filter((s) => s.isActive));

  const [formData, setFormData] = useState({
    name: '',
    partNumber: '',
    barcode: '',
    compatibleVehicles: '',
    location: '',
    quantity: 0,
    minimumStock: 0,
    purchasePrice: 0,
    wholesalePrice: 0,
    retailPrice: 0,
    supplierId: '',
    notes: '',
  });

  useEffect(() => {
    if (productId) {
      const product = getProduct(productId);
      if (product) {
        setFormData({
          name: product.name,
          partNumber: product.partNumber,
          barcode: product.barcode || '',
          compatibleVehicles: product.compatibleVehicles || '',
          location: product.location || '',
          quantity: product.quantity,
          minimumStock: product.minimumStock,
          purchasePrice: product.purchasePrice,
          wholesalePrice: product.wholesalePrice,
          retailPrice: product.retailPrice,
          supplierId: product.supplierId || '',
          notes: product.notes || '',
        });
      }
    }
  }, [productId, getProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (productId) {
      updateProduct(productId, formData);
    } else {
      addProduct({
        ...formData,
        isActive: true,
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
          <h2 className="text-2xl font-bold">
            {productId ? 'Edit Product' : 'Add Product'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Product Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Part Number *</label>
              <input
                type="text"
                required
                value={formData.partNumber}
                onChange={(e) => setFormData({ ...formData, partNumber: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Barcode</label>
              <input
                type="text"
                value={formData.barcode}
                onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Compatible Vehicles</label>
            <input
              type="text"
              value={formData.compatibleVehicles}
              onChange={(e) => setFormData({ ...formData, compatibleVehicles: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Quantity *</label>
              <input
                type="number"
                required
                min="0"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Min Stock *</label>
              <input
                type="number"
                required
                min="0"
                value={formData.minimumStock}
                onChange={(e) => setFormData({ ...formData, minimumStock: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Purchase Price *</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.purchasePrice}
                onChange={(e) => setFormData({ ...formData, purchasePrice: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Wholesale Price *</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.wholesalePrice}
                onChange={(e) => setFormData({ ...formData, wholesalePrice: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Retail Price *</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.retailPrice}
                onChange={(e) => setFormData({ ...formData, retailPrice: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Supplier</label>
            <select
              value={formData.supplierId}
              onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Supplier</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
