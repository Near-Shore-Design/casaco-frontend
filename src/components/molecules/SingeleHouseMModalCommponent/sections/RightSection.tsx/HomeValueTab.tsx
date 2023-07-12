interface homeValueProp {
  value: number;
}

const HomeValueTab: React.FC<homeValueProp> = ({ value }) => {
  return (
    <div>
      <h1 className="font-bold">Estimated Home value</h1>
      <p>{`COP ${value.toLocaleString("es-CO")}`}</p>
    </div>
  );
};

export default HomeValueTab;
