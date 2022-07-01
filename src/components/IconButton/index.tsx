import './IconButton.scss';

export const Variant = {
  danger: 'danger',
} as const;

export type Variant = typeof Variant[keyof typeof Variant];

export type IconButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant?: Variant;
}

function IconButton({ className, variant, ...rest }: IconButtonProps) {

  return (
    <button className={`icon-button ${variant} ${className}`} {...rest} />
  );
}

export default IconButton;
