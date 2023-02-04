import Header from '../main/header';

const ParkLayout = ({ children }) => (
  <div className="bg-fixed bg-center bg-park">
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-black/65">
      <Header />
      <main>{children}</main>
    </div>
  </div>
);

export default ParkLayout;
