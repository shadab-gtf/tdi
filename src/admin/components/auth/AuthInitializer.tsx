"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { validateSession } from "@/features/slices/authSlice";

export default function AuthInitializer(): null {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(validateSession())
      .unwrap()
      .catch(() => {
        router.replace("/admin/login");
      });
  }, [dispatch, router]);

  return null;
}
