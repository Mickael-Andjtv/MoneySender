import ClientFuture from "../ClientFuture";
import Navbar from "../Navbar";

export default function Client() {
  return (
    <div className="flex flex-col  ">
      <Navbar />
      <ClientFuture />
    </div>
  );
}
