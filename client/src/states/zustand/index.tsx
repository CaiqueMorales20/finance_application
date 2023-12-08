'use client'

import { useEffect } from "react";
import { updateUserInfo } from "./services/updateUserInfo";
import { updateCategories } from "./services/updateCategories";
import { updateEntries } from "./services/updateEntries";
import { useStore } from "./store";

// Functional Component
export default function Zustand() {
  const {entries} = useStore()

  useEffect(() => {
    updateUserInfo()
    updateCategories()
    updateEntries()
  }, [])

  // Rendering
  return <></>;
}