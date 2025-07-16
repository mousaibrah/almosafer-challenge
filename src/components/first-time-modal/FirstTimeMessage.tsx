"use client";
import { useAuth } from "@/hooks/use-auth";
import { useIsFirstTime } from "@/store/useIsFirstTime";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Modal } from "./ModalWithChilderen";

const FirstTimeMessage = ({
  onClose,
  open,
}: {
  onClose: () => void;
  open: boolean;
}) => {
  const { signIn, isLoading } = useAuth();
  const { setIsFirstTime } = useIsFirstTime();

  return (
    <Modal open={open} borderRadius="lg" size="extraSmall" onClose={onClose}>
      <Modal.Header>
        <p>Welcome to GitHub Search</p>
      </Modal.Header>
      <Modal.Content>
        <p>For the best experience, please login with your GitHub account.</p>
      </Modal.Content>
      <Modal.Footer>
        <Button
          onClick={() => {
            signIn();
            setIsFirstTime(false);
            onClose();
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Login with GitHub"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FirstTimeMessage;
