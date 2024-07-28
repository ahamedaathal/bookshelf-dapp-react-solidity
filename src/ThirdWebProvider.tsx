import {
  ThirdwebProvider
} from "thirdweb/react";


export default function ThirdWebProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebProvider
    >
      {children}
    </ThirdwebProvider>
  );
}
