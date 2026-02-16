import React from "react";
import { Link } from "react-router";
import { useState } from "react";
import EditProfile from "../modules/Account/views/EditProfile";
import {useSelector} from "react-redux";

const accountOptions = [
  {
    id: 1,
    name: "My Profile",
    key: "profile",
  },
  {
    id: 2,
    name: "Address Book",
    key: "address",
  },
  {
    id: 3,
    name: "My Payment Options",
    key: "payment-options",
  },
];

const orderOptions = [
  {
    id: 1,
    name: "My Returns",
    key: "returns",
  },
  {
    id: 2,
    name: "My Cancellations",
    key: "cancellations",
  },
];

const Account = () => {

  const {user, loading} = useSelector(state => state.auth)
  const [currentTab, setCurrentTab] = useState("profile");

  if(loading){
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h4 className="flex mb-16 gap-x-3 text-gray-600">
        <Link to="/">Home</Link>/
        <Link to="/account" className="text-black">
          My Account
        </Link>
      </h4>

      <section className="flex gap-x-20">
        <nav id="sidebar">
          <div className="mb-6" id="account">
            <h6 className="text-xl font-semibold mb-4">Manage My Account</h6>
            <div className="pl-10 space-y-3">
              {accountOptions.map((acc) => (
                <button
                  key={acc.id}
                  className={`${currentTab === acc.key ? "text-red-600" : "text-gray-600"} block`}
                  onClick={() => setCurrentTab(acc.key)}
                >
                  {acc.name}
                </button>
              ))}
            </div>
          </div>

          <div id="orders" className="mb-6">
            <h6 className="text-xl font-semibold mb-4">My Orders</h6>
            <div className="pl-10 space-y-3">
              {orderOptions.map((acc) => (
                <button
                  key={acc.id}
                  className={`${currentTab === acc.key ? "text-red-600" : "text-gray-600"} block`}
                  onClick={() => setCurrentTab(acc.key)}
                >
                  {acc.name}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <nav className="grow">
          {currentTab === "profile" && <EditProfile user={user} />}
        </nav>
      </section>
    </div>
  );
};

export default Account;
