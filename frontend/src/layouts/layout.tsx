import MainSection from "../components/mainSection";
import Footer from "../components/footer";
import Header from "../components/header";

type Props = {
  children: React.ReactNode;
  showMain?: boolean;
};

const layout = ({ children, showMain = false }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      {!showMain && <Header />}
      {showMain && <MainSection />}
      <div className="container flex-1 py-20 mx-auto">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
