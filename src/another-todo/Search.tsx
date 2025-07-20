import { useRef } from "react";

export function Search({
  onChange,
}: {
  onChange: (arg: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <h4>Search for specific items</h4>
      <input
        type="text"
        placeholder={"Search"}
        onChange={onChange}
        ref={inputRef}
      />
    </div>
  );
}
