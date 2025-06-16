import 'bootstrap/dist/css/bootstrap.min.css';

function Button({
    label,
    onClick, 
    variant= 'primary', 
    disabled = false,
    className = '',}){ 
    
        const baseClass = `btn btn-${variant} ${className} `;

        return (
            <button
            className={baseClass}
            onClick={onClick}
            disabled={disabled}
            >
            {label}
            </button>
        );
}
export default Button;