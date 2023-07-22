import { format } from "date-fns";
import { id } from "date-fns/locale";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const formatDateToIndonesianLocale = (isoDateString: string) => {
  return format(new Date(isoDateString), "dd MMMM yyyy HH:mm", { locale: id });
};

export const getBadgeColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "orange";
    case "APPROVED":
      return "green";
    default:
      return "red";
  }
};

export const showError = (message: string) => {
  notifications.show({
    message,
    color: "red",
    icon: <IconX size="1rem" />,
  });
};

export const showSuccess = (message: string) => {
  notifications.show({
    message,
    color: "teal",
    icon: <IconCheck size="1rem" />,
  });
};
