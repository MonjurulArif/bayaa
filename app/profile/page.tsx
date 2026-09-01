"use client";

import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";

import AuthGuard from "@/components/auth/AuthGuard";
import toast from "react-hot-toast";
import {
  getProfile,
  updateProfile as updateProfileApi,
} from "@/services/profile.service";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  const updateProfileStore = useAuthStore((state) => state.updateProfile);

  const [loading, setLoading] = useState(true);

  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [mobile, setMobile] = useState(user?.mobile ?? "");
  const [gender, setGender] = useState(user?.gender ?? "");
  const [birthDate, setBirthDate] = useState(user?.birthDate ?? "");
  const [division, setDivision] = useState(user?.division ?? "");
  const [district, setDistrict] = useState(user?.district ?? "");
  const [area, setArea] = useState(user?.area ?? "");
  const [address, setAddress] = useState(user?.address ?? "");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await getProfile();

        setFirstName(profile.firstName ?? "");
        setLastName(profile.lastName ?? "");
        setEmail(profile.email ?? "");
        setMobile(profile.mobile ?? "");
        setGender(profile.gender ?? "");
        setBirthDate(profile.birthDate ? profile.birthDate.split("T")[0] : "");
        setDivision(profile.division ?? "");
        setDistrict(profile.district ?? "");
        setArea(profile.area ?? "");
        setAddress(profile.address ?? "");

        updateProfileStore(profile);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [updateProfileStore]);

  const handleSave = async () => {
    try {
      const profileData = {
        firstName,
        lastName,
        email,
        mobile,
        gender,
        birthDate,
        division,
        district,
        area,
        address,
      };

      await updateProfileApi(profileData);

      updateProfileStore(profileData);

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <AuthGuard>
        <div className="p-6">Loading profile...</div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="mx-auto max-w-3xl p-6">
        <h1 className="mb-8 text-3xl font-bold">My Profile</h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full rounded border p-3"
          />

          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full rounded border p-3"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border p-3"
          />

          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full rounded border p-3"
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full rounded border p-3"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            type="date"
            className="w-full rounded border p-3"
          />
          <select
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            className="w-full rounded border p-3"
          >
            <option value="">Select Division</option>
            <option>Dhaka</option>
            <option>Chittagong</option>
            <option>Sylhet</option>
            <option>Rajshahi</option>
            <option>Khulna</option>
            <option>Barisal</option>
            <option>Rangpur</option>
            <option>Mymensingh</option>
          </select>

          <input
            type="text"
            placeholder="District"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full rounded border p-3"
          />

          <input
            type="text"
            placeholder="Area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full rounded border p-3"
          />

          <textarea
            placeholder="House, Road, Area Details"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={4}
            className="w-full rounded border p-3"
          />
          <button
            onClick={handleSave}
            className="rounded bg-black px-6 py-3 text-white cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </AuthGuard>
  );
}
