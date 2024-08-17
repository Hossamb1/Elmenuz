import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

type Props = {
  classname?: string;
};
const LoadingButton = ({ classname = "" }: Props) => {
  return (
    <Button disabled className={classname}>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Loading
    </Button>
  );
};

export default LoadingButton;
