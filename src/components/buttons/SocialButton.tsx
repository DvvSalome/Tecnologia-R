interface SocialButtonProps {
  icon: string;
  link: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon, link }) => {
  return (
      <a href={link} target="_blank" rel="noreferrer" className="bg-gray-700 p-3 rounded-full border-solid border-2 border-white hover:bg-slate-500 transition duration-300">
        <img src={icon} alt="social" className="w-5" />
      </a>
  )
}

export default SocialButton