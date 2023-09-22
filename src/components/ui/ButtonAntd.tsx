import { Button } from "antd";

interface ButtonProps {
  classTW: string;
  title: string;
}

const ButtonAntd: React.FC<ButtonProps> = ({ classTW, title }) => {
  return (
    <Button block className={classTW}>
      {title}
    </Button>
  );
};
export { ButtonAntd };
