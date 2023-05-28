import "styles/globals.scss";
import MenuWrapper from "components/CmsMenu/MenuWrapper/MenuWrapper";

export default function RootLayout({ children }) {
  return (
    <section>
      <MenuWrapper>{children}</MenuWrapper>
    </section>
  );
}
