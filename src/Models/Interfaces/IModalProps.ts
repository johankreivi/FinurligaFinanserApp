export interface IModalProps {
    show: boolean; 
    handleClose: () => void;
    handleSubmit: (value: string | undefined) => void;
}