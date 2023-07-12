interface overviewProp {
  overview: string | undefined;
}
const OverviewTab: React.FC<overviewProp> = ({ overview }) => {
  return (
    <div>
      <h1 className="font-bold">Overview</h1>
      {overview}
    </div>
  );
};

export default OverviewTab;
