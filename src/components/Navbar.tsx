export default function Navbar() {
  const links = ["ENVOYER", "CLIENT", "TAUX", "FRAIS"];
  return (
    <>
      <nav>
        {links.map((link, index) => (
          <a href="#" key={index}>
            {" "}
            {link}{" "}
          </a>
        ))}
      </nav>
      <h5 className="text-3xl font-bold underline">Mickael</h5>
    </>
  );
}
