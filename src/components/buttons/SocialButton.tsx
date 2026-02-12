interface SocialButtonProps {
  icon: string;
  link: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="group relative w-10 h-10 rounded-xl bg-surface-200/80 dark:bg-surface-800/80
                 flex items-center justify-center overflow-hidden
                 hover:scale-110 active:scale-95
                 transition-all duration-400"
    >
      {/* Animated gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500
                      opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      <img
        src={icon}
        alt="social"
        className="relative w-5 opacity-50 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert
                   transition-all duration-300 group-hover:scale-110"
      />
    </a>
  );
};

export default SocialButton;
