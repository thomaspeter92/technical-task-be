import ResultsImage from "../assets/graduation.svg";
import { formatDate } from "../util/datesUtil";
import Button from "./Button";

type Props = { date: string };

const Results = ({ date }: Props) => {
  return (
    <div className="rounded-4xl overflow-hidden border border-slate-200 space-y-5">
      <div className="w-full h-64 bg-orange-400 relative">
        <img
          src={ResultsImage}
          alt="Graduation Illustration"
          className="absolute object-cover w-full h-full"
        />
      </div>
      <div className="p-8 pt-2 space-y-5">
        <p className="font-bold">Completed on {formatDate(date)}</p>
        <p className="text-sm">
          Well done on completing your test. You can view the results now.
        </p>
        <Button>See your results</Button>
      </div>
    </div>
  );
};

export default Results;
