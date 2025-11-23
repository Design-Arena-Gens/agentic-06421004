'use client';

import { useStore } from '@/lib/store';
import { DollarSign, TrendingUp, Package, AlertCircle } from 'lucide-react';
import StatCard from '@/components/StatCard';
import Layout from '@/components/Layout';

export default function Dashboard() {
  const products = useStore((state) => state.products.filter((p) => p.isActive));
  const lowStockProducts = useStore((state) => state.getLowStockProducts());
  const todaySales = useStore((state) => state.getTodaySales());
  const monthlySales = useStore((state) => state.getMonthlySales());

  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Today's Sales"
            value={`$${todaySales.toFixed(2)}`}
            icon={DollarSign}
            color="bg-green-500"
          />
          <StatCard
            title="Monthly Sales"
            value={`$${monthlySales.toFixed(2)}`}
            icon={TrendingUp}
            color="bg-blue-500"
          />
          <StatCard
            title="Total Products"
            value={products.length}
            icon={Package}
            color="bg-orange-500"
          />
          <StatCard
            title="Low Stock Items"
            value={lowStockProducts.length}
            icon={AlertCircle}
            color="bg-red-500"
          />
        </div>

        {/* Low Stock Products */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Low Stock Products</h2>
          </div>
          <div className="p-6">
            {lowStockProducts.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No low stock items</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Part Number</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Product Name</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Quantity</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Min Stock</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Location</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {lowStockProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">{product.partNumber}</td>
                        <td className="px-4 py-3">{product.name}</td>
                        <td className="px-4 py-3">
                          <span className="text-red-600 font-semibold">{product.quantity}</span>
                        </td>
                        <td className="px-4 py-3">{product.minimumStock}</td>
                        <td className="px-4 py-3">{product.location || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
