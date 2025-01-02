import {
  IModalProps,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from "@/components/ui/modal";
import React, { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonText } from "../ui/button";
import { Heading } from "../ui/heading";
import { CloseIcon, Icon } from "../ui/icon";
import { Input, InputField } from "../ui/input";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

interface AdditionalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

type CreateCategoryModalProps = AdditionalProps & IModalProps;

export default function CreateCategoryModal(props: CreateCategoryModalProps) {
  const { t } = useTranslation();
  const { showModal, setShowModal } = props;

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
            {t("Create category")}
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
              {t("You are creating a new category")}
            </Text>
            <VStack space="xs">
              <Text className="text-typography-500">{t("Category name")}</Text>
              <Input>
                <InputField type="text" />
              </Input>
            </VStack>
            <Button>
              <ButtonText>{t("Submit")}</ButtonText>
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
