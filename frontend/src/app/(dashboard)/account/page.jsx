"use client";

import { useEffect, useState } from "react";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import PasswordInput from "@/components/ui/PasswordInput";

import {
  getCurrentUser,
  changePassword,
  deleteAccount,
} from "@/services/auth.service";

import toast from "react-hot-toast";

import {
  User,
  Shield,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function AccountPage() {
  const [user, setUser] = useState(null);

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

        setUser(res.data.data);
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
          "Password updated successfully"
        );

        setCurrentPassword("");
        setNewPassword("");
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed to update password"
        );
      } finally {
        setPasswordLoading(false);
      }
    };

  const handleDeleteAccount =
    async () => {
      const confirmed =
        window.confirm(
          "Are you sure you want to permanently delete your account?"
        );

      if (!confirmed) return;

      try {
        setDeleting(true);

        await deleteAccount({
          password:
            deletePassword,
        });

        toast.success(
          "Account deleted successfully"
        );

        window.location.href =
          "/login";
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed to delete account"
        );
      } finally {
        setDeleting(false);
      }
    };

  if (loading) {
    return (
      <div
        className="
        min-h-[300px]
        flex
        items-center
        justify-center
        text-slate-400
        "
      >
        Loading Account...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}

     <div
  className="
  relative

  overflow-hidden

  rounded-3xl

  border
  border-slate-800

  bg-gradient-to-br
  from-slate-900
  via-slate-950
  to-slate-950

  p-6
  md:p-8
  "
>
  <div
    className="
    absolute

    top-0
    right-0

    h-40
    w-40

    rounded-full

    bg-orange-500/10

    blur-3xl
    "
  />

  <div className="relative">
    <p
      className="
      text-orange-400
      text-sm
      font-medium
      uppercase
      tracking-wider
      "
    >
      Account
    </p>

    <h1
      className="
      mt-2

      text-3xl
      md:text-4xl

      font-bold

      text-white
      "
    >
      Account Settings
    </h1>

    <p
      className="
      mt-3

      max-w-2xl

      text-slate-400
      "
    >
      Manage your profile,
      credentials, and security
      settings for your PingNest
      workspace.
    </p>
  </div>
</div>

      {/* Profile */}

      <Card className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <User
            size={22}
            className="text-orange-400"
          />

          <h2
            className="
            text-xl
            font-semibold
            text-white
            "
          >
            Profile Information
          </h2>
        </div>

        <div className="space-y-5">
          <Input
            label="Name"
            value={user?.name || ""}
            readOnly
          />

          <Input
            label="Email"
            value={user?.email || ""}
            readOnly
          />

          <div>
            <p
              className="
              text-sm
              text-slate-500
              "
            >
              Email Status
            </p>

            <div className="mt-3">
              <span
                className={`
                  inline-flex
                  items-center
                  gap-2

                  px-3
                  py-1.5

                  rounded-full
                  text-sm
                  border

                  ${
                    user?.isVerified
                      ? `
                        bg-green-500/10
                        text-green-400
                        border-green-500/20
                      `
                      : `
                        bg-red-500/10
                        text-red-400
                        border-red-500/20
                      `
                  }
                `}
              >
                {user?.isVerified ? (
                  <CheckCircle2
                    size={14}
                  />
                ) : (
                  <XCircle size={14} />
                )}

                {user?.isVerified
                  ? "Verified"
                  : "Not Verified"}
              </span>
            </div>
          </div>

          <div>
            <p
              className="
              text-sm
              text-slate-500
              flex
              items-center
              gap-2
              "
            >
              <Calendar size={14} />
              Member Since
            </p>

            <p
              className="
              mt-2
              text-white
              "
            >
              {new Date(
                user?.createdAt
              ).toLocaleDateString()}
            </p>
          </div>
        </div>
      </Card>

      {/* Security */}

      <Card>
        <div className="flex items-center gap-3 mb-6">
          <Shield
            size={22}
            className="text-orange-400"
          />

          <h2
            className="
            text-xl
            font-semibold
            text-white
            "
          >
            Security
          </h2>
        </div>

        <div className="space-y-5">
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
              value: newPassword,
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
            className="
            bg-orange-500
            hover:bg-orange-400
            transition-all
            "
          >
            {passwordLoading
              ? "Updating..."
              : "Change Password"}
          </Button>
        </div>
      </Card>

      {/* Danger Zone */}

      <Card
        className="
        border
        border-red-500/20
        "
      >
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle
            size={22}
            className="text-red-400"
          />

          <h2
            className="
            text-xl
            font-semibold
            text-red-400
            "
          >
            Danger Zone
          </h2>
        </div>

        <p
          className="
          text-slate-400
          mb-5
          "
        >
          Deleting your account is
          permanent and cannot be
          undone.
        </p>

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
  className="
  mt-4

  w-full
  sm:w-auto

  bg-red-600
  hover:bg-red-500
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