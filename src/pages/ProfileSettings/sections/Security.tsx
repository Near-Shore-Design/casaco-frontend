import Button from "components/atoms/Button";
import ChangePasswordModalComponent from "components/molecules/ProfileModals/ChangePassword";
import Modal from "components/molecules/Modal";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import ChangeEmailModalComponent from "components/molecules/ProfileModals/ChangeEmail";

const Security = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showEmail, setShowEmail] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-wrap justify-between items-end border-b border-gray-500 py-2 mb-3">
        <div>
          <h2 className="text-sm font-semibold">Email</h2>
          <p className="text-sm py-1">
            Update address associated with your account.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            iconFront={<AiFillEdit />}
            type="button"
            className="text-black"
            onClick={() => setShowEmail(true)}
            text="Edit"
            pill
          />
        </div>
      </div>
      <div className="flex justify-between items-end border-b border-gray-500 py-2">
        <div>
          <h2 className="text-sm font-semibold">Change Password</h2>
          <p className="text-sm py-1">
            Change your password to protect your account.
          </p>
        </div>

        <Button
          iconFront={<AiFillEdit />}
          type="button"
          className="text-black"
          text="Edit"
          onClick={() => setShowPassword(true)}
          pill
        />
      </div>

      <Modal
        isShown={showPassword}
        hide={() => setShowPassword(false)}
        header="Change password"
        height="h-fit"
      >
        <ChangePasswordModalComponent onClose={() => setShowPassword(false)} />
      </Modal>

      <Modal
        isShown={showEmail}
        hide={() => setShowEmail(false)}
        header="Change Email"
        height="h-fit"
      >
        <ChangeEmailModalComponent onClose={() => setShowEmail(false)} />
      </Modal>
    </>
  );
};

export default Security;
