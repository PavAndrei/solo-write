export const TextInput = ({ label, type, name, value, onChange }) => (
  <label className="text-sm font-medium flex flex-col gap-2">
    <span className="cursor-pointer">{label}</span>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded"
    />
  </label>
);
