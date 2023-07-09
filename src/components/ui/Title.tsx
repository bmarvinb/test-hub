import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const titleVariants = cva("font-bold text-gray-800", {
  variants: {
    size: {
      h1: "text-2xl",
      h2: "text-xl",
      h3: "text-lg",
      h4: "text-base",
      h5: "text-sm",
      h6: "text-xs",
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

  const className = cn(
    titleVariants({ className: props.className }),
    titleVariants({ size })
  );

  const attrs = {
    ...props,
    className,
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
