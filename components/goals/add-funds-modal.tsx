import {
  IModalProps,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from "@/components/ui/modal";
import { Goal } from "@/types/types";
import React, { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonIcon, ButtonText } from "../ui/button";
import { Heading } from "../ui/heading";
import { CloseIcon, EditIcon, Icon } from "../ui/icon";
import { Input, InputField } from "../ui/input";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

interface AdditionalProps {
  goal: Goal;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

type AddFundsModalProps = AdditionalProps & IModalProps;

export default function AddFundsModal(props: AddFundsModalProps) {
  const { t } = useTranslation();
  const {
    goal: { title },
    showModal,
    setShowModal,
  } = props;

  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        setShowModal(false);
      }}
      size="md"
      {...props}
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="md" className="text-typography-950">
            {t("Add funds")}
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
          <VStack space="sm" className="w-full">
            <Text size="sm" className="text-typography-500">
              {t("Add funds fo goal")}: {title}
            </Text>
            <VStack space="xs">
              <Text className="text-typography-500">{t("Amount")}</Text>
              <Input>
                <InputField type="text" keyboardType="numeric" />
              </Input>
            </VStack>
            <Button>
              <ButtonIcon as={EditIcon} />
              <ButtonText>{t("Submit")}</ButtonText>
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
