import Container from "./_components/container";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default MainLayout;