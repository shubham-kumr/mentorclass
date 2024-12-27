import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="pl-64">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 