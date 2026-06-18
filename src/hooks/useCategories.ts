"use client";

import { useEffect, useState } from "react";
import { categoriesService } from "@/services/categories.service";
import {
  CreateCategoryPayload,
  EventCategory,
  UpdateCategoryPayload,
} from "@/types/service.types";

export function useCategories() {
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadCategories() {
    try {
      setIsLoading(true);
      setError("");
      const data = await categoriesService.getAll();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar categorías");
    } finally {
      setIsLoading(false);
    }
  }

  async function createCategory(payload: CreateCategoryPayload) {
    const created = await categoriesService.create(payload);
    setCategories((prev) => [created, ...prev]);
  }

  async function updateCategory(id: string, payload: UpdateCategoryPayload) {
    const updated = await categoriesService.update(id, payload);
    setCategories((prev) =>
      prev.map((category) => (category.id === id ? updated : category))
    );
  }

  async function toggleCategoryStatus(id: string, isActive: boolean) {
    const updated = await categoriesService.toggleStatus(id, isActive);
    setCategories((prev) =>
      prev.map((category) => (category.id === id ? updated : category))
    );
  }

  async function deleteCategory(id: string) {
  await categoriesService.remove(id);
  setCategories((prev) => prev.filter((category) => category.id !== id));
}

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    categories,
    isLoading,
    error,
    loadCategories,
    createCategory,
    updateCategory,
    toggleCategoryStatus,
    deleteCategory,
  };
}