import { Navbar } from "../components";

function Dashboard() {
  return (
    <section className='flex flex-col'>
      <Navbar />

      <div className='flex-1 p-5'>
        <p>Dashboard goes here</p>
      </div>
    </section>
  );
}

export default Dashboard;
