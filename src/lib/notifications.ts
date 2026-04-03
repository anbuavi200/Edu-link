export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    console.error("This browser does not support desktop notifications.");
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }

  return false;
};

export const scheduleNotification = (
  title: string,
  body: string,
  targetTime: Date,
  offsetMinutes: number = 0
) => {
  if (Notification.permission !== "granted") {
    console.error("Notification permission not granted.");
    return;
  }

  // Calculate the actual notification time
  const notificationTime = new Date(targetTime.getTime() - offsetMinutes * 60 * 1000);
  const now = new Date();

  const delayMs = notificationTime.getTime() - now.getTime();

  if (delayMs <= 0) {
    console.warn("Target time is in the past. Showing notification immediately.");
    // Show immediately if it's already past the time
    new Notification(title, { body });
    return;
  }

  console.log(`Scheduling notification for ${notificationTime.toLocaleString()} (in ${delayMs}ms)`);

  setTimeout(() => {
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(title, {
          body,
          icon: "/sparkles.png",
          badge: "/sparkles.png",
          data: {
            url: window.location.origin + "/dashboard"
          }
        });
      });
    } else {
      new Notification(title, { body });
    }
  }, delayMs);
};

export const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registered with scope:", registration.scope);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    });
  }
};
