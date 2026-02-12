interface HoverEffectButtonProps {
  text: string;
  onClick: (e: React.MouseEvent) => void;
}

const InicioProductButton = ({ text, onClick }: HoverEffectButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="group/btn relative inline-flex items-center justify-center px-6 py-2.5
                 rounded-xl text-sm font-bold overflow-hidden
                 bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400
                 border border-primary-200/60 dark:border-primary-800/40
                 hover:text-white hover:border-transparent
                 transition-all duration-400 hover:shadow-lg hover:shadow-primary-500/20"
    >
      {/* Animated background fill */}
      <span className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600
                       translate-y-full group-hover/btn:translate-y-0
                       transition-transform duration-400 ease-out" />
      <span className="relative">{text}</span>
    </button>
  );
};

export default InicioProductButton;
