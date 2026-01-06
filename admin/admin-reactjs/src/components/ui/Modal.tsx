interface ModalProps {
    open: boolean;
    title: string;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ open, title, onClose, children }: ModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-[500px] p-6">
                <div className="flex justify-between mb-4">
                    <h2 className="font-semibold text-lg">{title}</h2>
                    <button onClick={onClose}>✕</button>
                </div>
                {children}
            </div>
        </div>
    );
}
