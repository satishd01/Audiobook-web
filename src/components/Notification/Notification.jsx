import React from 'react';
import { IoIosNotifications } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { toggleNotification } from '../../app/slices/notificationSlice';
import useWebSocket from '../../utils/webSocketService';
import Oops from '../../images/Oops.png';

const Notification = () => {
  const dispatch = useDispatch();
  const isNotificationOpen = useSelector(state => state.notification.isNotificationOpen);

  const toggleHandler = () => {
    dispatch(toggleNotification());
  };

  useWebSocket('wss://audiobook.shellcode.cloud');

  return (
    <div className="relative">
      <div
        className="text-2xl md:mt-0 mt-3 flex justify-end cursor-pointer"
        onClick={toggleHandler}>
        <IoIosNotifications />
      </div>
      {isNotificationOpen && (
        <div className="absolute md:top-[50px] md:mt-0 mt-5 right-0 w-[300px] h-auto md:min-w-[480px] md:max-w-[480px] z-50">
          <div className="absolute -top-4 right-1 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[17px] border-l-transparent border-r-transparent border-b-[#232323]"></div>

          <div className="py-4 bg-[#232323] shadow-lg rounded-md p-3">
            <p>Notifications</p>
            <ul className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm mt-2">
              <li className="bg-[#151515] rounded-lg border px-2 py-1">
                Podcasts
              </li>
              <li className="bg-[#151515] rounded-lg border px-2 py-1 whitespace-nowrap">
                Audio Books
              </li>
              <li className="bg-[#151515] rounded-lg border px-2 py-1">
                Stories
              </li>
            </ul>
            <div className="flex flex-col items-center gap-3 justify-center mt-7 mb-4">
              <img alt="empty" src={Oops} className="md:w-auto w-32" />
              <p>No New Notifications!</p>
              <p className="text-sm text-[#4f4f4f]">
                Till then explore some new books.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;