# @glomllc/toastr

> **A React library for displaying toast notifications.**

## Author

This project is brought to you by [Tchakoumi Lorrain Kouatchoua ✨](https://github.com/tchakoumi)

## Repository

For more details, contribution, issue repors or support, please visit the [repository](https://github.com/tchakoumi/toastr).

## Installation

To install the library, run:

```bash
npm install @glomllc/toastr
```

## Usage

### Step 1: Configure the Provider at the Root of Your Project

In your root file (e.g., `index.tsx` or `index.js`), wrap your application with the `ToastrProvider` and configure the necessary props.

```jsx
import ReactDOM from 'react-dom/client';
import { ToastrProvider } from '@glomllc/toastr';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ToastrProvider
    configs={{
      disableDismissAll: false,
      disableDecendantStyle: false,
      timeout: 2000,
      restartTimeoutAferHover: false,
    }}
  >
    <App />
  </ToastrProvider>
);
```

### Step 2: Use the useToastr Hook in Your Components

Call the `useToastr` hook and destructure the `toast`, `clearToast` and `notifications` function to manage notifications.

```jsx
import React from 'react';
import { useToastr } from '@glomllc/toastr';
import { Button } from '@mui/material';

export function App() {
  const { toast, clearToast } = useToastr();

  return (
    <div>
      <Button
        color="primary"
        variant="contained"
        onClick={() =>
          toast(`This is a demo toast message with this awesome library!`, {
            type: 'error',
            hasCloseButton: true,
            title: 'Demo Toast',
            restartTimeoutAferHover: true,
            timeout: 'infinite',
            action: () => alert('Action triggered'),
          })
        }
      >
        Show Toast
      </Button>
      <Button
        color="secondary"
        variant="contained"
        onClick={() => clearToast()} // Clears all toasts
      >
        Clear All Toasts
      </Button>
    </div>
  );
}

export default App;
```

## Configuration

### ToastrProvider Configurations

The `ToastrProvider` accepts a `configs` prop with the following options:

- `disableDismissAll`: (boolean) Disables the "Dismiss All" button if set to true.
- `disableDecendantStyle`: (boolean) Disables default styles applied to descendants if set to true.
- `timeout`: (number | 'infinite') Sets the duration (in milliseconds) before the toast automatically disappears. Use `'infinite'` to keep the toast visible indefinitely.
- `restartTimeoutAferHover`: (boolean) Restarts the timeout when the toast is hovered if set to true.

Example:

```jsx
<ToastrProvider
  configs={{
    disableDismissAll: false,
    disableDecendantStyle: false,
    timeout: 2000,
    restartTimeoutAferHover: false,
  }}
>
  {children}
</ToastrProvider>
```

### Toast Configurations

The `toast` function accepts a message and an optional configuration object with the following options:

- `type`: (string) Specifies the type of toast ('success', 'info', 'error').
- `title`: (string) The title of the toast notification.
- `hasIcon`: (boolean) If true, an icon will be displayed in the toast.
- `hasCloseButton`: (boolean) If true, a close button will be displayed in the toast.
- `timeout`: (number | 'infinite') Duration before the toast automatically disappears.
- `restartTimeoutAferHover`: (boolean) Restarts the timeout when the toast is hovered.
- `action`: (function) A callback function to execute when the action button is clicked.
- `actionButton`: (JSX.Element) Custom action button component.
- `actionText`: (string) Text for the action button.

Example:

```jsx
toast('This is a demo toast message with this awesome library!', {
  type: 'error',
  hasCloseButton: true,
  title: 'Demo Toast',
  restartTimeoutAferHover: true,
  timeout: 'infinite',
  action: () => alert('Action triggered'),
});
```

### Clear Toasts

The `clearToast` method can be used to clear all currently displayed toasts. You can also pass an optional `id` to clear a specific toast.

Example:

```ts
clearToast(); // Clears all toasts
clearToast('htc'); // Clears toast with id htc
```

## Keywords

- react
- toastr
- notification
- alert
- push
- information
- react-component
- react-toastr
- toastr
- glomllc/toastr

## License

This project is licensed under the MIT License.
