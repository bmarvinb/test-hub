import { ModeToggle } from "@/components/ui/ModeToggle";

export const Header = () => {
  return (
    <header className="w-full border-b bg-background/95 py-3 px-4 flex justify-end">
      <ModeToggle />
    </header>
  );
};
