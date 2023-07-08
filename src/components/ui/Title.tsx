import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const titleVariants = cva("font-bold text-gray-800", {
  variants: {
    size: {
      h1: "text-2xl mb-8",
      h2: "text-xl mb-6",
      h3: "text-lg mb-4",
      h4: "text-base mb-4",
      h5: "text-sm mb-2",
      h6: "text-xs mb-2",
    },
  },
  defaultVariants: {
    size: "h1",
  },
});

export interface TitleProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof titleVariants> {}

export const Title = (props: TitleProps) => {
  const size = props.size || "h1";

  const attrs = {
    className: cn(titleVariants({ className: props.className })),
    ...props,
  };

  switch (size) {
    case "h1":
      return <h1 {...attrs}>{props.children}</h1>;
    case "h2":
      return <h2 {...attrs}>{props.children}</h2>;
    case "h3":
      return <h3 {...attrs}>{props.children}</h3>;
    case "h4":
      return <h4 {...attrs}>{props.children}</h4>;
    case "h5":
      return <h5 {...attrs}>{props.children}</h5>;
    case "h6":
      return <h6 {...attrs}>{props.children}</h6>;
    default:
      break;
  }
};
