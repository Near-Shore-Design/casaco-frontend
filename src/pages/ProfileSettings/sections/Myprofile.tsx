import Button from "components/atoms/Button";
import { AiFillEdit } from "react-icons/ai";
import { myProfileProp } from "../types";
import Modal from "components/molecules/Modal";
import ProfileModalComponents from "components/molecules/ProfileModals/Profile";
import { useState } from "react";

const Myprofile: React.FC<myProfileProp> = ({ username, email, src }) => {
  const [profileEdit, setProfileEdit] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <img
          src={src}
          alt=""
          className="w-[80px] h-[80px] rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{username}</p>
          <p>{email}</p>
        </div>
      </div>

      <Button
        iconFront={<AiFillEdit />}
        type="button"
        className="text-black"
        text="Edit"
        onClick={() => setProfileEdit(true)}
        pill
      />

      <Modal
        height="h-fit"
        isShown={profileEdit}
        hide={() => setProfileEdit(false)}
        header="Edit your profile"
      >
        <ProfileModalComponents
          onClose={() => setProfileEdit(false)}
          src={src}
        />
      </Modal>
    </>
  );
};

export default Myprofile;
