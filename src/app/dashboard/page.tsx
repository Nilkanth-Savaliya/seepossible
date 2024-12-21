import Header from "@/componets/header";
import Sidebar from "@/componets/sidebar";


const Dashboard = () => {
  return (
    <div>
      <Header />
      <div>
        <Sidebar />
        <div className="p-4 sm:ml-64"></div>
      </div>
    </div>
  );
};

export default Dashboard;
