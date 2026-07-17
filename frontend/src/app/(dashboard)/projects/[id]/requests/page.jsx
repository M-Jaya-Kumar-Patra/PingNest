"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getAllRequests } from "@/services/analytics.service";

import Loader from "@/components/ui/Loader";

import RequestsFilters from "@/components/requests/RequestsFilters";
import RequestsTable from "@/components/requests/RequestsTable";
import Pagination from "@/components/requests/Pagination";

export default function RequestsPage() {
  const params = useParams();

  const [requests, setRequests] = useState([]);

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const [pages, setPages] = useState(1);

  const [search, setSearch] = useState("");

  const [method, setMethod] = useState("");

  const [status, setStatus] = useState("");

  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (initialLoading) {
          setLoading(true);
        }

        const res = await getAllRequests(params.id, {
          page,
          search,
          method,
          status,
        });

        setRequests(res.data.data.requests);

        setPages(res.data.data.pagination.pages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    };

    loadData();
  }, [params.id, page, search, method, status]);

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
          Request Explorer
        </h1>

        <p
          className="
          text-slate-400
          mt-2
          "
        >
          Search and analyze incoming API traffic.
        </p>
      </div>

      <RequestsFilters
        search={search}
        setSearch={setSearch}
        method={method}
        setMethod={setMethod}
        status={status}
        setStatus={setStatus}
      />

      <RequestsTable requests={requests} />

      <Pagination page={page} pages={pages} setPage={setPage} />
    </div>
  );
}
