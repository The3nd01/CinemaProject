import Carrousel from "../../components/Carrousel";
import ContadorOfertas from "../../components/ContadorOfertas";
import Ofertas from "../../components/Ofertas";

function Home() {
  return (
    <div className="bg-black h-full w-full font-mono	overflow-x-hidden">
      <hr />
      <div className="w-full flex justify-center">
        <h1 className="text-3d mb-4 pt-6 text-4xl font-extrabold leading-none tracking-tight text-blue-900 md:text-5xl lg:text-6xl dark:text-white shadow-md">
          ESTRENOS POPULARES
        </h1>
      </div>

      <Carrousel />
      <section className="w-full h-full">
        <div className="w-full flex justify-center">
          <h1 className="text-3d mb-4 pt-6 text-4xl font-extrabold leading-none tracking-tight text-blue-900 md:text-5xl lg:text-6xl dark:text-white">
            OFERTAS DEL MES
          </h1>
        </div>

        <Ofertas />
        <ContadorOfertas />
      </section>
    </div>
  );
}

export default Home;
