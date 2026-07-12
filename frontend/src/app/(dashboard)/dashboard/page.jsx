"use client";

import { useEffect, useState } from "react";

import {
  getDashboardOverview,
} from "@/services/dashboard.service";

import {
  getProjects,
} from "@/services/project.service";

import StatCard from "@/components/ui/StatCard";
import Card from "@/components/ui/Card";

import Link from "next/link";
import Loader from "@/components/ui/Loader";

export default function DashboardPage() {

  const [overview, setOverview] =
    useState(null);

  const [projects, setProjects] =
    useState([]);

    const [loading, setLoading] =
  useState(true);

  useEffect(() => {

  const loadData = async () => {

    try {

      const overviewRes =
        await getDashboardOverview();

      setOverview(
        overviewRes.data.data
      );

      setProjects(
        overviewRes.data.data.projects
      );

    } catch (error) {

      console.error(error);

    }finally {
  setLoading(false);
}

  };

  loadData();

}, []);


if (loading) {
  return <Loader />;
}

  return (
    <div className="space-y-6">

      <div
  className="
  flex
  justify-between
  items-center
  "
>

  <h1 className="text-3xl font-bold">
    Dashboard
  </h1>

  <Link
    href="/projects/new"
    className="
    px-4
    py-2
    bg-black
    text-white
    rounded
    "
  >
    + New Project
  </Link>

</div>  

      <div className="grid md:grid-cols-4 gap-4">

        <StatCard
          title="Projects"
          value={
            overview?.totalProjects || 0
          }
        />

        <StatCard
          title="Active"
          value={
            overview?.activeProjects || 0
          }
        />

        <StatCard
          title="Requests"
          value={
            overview?.totalRequests || 0
          }
        />

        <StatCard
  title="Health Score"
  value={`${overview?.averageHealthScore || 0}/100`}
/>

      </div>

      <Card>

  <h2
    className="
    text-xl
    font-semibold
    mb-4
    "
  >
    Projects
  </h2>

  <div className="space-y-3">

    {projects.length === 0 ? (

  <div className="text-center py-12">

    <h3 className="text-xl font-semibold mb-2">
      No Projects Yet
    </h3>

    <p className="text-gray-500 mb-4">
      Create your first project to start monitoring APIs.
    </p>

    <Link
      href="/projects/new"
      className="
      inline-block
      px-4
      py-2
      bg-black
      text-white
      rounded
      "
    >
      Create Project
    </Link>

  </div>

) : (

  projects.map((project) => (

      <Link
        key={project._id}
        href={`/projects/${project._id}`}
        className="
        block
        border
        rounded-lg
        p-4
        hover:bg-gray-50
        "
      >

        <div
          className="
          flex
          justify-between
          items-start
          "
        >

          <div>

            <h3
              className="
              font-medium
              text-lg
              "
            >
              {project.name}
            </h3>

            <p
              className="
              text-sm
              text-gray-500
              mt-1
              "
            >
              {project.description}
            </p>

          </div>

          <div
            className="
            flex
            flex-col
            items-end
            gap-2
            "
          >

            <span
              className={`
                px-2
                py-1
                text-xs
                rounded-full
                ${
                  project.status ===
                  "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }
              `}
            >
              {project.status}
            </span>

            <p
              className="
              text-xs
              text-gray-500
              "
            >
              Last Request:
              {" "}
              {project.lastRequest
                ? new Date(
                    project.lastRequest
                  ).toLocaleString()
                : "Never"}
            </p>

          </div>

        </div>

      </Link>

    ))

)}

  </div>

</Card>



    </div>
  );
}