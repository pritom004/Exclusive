import React, { useEffect, useState } from "react";
import Input from "../../../components/common/Input";
import Button from "../../../components/ui/Button";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../../redux/slices/authslice";
import toast from "react-hot-toast";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFields((previous) => ({
        ...previous,
        firstName: user.name.split(" ")[0] ?? "",
        lastName: user.name.split(" ")[1] ?? "",
        email: user.email ?? "",
        address: user.address ?? "",
      }));
    }
  }, []);

  const validateForm = () => {
    if (!fields.firstName.trim()) return toast.error("First name is required");
    if (!fields.lastName.trim()) return toast.error("Last name is required");
    if (!fields.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(fields.email))
      return toast.error("Invalid email format");

    if (
      fields.currentPassword ||
      fields.newPassword ||
      fields.confirmNewPassword
    ) {
      if (!fields.currentPassword) return toast.error("Password is required");
      if (fields.newPassword.length < 6)
        return toast.error("Password must be at least 6 characters");
      if (fields.newPassword !== fields.confirmNewPassword) {
        return toast.error("Password doesn't match");
      }
    }

    return true;
  };

  const handleEditProfile = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const isValidated = validateForm();

    if (isValidated) {
      setIsSubmitting(false);
      dispatch(
        updateProfile({
          fullName: `${fields.firstName} ${fields.lastName}`,
          email: fields.email,
          address: fields.email,
          currentPassword: fields.currentPassword,
          newPassword: fields.newPassword,
        }),
      );
      return;
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleEditProfile} className="shadow px-16 py-10 space-y-4">
      <h4 className="text-xl font-semibold text-red-600">Edit Your Profile</h4>

      <nav className="gap-8 flex flex-wrap">
        <div className="grow">
          <label htmlFor="firstName" className="block mb-1">
            First Name
          </label>
          <Input
            value={fields.firstName}
            onChange={(e) =>
              setFields((prev) => ({ ...prev, firstName: e.target.value }))
            }
            id="firstName"
            className="w-full"
            type="text"
            placeholder="John"
          />
        </div>
        <div className="grow">
          <label htmlFor="lastName" className="block mb-1">
            Last Name
          </label>
          <Input
            value={fields.lastName}
            onChange={(e) =>
              setFields((prev) => ({ ...prev, lastName: e.target.value }))
            }
            type="text"
            className="w-full"
            id="lastName"
            placeholder="Dao"
          />
        </div>
      </nav>

      <nav className="gap-8 flex flex-wrap">
        <div className="grow">
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <Input
            value={fields.email}
            onChange={(e) =>
              setFields((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full"
            id="email"
            type="text"
            placeholder="John@gmail.com"
          />
        </div>
        <div className="grow">
          <label htmlFor="address" className="block mb-1">
            Address
          </label>
          <Input
            value={fields.address}
            onChange={(e) =>
              setFields((prev) => ({ ...prev, address: e.target.value }))
            }
            type="text"
            id="address"
            placeholder="Springfield, IL 62704, USA"
            className="w-full"
          />
        </div>
      </nav>

      <nav>
        <label htmlFor="currentPassword" className="mb-1">
          Password Changes
        </label>
        <Input
          type="password"
          id="currentPassword"
          placeholder="Current Password"
          className="block mb-2.5 w-full"
          value={fields.currentPassword}
          onChange={(e) =>
            setFields((prev) => ({ ...prev, currentPassword: e.target.value }))
          }
        />
        <Input
          type="password"
          placeholder="New Password"
          className="block mb-2.5 w-full"
          value={fields.newPassword}
          onChange={(e) =>
            setFields((prev) => ({ ...prev, newPassword: e.target.value }))
          }
        />
        <Input
          type="password"
          placeholder="Confirm New Password"
          className="block mb-2.5 w-full"
          value={fields.confirmNewPassword}
          onChange={(e) =>
            setFields((prev) => ({
              ...prev,
              confirmNewPassword: e.target.value,
            }))
          }
        />
      </nav>

      <nav className="flex justify-end">
        <Button
          disabled={isSubmitting}
          className="mt-2 disabled:opacity-60"
          type="submit"
        >
          Save Changes
        </Button>
      </nav>
    </form>
  );
};

export default EditProfile;
