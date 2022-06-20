import './Button.scss';

function Button({ className, ...rest }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {

  return (
    <button className={`button ${className}`} {...rest} />
  );
}

export default Button;
