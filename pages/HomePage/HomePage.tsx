// libarary
import { memo } from "react";
import { useTranslation } from "react-i18next";

// styles

const HomePage = memo(() => {
  const { t } = useTranslation();
  return <h1 className="text-center mt-2">{t("trang chu")}</h1>;
});

export default HomePage;
