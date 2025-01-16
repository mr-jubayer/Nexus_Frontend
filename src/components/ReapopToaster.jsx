import NotificationsSystem, {
  setUpNotifications,
  useNotifications,
  wyboTheme,
} from "reapop";

export default function ReapopToaster() {
  const { notifications, dismissNotification } = useNotifications();

  setUpNotifications({
    defaultProps: {
      position: "top-right",
      dismissible: true,
    },
  });
  return (
    <div>
      <NotificationsSystem
        // 2. Pass the notifications you want Reapop to display.
        notifications={notifications}
        // 3. Pass the function used to dismiss a notification.
        dismissNotification={(id) => dismissNotification(id)}
        // 4. Pass a builtIn theme or a custom theme.
        theme={wyboTheme}
      />
    </div>
  );
}
