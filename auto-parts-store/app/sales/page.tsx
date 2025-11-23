'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import Layout from '@/components/Layout';
import { Plus } from 'lucide-react';
import NewSaleDialog from '@/components/NewSaleDialog';

export default function Sales() {
  const [showDialog, setShowDialog] = useState(false);
  const sales = useStore((state) => state.sales);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Sales</h1>
          <button
            onClick={() => setShowDialog(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Sale
          </button>
        </div>

        {/* Sales Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Invoice Number</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Customer</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Total</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Discount</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Final Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Payment Method</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {sales.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      No sales yet. Click &quot;New Sale&quot; to create your first sale.
                    </td>
                  </tr>
                ) : (
                  [...sales].reverse().map((sale) => (
                    <tr key={sale.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono">{sale.invoiceNumber}</td>
                      <td className="px-4 py-3">
                        {new Date(sale.saleDate).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">{sale.customerName || '-'}</td>
                      <td className="px-4 py-3">${sale.totalAmount.toFixed(2)}</td>
                      <td className="px-4 py-3">${sale.discount.toFixed(2)}</td>
                      <td className="px-4 py-3 font-semibold">${sale.finalAmount.toFixed(2)}</td>
                      <td className="px-4 py-3">{sale.paymentMethod}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showDialog && <NewSaleDialog onClose={() => setShowDialog(false)} />}
    </Layout>
  );
}
