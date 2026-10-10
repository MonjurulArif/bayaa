"use client";
import { useEffect, useState } from "react";
import type { SubmitEvent } from "react";
import toast from "react-hot-toast";
import {
  AdminProduct,
  ProductCategory,
  ProductPayload,
  getAdminProducts,
  getAdminProduct,
  getProductCategories,
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
} from "@/services/admin-product.service";

interface ProductForm {
  name: string;
  slug: string;
  price: string;
  description: string;
  thumbnail: string;
  categoryId: string;
  stock: string;
}

const emptyForm: ProductForm = {
  name: "",
  slug: "",
  price: "",
  description: "",
  thumbnail: "",
  categoryId: "",
  stock: "0",
};

const PAGE_SIZE = 10;

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        setLoading(true);

        const result = await getAdminProducts(search, page, PAGE_SIZE);

        if (cancelled) return;

        setProducts(result.products);
        setTotalProducts(result.totalProducts);
        setTotalPages(result.totalPages);
      } catch (error) {
        if (!cancelled) {
          toast.error(
            error instanceof Error ? error.message : "Failed to load products",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadProducts();

    return () => {
      cancelled = true;
    };
  }, [search, page, reloadKey]);

  useEffect(() => {
    let cancelled = false;

    async function loadCategories() {
      try {
        const data = await getProductCategories();

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
      }
    }

    void loadCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  function updateForm(field: keyof ProductForm, value: string) {
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

  async function openEditForm(productId: number) {
    try {
      setFormLoading(true);
      setEditingId(productId);
      setFormOpen(true);

      const product = await getAdminProduct(productId);

      setForm({
        name: product.name,
        slug: product.slug,
        price: String(product.price),
        description: product.description ?? "",
        thumbnail: product.thumbnail,
        categoryId: product.categoryId ? String(product.categoryId) : "",
        stock: String(product.stock),
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to load product",
      );

      setFormOpen(false);
      setEditingId(null);
    } finally {
      setFormLoading(false);
    }
  }

  function closeForm() {
    if (saving) return;

    setFormOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (formLoading || saving) return;

    const price = Number(form.price);
    const stock = Number(form.stock);
    const categoryId = Number(form.categoryId);

    if (!Number.isFinite(price) || price <= 0) {
      toast.error("Price must be greater than zero");
      return;
    }

    if (!Number.isInteger(stock) || stock < 0) {
      toast.error("Stock must be a non-negative whole number");
      return;
    }

    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      toast.error("Please select a category");
      return;
    }

    const payload: ProductPayload = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      price,
      description: form.description.trim(),
      thumbnail: form.thumbnail.trim(),
      categoryId,
      stock,
    };

    try {
      setSaving(true);

      if (editingId !== null) {
        await updateAdminProduct(editingId, payload);
        toast.success("Product updated successfully");
      } else {
        await createAdminProduct(payload);
        toast.success("Product created successfully");
      }

      setFormOpen(false);
      setEditingId(null);
      setForm(emptyForm);
      setPage(1);
      setReloadKey((key) => key + 1);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to save product",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(product: AdminProduct) {
    const confirmed = window.confirm(
      `Delete "${product.name}"? This action may be blocked if the product is referenced by existing orders or cart items.`,
    );

    if (!confirmed) return;

    try {
      setDeletingId(product.id);

      await deleteAdminProduct(product.id);

      toast.success("Product deleted successfully");

      if (products.length === 1 && page > 1) {
        setPage((current) => current - 1);
      }

      setReloadKey((key) => key + 1);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete product",
      );
    } finally {
      setDeletingId(null);
    }
  }

  function handleSearch(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 text-gray-900 sm:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage your store products and inventory.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateForm}
            className="rounded-lg bg-black px-5 py-3 font-medium text-white hover:bg-gray-800"
          >
            + Add Product
          </button>
        </div>

        {formOpen && (
          <section className="mb-8 rounded-xl border bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {editingId !== null ? "Edit Product" : "Add Product"}
              </h2>

              <button
                type="button"
                onClick={closeForm}
                disabled={saving}
                className="rounded px-3 py-1 text-gray-600 hover:bg-gray-100"
              >
                Close
              </button>
            </div>

            {formLoading ? (
              <p className="py-8 text-gray-600">Loading product...</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Product Name
                    </label>
                    <input
                      required
                      maxLength={150}
                      value={form.name}
                      onChange={(event) =>
                        updateForm("name", event.target.value)
                      }
                      className="w-full rounded-lg border px-3 py-2 outline-none focus:border-black"
                      placeholder="Wireless Headphones"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Slug
                    </label>
                    <input
                      required
                      maxLength={180}
                      value={form.slug}
                      onChange={(event) =>
                        updateForm("slug", event.target.value)
                      }
                      className="w-full rounded-lg border px-3 py-2 outline-none focus:border-black"
                      placeholder="wireless-headphones"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Price (৳)
                    </label>
                    <input
                      required
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={form.price}
                      onChange={(event) =>
                        updateForm("price", event.target.value)
                      }
                      className="w-full rounded-lg border px-3 py-2 outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Stock
                    </label>
                    <input
                      required
                      type="number"
                      min="0"
                      step="1"
                      value={form.stock}
                      onChange={(event) =>
                        updateForm("stock", event.target.value)
                      }
                      className="w-full rounded-lg border px-3 py-2 outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Category
                    </label>
                    <select
                      required
                      value={form.categoryId}
                      onChange={(event) =>
                        updateForm("categoryId", event.target.value)
                      }
                      className="w-full rounded-lg border bg-white px-3 py-2 outline-none focus:border-black"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>

                    {categories.length === 0 && (
                      <p className="mt-1 text-xs text-amber-700">
                        No categories loaded. Check the categories API.
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Thumbnail URL
                    </label>
                    <input
                      required
                      type="url"
                      value={form.thumbnail}
                      onChange={(event) =>
                        updateForm("thumbnail", event.target.value)
                      }
                      className="w-full rounded-lg border px-3 py-2 outline-none focus:border-black"
                      placeholder="https://example.com/product.jpg"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Description
                  </label>
                  <textarea
                    required
                    rows={4}
                    maxLength={5000}
                    value={form.description}
                    onChange={(event) =>
                      updateForm("description", event.target.value)
                    }
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:border-black"
                    placeholder="Describe the product..."
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="submit"
                    disabled={saving || formLoading}
                    className="rounded-lg bg-black px-5 py-3 font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {saving
                      ? "Saving..."
                      : editingId !== null
                        ? "Save Changes"
                        : "Create Product"}
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
            )}
          </section>
        )}

        <section className="rounded-xl border bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b p-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-semibold">All Products</h2>
              <p className="text-sm text-gray-500">
                {totalProducts} product{totalProducts === 1 ? "" : "s"} found
              </p>
            </div>

            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Search products..."
                className="min-w-0 rounded-lg border px-3 py-2 outline-none focus:border-black sm:w-64"
              />
              <button
                type="submit"
                className="rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-black"
              >
                Search
              </button>
            </form>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      Loading products...
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      No products found.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => {
                    const categoryName =
                      product.category ||
                      categories.find(
                        (category) => category.id === product.categoryId,
                      )?.name ||
                      "Uncategorized";

                    return (
                      <tr
                        key={product.id}
                        className="border-t hover:bg-gray-50"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {product.thumbnail ? (
                              <img
                                src={product.thumbnail}
                                alt={product.name}
                                className="h-12 w-12 rounded-lg border object-cover"
                              />
                            ) : (
                              <div className="h-12 w-12 rounded-lg bg-gray-100" />
                            )}

                            <div className="min-w-0">
                              <p className="font-medium">{product.name}</p>
                              <p className="mt-1 max-w-sm text-sm text-gray-600">
                                {product.description ||
                                  "No description available"}
                              </p>
                              <p className="text-xs text-gray-500">
                                {product.slug}
                              </p>
                              <p className="text-xs text-gray-500">
                                ID: {product.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="p-4">{categoryName}</td>
                        <td className="p-4 whitespace-nowrap">
                          ৳{product.price.toLocaleString()}
                        </td>
                        <td className="p-4">
                          <span
                            className={
                              product.stock > 0
                                ? "text-green-700"
                                : "font-medium text-red-600"
                            }
                          >
                            {product.stock}
                          </span>
                        </td>
                        <td className="p-4">
                          {product.rating} ({product.reviews})
                        </td>

                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => openEditForm(product.id)}
                              className="rounded border px-3 py-1.5 hover:bg-gray-100"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(product)}
                              disabled={deletingId === product.id}
                              className="rounded border border-red-200 px-3 py-1.5 text-red-600 hover:bg-red-50 disabled:opacity-50"
                            >
                              {deletingId === product.id
                                ? "Deleting..."
                                : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
              Page {page} of {Math.max(totalPages, 1)}
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                disabled={page <= 1 || loading}
                onClick={() => setPage((current) => current - 1)}
                className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <button
                type="button"
                disabled={loading || totalPages === 0 || page >= totalPages}
                onClick={() => setPage((current) => current + 1)}
                className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
