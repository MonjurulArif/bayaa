"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  AdminCategory,
  CategoryPayload,
  getAdminCategories,
  createAdminCategory,
  updateAdminCategory,
  deleteAdminCategory,
} from "@/services/admin-category.service";

interface CategoryForm {
  name: string;
  slug: string;
}

const emptyForm: CategoryForm = {
  name: "",
  slug: "",
};

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState<CategoryForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadCategories() {
      try {
        setLoading(true);

        const data = await getAdminCategories();

        if (!cancelled) {
          setCategories(data);
        }
      } catch (error) {
        if (!cancelled) {
          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to load categories",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadCategories();

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const filteredCategories = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return categories;

    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(term) ||
        category.slug.toLowerCase().includes(term),
    );
  }, [categories, search]);

  function updateForm(field: keyof CategoryForm, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function openCreateForm() {
    setEditingId(null);
    setForm(emptyForm);
    setFormOpen(true);
  }

  function openEditForm(category: AdminCategory) {
    setEditingId(category.id);
    setForm({
      name: category.name,
      slug: category.slug,
    });
    setFormOpen(true);
  }

  function closeForm() {
    if (saving) {
      return;
    }

    setFormOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSave() {
    if (saving) {
      return;
    }

    const payload: CategoryPayload = {
      name: form.name.trim(),
      slug: form.slug.trim().toLowerCase().replace(/\s+/g, "-"),
    };

    if (!payload.name) {
      toast.error("Category name is required");
      return;
    }

    if (!payload.slug) {
      toast.error("Category slug is required");
      return;
    }

    try {
      setSaving(true);

      if (editingId !== null) {
        await updateAdminCategory(editingId, payload);
        toast.success("Category updated successfully");
      } else {
        await createAdminCategory(payload);
        toast.success("Category created successfully");
      }

      setFormOpen(false);
      setEditingId(null);
      setForm(emptyForm);
      setReloadKey((current) => current + 1);
    } catch (error) {
      console.error("Failed to save category:", error);

      toast.error(
        error instanceof Error ? error.message : "Failed to save category",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(category: AdminCategory) {
    const confirmed = window.confirm(
      `Delete the category "${category.name}"? Categories containing products may not be deletable.`,
    );

    if (!confirmed) return;

    try {
      setDeletingId(category.id);

      await deleteAdminCategory(category.id);

      toast.success("Category deleted successfully");

      setCategories((current) =>
        current.filter((item) => item.id !== category.id),
      );

      if (editingId === category.id) {
        setFormOpen(false);
        setEditingId(null);
        setForm(emptyForm);
      }
    } catch (error) {
      console.error("Failed to delete category:", error);

      toast.error(
        error instanceof Error ? error.message : "Failed to delete category",
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 text-gray-900 sm:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold">Categories</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage the categories used in your store.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateForm}
            className="rounded-lg bg-black px-5 py-3 font-medium text-white hover:bg-gray-800"
          >
            + Add Category
          </button>
        </div>

        {formOpen && (
          <section className="mb-8 rounded-xl border bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-5 text-xl font-semibold">
              {editingId !== null ? "Edit Category" : "Add Category"}
            </h2>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                void handleSave();
              }}
              className="space-y-4"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Category Name
                  </label>

                  <input
                    required
                    maxLength={100}
                    value={form.name}
                    onChange={(event) => updateForm("name", event.target.value)}
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:border-black"
                    placeholder="Electronics"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Slug</label>

                  <input
                    required
                    maxLength={120}
                    value={form.slug}
                    onChange={(event) => updateForm("slug", event.target.value)}
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:border-black"
                    placeholder="electronics"
                  />

                  <p className="mt-1 text-xs text-gray-500">
                    Used in category URLs, for example /category/electronics.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-black px-5 py-3 font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : editingId !== null
                      ? "Save Changes"
                      : "Create Category"}
                </button>

                <button
                  type="button"
                  onClick={closeForm}
                  disabled={saving}
                  className="rounded-lg border px-5 py-3 font-medium hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}

        <section className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b p-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-semibold">All Categories</h2>
              <p className="text-sm text-gray-500">
                {filteredCategories.length} category
                {filteredCategories.length === 1 ? "y" : "ies"}
                {search.trim() ? " found" : ""}
              </p>
            </div>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search categories..."
              className="w-full rounded-lg border px-3 py-2 outline-none focus:border-black sm:w-72"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Category Name</th>
                  <th className="p-4">Slug</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500">
                      Loading categories...
                    </td>
                  </tr>
                ) : filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500">
                      No categories found.
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((category) => (
                    <tr key={category.id} className="border-t hover:bg-gray-50">
                      <td className="p-4">{category.id}</td>
                      <td className="p-4 font-medium">{category.name}</td>
                      <td className="p-4 text-gray-600">{category.slug}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => openEditForm(category)}
                            className="rounded border px-3 py-1.5 hover:bg-gray-100"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => void handleDelete(category)}
                            disabled={deletingId === category.id}
                            className="rounded border border-red-200 px-3 py-1.5 text-red-600 hover:bg-red-50 disabled:opacity-50"
                          >
                            {deletingId === category.id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
