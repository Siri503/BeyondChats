import { useSelector, useDispatch } from "react-redux";
import { deleteUserStart, deleteUserSuccess, deleteUserFailure, signOutUserStart, signOutUserSuccess, signOutUserFailure } from "../redux/user/userSlice";
import { useState } from "react";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`/api/auth/signout`);
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-xl rounded-lg">
      <h1 className="text-4xl text-blue-800 font-semibold text-center my-6">Profile</h1>

      {currentUser ? (
        <div className="space-y-4">
          <div className="border-b pb-4">
            <p className="text-xl"><strong>Email:</strong> {currentUser.email}</p>
          </div>

          <div className="text-lg text-gray-700">
            <p className="mb-4">
              Welcome to <strong>BeyondChats</strong>, a platform designed to simplify the integration of AI-powered assistants.
            </p>
            <ul className="list-disc pl-5">
              <li>Seamless chatbot integration for websites</li>
              <li>Automated chatbot training from website content</li>
              <li>Easy-to-follow integration guides</li>
              <li>Test and fine-tune chatbot responses</li>
            </ul>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handleDeleteUser}
              className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition"
            >
              Delete Account
            </button>
            <button
              onClick={handleSignOut}
              className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <p className="text-red-500 text-center">User not logged in.</p>
      )}

      {/* Replace "Chat with Us" button with image */}
      <div className="fixed bottom-5 right-5 cursor-pointer" onClick={() => window.location.href = '/chat-with-us'}>
        <img 
          src="https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/chatbot-icon.png" 
          alt="Chatbot Icon"
          className="w-16 h-16 rounded-full shadow-lg hover:opacity-80 transition-all" 
        />
      </div>
    </div>
  );
};

export default Profile;
