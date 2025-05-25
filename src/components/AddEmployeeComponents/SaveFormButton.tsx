import { Button } from '../button';

interface SaveFormButtonProps {
  onSave: () => void;
  disabled: boolean;
}

export const SaveFormButton: React.FC<SaveFormButtonProps> = ({
  onSave,
  disabled,
}) => {
  return (
    <Button onClick={onSave} disabled={disabled}>
      Salvar
    </Button>
  );
};
