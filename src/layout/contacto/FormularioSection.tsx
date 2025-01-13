import DatosEmpresaCard from "../../components/cards/DatosEmpresaCard";
import FormularioContacto from "../../components/formularios/FormularioContacto";

const FormularioSection = () => {
  return (
    <div className="flex justify-between items-center gap-5 lg:gap-10 flex-col lg:flex-row lg:mx-10 my-10">
      <FormularioContacto />
      <DatosEmpresaCard />
    </div>
  )
}

export default FormularioSection;