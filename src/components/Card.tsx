type Props = {
  title: string;
  text: string;
  icon: string;
  color: "orange" | "yellow" | "purple";
};

const colorClasses = {
  orange: "bg-orange-50 border-orange-300",
  yellow: "bg-yellow-50 border-yellow-300",
  purple: "bg-purple-50 border-purple-300",
};

const Card = ({ title, text, icon, color }: Props) => {
  return (
    <div className="bg-white rounded-lg  px-10 py-6 border border-slate-200 relative">
      <div
        className={`
        ${colorClasses[color]}
        rounded-full 
        w-12 
        h-12
        flex 
        items-center 
        justify-center
        border-2
        absolute
        left-0
        top-1/2
        -translate-1/2
        `}
      >
        <img src={icon} />
      </div>
      <h2 className="font-semibold">{title}</h2>
      <p className="mt-2 text-gray-600 text-sm">{text}</p>
    </div>
  );
};

export default Card;
