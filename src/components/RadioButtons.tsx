import { RadioGroup, Radio } from "@headlessui/react";

type Props = {
  name: string;
  value: number | string;
  onChange: (value: number) => void;
};

const RadioButtons = ({ value, onChange }: Props) => {
  return (
    <RadioGroup value={value} onChange={onChange}>
      <div className="flex justify-between relative w-full">
        <hr className="w-[99%] border-blue-400 absolute z-0 top-1/2" />
        {[...Array(8)].map((_, index) => {
          return (
            <Radio
              key={index}
              value={index}
              className="w-6 h-6  group  flex items-center justify-center rounded-full border border-blue-400 bg-blue-50 relative cursor-pointer"
            >
              <span className="w-4 h-4 rounded-full absolute bg-blue-400 opacity-0 group-data-checked:opacity-100"></span>
            </Radio>
          );
        })}
      </div>
      <div className="flex justify-between mt-3">
        <span className="text-xs ">Strongly disagree</span>
        <span className="text-xs ">Strongly agree</span>
      </div>
    </RadioGroup>
  );
};

export default RadioButtons;
