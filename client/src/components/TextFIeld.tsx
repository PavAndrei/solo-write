export const TextField = ({ label, placeholder, name }) => {
  return (
    <label>
      <span>{label}</span>
      <input type="text" placeholder={placeholder} name={name} />
    </label>
  );
};
