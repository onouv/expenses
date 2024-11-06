import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import config from "@/app-config.json";
import WaitingPrompt from "@/components/WaitingPrompt";

const DetailsHome = (): ReactElement => {
  const router = useRouter();
  console.log("DetailsHome...");
  useEffect(() => {
    if (router.query.id) {
      router.push(`/${config.ACCOUNT_DETAILS_PARTIAL_URL}/${router.query.id}`);
    } else {
      router.push(`/${config.ACCOUNT_PARTIAL_URL}`);
    }
  }, [router.query.id]);

  return <WaitingPrompt prompt="Loading account from server..." />;
};

export default DetailsHome;
