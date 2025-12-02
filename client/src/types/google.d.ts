// Define the type for the callback function (the one you defined earlier)
interface CredentialResponse {
  credential: string
  select_by: string
  // ... other properties
}

// Define the configuration object for initialization
interface GsiInitConfig {
  client_id: string
  callback: (response: CredentialResponse) => void
  // ... other optional configuration properties (auto_select, cancel_on_tap_outside, etc.)
}

// Define the interface for the renderButton options
interface GsiButtonOptions {
  theme?: 'outline' | 'filled_blue' | 'filled_white'
  size?: 'large' | 'medium' | 'small'
  type?: 'standard' | 'icon'
  text?: 'signin_with' | 'signup_with' | 'continue_with'
  shape?: 'rectangular' | 'pill' | 'circle' | 'square'
  locale?: string
  width?: string // e.g., "300" or "100%"
}

// Define the core 'id' object's methods
interface GsiId {
  initialize(config: GsiInitConfig): void
  renderButton(element: HTMLElement | string, options: GsiButtonOptions): void
  // ... other methods like prompt, revoke, etc.
}

// Define the global 'google' structure
declare global {
  interface Window {
    google?: {
      accounts: {
        id: GsiId
      }
    }
  }
}

export {}
