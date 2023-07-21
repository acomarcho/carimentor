const MobileNavbar = () => {
  return (
    <div className="lg:hidden">
      <h1>Mobile navbar</h1>
    </div>
  );
};

const DesktopNavbar = () => {
  return (
    <div className="hidden lg:block">
      <h1>Desktop navbar</h1>
    </div>
  );
};

export default function Navbar() {
  return (
    <>
      <MobileNavbar />
      <DesktopNavbar />
    </>
  );
}
