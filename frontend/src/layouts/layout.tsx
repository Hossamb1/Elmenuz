import MainSection from "../components/mainSection";
import Footer from "../components/footer";
import Header from "../components/header";
import { useAuth0 } from "@auth0/auth0-react";

type Props = {
  children: React.ReactNode;
  showMain?: boolean;
};

const Layout = ({ children, showMain = false }: Props) => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>add loading page here</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {!showMain && <Header />}
      {showMain && <MainSection />}
      <div className="container py-10 m-auto">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
