export default function Navbar() {
  const links = ["Envoyer", "Client", "Taux", "Frais"];
  return (
    <>
      <div className="flex flex-row  text-base ">
        {links.map((link, index) => (
          <a href="#" className="basis-64 hover:bg-blue-100 p-2 rounded-lg" key={index}>
            {" "}
            {link}{" "}
          </a>
        ))}
      </div>
    </>
  );
}
