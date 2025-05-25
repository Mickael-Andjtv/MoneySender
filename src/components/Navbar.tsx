interface NavbarProps {
  handlepage: (page: number) => void;
}
export default function Navbar({ handlepage }: NavbarProps) {
  const links = ["Envoyer", "Client", "Taux", "Frais"];
  return (
    <>
      <div className="flex flex-row  text-base ">
        {links.map((link, index) => (
          <a
            href="#"
            className="basis-64 hover:bg-blue-100 p-2 rounded-lg"
            key={index}
            onClick={() => handlepage(index)}
          >
            {" "}
            {link}{" "}
          </a>
        ))}
      </div>
    </>
  );
}
