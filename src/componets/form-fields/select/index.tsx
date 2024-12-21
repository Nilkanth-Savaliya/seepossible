import { twMerge } from "tailwind-merge";

const Select = ({ label, placeholder, error, name, options, ...rest }) => {
  return (
    <div>
      <label>
        <p className="mb-1 cursor-pointer text-xs font-semibold text-gray-600">
          {label}
        </p>
        <select
          name={name}
          className={twMerge(
            "block w-full rounded-[3px] bg-whitesmoke-900 px-2 py-2 font-lexend text-sm font-light text-neutral-light-n900 placeholder-slategray-500 outline-none focus:border-gainsboro-300 border-2 border-gainsboro-300 bg-whitesmoke-900",
            error && "border-red-500"
          )}
          {...rest}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </label>
    </div>
  );
};

export default Select;
