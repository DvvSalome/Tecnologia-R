import DatosEmpresaCard from "../../components/cards/DatosEmpresaCard";
import FormularioContacto from "../../components/formularios/FormularioContacto";

const FormularioSection = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-stretch gap-4 sm:gap-6 lg:gap-8 px-3 sm:px-4 py-6 sm:py-10">
      <FormularioContacto />
      <DatosEmpresaCard />
    </div>
  );
};

export default FormularioSection;
