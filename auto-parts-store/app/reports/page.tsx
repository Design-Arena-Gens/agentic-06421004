'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import Layout from '@/components/Layout';
import { DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';

export default function Reports() {
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => new Date().toISOString().split('T')[0]);

  const getSalesByDateRange = useStore((state) => state.getSalesByDateRange);

  const sales = getSalesByDateRange(startDate, endDate + 'T23:59:59');
  const totalSales = sales.reduce((sum, s) => sum + s.finalAmount, 0);
  const totalTransactions = sales.length;
  const averageSale = totalTransactions > 0 ? totalSales / totalTransactions : 0;

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Reports</h1>

        {/* Date Range Filter */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Select Date Range</h2>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">From Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">To Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Total Sales</p>
                <p className="text-3xl font-bold">${totalSales.toFixed(2)}</p>
              </div>
              <div className="p-4 rounded-full bg-green-500">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Total Transactions</p>
                <p className="text-3xl font-bold">{totalTransactions}</p>
              </div>
              <div className="p-4 rounded-full bg-blue-500">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Average Sale</p>
                <p className="text-3xl font-bold">${averageSale.toFixed(2)}</p>
              </div>
              <div className="p-4 rounded-full bg-purple-500">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Sales Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Sales Transactions</h2>
          </div>
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
                </tr>
              </thead>
              <tbody className="divide-y">
                {sales.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      No sales found in the selected date range
                    </td>
                  </tr>
                ) : (
                  sales.map((sale) => (
                    <tr key={sale.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono">{sale.invoiceNumber}</td>
                      <td className="px-4 py-3">
                        {new Date(sale.saleDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">{sale.customerName || '-'}</td>
                      <td className="px-4 py-3">${sale.totalAmount.toFixed(2)}</td>
                      <td className="px-4 py-3">${sale.discount.toFixed(2)}</td>
                      <td className="px-4 py-3 font-semibold">${sale.finalAmount.toFixed(2)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
