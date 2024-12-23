import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { Heading } from "./heading";
import { CloseIcon, Icon } from "./icon";
import { Text } from "./text";
import { VStack } from "./vstack";

interface GlobalModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  title: string;
  description: string;
  actions: ReactNode;
}

export default function GlobalModal({
  showModal,
  setShowModal,
  title,
  description,
  actions,
}: Readonly<GlobalModalProps>) {
  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        setShowModal(false);
      }}
      size="md"
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="md" className="text-typography-950">
            {title}
          </Heading>
          <ModalCloseButton>
            <Icon
              as={CloseIcon}
              size="md"
              className="stroke-background-400 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900 group-[:hover]/modal-close-button:stroke-background-700"
            />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Text size="sm" className="text-typography-500">
            {description}
          </Text>
        </ModalBody>
        <ModalFooter>
          <VStack space="md" className="w-full">
            {actions}
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
