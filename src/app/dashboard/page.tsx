import Header from "@/componets/header";
import Sidebar from "@/componets/sidebar";
import ProductList from "./components/product-list";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <div>
        <Sidebar />
        <div className="p-4 sm:ml-64">
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
