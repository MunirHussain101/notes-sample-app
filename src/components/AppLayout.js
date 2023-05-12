import Header from './Header';

const AppLayout = ({ children }) => {
  return (
    <div className="">
      <div>
        <Header />
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
