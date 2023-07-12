import Button from "components/atoms/Button";
import Card from "components/atoms/Card";

const ManageAccount = () => {
  return (
    <div>
      <div className="flex flex-wrap justify-between items-end border-b border-gray-500 py-2 mb-3">
        <div>
          <h2 className="text-sm font-semibold">Deactivate my Account</h2>
          <p className="text-sm py-1">
            This will shut down your account, but retain your information. You
            won't be able to sign in again until your account is reactivated.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            className="text-black"
            text="Deactivate Account"
            pill
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-between items-end border-b border-gray-500 py-2 mb-3">
        <div>
          <h2 className="text-sm font-semibold">Delete my Account</h2>
          <p className="text-sm py-1">
            This will permanently delete your account and all your data will be
            lost.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            className="text-black"
            text="Delete Account"
            pill
          />
        </div>
      </div>
    </div>
  );
};

export default ManageAccount;
