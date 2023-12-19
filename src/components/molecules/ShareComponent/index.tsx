import Button from "components/atoms/Button";
import { useRef } from "react";
import { toast } from "react-hot-toast";
import {
  FacebookIcon,
  FacebookMessengerShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

interface socialShareProp {
  description?: string;
  title?: string;
  id?: number;
  src?: string;
}

const SocialShareComponent: React.FC<socialShareProp> = ({
  src,
  description,
  title,
  id,
}) => {
  const textRef = useRef<HTMLInputElement>(null);

  const handleCopy = (e: any) => {
    e.preventDefault();
    if (textRef.current) {
      navigator.clipboard
        .writeText(textRef.current.value)
        .then(() => {
          toast.success("copied to clipboard!");
        })
        .catch((error) => {
          toast.error("an error occured!");
        });
    }
  };

  const shareUrl = `https://casa-colombia-two.vercel.app/buy-house?property_id=${id}`;
  const subTitle = "Check out this cool website!";
  return (
    <div className="h-fit py-5 w-full max-w-[450px] cursor-default">
      <img
        src={
          src ||
          "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
        }
        className="h-[150px] w-full object-cover rounded-lg"
        alt="property"
      />
      <h1 className="text-center py-4">{title}</h1>
      <p>{description}</p>

      <form className="flex items-center py-5" onSubmit={handleCopy}>
        <div className="mb-4 flex items-center gap-1 w-full">
          <input
            type="text"
            ref={textRef}
            className="w-full rounded border border-gray-400 py-1 px-2"
            value={shareUrl}
            disabled
          />
          <Button
            text="Copy to clipboard"
            type="submit"
            className="whitespace-nowrap"
          />
        </div>
      </form>
      <div className="flex gap-5 justify-between mt-5">
        <TwitterShareButton
          className="flex flex-col items-center"
          url={shareUrl}
          title={subTitle}
        >
          <TwitterIcon size={32} round={true} />
          Share on Twitter
        </TwitterShareButton>

        <FacebookMessengerShareButton
          className="flex flex-col items-center"
          appId=""
          url={shareUrl}
          title={subTitle}
        >
          <FacebookIcon size={32} round={true} />
          Share on FaceBook
        </FacebookMessengerShareButton>

        <WhatsappShareButton
          className="flex flex-col items-center"
          url={shareUrl}
          title={title}
        >
          <WhatsappIcon size={32} round={true} />
          Share on Whatsapp
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default SocialShareComponent;
