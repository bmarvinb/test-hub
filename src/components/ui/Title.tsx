import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const titleVariants = cva("font-bold text-gray-800", {
  variants: {
    size: {
      h1: "text-2xl mb-4",
      h2: "text-xl mb-3",
      h3: "text-lg mb-3",
      h4: "text-base mb-2",
      h5: "text-sm mb-2",
      h6: "text-xs mb-2",
    },
  },
  defaultVariants: {
    size: "h1",
  },
});

export interface TitleProps
  extends React.HTMLAttributes<HTMLTitleElement>,
    VariantProps<typeof titleVariants> {}

export const Title = (props: TitleProps) => {
  const size = props.size || "h1";
  const HeadingTag = size;

  return (
    <HeadingTag className={cn(titleVariants({ className: props.className }))}>
      {props.children}
    </HeadingTag>
  );
};
