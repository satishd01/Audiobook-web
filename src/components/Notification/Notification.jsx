import React, { useEffect, useState } from 'react';
import { IoIosNotifications } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { toggleNotification } from '../../app/slices/notificationSlice';
import useWebSocket from '../../utils/webSocketService';
import Oops from '../../images/Oops.png';

const Notification = () => {
  const dispatch = useDispatch();
  const isNotificationOpen = useSelector(state => state.notification.isNotificationOpen);
  const [notifications, setNotifications] = useState([]);
  console.log(notifications,"notifications");
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('podcast'); // Default selected category

  const toggleHandler = () => {
    dispatch(toggleNotification());
  };

  // useWebSocket('wss://audiobook.shellcode.cloud');

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage
      const userId = localStorage.getItem('userId'); // Get userId from localStorage

      if (!token || !userId) {
        console.error('Token or UserId not found in localStorage');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://audiobook.shellcode.cloud/api/notifications/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'UserId': userId,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }

        const data = await response.json();
        console.log(data,"data")
        setNotifications(data); // Assuming the API returns the notifications directly
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Filter notifications based on the selected category
  const filteredNotifications = notifications[selectedCategory] || [];

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
            <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm mt-2">
              <button
                className={`bg-[#151515] rounded-lg border px-2 py-1 ${
                  selectedCategory === 'podcast' ? 'bg-blue-500' : ''
                }`}
                onClick={() => setSelectedCategory('podcast')}
              >
                Podcasts
              </button>
              <button
                className={`bg-[#151515] rounded-lg border px-2 py-1 whitespace-nowrap ${
                  selectedCategory === 'audiobook' ? 'bg-blue-500' : ''
                }`}
                onClick={() => setSelectedCategory('audiobook')}
              >
                Audio Books
              </button>
              <button
                className={`bg-[#151515] rounded-lg border px-2 py-1 ${
                  selectedCategory === 'story' ? 'bg-blue-500' : ''
                }`}
                onClick={() => setSelectedCategory('story')}
              >
                Stories
              </button>
            </div>
            {loading ? (
              <div className="flex flex-col items-center gap-3 justify-center mt-7 mb-4">
                <p>Loading...</p>
              </div>
            ) : filteredNotifications.length > 0 ? (
              <div className="mt-4">
                {filteredNotifications.map((notification, index) => (
                  <div key={index} className="mb-4 p-2 bg-[#151515] rounded-lg">
                    <p className="font-semibold">{JSON.parse(notification.content).title}</p>
                    <p className="text-sm text-gray-400">{notification.creator_name}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(notification.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 justify-center mt-7 mb-4">
                <img alt="empty" src={Oops} className="md:w-auto w-32" />
                <p>No New Notifications!</p>
                <p className="text-sm text-[#4f4f4f]">
                  Till then explore some new books.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;