"use client";

import { useEffect, useState } from "react";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import { getCurrentUser } from "@/services/auth.service";

import toast from "react-hot-toast";
import PasswordInput from "@/components/ui/PasswordInput";
import { useRouter } from "next/navigation";

export default function AccountPage() {

    
  const router =
  useRouter();


  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

    const [
  currentPassword,
  setCurrentPassword,
] = useState("");

const [
  newPassword,
  setNewPassword,
] = useState("");

const [
  deletePassword,
  setDeletePassword,
] = useState("");

const [
  deleting,
  setDeleting,
] = useState(false);

const [
  passwordLoading,
  setPasswordLoading,
] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res =
          await getCurrentUser();

        setUser(
          res.data.data
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handlePasswordChange =
  async () => {

    try {

      setPasswordLoading(true);

      await changePassword({
        currentPassword,
        newPassword,
      });

      toast.success(
        "Password updated"
      );

      setCurrentPassword("");
      setNewPassword("");

    } catch (error) {

      toast.error(
        error.response?.data
          ?.message
      );

    } finally {

      setPasswordLoading(false);

    }
  };


const handleDeleteAccount =
  async () => {

    const confirmed =
      window.confirm(
        "Delete account permanently?"
      );

    if (!confirmed) return;

    try {

      setDeleting(true);

      await deleteAccount({
        password:
          deletePassword,
      });

      toast.success(
        "Account deleted"
      );

      window.location.href =
        "/login";

    } catch (error) {

      toast.error(
        error.response?.data
          ?.message
      );

    } finally {

      setDeleting(false);

    }
  };

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
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
          Account Settings
        </h1>

        <p
          className="
          text-gray-500
          mt-2
          "
        >
          Manage your profile and security settings.
        </p>
      </div>

      {/* Profile */}

      <Card>

        <h2
          className="
          text-xl
          font-semibold
          mb-4
          "
        >
          Profile
        </h2>

        <div className="space-y-4">

          <Input
            label="Name"
            value={
              user?.name || ""
            }
            readOnly
          />

          <Input
            label="Email"
            value={
              user?.email || ""
            }
            readOnly
          />

          <div>

            <p
              className="
              text-sm
              text-gray-500
              "
            >
              Email Status
            </p>

            <span
              className={`
                inline-block
                mt-2
                px-3
                py-1
                rounded-full
                text-sm
                ${
                  user?.isVerified
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }
              `}
            >
              {user?.isVerified
                ? "Verified"
                : "Not Verified"}
            </span>

          </div>

          <div>

            <p
              className="
              text-sm
              text-gray-500
              "
            >
              Member Since
            </p>

            <p className="mt-1">
              {new Date(
                user?.createdAt
              ).toLocaleDateString()}
            </p>

          </div>

        </div>

      </Card>

      {/* Security */}

      <Card>

  <h2
    className="
    text-xl
    font-semibold
    mb-4
    "
  >
    Security
  </h2>

  <div className="space-y-4">

    <PasswordInput
      label="Current Password"
      registration={{
        value:
          currentPassword,
        onChange: (e) =>
          setCurrentPassword(
            e.target.value
          ),
      }}
    />

    <PasswordInput
      label="New Password"
      registration={{
        value:
          newPassword,
        onChange: (e) =>
          setNewPassword(
            e.target.value
          ),
      }}
    />

    <Button
      onClick={
        handlePasswordChange
      }
      disabled={
        passwordLoading
      }
    >
      {passwordLoading
        ? "Updating..."
        : "Change Password"}
    </Button>

  </div>

</Card>

      {/* Danger Zone */}

      <Card>

  <h2
    className="
    text-red-600
    font-semibold
    mb-4
    "
  >
    Danger Zone
  </h2>

  <PasswordInput
    label="Confirm Password"
    registration={{
      value:
        deletePassword,
      onChange: (e) =>
        setDeletePassword(
          e.target.value
        ),
    }}
  />

  <Button
    onClick={
      handleDeleteAccount
    }
    disabled={deleting}
    className="
    bg-red-600
    hover:bg-red-700
    mt-4
    "
  >
    {deleting
      ? "Deleting..."
      : "Delete Account"}
  </Button>

</Card>

    </div>
  );
}