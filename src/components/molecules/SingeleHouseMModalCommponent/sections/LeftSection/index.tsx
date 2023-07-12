interface leftSectionProp {
  src: string | undefined;
}
const LeftSection: React.FC<leftSectionProp> = ({ src }) => {
  return (
    <img
      src={
        src ||
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
      }
      alt=""
      className="w-full lg:w-[60%]  object-cover rounded-xl"
    />
  );
};

export default LeftSection;
