import { useToastr } from '@glom/toastr';
import { Button } from '@mui/material';

export function App() {
  const { toast } = useToastr();
  return (
    <div>
      <Button
        color="primary"
        variant="contained"
        onClick={() =>
          toast(`This is a demo toast message with this awesome library!`, {
            type: 'error',
            hasCloseButton: true,
            title: 'Scan QR',
            restartTimeoutAferHover: true,
            timeout: 'infinite',
            action: () => alert('Action'),
          })
        }
      >
        Hello
      </Button>
    </div>
  );
}

export default App;
