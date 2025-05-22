export default function Navbar() {
  const links = ["Envoyer", "Client", "Taux", "Frais"];
  return (
    <>
      <div className="flex flex-row font-mono text-base">
        {links.map((link, index) => (
          <a href="#" className="basis-64" key={index}>
            {" "}
            {link}{" "}
          </a>
        ))}
      </div>
    </>
  );
}
