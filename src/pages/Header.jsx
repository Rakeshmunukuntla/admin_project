import img1 from "./cjss-logo.png";

export const Header = () => {
  return (
    <header className="w-full   bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto  ">
        <img src={img1} className="w-36 h-36 object-contain" alt="CJSS Logo" />
      </div>
    </header>
  );
};

export default Header;
