interface HoverEffectButtonProps {
  text: string;
  onClick: () => void;
}

const InicioProductButton = ({ text, onClick }: HoverEffectButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="relative w-32 inline-flex items-center justify-start px-5 py-3 overflow-hidden font-bold rounded-md group"
    >
      <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
      <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-[#4874D6] opacity-100 group-hover:-translate-x-8"></span>
      <p className="text-center relative w-full text-left text-[#4874D6] transition-colors duration-200 ease-in-out group-hover:text-white">
        {text}
      </p>
      <span className="absolute inset-0 border-2 border-[#4874D6] rounded-md"></span>
    </button>
  );
};

export default InicioProductButton;
