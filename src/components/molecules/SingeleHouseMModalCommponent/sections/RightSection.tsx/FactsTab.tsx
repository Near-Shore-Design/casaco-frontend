interface factsProp {
  features: string[];
  exterior_size: number;
  interior_size: string;
  beds: number | undefined;
  baths: number | undefined;
}

const FactsTab: React.FC<factsProp> = ({
  features,
  exterior_size,
  interior_size,
  beds,
  baths,
}) => {
  return (
    <div className="h-[42vh]">
      <h1 className="font-semibold">Property Features</h1>
      <ul className="list-disc">
        {features?.map((feature: string, index: number) => (
          <li key={index} className="pt-2.5 ml-6">
            {feature}
          </li>
        ))}

        <li className="pt-2.5 ml-6">
          Exterior size: {exterior_size.toLocaleString()} m<sup>2</sup>
        </li>
        <li className="pt-2.5 ml-6">
          Interior size: {interior_size} m<sup>2</sup>
        </li>
        <li className="pt-2.5 ml-6">Number of Baths: {baths} </li>
        <li className="pt-2.5 ml-6">Number of Beds:{beds}</li>
      </ul>
    </div>
  );
};

export default FactsTab;
