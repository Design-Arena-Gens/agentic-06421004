'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import Layout from '@/components/Layout';
import { Plus, Edit, Trash2 } from 'lucide-react';
import SupplierDialog from '@/components/SupplierDialog';

export default function Suppliers() {
  const [showDialog, setShowDialog] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<string | null>(null);

  const suppliers = useStore((state) => state.suppliers.filter((s) => s.isActive));
  const deleteSupplier = useStore((state) => state.deleteSupplier);

  const handleEdit = (id: string) => {
    setEditingSupplier(id);
    setShowDialog(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this supplier?')) {
      deleteSupplier(id);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Suppliers</h1>
          <button
            onClick={() => {
              setEditingSupplier(null);
              setShowDialog(true);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Supplier
          </button>
        </div>

        {/* Suppliers Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Contact Person</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Payment Terms</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {suppliers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      No suppliers found. Click &quot;Add Supplier&quot; to get started.
                    </td>
                  </tr>
                ) : (
                  suppliers.map((supplier) => (
                    <tr key={supplier.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold">{supplier.name}</td>
                      <td className="px-4 py-3">{supplier.contactPerson || '-'}</td>
                      <td className="px-4 py-3">{supplier.phone || '-'}</td>
                      <td className="px-4 py-3">{supplier.email || '-'}</td>
                      <td className="px-4 py-3">{supplier.paymentTerms || '-'}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(supplier.id)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(supplier.id)}
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
        <SupplierDialog
          supplierId={editingSupplier}
          onClose={() => {
            setShowDialog(false);
            setEditingSupplier(null);
          }}
        />
      )}
    </Layout>
  );
}
