"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import {
  getErrorDetails,
} from "@/services/analytics.service";

import Loader from "@/components/ui/Loader";

import ErrorSummaryCards from "@/components/errors/ErrorSummaryCards";

import ErrorTable from "@/components/errors/ErrorTable";

export default function ErrorsPage() {
  const { id } = useParams();

  const [errors, setErrors] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadData =
      async () => {
        try {
          const res =
            await getErrorDetails(id);

          setErrors(
            res.data.data
          );
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    loadData();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="
          text-3xl
          font-bold
          "
        >
          Error Center
        </h1>

        <p
          className="
          text-slate-400
          mt-2
          "
        >
          Analyze failures and
          monitor API reliability.
        </p>
      </div>

      <ErrorSummaryCards
        errors={errors}
      />

      <ErrorTable
        errors={errors}
      />
    </div>
  );
}