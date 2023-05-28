import "styles/globals.scss";
import Providers from "components/Providers/Providers";
import Popups from "popups/popup";
import Notifications from "components/Notifications/notifications";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body className="orange">
        <Providers>
          {children}

          <Popups />
          <Notifications />

        </Providers>
      </body>
    </html>
  );
}
