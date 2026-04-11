import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import axios from "axios";
import { BACKEND_URL } from "../../../constants";
import { useCC } from "../../../context/Context";

export const MemberInfo = ({ member, setShowInfo, group }) => {
  const { loginUser, getGroups } = useCC();

  // Date formatter
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const year = date.getFullYear();

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const getOrdinal = (n) => {
      if (n > 3 && n < 21) return "th";
      switch (n % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${day}${getOrdinal(day)} ${months[date.getMonth()]}, ${year}`;
  };

  const removeMember = async (removeMemberId, groupId) => {
    try {
      const res = await axios.patch(BACKEND_URL + "/group/removeMemeber", {
        removeMemberId,
        groupId,
      });
      getGroups();
      setShowInfo(false);
    } catch (error) {
      console.log(error);
    }
  };

  const makeAdmin = async (memberId, groupId) => {
    try {
      const res = await axios.patch(BACKEND_URL + "/group/makeAdmin", {
        memberId,
        groupId,
      });
      getGroups();
      setShowInfo(false);
    } catch (error) {
      console.log(error);
    }
  };

  const removeAdmin = async (memberId, groupId) => {
    try {
      const res = await axios.patch(BACKEND_URL + "/group/removeAdmin", {
        memberId,
        groupId,
      });
      getGroups();
      setShowInfo(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-90 w-80 bg-white rounded-2xl  p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center  pb-2">
        <p className="text-lg font-semibold text-gray-800">Member Info</p>
        <IoClose
          onClick={() => setShowInfo(false)}
          className="text-gray-500 hover:text-red-500 cursor-pointer text-xl"
        />
      </div>

      {/* Profile */}
      <div className="flex items-center gap-4">
        <img
          className="h-14 w-14 object-cover rounded-full border"
          src={member?.profileImage}
          alt="profile"
        />
        <div>
          <p className="text-lg font-semibold text-gray-900">
            {member?.username}
          </p>
          <p className="text-sm text-gray-500">
            {member?.bio || "No bio available"}
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 text-sm text-gray-600">
        <p>
          <span className="font-medium text-gray-800">Email:</span>{" "}
          {member?.email}
        </p>
        <p>
          <span className="font-medium text-gray-800">User since:</span>{" "}
          {member?.createdAt ? formatDate(member.createdAt) : "N/A"}
        </p>
      </div>

      {/* Actions */}
      {(loginUser?._id?.toString() === group?.superAdminId?.toString() ||
        group.adminId.includes(loginUser._id)) &&
        member._id !== group?.superAdminId && (
          <div className="flex flex-col gap-2 mt-2">
            {/* Make / Remove Admin */}
            <button
              className={` rounded-md text-sm font-medium transition-all duration-200 cursor-pointer
      `}
            >
              {group.adminId.includes(member._id) ? (
                <>
                  <div
                    onClick={() => removeAdmin(member._id, group._id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600"
                  >
                    <IoMdRemoveCircleOutline size={18} />
                    <span>Remove as admin</span>
                  </div>
                </>
              ) : (
                <>
                  <div
                    onClick={() => makeAdmin(member._id, group._id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white"
                  >
                    <MdOutlineAdminPanelSettings size={18} />
                    <span>Make as admin</span>
                  </div>
                </>
              )}
            </button>

            {/* Remove Member */}
            <button
              onClick={() => removeMember(member._id, group._id)}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-red-100 text-red-600 hover:bg-red-200 transition cursor-pointer"
            >
              <IoMdRemoveCircleOutline size={18} />
              <span>Remove from group</span>
            </button>
          </div>
        )}
      {member._id === group?.superAdminId && (
        <p className="px-4 py-2 bg-green-500 text-white rounded items-center justify-center">
          Creator of this group
        </p>
      )}
    </div>
  );
};
