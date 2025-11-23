'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { X, Search, Trash2 } from 'lucide-react';
import { SaleItem } from '@/lib/types';

interface NewSaleDialogProps {
  onClose: () => void;
}

export default function NewSaleDialog({ onClose }: NewSaleDialogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState<SaleItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Cash');

  const searchProducts = useStore((state) => state.searchProducts);
  const addSale = useStore((state) => state.addSale);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.length < 2) return;

    const products = searchProducts(term);
    if (products.length === 1) {
      addItem(products[0].id, products[0].name, products[0].partNumber, products[0].retailPrice);
      setSearchTerm('');
    }
  };

  const addItem = (productId: string, productName: string, partNumber: string, unitPrice: number) => {
    const existingItem = items.find((i) => i.productId === productId);
    if (existingItem) {
      setItems(
        items.map((i) =>
          i.productId === productId
            ? { ...i, quantity: i.quantity + 1, totalPrice: (i.quantity + 1) * i.unitPrice - i.discount }
            : i
        )
      );
    } else {
      const newItem: SaleItem = {
        id: Math.random().toString(36).substr(2, 9),
        productId,
        productName,
        partNumber,
        quantity: 1,
        unitPrice,
        discount: 0,
        totalPrice: unitPrice,
      };
      setItems([...items, newItem]);
    }
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    setItems(
      items.map((i) =>
        i.id === id ? { ...i, quantity, totalPrice: quantity * i.unitPrice - i.discount } : i
      )
    );
  };

  const updateItemDiscount = (id: string, discount: number) => {
    setItems(
      items.map((i) =>
        i.id === id ? { ...i, discount, totalPrice: i.quantity * i.unitPrice - discount } : i
      )
    );
  };

  const removeItem = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const finalAmount = subtotal - discount + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      alert('Please add at least one item');
      return;
    }

    addSale({
      totalAmount: subtotal,
      discount,
      tax,
      finalAmount,
      paymentMethod,
      items,
    });

    alert('Sale created successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
          <h2 className="text-2xl font-bold">New Sale</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Product Search */}
          <div>
            <label className="block text-sm font-medium mb-2">Search Product</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search by name, part number, or barcode..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Sale Items */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Sale Items</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Part Number</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Product</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Quantity</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Unit Price</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Discount</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Total</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                        No items added yet
                      </td>
                    </tr>
                  ) : (
                    items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-2">{item.partNumber}</td>
                        <td className="px-4 py-2">{item.productName}</td>
                        <td className="px-4 py-2">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value) || 1)}
                            className="w-20 px-2 py-1 border rounded"
                          />
                        </td>
                        <td className="px-4 py-2">${item.unitPrice.toFixed(2)}</td>
                        <td className="px-4 py-2">
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.discount}
                            onChange={(e) => updateItemDiscount(item.id, parseFloat(e.target.value) || 0)}
                            className="w-20 px-2 py-1 border rounded"
                          />
                        </td>
                        <td className="px-4 py-2 font-semibold">${item.totalPrice.toFixed(2)}</td>
                        <td className="px-4 py-2">
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <div className="grid grid-cols-2 gap-4 max-w-md ml-auto">
              <div>
                <label className="block text-sm font-medium mb-1">Subtotal</label>
                <input
                  type="text"
                  value={`$${subtotal.toFixed(2)}`}
                  readOnly
                  className="w-full px-3 py-2 bg-white border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Discount</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={discount}
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tax</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={tax}
                  onChange={(e) => setTax(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                  <option value="Transfer">Transfer</option>
                </select>
              </div>
            </div>

            <div className="bg-indigo-100 p-4 rounded-lg max-w-md ml-auto">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Final Amount</span>
                <span className="text-2xl font-bold text-indigo-700">${finalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
            >
              Complete Sale
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
